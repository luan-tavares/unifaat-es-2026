/* Slides vivos (ES, Aula 10): estruturas de dados que se mexem sozinhas, em loop.
   Cada <div class="viva" data-viva="chave"> ganha palco, legenda e painel "leitura x escrita".
   Um quadro (frame) é só a lista dos itens da cena ({id, x, y, ...}); o motor mantém os elementos
   na tela e troca as posições, então a transição CSS faz a seta andar, a bolinha entrar e os
   itens deslizarem. Item que some sai voando (`to`); item novo entra de fora (`from`).
   Rodar ANTES do slide.js: as miniaturas clonam o slide já com o primeiro quadro desenhado.
   Sem else: early return. */
(function(){
  var deck = document.getElementById('deck');
  if(!deck){ return; }

  var CW = 64, CH = 60, ST = 72;

  /* ------------------------------------------------------------------ itens */
  function pos(it, p){
    if(p.dx === undefined) return { x: p.x, y: p.y };
    return { x: it.x + p.dx, y: it.y + p.dy };
  }
  function item(id, t, x, y, w, h, cls, o){
    var r = { id: id, t: t, x: x, y: y, w: w, h: h, cls: cls || '' };
    if(o){ for(var k in o){ r[k] = o[k]; } }
    if(r.from){ r.from = pos(r, r.from); }
    if(r.to){ r.to = pos(r, r.to); }
    return r;
  }
  function lin(id, x1, y1, x2, y2, cls, o){
    var r = { id: id, line: [x1, y1, x2, y2], cls: cls || '' };
    if(o){ for(var k in o){ r[k] = o[k]; } }
    return r;
  }
  function rowX(i, n){ return (720 - (n * ST - 8)) / 2 + i * ST; }
  function seta(id, t, x, y){ return item(id, '<b>▼</b><small>' + t + '</small>', x, y, CW, 50, 'seta'); }
  function marca(m, id){ return (m && m[id]) || ''; }

  // fileira de células: arr = [{id,t,from?,to?} | null]
  function fileira(arr, o){
    var out = [], n = o.n, y = o.y, p = o.p || '';
    for(var i = 0; i < n; i++){
      out.push(item('sl' + p + i, '', rowX(i, n), y, CW, CH, 'ghost'));
      if(!o.noidx){ out.push(item('ix' + p + i, i, rowX(i, n), y + CH + 2, CW, 18, 'lbl')); }
    }
    arr.forEach(function(e, i){
      if(!e){ return; }
      out.push(item(e.id, e.t, rowX(i, n), y, CW, CH, (e.cls || '') + ' ' + marca(o.marks, e.id), { from: e.from, to: e.to }));
    });
    if(o.seta){ out.push(seta(o.seta.id || 'seta' + p, o.seta.t, rowX(o.seta.i, n), y - 54)); }
    return out;
  }
  function cels(ids, vals){ return ids.map(function(id, i){ return { id: id, t: vals[i] }; }); }

  function fr(op, tipo, code, msg, n, items, hold){
    return { op: op, tipo: tipo, code: code, msg: msg, n: n, items: items, hold: hold || 3 };
  }

  /* ------------------------------------------------------------------ cenas */
  function lista(){
    var F = [], N = 7, y = 130;
    var ids = ['e1', 'e2', 'e3', 'e4', 'e5'];
    var B = cels(ids, [7, 3, 9, 5, 8]);
    function L(arr, marks, s){ return fileira(arr, { n: N, y: y, marks: marks, seta: s }); }

    F.push(fr('lp', 'ler', 'notas[3]', 'sabe onde a lista começa e quanto cada item ocupa', 0, L(B, {}, { i: 0, t: 'início' })));
    F.push(fr('lp', 'ler', 'notas[3]', 'pula direto para a posição 3: 1 passo, sem olhar os outros', 1, L(B, { e4: 'm-ler' }, { i: 3, t: '+3' })));

    F.push(fr('af', 'esc', 'notas.append(6)', 'quer entrar no fim da lista', 0, L(B, {})));
    F.push(fr('af', 'esc', 'notas.append(6)', 'cabe no próximo espaço livre: ninguém precisa se mexer (1 passo)', 1,
      L(B.concat([{ id: 'e6', t: 6, from: { dx: 0, dy: -150 } }]), { e6: 'm-esc' })));

    for(var i = 0; i < 3; i++){
      var m = {};
      for(var j = 0; j < i; j++){ m[ids[j]] = 'm-visto'; }
      m[ids[i]] = i === 2 ? 'm-ler' : 'm-visto';
      F.push(fr('lv', 'ler', 'notas.index(9)', i === 2 ? 'achou: 3 passos para uma busca por valor' : 'olha um por um: é o 9? ainda não...', i + 1,
        L(B, m, { i: i, t: i === 2 ? 'achou' : '9?' }), 3));
    }

    var novo = item('ne', 1, rowX(0, N), y - 100, CW, CH, 'm-esc');
    F.push(fr('ins', 'esc', 'notas.insert(0, 1)', 'o 1 quer entrar na posição 0, mas ela está ocupada', 0, L(B, {}).concat([novo])));
    for(var s = 1; s <= 5; s++){
      var arr = B.map(function(e, k){ return k >= 5 - s ? e : e; });
      var pos2 = [null, null, null, null, null, null];
      B.forEach(function(e, k){ pos2[k >= 5 - s ? k + 1 : k] = e; });
      var mv = {};
      mv[ids[5 - s]] = 'm-mov';
      F.push(fr('ins', 'esc', 'notas.insert(0, 1)', 'empurra o ' + B[5 - s].t + ' uma casa para a direita', s,
        L(pos2, mv).concat([novo]), 2));
    }
    var fim = [{ id: 'ne', t: 1 }].concat(B);
    F.push(fr('ins', 'esc', 'notas.insert(0, 1)', 'só agora o 1 cabe: 6 passos para escrever no início', 6, L(fim, { ne: 'm-esc' }), 4));
    return F;
  }

  function tupla(){
    var F = [], y = 100, ids = ['t1', 't2', 't3'];
    var T = cels(ids, [10, 20, 30]);
    function L(marks, extra, s){
      return fileira(T, { n: 3, y: y, marks: marks, seta: s }).map(function(x){
        if(ids.indexOf(x.id) < 0){ return x; }
        x.cls = 'frio ' + x.cls;
        return x;
      }).concat(extra || []);
    }
    F.push(fr('lp', 'ler', 't[1]', 'a tupla é como a lista: ler pela posição é direto', 0, L({}, [], { i: 0, t: 'início' })));
    F.push(fr('lp', 'ler', 't[1]', 'pula direto para a posição 1: 1 passo', 1, L({ t2: 'm-ler' }, [], { i: 1, t: '+1' })));

    var b = function(dy, cls){ return item('w', 99, rowX(1, 3), y + dy, CW, CH, cls); };
    F.push(fr('bl', 'esc', 't[1] = 99', 'o 99 tenta entrar na posição 1...', 0, L({}, [b(-110, 'm-esc')]), 3));
    F.push(fr('bl', 'esc', 't[1] = 99', 'TypeError: a tupla é imutável, a porta está trancada', '✕', L({ t2: 'm-ruim' }, [b(-4, 'm-ruim')]), 3));
    F.push(fr('bl', 'esc', 't[1] = 99', 'recusado: escrever numa tupla simplesmente não existe', '✕',
      L({}, [item('w', 99, rowX(1, 3), y - 110, CW, CH, 'm-ruim', { to: { dx: 0, dy: -110 } })]), 2));
    F.push(fr('bl', 'esc', 't[1] = 99', 'recusado: escrever numa tupla simplesmente não existe', '✕', L({}, []), 2));

    var y2 = 250, cp = [];
    var lbls = [item('la', 'antiga', 60, y + 18, 120, 24, 'lbl'), item('ln', 'nova', 60, y2 + 18, 120, 24, 'lbl')];
    var vals = [10, 99, 30];
    for(var k = 0; k < 3; k++){
      cp.push(item('c' + (k + 1), vals[k], rowX(k, 3), y2, CW, CH, k === 1 ? 'm-esc' : 'm-mov', { from: { dx: 0, dy: -150 } }));
      F.push(fr('cp', 'esc', '(t[0], 99, t[2])', k === 2 ? 'a tupla antiga continua intacta: alterar custa copiar tudo' : 'copia um por um para uma tupla nova', k + 1,
        L({}, lbls.concat(cp.slice())), k === 2 ? 4 : 3));
    }

    var chave = [
      item('k1', 10, 90, 110, CW, CH, 'frio m-ler'), item('k2', 20, 162, 110, CW, CH, 'frio m-ler'),
      lin('kl', 240, 140, 330, 140, 'pt m-ler'),
      item('kv', '"casa"', 336, 110, 130, CH, 'm-ler'),
      item('kt', 'chave de um dicionário', 60, 70, 300, 24, 'lbl forte')
    ];
    F.push(fr('ch', 'info', '{(10, 20): "casa"}', 'imutável: o hash nunca muda, então a tupla pode ser chave', '—', chave, 4));
    return F;
  }

  function dicionario(){
    var F = [], N = 6, y = 190, W = 100, S = 112, x0 = 30;
    var sx = function(i){ return x0 + i * S; };
    function cont(base, marks, extra){
      var out = [];
      for(var i = 0; i < N; i++){
        out.push(item('sl' + i, '<small>slot ' + i + '</small>', sx(i), y, W, 78, 'ghost slot ' + marca(marks, 'sl' + i)));
      }
      base.forEach(function(e){
        var o = e.novo ? { from: { x: 260, y: 36 } } : {};
        out.push(item('k_' + e[0], '<b>' + e[0] + '</b><span>' + e[1] + '</span>', sx(e[2]), y, W, 78, 'slot ' + marca(marks, 'k_' + e[0]), o));
      });
      return out.concat(extra || []);
    }
    var hash = function(t){ return item('hash', t, 220, 28, 280, 44, 'hash'); };
    var setaS = function(i, t){ return item('seta', '<b>▼</b><small>' + t + '</small>', sx(i) + 18, y - 66, 64, 50, 'seta'); };
    var A = [['nome', 'Ana', 2], ['ra', 1234, 4]];

    F.push(fr('lc', 'ler', 'aluno["ra"]', 'a chave passa pela função hash, que diz em qual slot ela mora', 0, cont(A, {}, [hash('hash("ra") = 4'), setaS(4, 'slot 4')]), 3));
    F.push(fr('lc', 'ler', 'aluno["ra"]', 'vai direto ao slot: sem procurar nos outros (1 passo)', 1, cont(A, { k_ra: 'm-ler' }, [hash('hash("ra") = 4'), setaS(4, 'achou')]), 3));

    F.push(fr('ec', 'esc', 'aluno["nota"] = 8.5', 'a chave nova passa pelo hash: ele manda para o slot 0', 0, cont(A, {}, [hash('hash("nota") = 0'), setaS(0, 'slot 0')]), 3));
    F.push(fr('ec', 'esc', 'aluno["nota"] = 8.5', 'o valor desce direto para o slot: 1 passo, sem deslocar ninguém', 1,
      cont(A.concat([{ 0: 'nota', 1: 8.5, 2: 0, novo: true, length: 3 }].map(function(e){ var r = ['nota', 8.5, 0]; r.novo = true; return r; })), { k_nota: 'm-esc' }, [hash('hash("nota") = 0')]), 4));

    var C = [['nota', 8.5, 0], ['nome', 'Ana', 2], ['ra', 1234, 4]];
    for(var i = 0; i < 5; i++){
      var m = {};
      for(var j = 0; j < i; j++){ m['sl' + j] = 'm-visto'; m['k_' + (C.filter(function(e){ return e[2] === j; })[0] || [''])[0]] = 'm-visto'; }
      var achou = i === 4;
      m['sl' + i] = achou ? 'm-ler' : 'm-visto';
      if(achou){ m.k_ra = 'm-ler'; }
      F.push(fr('lv', 'ler', '1234 in aluno.values()', achou ? 'achou, mas passou por 5 slots: buscar pelo valor não usa o hash' : 'o hash só ajuda com a chave: pelo valor, olha slot por slot', i + 1,
        cont(C, m, [setaS(i, achou ? 'achou' : '1234?')]), 2));
    }

    var vazios = { sl1: 'm-vazio', sl3: 'm-vazio', sl5: 'm-vazio' };
    F.push(fr('mem', 'preco', 'slots vazios', 'o preço: slots vazios reservados para o hash espalhar (e crescer exige reorganizar tudo)', '—', cont(C, vazios), 5));
    return F;
  }

  function pilha(){
    var F = [], N = 5, X = 90, W = 200, H = 52;
    var py = function(i){ return 256 - i * 58; };
    function P(arr, marks, topo, lbl){
      var out = [];
      for(var i = 0; i < N; i++){ out.push(item('sp' + i, '', X, py(i), W, H, 'ghost')); }
      arr.forEach(function(e, i){
        out.push(item(e.id, e.t, X, py(i), W, H, marca(marks, e.id), { from: e.from, to: e.to }));
      });
      if(topo !== undefined){ out.push(item('seta', '◀ ' + (lbl || 'topo'), X + W + 8, py(topo) + 12, 120, 30, 'setaH')); }
      out.push(item('lb', 'base', X, py(0) + H + 4, W, 20, 'lbl'));
      return out;
    }
    var A = { id: 'pa', t: 'A' }, B = { id: 'pb', t: 'B' }, C = { id: 'pc', t: 'C' }, D = { id: 'pd', t: 'D' };
    var saiC = { id: 'pc', t: 'C', to: { dx: 330, dy: 0 } };

    F.push(fr('em', 'esc', 'pilha.empilhar("D")', 'o D quer entrar: só pelo topo', 0, P([A, B, C], {}, 2)));
    F.push(fr('em', 'esc', 'pilha.empilhar("D")', 'cai direto no topo: 1 passo', 1, P([A, B, C, { id: 'pd', t: 'D', from: { dx: 0, dy: -170 } }], { pd: 'm-esc' }, 3), 4));

    F.push(fr('lt', 'ler', 'pilha.topo()', 'só enxerga o de cima: 1 passo', 1, P([A, B, C], { pc: 'm-ler' }, 2), 4));

    F.push(fr('dm', 'esc', 'pilha.desempilhar()', 'lê o topo...', 0, P([A, B, { id: 'pc', t: 'C', to: { dx: 330, dy: 0 } }], { pc: 'm-ler' }, 2)));
    F.push(fr('dm', 'esc', 'pilha.desempilhar()', '...e o retira: o último a entrar foi o primeiro a sair (1 passo)', 1, P([A, B], {}, 1), 4));

    var ret = function(id, t){ return { id: id, t: t, to: { dx: 330, dy: 0 } }; };
    F.push(fr('lf', 'ler', 'pilha: ler o A', 'o A está no fundo, e só se chega pelo topo', 0, P([A, B, C, D], {}, 3)));
    F.push(fr('lf', 'ler', 'pilha: ler o A', 'precisa tirar o D...', 1, P([A, B, C], {}, 2), 2));
    F.push(fr('lf', 'ler', 'pilha: ler o A', '...e o C...', 2, P([A, B], {}, 1), 2));
    F.push(fr('lf', 'ler', 'pilha: ler o A', '...e o B...', 3, P([A], {}, 0), 2));
    F.push(fr('lf', 'ler', 'pilha: ler o A', 'finalmente o A: 4 passos só para ler o fundo', 4, P([A], { pa: 'm-ler' }, 0, 'topo = A'), 4));

    var c3 = { id: 'c3', t: 'fatorial(3)' }, c2 = { id: 'c2', t: 'fatorial(2)' };
    // o def de exemplo ao lado da pilha: a linha acesa é a que está executando
    var linhas = ['def fatorial(n):', '    if n == 1:', '        return 1', '    return n * fatorial(n - 1)', ' ', 'fatorial(3)'];
    function codigo(ativa, espera){
      var html = linhas.map(function(l, i){ return '<span class="cl' + (i === ativa ? ' on' : '') + '">' + l + '</span>'; }).join('');
      return [item('cod', html, 402, 14, 314, 158, 'codigo'), item('esp', espera, 402, 180, 314, 26, 'lbl forte')];
    }
    var cs = function(arr, marks, n, msg, topo, ativa, espera){
      return fr('ch', 'info', 'fatorial(3)', msg, n, P(arr, marks, topo, 'topo').concat(codigo(ativa, espera)), 3);
    };
    F.push(cs([{ id: 'c3', t: 'fatorial(3)', from: { dx: 0, dy: -170 } }], { c3: 'm-esc' }, 1, 'o programa chama fatorial(3): a chamada entra na pilha', 0, 5, ' '));
    F.push(cs([c3, { id: 'c2', t: 'fatorial(2)', from: { dx: 0, dy: -170 } }], { c2: 'm-esc' }, 2, 'fatorial(3) chama fatorial(2) e ESPERA: não passa da linha enquanto não resolver', 1, 3, '◀ fatorial(3) espera fatorial(2)'));
    F.push(cs([c3, c2, { id: 'c1', t: 'fatorial(1)', from: { dx: 0, dy: -170 } }], { c1: 'm-esc' }, 3, 'fatorial(2) também ESPERA fatorial(1): só a do topo está rodando', 2, 3, '◀ fatorial(2) espera fatorial(1)'));
    F.push(cs([c3, c2, { id: 'c1', t: 'fatorial(1)', to: { dx: 330, dy: 0 } }], { c1: 'm-ler' }, 3, 'a última a entrar resolve primeiro: fatorial(1) devolve 1', 2, 2, 'resolveu: devolve 1'));
    F.push(cs([c3, { id: 'c2', t: 'fatorial(2)', to: { dx: 330, dy: 0 } }], { c2: 'm-ler' }, 2, 'só agora a fatorial(2) continua: devolve 2', 1, 3, 'a espera acabou: 2 x 1 = 2'));
    F.push(cs([{ id: 'c3', t: 'fatorial(3)', to: { dx: 330, dy: 0 } }], { c3: 'm-ler' }, 1, 'por último, fatorial(3) continua: devolve 6', 0, 3, 'a espera acabou: 3 x 2 = 6'));
    for(var i = 0; i < F.length; i++){ if(F[i].op === 'ch'){ F[i].hold = 3; } }
    return F;
  }

  function fila(){
    var F = [], N = 6, y = 130;
    var ids = ['fa', 'fb', 'fc', 'fd', 'fe'];
    var Q = cels(ids, ['A', 'B', 'C', 'D', 'E']);
    function L(arr, marks, head, extra){
      var out = fileira(arr, { n: N, y: y, marks: marks, seta: { id: 'seta', i: head, t: 'frente' } });
      out.push(item('lf', 'sai pela frente', rowX(0, N) - 6, y + CH + 26, 120, 22, 'lbl forte'));
      out.push(item('lfim', 'entra pelo fim', rowX(N - 1, N) - 56, y + CH + 26, 120, 22, 'lbl forte'));
      return out.concat(extra || []);
    }
    var sair = function(){ var q = Q.slice(); q[0] = { id: 'fa', t: 'A', to: { dx: -260, dy: 0 } }; return q; };

    F.push(fr('en', 'esc', 'fila.enfileirar("F")', 'o F chega e vai para o fim da fila', 0, L(Q, {}, 0)));
    F.push(fr('en', 'esc', 'fila.enfileirar("F")', 'entra pelo fim, sem mexer em ninguém: 1 passo', 1,
      L(Q.concat([{ id: 'ff', t: 'F', from: { dx: 300, dy: 0 } }]), { ff: 'm-esc' }, 0), 4));

    F.push(fr('de', 'ler', 'fila.desenfileirar()', 'atende quem está na frente: o A', 0, L(sair(), { fa: 'm-ler' }, 0)));
    F.push(fr('de', 'ler', 'fila.desenfileirar()', 'o A sai e só o marcador da frente anda: 1 passo (deque)', 1, L([null].concat(Q.slice(1)), {}, 1), 4));

    F.push(fr('p0', 'esc', 'lista.pop(0)', 'com uma lista comum, o A sai...', 0, L(sair(), { fa: 'm-ler' }, 0), 2));
    F.push(fr('p0', 'esc', 'lista.pop(0)', '...e fica um buraco na frente', 1, L([null].concat(Q.slice(1)), {}, 0), 2));
    var cur = [null].concat(Q.slice(1));
    for(var j = 1; j <= 4; j++){
      cur = cur.slice();
      cur[j - 1] = cur[j];
      cur[j] = null;
      var mv = {};
      mv[cur[j - 1].id] = 'm-mov';
      F.push(fr('p0', 'esc', 'lista.pop(0)', 'a lista fecha o buraco: puxa o ' + cur[j - 1].t + ' uma casa', j + 1, L(cur, mv, 0), 2));
    }

    for(var k = 0; k < 3; k++){
      var m = {};
      for(var h = 0; h < k; h++){ m[ids[h]] = 'm-visto'; }
      m[ids[k]] = k === 2 ? 'm-ler' : 'm-visto';
      F.push(fr('lm', 'ler', 'fila[2]', k === 2 ? 'achou o C: 3 passos para ler o meio' : 'não há posição direta: caminha desde a frente', k + 1,
        fileira(Q, { n: N, y: y, marks: m, seta: { id: 'seta', i: k, t: k === 2 ? 'achou' : 'passa' } }).concat([
          item('lf', 'sai pela frente', rowX(0, N) - 6, y + CH + 26, 120, 22, 'lbl forte'),
          item('lfim', 'entra pelo fim', rowX(N - 1, N) - 56, y + CH + 26, 120, 22, 'lbl forte')]), 3));
    }
    return F;
  }

  /* árvore ------------------------------------------------------------- */
  var NO = { C: [360, 70, 'C:'], U: [200, 155, 'Users'], W: [540, 155, 'Windows'], D: [100, 240, 'Desktop'], L: [290, 240, 'Downloads'], S: [440, 240, 'Sistema'] };
  function no(id, cls, p){
    var d = p || NO[id];
    return item('n' + id, d[2], d[0] - 52, d[1] - 20, 104, 40, 'no ' + (cls || ''));
  }
  function ramo(filho, pai, cls, fp, pp){
    var a = pp || NO[pai], b = fp || NO[filho];
    return lin('r' + filho, a[0], a[1] + 20, b[0], b[1] - 20, cls || '');
  }
  function arv(m, e, s, extra, over){
    var o = over || {}, out = [];
    ['U', 'W', 'D', 'L', 'S'].forEach(function(k){
      var pai = { U: 'C', W: 'C', D: 'U', L: o.paiL || 'U', S: 'W' }[k];
      out.push(ramo(k, pai, e && e['r' + k], o[k] || NO[k], o['p' + pai]));
    });
    ['C', 'U', 'W', 'D', 'L', 'S'].forEach(function(k){
      var p = o[k] || NO[k];
      out.push(no(k, m && m['n' + k], p));
    });
    if(s){ out.push(item('seta', '<b>▼</b><small>' + s.t + '</small>', (NO[s.k][0]) - 32, NO[s.k][1] - 70, 64, 50, 'seta')); }
    return out.concat(extra || []);
  }
  function arvore(){
    var F = [], cam = ['C', 'U', 'D'];
    var P = function(k, i){ var m = {}; for(var j = 0; j < i; j++){ m['n' + cam[j]] = 'm-visto'; } m['n' + k] = i === 2 ? 'm-ler' : 'm-visto'; return m; };
    cam.forEach(function(k, i){
      var e = {};
      F.push(fr('lc', 'ler', 'C:/Users/Desktop', i === 2 ? 'chegou: 3 passos, um por nível (a profundidade)' : 'desce um nível por vez, seguindo o caminho', i + 1,
        arv(P(k, i), e, { k: k, t: ['raiz', 'Users', 'achou'][i] }), 3));
    });

    F.push(fr('ef', 'esc', 'desktop.adicionar("Fotos")', 'já temos o Desktop na mão: o novo filho vai direto para ele', 0, arv({}, {}, null), 3));
    F.push(fr('ef', 'esc', 'desktop.adicionar("Fotos")', 'um filho novo, uma ligação: 1 passo', 1,
      arv({ nF: 'm-esc' }, { rF: 'm-esc' }, null, [
        item('nF', 'Fotos', 100 - 52, 320 - 20, 104, 40, 'no m-esc', { from: { dx: 0, dy: -60 } }),
        lin('rF', 100, 260, 100, 300, 'm-esc')
      ]).filter(function(x){ return x.id !== 'nF' || x.t === 'Fotos'; }), 4));

    F.push(fr('mv', 'esc', 'downloads.mover_para(windows)', 'mover uma pasta: o Downloads aponta para o pai antigo', 0, arv({ nL: 'm-ruim' }, { rL: 'm-ruim' }, null), 3));
    var nova = [640, 240, 'Downloads'];
    F.push(fr('mv', 'esc', 'downloads.mover_para(windows)', 'troca um único ponteiro: 1 passo, não importa o que há dentro', 1,
      arv({ nL: 'm-esc' }, { rL: 'm-esc' }, null, [], { L: nova, paiL: 'W' }), 4));

    var dfs = ['C', 'U', 'D', 'L'];
    dfs.forEach(function(k, i){
      var m = {};
      for(var j = 0; j < i; j++){ m['n' + dfs[j]] = 'm-visto'; }
      m['n' + k] = i === 3 ? 'm-ler' : 'm-visto';
      F.push(fr('lm', 'ler', 'achar "Downloads"', i === 3 ? 'achou, depois de passar por 4 pastas: sem o caminho, varre tudo' : 'sem saber o caminho, precisa visitar pasta por pasta', i + 1,
        arv(m, {}, { k: k, t: i === 3 ? 'achou' : 'é?' }), 2));
    });
    return F;
  }

  /* grafo -------------------------------------------------------------- */
  var GN = { Ana: [90, 90], Bia: [90, 250], Caio: [270, 170], Duda: [420, 170] };
  function grafo(){
    var F = [];
    var adj0 = { Ana: ['Bia', 'Caio'], Bia: ['Ana', 'Caio'], Caio: ['Ana', 'Bia', 'Duda'], Duda: ['Caio'] };
    function G(adj, edges, nm, am, extra){
      var out = [];
      edges.forEach(function(e){ out.push(lin('e' + e[0] + e[1], GN[e[0]][0], GN[e[0]][1], GN[e[1]][0], GN[e[1]][1], marca(am && am.e, 'e' + e[0] + e[1]))); });
      Object.keys(GN).forEach(function(k){ out.push(item('g' + k, k, GN[k][0] - 32, GN[k][1] - 32, 64, 64, 'no circ ' + marca(nm, k))); });
      Object.keys(GN).forEach(function(k, i){
        var itens = (adj[k] || []).map(function(v, j){ return '<i class="' + marca(am && am[k], j) + '">' + v + '</i>'; }).join('');
        out.push(item('adj' + k, '<span><span class="vk">' + k + ': [</span>' + itens + '<span class="vk">]</span></span>', 500, 82 + i * 56, 220, 30, 'adj'));
      });
      out.push(item('adjt', 'dicionário de vizinhos', 500, 46, 220, 22, 'lbl forte'));
      return out.concat(extra || []);
    }
    var E0 = [['Ana', 'Bia'], ['Ana', 'Caio'], ['Bia', 'Caio'], ['Caio', 'Duda']];

    var adjA = { Ana: ['Bia', 'Caio'], Bia: ['Ana', 'Caio'], Caio: ['Ana', 'Bia', 'Duda'], Duda: ['Caio'] };
    var adjB = { Ana: ['Bia', 'Caio', 'Duda'], Bia: adjA.Bia, Caio: adjA.Caio, Duda: ['Caio'] };
    var adjC = { Ana: adjB.Ana, Bia: adjA.Bia, Caio: adjA.Caio, Duda: ['Caio', 'Ana'] };
    F.push(fr('li', 'esc', 'g.ligar("Ana", "Duda")', 'uma ligação nova entre Ana e Duda...', 0, G(adjA, E0, {}, null), 3));
    F.push(fr('li', 'esc', 'g.ligar("Ana", "Duda")', 'primeiro entra na lista da Ana (1 passo)...', 1, G(adjB, E0, { Ana: 'm-esc' }, { Ana: { 2: 'm-esc' } }), 3));
    F.push(fr('li', 'esc', 'g.ligar("Ana", "Duda")', '...depois na da Duda (2 passos): a ligação vale nos dois sentidos', 2,
      G(adjC, E0.concat([['Ana', 'Duda']]), { Ana: 'm-esc', Duda: 'm-esc' }, { Ana: { 2: 'm-esc' }, Duda: { 1: 'm-esc' }, e: { eAnaDuda: 'm-esc' } }), 4));

    F.push(fr('lv', 'ler', 'g.vizinhos("Caio")', 'quer saber quem é amigo do Caio', 0, G(adj0, E0, {}, null), 3));
    F.push(fr('lv', 'ler', 'g.vizinhos("Caio")', 'vai direto à entrada do Caio no dicionário: 1 passo', 1,
      G(adj0, E0, { Caio: 'm-ler', Ana: 'm-ler', Bia: 'm-ler', Duda: 'm-ler' }, { Caio: { 0: 'm-ler', 1: 'm-ler', 2: 'm-ler' } }), 4));

    F.push(fr('lg', 'ler', 'g.ligados("Ana", "Duda")', 'Ana e Duda são amigas? olha a lista da Ana', 0, G(adj0, E0, { Ana: 'm-ler' }, null), 3));
    F.push(fr('lg', 'ler', 'g.ligados("Ana", "Duda")', 'Bia? não é a Duda...', 1, G(adj0, E0, { Ana: 'm-ler', Bia: 'm-visto' }, { Ana: { 0: 'm-visto' } }), 2));
    F.push(fr('lg', 'ler', 'g.ligados("Ana", "Duda")', 'Caio? não... acabou a lista: False. A pergunta custou 2 passos (o grau da Ana)', 2,
      G(adj0, E0, { Ana: 'm-ler', Bia: 'm-visto', Caio: 'm-visto' }, { Ana: { 0: 'm-visto', 1: 'm-visto' } }), 4));

    var adjD = { Ana: ['Bia'], Bia: adjA.Bia, Caio: ['Bia', 'Duda'], Duda: ['Caio'] };
    var E1 = E0.filter(function(e){ return !(e[0] === 'Ana' && e[1] === 'Caio'); });
    F.push(fr('rm', 'esc', 'g.remover("Ana", "Caio")', 'achar a ligação na lista da Ana: Bia, Caio... (2 passos)', 2,
      G(adj0, E0, { Ana: 'm-ruim', Caio: 'm-ruim' }, { Ana: { 0: 'm-visto', 1: 'm-ruim' }, e: { eAnaCaio: 'm-ruim' } }), 3));
    F.push(fr('rm', 'esc', 'g.remover("Ana", "Caio")', 'e de novo na lista do Caio (3 passos): remover varre as duas pontas', 3,
      G({ Ana: ['Bia'], Bia: adjA.Bia, Caio: adjA.Caio, Duda: ['Caio'] }, E0, { Ana: 'm-ruim', Caio: 'm-ruim' }, { Caio: { 0: 'm-ruim' }, e: { eAnaCaio: 'm-ruim' } }), 3));
    F.push(fr('rm', 'esc', 'g.remover("Ana", "Caio")', 'ligação removida, e custou varrer as listas', 3, G(adjD, E1, {}, null), 4));

    /* o Git como grafo: commit é nó, "pai" é aresta dirigida */
    var GC = { A: [70, 166], B: [190, 166], C: [330, 90], D: [330, 242], E: [480, 166] };
    function pai(f, p, cls){
      var a = GC[f], b = GC[p], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.sqrt(dx * dx + dy * dy);
      var ux = dx / d, uy = dy / d;
      return lin('p' + f + p, a[0] + ux * 30, a[1] + uy * 30, b[0] - ux * 34, b[1] - uy * 34, 'pt ' + (cls || ''), { from: [a[0] + ux * 30, a[1] + uy * 30, a[0] + ux * 30, a[1] + uy * 30] });
    }
    function cm(k, cls, o){ return item('c' + k, k, GC[k][0] - 30, GC[k][1] - 30, 60, 60, 'no circ ' + (cls || ''), o); }
    function tag(id, t, k, acima){ return item(id, t, GC[k][0] - 40, GC[k][1] + (acima ? -68 : 38), 80, 28, 'hash'); }
    function GT(cs, ar, tm, tf, marks, s, novo){
      var out = [];
      ar.forEach(function(e){ out.push(pai(e[0], e[1], marca(marks, 'p' + e[0] + e[1]))); });
      cs.forEach(function(k){ out.push(cm(k, marca(marks, 'c' + k), novo === k ? { from: { dx: -60, dy: 0 } } : undefined)); });
      if(tm){ out.push(tag('tm', 'main', tm, true)); }
      if(tf){ out.push(tag('tf', 'feature', tf, false)); }
      if(s){ out.push(item('seta', '<b>▲</b><small>' + s.t + '</small>', GC[s.k][0] - 32, GC[s.k][1] + 34, 64, 50, 'seta')); }
      return out;
    }
    var g1 = [['B', 'A']], g2 = g1.concat([['C', 'B']]), g3 = g2.concat([['D', 'B']]), g4 = g3.concat([['E', 'C'], ['E', 'D']]);
    F.push(fr('gc', 'esc', 'git commit', 'cada commit é um nó e aponta para o seu pai: uma aresta', 0, GT(['A', 'B'], g1, 'B', null, {}), 3));
    F.push(fr('gc', 'esc', 'git commit -m "C"', 'um commit novo: 1 nó e 1 aresta para o pai (1 passo)', 1, GT(['A', 'B', 'C'], g2, 'C', null, { cC: 'm-esc', pCB: 'm-esc' }, null, 'C'), 4));
    F.push(fr('gc', 'esc', 'git switch -c feature', 'branch é só um ponteiro para um commit (aqui, o B)', 0, GT(['A', 'B', 'C'], g2, 'C', 'B', {}), 3));
    F.push(fr('gc', 'esc', 'git commit -m "D"', 'a feature avança sozinha: o histórico divergiu (1 passo)', 1, GT(['A', 'B', 'C', 'D'], g3, 'C', 'D', { cD: 'm-esc', pDB: 'm-esc' }, null, 'D'), 4));
    F.push(fr('gc', 'esc', 'git merge feature', 'merge: um commit com DOIS pais. Por isso é um grafo, e não uma lista', 3, GT(['A', 'B', 'C', 'D', 'E'], g4, 'E', 'D', { cE: 'm-esc', pEC: 'm-esc', pED: 'm-esc' }, null, 'E'), 5));
    var ordem = ['E', 'C', 'D', 'B', 'A'];
    ordem.forEach(function(k, i){
      var m = {};
      for(var j = 0; j < i; j++){ m['c' + ordem[j]] = 'm-visto'; }
      m['c' + k] = i === 4 ? 'm-ler' : 'm-visto';
      F.push(fr('gl', 'ler', 'git log', i === 4 ? 'chegou ao primeiro commit: 5 passos, um por commit' : 'ler o histórico é seguir os pais, de commit em commit', i + 1,
        GT(['A', 'B', 'C', 'D', 'E'], g4, 'E', 'D', m, { k: k, t: i === 4 ? 'raiz' : 'log' }), i === 4 ? 4 : 2));
    });
    return F;
  }

  /* memória: primitivo x referência ----------------------------------- */
  function memoria(){
    var F = [];
    function M(prim, refs, heap, marks, lig){
      var out = [];
      out.push(item('ta', 'primitivo: o valor mora na variável', 10, 6, 330, 24, 'lbl-c'));
      out.push(item('tb', 'referência: a variável aponta para o objeto', 370, 6, 350, 24, 'lbl-c'));
      prim.forEach(function(p, i){ out.push(item('v' + p[0], '<small>' + p[0] + '</small>' + p[1], 40 + i * 140, 70, 100, 70, 'var ' + marca(marks, 'v' + p[0]))); });
      refs.forEach(function(r, i){
        var cls = r[1] === '@1' ? 'p1' : 'p2';
        out.push(item('v' + r[0], '<small>' + r[0] + '</small>→', 380, 50 + i * 80, 90, 60, 'var ' + cls + ' ' + marca(marks, 'v' + r[0])));
        out.push(lin('ln' + r[0], 470, 80 + i * 80, 566, r[1] === '@1' ? 120 : 245, 'pt ' + cls));
      });
      heap.forEach(function(h){
        var cls = h[0] === '@1' ? 'p1' : 'p2';
        var y = h[0] === '@1' ? 90 : 215;
        out.push(item('o' + h[0], '<small>' + h[0] + '</small>[' + h[1] + ']', 566, y, 150, 62, 'obj ' + cls + ' ' + marca(marks, 'o' + h[0])));
      });
      return out;
    }
    var fim = function(n){ return n; };
    F.push(fr('m', 'info', 'a = 10', 'a variável guarda o próprio valor', '', M([['a', 10]], [], [], { va: 'm-esc' }), 3));
    F.push(fr('m', 'info', 'b = a', 'copiou o valor: agora são dois, independentes', '', M([['a', 10], ['b', 10]], [], [], { vb: 'm-mov' }), 3));
    F.push(fr('m', 'info', 'b = b + 1', 'o a não mexeu: eram cópias', '', M([['a', 10], ['b', 11]], [], [], { vb: 'm-esc' }), 4));
    F.push(fr('m', 'info', 'x = [1, 2]', 'a lista mora fora; a variável guarda só o endereço (@1)', '', M([['a', 10], ['b', 11]], [['x', '@1']], [['@1', '1, 2']], { vx: 'm-esc', 'o@1': 'm-esc' }), 4));
    F.push(fr('m', 'info', 'y = x', 'copiou o endereço, não a lista: dois nomes, um objeto', '', M([['a', 10], ['b', 11]], [['x', '@1'], ['y', '@1']], [['@1', '1, 2']], { vy: 'm-mov' }), 4));
    F.push(fr('m', 'info', 'y.append(3)', 'mexeu no objeto: o x também enxerga (x is y → True)', '', M([['a', 10], ['b', 11]], [['x', '@1'], ['y', '@1']], [['@1', '1, 2, 3']], { 'o@1': 'm-esc' }), 4));
    F.push(fr('m', 'info', 'z = x.copy()', 'copiar de verdade cria outro objeto, com outro endereço', '', M([['a', 10], ['b', 11]], [['x', '@1'], ['y', '@1'], ['z', '@2']], [['@1', '1, 2, 3'], ['@2', '1, 2, 3']], { vz: 'm-mov', 'o@2': 'm-esc' }), 4));
    return F;
  }

  /* leitura x escrita: o antagonismo ---------------------------------- */
  function antagonismo(){
    var F = [], N = 9, yA = 60, yB = 224;
    var ia = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'], ib = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
    var SA = cels(ia, [41, 7, 18, 66, 2, 75, 30, 93]), SB = cels(ib, [2, 7, 18, 30, 41, 66, 75, 93]);
    function R(a, b, ma, mb, sa, sb, extra){
      var out = fileira(a, { n: N, y: yA, p: 'a', marks: ma, seta: sa }).concat(fileira(b, { n: N, y: yB, p: 'b', marks: mb, seta: sb }));
      out.push(item('ra', 'lista solta: sem ordem', rowX(0, N), yA + 84, 260, 22, 'lbl forte'));
      out.push(item('rb', 'lista ordenada', rowX(0, N), yB + 84, 260, 22, 'lbl forte'));
      return out.concat(extra || []);
    }
    F.push(fr('se', 'esc', 'solta.append(50)', 'solta: escrever é largar no fim', 0, R(SA, SB, {}, {}), 2));
    F.push(fr('se', 'esc', 'solta.append(50)', 'ganha: 1 passo para escrever', 1, R(SA.concat([{ id: 'p9', t: 50, from: { dx: 0, dy: -110 } }]), SB, { p9: 'm-esc' }, {}), 4));

    for(var i = 0; i < 8; i++){
      var m = {};
      for(var j = 0; j < i; j++){ m[ia[j]] = 'm-visto'; }
      m[ia[i]] = i === 7 ? 'm-ler' : 'm-visto';
      F.push(fr('sl', 'ler', '93 in solta', i === 7 ? 'perde: 8 passos para achar o 93 (com 1 milhão de itens, até 1 milhão)' : 'sem ordem, só dá para olhar um por um', i + 1,
        R(SA, SB, m, {}, { i: i, t: i === 7 ? 'achou' : '93?' }, null), i === 7 ? 4 : 2));
    }

    var salto = [3, 5, 6, 7];
    salto.forEach(function(idx, k){
      var m = {};
      for(var j = 0; j < k; j++){ m[ib[salto[j]]] = 'm-visto'; }
      m[ib[idx]] = k === 3 ? 'm-ler' : 'm-visto';
      F.push(fr('ol', 'ler', 'busca binária: 93', k === 3 ? 'ganha: 4 passos (com 1 milhão de itens, só uns 20)' : 'ordenada: olha o meio e descarta metade, em saltos', k + 1,
        R(SA, SB, {}, m, null, { i: idx, t: k === 3 ? 'achou' : '93?' }), k === 3 ? 4 : 3));
    });

    var nv = item('qn', 1, rowX(0, N), yB - 100, CW, CH, 'm-esc');
    F.push(fr('oe', 'esc', 'ordenada.insert(0, 1)', 'ordenada: o 1 precisa entrar na posição certa, a primeira', 0, R(SA, SB.concat([null]), {}, {}, null, null, [nv]), 2));
    for(var s = 1; s <= 8; s++){
      var pos3 = [null, null, null, null, null, null, null, null, null];
      SB.forEach(function(e, k){ pos3[k >= 8 - s ? k + 1 : k] = e; });
      var mv = {};
      mv[ib[8 - s]] = 'm-mov';
      F.push(fr('oe', 'esc', 'ordenada.insert(0, 1)', 'empurra o ' + SB[8 - s].t + ' para abrir espaço', s, R(SA, pos3, {}, mv, null, null, [nv]), 1));
    }
    F.push(fr('oe', 'esc', 'ordenada.insert(0, 1)', 'perde: 9 passos só para escrever (a ordem tem preço)', 9,
      R(SA, [{ id: 'qn', t: 1 }].concat(SB), {}, { qn: 'm-esc' }, null, null), 5));
    return F;
  }

  /* ------------------------------------------------------------------ cadastro */
  var LEG = '<b>rápido</b>: poucos passos, não importa o tamanho dos dados. <b>lento</b>: os passos crescem junto com a quantidade de dados.';
  // o custo aparece em palavras (rápido / lento): a notação O(...) fica fora dos slides
  function op(id, tipo, rot, custo, bom, txt){
    var palavra = /^O\(/.test(custo) ? (bom ? 'rápido' : 'lento') : custo;
    return { id: id, tipo: tipo, rot: rot, custo: palavra, bom: bom, txt: txt };
  }
  var E = {
    lista: { fn: lista, print: ['ins', 6], ops: [
      op('lp', 'ler', 'notas[i]', 'O(1)', 1, 'por posição: vai direto'),
      op('lv', 'ler', 'x in notas', 'O(n)', 0, 'por valor: olha um por um'),
      op('af', 'esc', 'append(x)', 'O(1)', 1, 'no fim: cabe no espaço livre'),
      op('ins', 'esc', 'insert(0, x)', 'O(n)', 0, 'no início ou no meio: empurra todo mundo')] },
    tupla: { fn: tupla, print: ['cp', 3], ops: [
      op('lp', 'ler', 't[i]', 'O(1)', 1, 'por posição: igual à lista'),
      op('bl', 'esc', 't[i] = x', 'proibido', 0, 'escrever não existe: TypeError'),
      op('cp', 'esc', 'nova tupla', 'O(n)', 0, '"alterar" = copiar tudo para outra'),
      op('ch', 'ex', 'chave de dict', 'ganho', 1, 'imutável: o hash nunca muda')] },
    dicionario: { fn: dicionario, print: ['lv', 5], ops: [
      op('lc', 'ler', 'd[chave]', 'O(1)', 1, 'por chave: o hash vai direto ao slot'),
      op('lv', 'ler', 'x in d.values()', 'O(n)', 0, 'por valor: olha slot por slot'),
      op('ec', 'esc', 'd[chave] = x', 'O(1)', 1, 'o hash diz onde guardar'),
      op('mem', 'preco', 'memória', 'preço', 0, 'slots vazios reservados')] },
    pilha: { fn: pilha, print: ['ch', 3], ops: [
      op('em', 'esc', 'empilhar(x)', 'O(1)', 1, 'só pelo topo'),
      op('lt', 'ler', 'topo()', 'O(1)', 1, 'só o de cima'),
      op('lf', 'ler', 'ler o fundo', 'O(n)', 0, 'tira todos os de cima antes'),
      op('ch', 'ex', 'pilha de chamadas', 'LIFO', 1, 'o último a entrar sai primeiro')] },
    fila: { fn: fila, print: ['en', 1], ops: [
      op('en', 'esc', 'enfileirar(x)', 'O(1)', 1, 'entra pelo fim'),
      op('de', 'ler', 'desenfileirar()', 'O(1)', 1, 'sai pela frente (deque)'),
      op('p0', 'esc', 'lista.pop(0)', 'O(n)', 0, 'uma lista comum desloca todos'),
      op('lm', 'ler', 'fila[i]', 'O(n)', 0, 'o meio: caminha desde a ponta')] },
    arvore: { fn: arvore, print: ['lm', 4], ops: [
      op('lc', 'ler', 'por caminho', 'O(prof.)', 1, 'um passo por nível'),
      op('ef', 'esc', 'adicionar filho', 'O(1)', 1, 'com o pai na mão'),
      op('mv', 'esc', 'mover_para()', 'O(1)', 1, 'troca 1 ponteiro, seja qual for o tamanho'),
      op('lm', 'ler', 'por nome', 'O(n)', 0, 'sem o caminho, varre tudo')] },
    grafo: { fn: grafo, print: ['li', 2], ops: [
      op('li', 'esc', 'ligar(a, b)', 'O(1)', 1, 'um item em cada lista'),
      op('lv', 'ler', 'vizinhos(a)', 'O(1)', 1, 'a lista já está pronta'),
      op('lg', 'ler', 'ligados(a, b)', 'O(grau)', 0, 'varre a lista de vizinhos'),
      op('rm', 'esc', 'remover(a, b)', 'O(grau)', 0, 'acha nas duas listas'),
      op('gc', 'esc', 'git commit', 'O(1)', 1, 'o Git é um grafo: nó + aresta pro pai'),
      op('gl', 'ler', 'git log', 'O(n)', 0, 'segue os pais, commit a commit')] },
    antagonismo: { fn: antagonismo, print: ['oe', 9], ops: [
      op('se', 'esc', 'solta.append(x)', 'O(1)', 1, 'solta: escrever é largar no fim'),
      op('sl', 'ler', 'x in solta', 'O(n)', 0, 'solta: ler é olhar um por um'),
      op('ol', 'ler', 'busca binária', 'O(log n)', 1, 'ordenada: ler descarta metade'),
      op('oe', 'esc', 'ordenada.insert()', 'O(n)', 0, 'ordenada: escrever abre espaço')] },
    memoria: { fn: memoria, solo: true, last: true, ops: [] }
  };

  /* ------------------------------------------------------------------ motor */
  var TIPOS = { ler: 'LEITURA', esc: 'ESCRITA', preco: 'O PREÇO', info: 'EXEMPLO' };
  var vivos = [];

  function geo(el, it, p){
    if(it.line){
      var l = p || it.line, dx = l[2] - l[0], dy = l[3] - l[1];
      el.style.left = l[0] + 'px';
      el.style.top = (l[1] - 2) + 'px';
      el.style.width = Math.sqrt(dx * dx + dy * dy) + 'px';
      el.style.transform = 'rotate(' + Math.atan2(dy, dx) * 180 / Math.PI + 'deg)';
      return;
    }
    var q = p || it;
    el.style.left = q.x + 'px';
    el.style.top = q.y + 'px';
    el.style.width = it.w + 'px';
    el.style.height = it.h + 'px';
  }

  function aplicar(w, items){
    var vistos = {};
    items.forEach(function(it){
      vistos[it.id] = true;
      var el = w.els[it.id];
      var cls = 'vi2 ' + (it.line ? 'lin ' : '') + it.cls;
      if(!el){
        el = document.createElement('div');
        w.els[it.id] = el;
        w.canvas.appendChild(el);
        el.className = cls + (it.from && !it.line ? ' bola' : '');
        geo(el, it, it.from && it.line ? it.from : it.from);
        if(it.from || it.line){ el.style.opacity = '0'; }
        el.innerHTML = it.t === undefined ? '' : it.t;
        void el.offsetWidth;
        el.style.opacity = '1';
      }
      el.className = cls;
      if(it.t !== undefined && el.innerHTML !== String(it.t)){ el.innerHTML = it.t; }
      el.style.opacity = '1';
      geo(el, it);
      el._it = it;
    });
    Object.keys(w.els).forEach(function(id){
      if(vistos[id]){ return; }
      var el = w.els[id];
      delete w.els[id];
      var it = el._it || {};
      el.style.opacity = '0';
      if(it.to){ geo(el, it, it.to); }
      setTimeout(function(){ if(el.parentNode){ el.parentNode.removeChild(el); } }, 650);
    });
  }

  function mostra(w, i, seco){
    var f = w.frames[i];
    w.i = i;
    w.t = f.hold;
    if(seco){ w.canvas.classList.add('sem-trans'); }
    aplicar(w, f.items);
    if(seco){ void w.canvas.offsetWidth; w.canvas.classList.remove('sem-trans'); }
    w.code.textContent = f.code;
    w.msg.textContent = f.msg;
    if(w.tag){
      w.tag.textContent = TIPOS[f.tipo] || '';
      w.tag.className = 'vtag t-' + f.tipo;
    }
    if(w.count){ w.count.innerHTML = f.n === '' ? '' : 'passos: <b>' + f.n + '</b>'; }
    w.rows.forEach(function(r){ r.classList.toggle('on', r.getAttribute('data-op') === f.op); });
  }

  function monta(root){
    var cfg = E[root.getAttribute('data-viva')];
    if(!cfg){ return; }
    var frames = cfg.fn();
    root.classList.add('viva');
    if(cfg.solo){ root.classList.add('solo'); }
    if(cfg.ops.length > 4){ root.classList.add('denso'); }
    var painel = '';
    if(cfg.ops.length){
      painel = '<aside class="vpanel"><h3>LEITURA x ESCRITA</h3>' + cfg.ops.map(function(o){
        var k = { ler: 'LER', esc: 'ESCREVER', preco: 'PREÇO', ex: 'EXEMPLO' }[o.tipo];
        return '<div class="vop" data-op="' + o.id + '"><span class="vk k-' + o.tipo + '">' + k + '</span><code>' + o.rot +
          '</code><span class="vc-custo ' + (o.bom ? 'bom' : 'ruim') + '">' + o.custo + '</span><span class="vtxt">' + o.txt + '</span></div>';
      }).join('') + '<div class="vlegenda">' + LEG + '</div></aside>';
    }
    root.innerHTML = '<div class="vleft"><div class="vstage"><span class="vtag"></span><span class="vcount"></span><div class="vcanvas"></div></div>' +
      '<div class="vcap"><code></code><span class="vmsg"></span></div></div>' + painel;
    var w = {
      root: root, slide: root.closest('.slide'), frames: frames, els: {}, i: 0, t: 0, on: false,
      canvas: root.querySelector('.vcanvas'), code: root.querySelector('.vcap code'), msg: root.querySelector('.vmsg'),
      tag: root.querySelector('.vtag'), count: root.querySelector('.vcount'),
      rows: Array.prototype.slice.call(root.querySelectorAll('.vop'))
    };
    var ini = frames.length - 1;
    if(cfg.print){
      // o PDF e as miniaturas mostram o quadro mais completo (op + passos), não o primeiro
      for(var k = frames.length - 1; k >= 0; k--){
        if(frames[k].op === cfg.print[0] && frames[k].n === cfg.print[1]){ ini = k; }
      }
    }
    mostra(w, ini, true);
    w.rows.forEach(function(r){
      r.addEventListener('click', function(){
        for(var k = 0; k < frames.length; k++){
          if(frames[k].op === r.getAttribute('data-op')){ w.on = true; mostra(w, k, true); return; }
        }
      });
    });
    vivos.push(w);
  }

  Array.prototype.forEach.call(deck.querySelectorAll('[data-viva]'), monta);

  setInterval(function(){
    vivos.forEach(function(w){
      var ativo = !w.slide.hidden && !document.hidden;
      if(!ativo){ w.on = false; return; }
      if(!w.on){ w.on = true; mostra(w, 0, true); return; }
      w.t = w.t - 1;
      if(w.t > 0){ return; }
      mostra(w, (w.i + 1) % w.frames.length, false);
    });
  }, 450);
})();
