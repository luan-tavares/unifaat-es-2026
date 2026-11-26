/* Animações da Aula 13 (Arquitetura de Software), no mesmo padrão dos slides vivos do ES:
   começam sozinhas ao abrir o slide, rodam em loop, o aluno pausa (botão ou P) e anda etapa por
   etapa (botões ou , e .).

   Cada <div data-anim data-n="N"> é um "player" de N etapas. A cada etapa o motor só liga e desliga
   classes; quem anima é o CSS (transições):
     data-step="k"            no próprio player (o CSS pode usar [data-step="k"] .x { ... })
     [data-from="a"] [data-to="b"]   recebe .on enquanto a <= etapa <= b (sem data-to: até o fim)
     [data-at="k j"]          recebe .hot nas etapas listadas (legendas e destaques)
     [data-bad="k j"]         recebe .bad nas etapas listadas (alerta)
   Atributos do player: data-dur (ms por etapa), data-hold (ms da última etapa), data-print (etapa
   mostrada no PDF; padrão = a última), data-labels ("a|b|c": dicas dos pontos de etapa).
   [data-frete data-script="180@200,200@200"]: a calculadora de frete é dirigida pelas etapas.

   Roda ANTES do slide.js (as miniaturas clonam o slide já no primeiro quadro) e não usa id (os
   clones da sidebar são inertes e ficam fora do #deck). Sem else: early return. */
