/* Motor dos modelos interativos da Aula 09 (pilares da OOP).
   Cada página define window.MODELO (nós, setas, informações e cenários) e este
   arquivo monta o palco: os itens são elementos HTML posicionados num sistema
   W × H, e as setas são desenhadas num SVG por cima a partir da posição real de
   cada elemento (recalculadas quando o tamanho muda). Sem else: early return.

   MODELO = {
     W, H,
     modes: [{ id, label }]            // opcional: o primeiro é o padrão
     nodes: [{ id, cls, x, y, w, h, html, when?, static? }]
     edges: [{ id, from, to, kind, points?, label?, off?, when? }]
              kind: call | ok | block (✕ no fim) | bad | warn | int | ret | inherit | impl | inst | has
     info:  { id: { t, d: [[chave, valor]], p } }
     scenarios: { chave: { label, mode?, t, steps: [{ e: [ids], n: [ids], tags: [{ n, t, tone, pos? }], x, code }] } }
   } */
(function(){
  var C = window.MODELO;
  if(/[?&]embed/.test(location.search)){ document.documentElement.classList.add('embed'); }
  var NS = 'http://www.w3.org/2000/svg';
  var stage = document.getElementById('stage');
  var svg = document.getElementById('wires');
  stage.style.setProperty('--W', C.W);
  stage.style.setProperty('--H', C.H);
  stage.style.aspectRatio = C.W + ' / ' + C.H;

  var mode = C.modes ? C.modes[0].id : null;
  var focusId = null;
  var hoverId = null;
  var scenarioKey = null;
  var step = 0;

  var items = {};
  C.nodes.forEach(function(n){
    var d = document.createElement('div');
    d.className = 'item ' + (n.cls || '') + (n.static ? ' static' : '');
    d.dataset.id = n.id;
    d.style.cssText = '--x:' + n.x + ';--y:' + n.y + ';--w:' + n.w + ';--h:' + n.h;
    d.innerHTML = n.html || '';
    if(n.when){ d.dataset.when = n.when; }
    if(!n.static){ d.tabIndex = 0; }
    stage.insertBefore(d, svg);
    items[n.id] = d;
  });

  var edgeById = {};
  C.edges.forEach(function(e){ edgeById[e.id] = e; });

  function visibleEdges(){
    return C.edges.filter(function(e){ return !e.when || e.when === mode; });
  }

  function applyMode(){
    Object.keys(items).forEach(function(id){
      var w = items[id].dataset.when;
      items[id].style.display = !w || w === mode ? '' : 'none';
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-mode]'), function(b){
      b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-scenario]'), function(b){
      var sc = C.scenarios[b.dataset.scenario];
      b.style.display = !sc.mode || sc.mode === mode ? '' : 'none';
    });
  }

  /* ── geometria ────────────────────────────────────────── */
  function box(id){
    var el = items[id];
    var s = stage.getBoundingClientRect();
    var r = el.getBoundingClientRect();
    return { w: r.width, h: r.height, cx: r.left - s.left + r.width / 2, cy: r.top - s.top + r.height / 2 };
  }

  /* ponto da borda do retângulo b na direção do ponto (tx, ty) */
  function edgePoint(b, tx, ty, gap){
    var dx = tx - b.cx;
    var dy = ty - b.cy;
    if(dx === 0 && dy === 0){ return [b.cx, b.cy]; }
    var sx = dx === 0 ? Infinity : (b.w / 2 + gap) / Math.abs(dx);
    var sy = dy === 0 ? Infinity : (b.h / 2 + gap) / Math.abs(dy);
    var s = Math.min(sx, sy);
    return [b.cx + dx * s, b.cy + dy * s];
  }

  function el(name, attrs){
    var n = document.createElementNS(NS, name);
    Object.keys(attrs).forEach(function(k){ n.setAttribute(k, attrs[k]); });
    return n;
  }

  function marker(id, shape, extra){
    var m = el('marker', { id: id, viewBox: '0 0 12 12', refX: extra.refX, refY: '6', markerWidth: extra.size, markerHeight: extra.size, orient: extra.orient, markerUnits: 'userSpaceOnUse' });
    m.appendChild(el('path', { d: shape, fill: extra.fill, stroke: 'context-stroke', 'stroke-width': extra.sw || 0 }));
    return m;
  }

  var paths = {};
  var labels = {};
  var xmarks = {};

  function draw(){
    var k = stage.clientWidth / C.W;
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 ' + stage.clientWidth + ' ' + stage.clientHeight);
    paths = {};
    labels = {};
    xmarks = {};

    var defs = el('defs', {});
    defs.appendChild(marker('arrow', 'M0,0 L12,6 L0,12 z', { refX: '11', size: '14', orient: 'auto', fill: 'context-stroke' }));
    defs.appendChild(marker('tri', 'M1,1 L11,6 L1,11 z', { refX: '11', size: '18', orient: 'auto', fill: 'var(--surface)', sw: 1.6 }));
    defs.appendChild(marker('diamond', 'M0,6 L6,1 L12,6 L6,11 z', { refX: '1', size: '18', orient: 'auto', fill: 'var(--surface)', sw: 1.6 }));
    svg.appendChild(defs);

    visibleEdges().forEach(function(edge){
      var a = box(edge.from);
      var b = box(edge.to);
      var mids = (edge.points || []).map(function(p){ return [p[0] * k, p[1] * k]; });
      var first = mids.length ? mids[0] : [b.cx, b.cy];
      var last = mids.length ? mids[mids.length - 1] : [a.cx, a.cy];
      var start = edgePoint(a, first[0], first[1], 2);
      var end = edgePoint(b, last[0], last[1], edge.kind === 'block' ? 6 : 4);
      var pts = [start].concat(mids, [end]);

      /* seta paralela: desloca o traçado para o lado (ida e volta na mesma ligação) */
      if(edge.off){
        var vx = end[0] - start[0];
        var vy = end[1] - start[1];
        var len = Math.sqrt(vx * vx + vy * vy) || 1;
        var ox = -vy / len * edge.off * k;
        var oy = vx / len * edge.off * k;
        pts = pts.map(function(p){ return [p[0] + ox, p[1] + oy]; });
      }

      var d = 'M' + pts.map(function(p){ return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' L');
      var attrs = { d: d, class: 'wire ' + edge.kind + (edge.only ? ' only' : ''), 'data-id': edge.id };
      var hollow = edge.kind === 'inherit' || edge.kind === 'impl';
      attrs['marker-end'] = 'url(#' + (hollow ? 'tri' : 'arrow') + ')';
      if(edge.kind === 'has'){ attrs['marker-start'] = 'url(#diamond)'; }
      var path = el('path', attrs);
      svg.appendChild(path);
      paths[edge.id] = path;

      if(edge.kind === 'block'){
        var x = pts[pts.length - 1][0];
        var y = pts[pts.length - 1][1];
        var g = el('g', { class: 'xmark' });
        g.appendChild(el('line', { x1: x - 9, y1: y - 9, x2: x + 9, y2: y + 9 }));
        g.appendChild(el('line', { x1: x - 9, y1: y + 9, x2: x + 9, y2: y - 9 }));
        svg.appendChild(g);
        xmarks[edge.id] = g;
      }

      if(!edge.label){ return; }
      var p = path.getPointAtLength(path.getTotalLength() * (edge.at || (edge.kind === 'ret' ? 0.7 : edge.kind === 'call' ? 0.35 : 0.5)));
      var text = el('text', { x: (p.x + 8).toFixed(1), y: (p.y + (edge.kind === 'ret' ? 20 : -8)).toFixed(1), class: 'wire-label' });
      text.textContent = edge.label;
      svg.appendChild(text);
      labels[edge.id] = text;
    });

    applyState();
    syncDots();
  }

  /* ── estado: foco em item e cenário ───────────────────── */
  function clearClasses(){
    Object.keys(paths).forEach(function(id){ paths[id].classList.remove('hot', 'flow', 'done'); });
    Object.keys(labels).forEach(function(id){ labels[id].classList.remove('lit'); });
    Object.keys(xmarks).forEach(function(id){ xmarks[id].classList.remove('lit'); });
    Object.keys(items).forEach(function(id){ items[id].classList.remove('lit'); });
    Array.prototype.forEach.call(stage.querySelectorAll('.tag'), function(t){ t.remove(); });
    stage.classList.remove('focus');
  }

  function lightEdge(id, cls){
    var e = edgeById[id];
    if(!paths[id]){ return; }
    paths[id].classList.add(cls);
    items[e.from].classList.add('lit');
    items[e.to].classList.add('lit');
    if(labels[id]){ labels[id].classList.add('lit'); }
    if(xmarks[id]){ xmarks[id].classList.add('lit'); }
  }

  function addTag(t){
    var s = document.createElement('span');
    s.className = 'tag ' + (t.tone || 'ok') + (t.pos ? ' ' + t.pos : '');
    s.textContent = t.t;
    items[t.n].appendChild(s);
  }

  function applyState(){
    clearClasses();
    if(scenarioKey){ return applyScenario(); }
    var target = hoverId || focusId;
    if(!target){ return; }

    stage.classList.add('focus');
    items[target].classList.add('lit');
    visibleEdges().forEach(function(e){
      if(e.only || (e.from !== target && e.to !== target)){ return; }
      lightEdge(e.id, 'hot');
    });
  }

  function applyScenario(){
    var sc = C.scenarios[scenarioKey];
    stage.classList.add('focus');
    sc.steps.forEach(function(st, i){
      if(i > step){ return; }
      var cls = i === step ? 'flow' : 'done';
      (st.e || []).forEach(function(id){ lightEdge(id, cls); });
      (st.n || []).forEach(function(id){ items[id].classList.add('lit'); });
      (st.tags || []).forEach(addTag);
    });
  }

  /* ── bolinha andando nas setas do passo atual ─────────── */
  var dots = [];
  function syncDots(){
    dots.forEach(function(d){ d.node.remove(); });
    dots = [];
    if(!scenarioKey){ return; }
    var ids = C.scenarios[scenarioKey].steps[step].e || [];
    ids.forEach(function(id, i){
      if(!paths[id]){ return; }
      var kind = edgeById[id].kind;
      var c = el('circle', { r: 6, class: 'pulse ' + kind });
      svg.appendChild(c);
      dots.push({ node: c, path: paths[id], offset: i / ids.length });
    });
  }

  function tick(time){
    var t = (time % 1600) / 1600;
    dots.forEach(function(d){
      var len = d.path.getTotalLength();
      var p = d.path.getPointAtLength(len * ((t + d.offset) % 1));
      d.node.setAttribute('cx', p.x);
      d.node.setAttribute('cy', p.y);
    });
    requestAnimationFrame(tick);
  }
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){ requestAnimationFrame(tick); }

  /* ── painéis ──────────────────────────────────────────── */
  var infoBox = document.getElementById('info');
  var scnBox = document.getElementById('scn');

  function esc(s){
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderInfo(){
    var inf = focusId && C.info[focusId];
    if(!inf){
      infoBox.innerHTML = '<h2>Detalhes</h2><p class="hint">Clique num item do modelo (ou passe o mouse) para ver o que ele é e destacar as ligações dele.</p>';
      return;
    }
    var h = '<h2>' + inf.t + '</h2>';
    if(inf.d){
      h += '<dl>' + inf.d.map(function(r){ return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('') + '</dl>';
    }
    if(inf.p){ h += '<p>' + inf.p + '</p>'; }
    infoBox.innerHTML = h;
  }

  function renderScenario(){
    if(!scenarioKey){
      scnBox.innerHTML = '<h2>Cenário</h2><p class="hint">Escolha um cenário nos botões acima e avance passo a passo (botões ou setas ← → do teclado).</p>';
      return;
    }
    var sc = C.scenarios[scenarioKey];
    var st = sc.steps[step];
    var h = '<h2>' + sc.t + '</h2>';
    h += '<ol class="steps">' + sc.steps.map(function(s, i){
      return '<li' + (i === step ? ' class="current"' : '') + '>' + (s.title || ('passo ' + (i + 1))) + '</li>';
    }).join('') + '</ol>';
    h += '<p>' + st.x + '</p>';
    if(st.code){ h += '<pre><code>' + esc(st.code) + '</code></pre>'; }
    h += '<div class="steps-nav"><button type="button" class="btn" id="prev"' + (step === 0 ? ' disabled' : '') + '>← anterior</button>';
    h += '<button type="button" class="btn" id="next"' + (step === sc.steps.length - 1 ? ' disabled' : '') + '>próximo →</button>';
    h += '<span class="step-count">' + (step + 1) + ' / ' + sc.steps.length + '</span></div>';
    scnBox.innerHTML = h;
    document.getElementById('prev').addEventListener('click', function(){ goStep(step - 1); });
    document.getElementById('next').addEventListener('click', function(){ goStep(step + 1); });
  }

  function refresh(){
    applyState();
    syncDots();
    renderInfo();
    renderScenario();
    syncHash();
  }

  function goStep(n){
    var sc = C.scenarios[scenarioKey];
    if(n < 0 || n >= sc.steps.length){ return; }
    step = n;
    refresh();
  }

  /* ── eventos ──────────────────────────────────────────── */
  function setScenarioButtons(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-scenario]'), function(b){
      b.setAttribute('aria-pressed', String(b.dataset.scenario === scenarioKey));
    });
  }

  function selectItem(id){
    scenarioKey = null;
    setScenarioButtons();
    focusId = focusId === id ? null : id;
    refresh();
  }

  function selectScenario(key, n){
    focusId = null;
    scenarioKey = scenarioKey === key && n === undefined ? null : key;
    step = n || 0;
    setScenarioButtons();
    if(scenarioKey && C.scenarios[scenarioKey].mode && C.scenarios[scenarioKey].mode !== mode){
      mode = C.scenarios[scenarioKey].mode;
      applyMode();
      draw();
    }
    refresh();
  }

  function syncHash(){
    if(!scenarioKey){
      history.replaceState(null, '', location.pathname + location.search);
      return;
    }
    history.replaceState(null, '', '#' + scenarioKey + '/' + (step + 1));
  }

  Object.keys(items).forEach(function(id){
    var it = items[id];
    if(it.classList.contains('static')){ return; }
    it.addEventListener('mouseenter', function(){
      if(scenarioKey){ return; }
      hoverId = id;
      applyState();
    });
    it.addEventListener('mouseleave', function(){
      if(hoverId !== id){ return; }
      hoverId = null;
      applyState();
    });
    it.addEventListener('click', function(ev){ ev.stopPropagation(); selectItem(id); });
    it.addEventListener('keydown', function(ev){
      if(ev.key !== 'Enter' && ev.key !== ' '){ return; }
      ev.preventDefault();
      selectItem(id);
    });
  });

  stage.addEventListener('click', function(){
    if(!focusId){ return; }
    selectItem(focusId);
  });

  document.addEventListener('keydown', function(ev){
    if(!scenarioKey){ return; }
    if(ev.key === 'ArrowRight'){ goStep(step + 1); }
    if(ev.key === 'ArrowLeft'){ goStep(step - 1); }
  });

  /* botões gerados a partir da configuração */
  var modesBox = document.getElementById('modes');
  if(modesBox && C.modes){
    C.modes.forEach(function(m){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn';
      b.dataset.mode = m.id;
      b.textContent = m.label;
      b.addEventListener('click', function(){
        if(mode === m.id){ return; }
        mode = m.id;
        scenarioKey = null;
        focusId = null;
        setScenarioButtons();
        applyMode();
        draw();
        refresh();
      });
      modesBox.appendChild(b);
    });
  }

  var scnButtons = document.getElementById('scenarios');
  Object.keys(C.scenarios).forEach(function(key){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn';
    b.dataset.scenario = key;
    b.textContent = C.scenarios[key].label;
    b.addEventListener('click', function(){ selectScenario(key); });
    scnButtons.appendChild(b);
  });

  applyMode();
  new ResizeObserver(function(){ draw(); }).observe(stage);

  /* link direto: página#cenario/passo */
  var m = location.hash.match(/^#([\w-]+)\/(\d+)$/);
  if(m && C.scenarios[m[1]]){
    selectScenario(m[1], Math.min(Number(m[2]), C.scenarios[m[1]].steps.length) - 1);
    return;
  }
  refresh();
})();