(function(){
  var deck = document.getElementById('deck');
  if(!deck){ return; }

  var TICK = 150;
  var players = [];

  function todos(raiz, sel){ return Array.prototype.slice.call(raiz.querySelectorAll(sel)); }
  function num(v, padrao){ var n = parseInt(v, 10); return isNaN(n) ? padrao : n; }
  function lista(v){ return String(v || '').split(/[\s,]+/).filter(Boolean).map(Number); }

  /* ------------------------------------------------------------ frete dirigido pelas etapas */
  function real(n){ return 'R$ ' + n; }

  function frete(raiz, sub, limite, msgFixa){
    var slide = raiz.closest('.slide');
    var valor = 25;
    if(sub >= limite){ valor = 0; }
    var msg = 'faltam ' + real(limite - sub) + ' para o frete grátis';
    if(sub >= limite){ msg = 'regra do cliente: a partir de ' + real(limite) + ' o frete é grátis'; }
    if(msgFixa){ msg = msgFixa; }
    var slider = todos(raiz, 'input[type="range"]')[0];
    slider.value = sub;
    raiz.setAttribute('data-limite', String(limite));
    todos(slide, '[data-out="sub"]').forEach(function(e){ e.textContent = real(sub); });
    todos(slide, '[data-out="frete"]').forEach(function(e){ e.textContent = real(valor); });
    todos(slide, '[data-out="total"]').forEach(function(e){ e.textContent = real(sub + valor); });
    todos(raiz, '[data-out="msg"]').forEach(function(e){ e.textContent = msg; });
    todos(raiz, '.res .frete').forEach(function(e){ e.classList.toggle('free', valor === 0); });
    var lim = todos(slide, '[data-out="lim"]')[0];
    if(lim && lim.textContent !== String(limite)){
      lim.textContent = String(limite);
      lim.classList.remove('flash');
      void lim.offsetWidth;
      lim.classList.add('flash');
    }
  }

  function roteiro(p, passo){
    var raiz = todos(p.root, '[data-frete]')[0];
    if(!raiz){ return; }
    var item = String(raiz.getAttribute('data-script') || '').split(',')[passo];
    if(!item){ return; }
    var partes = item.split('|');
    var nums = partes[0].split('@');
    frete(raiz, num(nums[0], 0), num(nums[1], 200), partes[1] || '');
  }

  /* ------------------------------------------------------------ etapas */
  function mostra(p, passo){
    p.i = passo;
    p.t = 0;
    p.root.setAttribute('data-step', String(passo));
    todos(p.root, '[data-from]').forEach(function(e){
      var de = num(e.getAttribute('data-from'), 0);
      var ate = num(e.getAttribute('data-to'), 9999);
      e.classList.toggle('on', passo >= de && passo <= ate);
    });
    todos(p.root, '[data-at]').forEach(function(e){
      e.classList.toggle('hot', lista(e.getAttribute('data-at')).indexOf(passo) !== -1);
    });
    todos(p.root, '[data-bad]').forEach(function(e){
      e.classList.toggle('bad', lista(e.getAttribute('data-bad')).indexOf(passo) !== -1);
    });
    todos(p.ctl, '.w-dot').forEach(function(d, k){
      if(k === passo){ d.setAttribute('aria-current', 'true'); return; }
      d.removeAttribute('aria-current');
    });
    roteiro(p, passo);
  }

  function ir(p, passo){
    var n = p.n;
    mostra(p, ((passo % n) + n) % n);
  }

  function pausa(p, sim){
    p.pausado = sim;
    var b = p.ctl.querySelector('[data-act="play"]');
    b.textContent = sim ? '▶' : '⏸';
    b.setAttribute('aria-label', sim ? 'continuar' : 'pausar');
  }

  /* ------------------------------------------------------------ montagem */
  function monta(root){
    var n = num(root.getAttribute('data-n'), 2);
    var rotulos = String(root.getAttribute('data-labels') || '').split('|');
    var ctl = document.createElement('div');
    ctl.className = 'w-ctl';
    var html = '<button type="button" class="w-btn" data-act="play" aria-label="pausar">⏸</button>' +
      '<button type="button" class="w-btn" data-act="prev" aria-label="etapa anterior">‹</button>';
    for(var k = 0; k < n; k++){
      html += '<button type="button" class="w-dot" data-go="' + k + '" aria-label="etapa ' + (k + 1) + '" title="' + (rotulos[k] || 'etapa ' + (k + 1)) + '"></button>';
    }
    html += '<button type="button" class="w-btn" data-act="next" aria-label="próxima etapa">›</button>' +
      '<span class="w-ghint">P pausa · , e . andam as etapas</span>';
    ctl.innerHTML = html;
    root.appendChild(ctl);

    var dur = num(root.getAttribute('data-dur'), 3000);
    var p = {
      root: root, slide: root.closest('.slide'), ctl: ctl, n: n, i: 0, t: 0, on: false, pausado: false,
      dur: dur, hold: num(root.getAttribute('data-hold'), Math.round(dur * 1.6)),
      impressao: num(root.getAttribute('data-print'), n - 1)
    };
    players.push(p);
    mostra(p, 0);
    return p;
  }

  todos(deck, '[data-anim]').forEach(monta);

  /* ------------------------------------------------------------ controles */
  function doPlayer(el){
    var root = el.closest('[data-anim]');
    for(var k = 0; k < players.length; k++){
      if(players[k].root === root){ return players[k]; }
    }
    return null;
  }

  deck.addEventListener('click', function(e){
    var btn = e.target.closest ? e.target.closest('button') : null;
    if(!btn){ return; }
    var p = doPlayer(btn);
    if(!p){ return; }
    var act = btn.getAttribute('data-act');
    if(act === 'play'){ pausa(p, !p.pausado); btn.blur(); return; }
    pausa(p, true);
    if(act === 'prev'){ ir(p, p.i - 1); }
    if(act === 'next'){ ir(p, p.i + 1); }
    if(btn.hasAttribute('data-go')){ ir(p, num(btn.getAttribute('data-go'), 0)); }
    btn.blur();
  });

  // quem mexe no controle deslizante assume o comando: pausa a animação daquele quadro
  deck.addEventListener('input', function(e){
    var raiz = e.target.closest && e.target.closest('[data-frete]');
    if(!raiz){ return; }
    var p = doPlayer(raiz);
    if(p){ pausa(p, true); }
    frete(raiz, num(e.target.value, 0), num(raiz.getAttribute('data-limite'), 200), '');
  });

  // setas/espaço dentro do controle deslizante não podem trocar de slide
  deck.addEventListener('keydown', function(e){
    if(e.target && e.target.matches && e.target.matches('input[type="range"]')){ e.stopPropagation(); }
  });

  // teclado: P pausa, vírgula e ponto andam as etapas do slide aberto
  window.addEventListener('keydown', function(e){
    if(e.ctrlKey || e.metaKey || e.altKey){ return; }
    var k = String(e.key).toLowerCase();
    if(['p', ',', '.'].indexOf(k) === -1){ return; }
    players.forEach(function(p){
      if(p.slide.hidden){ return; }
      if(k === 'p'){ pausa(p, !p.pausado); return; }
      pausa(p, true);
      ir(p, p.i + (k === '.' ? 1 : -1));
    });
  });

  /* ------------------------------------------------------------ relógio */
  setInterval(function(){
    players.forEach(function(p){
      var visivel = !p.slide.hidden;
      if(!visivel){ p.on = false; return; }
      if(!p.on){ p.on = true; pausa(p, false); mostra(p, 0); return; }
      if(p.pausado){ return; }
      p.t += TICK;
      var limite = p.i === p.n - 1 ? p.hold : p.dur;
      if(p.t >= limite){ ir(p, p.i + 1); }
    });
  }, TICK);

  /* ------------------------------------------------------------ PDF: mostra a etapa final */
  var guardado = [];
  window.addEventListener('beforeprint', function(){
    guardado = players.map(function(p){ return p.i; });
    players.forEach(function(p){ mostra(p, p.impressao); });
  });
  window.addEventListener('afterprint', function(){
    players.forEach(function(p, k){ mostra(p, guardado[k] || 0); });
  });
})();
