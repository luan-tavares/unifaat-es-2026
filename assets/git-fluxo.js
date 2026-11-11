/* Diagrama do fluxo Git do aluno (aulas/git-fluxo).
   Tudo é desenhado num SVG a partir dos dados abaixo (faixas, commits, ponteiros
   de branch e anotações). Cada item sabe em que passo aparece; render(passo)
   só liga/desliga o que existe naquele ponto da história.
   Os passos se agrupam em fases: preparação (uma vez), ciclo de 4 etapas que
   repete a cada aula, regra final e casos fora do ciclo.
   Sem else: early return / continue. */
(function(){
  var NS = 'http://www.w3.org/2000/svg';
  var W = 1800;
  var H = 548;
  var R = 15;
  var svg = document.getElementById('git');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

  /* ── dados ───────────────────────────────────────────── */
  var LANES = {
    prof: { y: 136, name: 'main' },
    A_main: { y: 300, name: 'main' },
    A_tf8: { y: 380, name: 'RA-tf-12' },
    A_tf9: { y: 460, name: 'RA-tf-13' }
  };

  var FRAMES = [
    { s: 0, cls: 'prof', x: 20, y: 44, w: 1760, h: 150, title: 'Professor · github.com/luan-tavares/unifaat-es-2026  (upstream)' },
    { s: 1, cls: '', x: 20, y: 214, w: 1760, h: 312, title: 'Aluno · fork github.com/ALUNO/unifaat-es-2026  (origin)' }
  ];

  /* h = hash (mesmo hash = mesmo commit copiado), k = tipo, s = passo em que aparece,
     p = commit pai, via = o que trouxe a cópia (rótulo na linha tracejada) */
  var COMMITS = [
    { id: 'P1', h: '7f3a2c1', lane: 'prof', x: 360, m: 'Aula 11', k: 'base', s: 0 },
    { id: 'P2', h: 'c91be04', lane: 'prof', x: 640, m: 'Aula 12', k: 'base', s: 2, p: 'P1' },
    { id: 'P3', h: '5d0e8a7', lane: 'prof', x: 1010, m: 'Aula 13', k: 'base', s: 6, p: 'P2' },

    { id: 'A1', h: '7f3a2c1', lane: 'A_main', x: 360, m: 'Aula 11', k: 'base', s: 1, via: 'fork' },
    { id: 'A2', h: 'c91be04', lane: 'A_main', x: 640, m: 'Aula 12', k: 'base', s: 3, p: 'A1', via: 'git pull (merge ff)' },
    { id: 'A3', h: '5d0e8a7', lane: 'A_main', x: 1010, m: 'Aula 13', k: 'base', s: 7, p: 'A2', via: 'git pull (merge ff)' },
    { id: 'At1', h: 'a11f0b2', lane: 'A_tf8', x: 760, m: 'TF-12', k: 'tf', s: 4, p: 'A2' },
    { id: 'At2', h: 'a2c9d34', lane: 'A_tf8', x: 880, m: 'ajustes', k: 'tf', s: 4, p: 'At1' },
    { id: 'Au1', h: 'a39c77d', lane: 'A_tf9', x: 1130, m: 'TF-13', k: 'tf', s: 8, p: 'A3' }

  ];

  /* at = [[passo, commit]...]: onde o ponteiro está a partir de cada passo;
     push = passo em que a branch vai para o GitHub (↑) */
  var TAGS = [
    { id: 'tp', t: 'main', kind: 'main', at: [[0, 'P1'], [2, 'P2'], [6, 'P3']] },
    { id: 'ta', t: 'main', kind: 'main', at: [[1, 'A1'], [3, 'A2'], [7, 'A3']] },
    { id: 'ta8', t: 'RA-tf-12', kind: 'leaf', at: [[4, 'At2']], push: 5 },
    { id: 'ta9', t: 'RA-tf-13', kind: 'leaf', at: [[8, 'Au1']], push: 9 }
  ];

  var NOTES = [
    { f: 1, t: 1, k: 'text', c: 'warn', a: 'start', x: 640, y: 240, s: '1º FORK no GitHub, 2º clone do SEU fork' },
    { f: 2, t: 2, k: 'text', c: 'warn', a: 'middle', x: 360, y: LANES.A_main.y + 66, s: '1 commit atrás' },
    { f: 3, t: 3, k: 'text', c: 'info', a: 'middle', x: 640, y: LANES.A_main.y + 66, s: 'fast-forward: só o ponteiro anda' },

    /* Pull Request: da folha do fork para o main do professor (nunca é mergeado) */
    { f: 5, t: 5, k: 'pr', x1: 880, y1: LANES.A_tf8.y - 62, x2: 640, y2: LANES.prof.y },
    { f: 5, t: 5, k: 'text', c: 'info', a: 'start', x: 770, y: 250, s: 'Pull Request → professor' },
    { f: 9, t: 9, k: 'pr', x1: 1130, y1: LANES.A_tf9.y - 62, x2: 1010, y2: LANES.prof.y },
    { f: 9, t: 9, k: 'text', c: 'info', a: 'start', x: 1084, y: 250, s: 'Pull Request → professor' },

    { f: 6, t: 7, k: 'ring', x: 640, y: LANES.A_main.y, r: 24 },
    { f: 6, t: 7, k: 'text', c: 'accent', a: 'end', x: 626, y: LANES.A_main.y + 68, s: 'base comum' },
    { f: 6, t: 7, k: 'text', c: 'info', a: 'middle', x: 820, y: LANES.A_tf8.y + 74, s: 'só no aluno: 2 commits' },
    { f: 6, t: 6, k: 'text', c: 'info', a: 'start', x: 1040, y: LANES.prof.y + 4, s: 'só no professor: a Aula 13' },
    { f: 7, t: 7, k: 'diff', x1: 880, y1: LANES.A_tf8.y - 62, x2: 1010, y2: LANES.prof.y },
    { f: 7, t: 7, k: 'text', c: 'accent', a: 'end', x: 902, y: 262, s: 'git diff RA-tf-12 upstream/main' },

    { f: 10, t: 10, k: 'text', c: 'warn', a: 'start', x: 934, y: LANES.A_tf8.y + 4, s: '✗ nunca merge' },
    { f: 10, t: 10, k: 'text', c: 'warn', a: 'start', x: 1186, y: LANES.A_tf9.y + 4, s: '✗ nunca merge' },
    { f: 10, t: 10, k: 'text', c: 'info', a: 'start', x: 1040, y: LANES.A_main.y + 4, s: '🔒 main: só git pull' }
  ];

  /* ph: fase do passo.
     setup = preparação (uma vez); cycle = etapa n (1 a 4) do ciclo da aula c;
     sum = o ciclo se repete */
  var STEPS = [
    {
      ph: { k: 'setup' },
      t: 'Preparação (uma vez): o repositório do professor',
      x: 'O professor tem o repositório oficial (o <em>upstream</em>) com o commit da Aula 11 na branch <code>main</code>. Só ele escreve aqui: o aluno não é colaborador, então qualquer push dele neste repo é recusado. Ler (clone e pull) qualquer um pode, porque o repo é público.',
      c: '# nada a fazer ainda: só existe o repo do professor\n# o 1º passo do aluno, no próximo passo, é fazer o FORK (antes de clonar)'
    },
    {
      ph: { k: 'setup' },
      t: 'Preparação (uma vez): FORK primeiro, depois o clone',
      x: 'A <b>primeira coisa</b> que o aluno faz, <b>antes de qualquer clone</b>, é o <b>FORK</b>: no GitHub, abre o repo do professor e clica em <b>Fork</b>. Isso cria um repositório dele (o <code>origin</code>), com a mesma história: <b>o mesmo commit</b> <code>7f3a2c1</code>, com o mesmo hash, nas duas pontas. <b>Só depois</b> ele clona o <b>seu fork</b> e aponta para o repo do professor com o nome <code>upstream</code>, só para ler. <b>Isso se faz uma única vez no semestre.</b> Daqui em diante é só o ciclo.',
      w: 'Primeiro o <b>FORK</b> no GitHub, <b>depois</b> o <code>git clone</code> do <b>seu fork</b>. Clonar o repo do professor direto não funciona: o push é recusado (403).',
      c: '# 0) ANTES DE TUDO, no navegador: abra https://github.com/luan-tavares/unifaat-es-2026 e clique em Fork\n# 1) clona o SEU fork, não o do professor (troque ALUNO pelo seu usuário do GitHub)\ngit clone git@github.com:ALUNO/unifaat-es-2026.git\n# entra na pasta do projeto\ncd unifaat-es-2026\n# aponta para o repo do professor com o nome "upstream" (só para ler)\ngit remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git'
    },

    {
      ph: { k: 'cycle', c: 0, n: 1 },
      t: 'Professor publica a Aula 12',
      x: 'O professor commita a Aula 12 no <code>main</code> dele e dá push. Os forks ainda não sabem: ficam <b>1 commit atrás</b>. Isso é normal e não quebra nada.',
      c: '# professor: marca tudo o que mudou para o commit\ngit add -A\n# professor: registra a aula (todo commit é "Aula NN")\ngit commit -m "Aula 12 - ..."\n# professor: publica no main do repo oficial\ngit push origin main'
    },
    {
      ph: { k: 'cycle', c: 0, n: 2 },
      t: 'Aluno: pull no main',
      x: 'O aluno puxa a aula do repo do professor. O <code>git pull</code> é um <em>fetch</em> (baixa) mais um <em>merge</em> do <code>upstream/main</code> no <code>main</code> dele. Como ele <b>nunca commita no main</b>, esse merge é sempre um <em>fast-forward</em>: o Git só anda o ponteiro, sem commit de merge e sem conflito. O <code>--ff-only</code> garante isso: se der erro, o main do aluno foi alterado. O <code>main</code> do fork no GitHub <b>não precisa de sync</b>: só o main local importa.',
      c: '# vai para o main (a cópia do professor, onde ninguém commita)\ngit switch main\n# traz a aula nova; --ff-only só aceita avanço limpo (se der erro, o main foi alterado)\ngit pull --ff-only upstream main'
    },
    {
      ph: { k: 'cycle', c: 0, n: 3 },
      t: 'Aluno: cria a branch RA-tf-12 e faz o TF',
      x: 'O aluno só precisa do <code>main</code> e de <b>uma branch por TF</b>, com o próprio RA no nome. Ela nasce <b>a partir do main atualizado</b>, recebe os commits do TF e é uma <b>folha</b>: nunca será mergeada. O RA no nome mostra de quem é cada folha. Na raiz, o TF mora no diretório <b>com o seu RA</b>, no subdiretório <code>tf-NN</code>, com o arquivo <code>RA.txt</code> (nome, RA e GitHub do aluno).',
      w: 'Uma branch por TF, com o nome <code>RA-tf-NN</code> (ex.: <code>1234567-tf-12</code>) e, na raiz, o diretório <code>RA/tf-NN/</code> com o <code>RA.txt</code> (nome, RA e GitHub). O TF só vale se o <b>PR aparecer</b> no repositório do professor.',
      c: '# cria a branch do TF e já entra nela. OBRIGATÓRIO: RA-tf-NN (troque 1234567 pelo seu RA)\ngit switch -c 1234567-tf-12\n# cria, na raiz, o diretório com o seu RA e o subdiretório tf-12\nmkdir -p 1234567/tf-12\n# dentro dele, o RA.txt com nome, RA e GitHub\ncat > 1234567/tf-12/1234567.txt <<EOF\nNome: Maria da Silva\nRA: 1234567\nGitHub: https://github.com/maria-silva\nEOF\n# ...faz o TF dentro desse diretório...\n# marca todos os arquivos alterados para o commit\ngit add -A\n# grava o TF na branch\ngit commit -m "TF-12"'
    },
    {
      ph: { k: 'cycle', c: 0, n: 4 },
      t: 'Aluno: push e Pull Request',
      x: 'A folha sobe para o <b>fork do aluno</b> (↑ no ponteiro: já está no GitHub); o aluno não tem escrita no repo do professor. Depois ele abre um <b>Pull Request</b> da folha para o <code>main</code> do professor (seta verde). O PR é a entrega: título <code>TF-12 · RA · Nome</code> e, na descrição, o documento simples. Ele nunca será mergeado: o professor fecha depois de corrigir.',
      w: 'Uma branch por TF, com o nome <code>RA-tf-NN</code> (ex.: <code>1234567-tf-12</code>) e, na raiz, o diretório <code>RA/tf-NN/</code> com o <code>RA.txt</code> (nome, RA e GitHub). O TF só vale se o <b>PR aparecer</b> no repositório do professor.',
      c: '# envia a branch para o SEU fork (origin) e guarda o destino com -u\ngit push -u origin 1234567-tf-12\n\n# abre este link no navegador e confira: base = luan-tavares/...  main\nhttps://github.com/luan-tavares/unifaat-es-2026/compare/main...ALUNO:1234567-tf-12?expand=1'
    },

    {
      ph: { k: 'cycle', c: 1, n: 1 },
      t: 'Professor publica a Aula 13: o ciclo recomeça',
      x: 'O professor commita a Aula 13 no <code>main</code> dele. Todo commit é de aula, e a <b>solução do TF-12 vem dentro dele</b>: é ela que vale, porque o TF faz parte da história das próximas aulas. As linhas se separaram na Aula 12 (a <em>base comum</em>): o aluno tem 2 commits que o professor não tem, e o professor tem a Aula 13, com a solução, que o aluno não tem. Não há merge aqui. O PR do TF-12 continua aberto na lista do professor, com o que o aluno fez.',
      c: '# professor: marca tudo o que mudou para o commit\ngit add -A\n# professor: registra a aula (a solução do TF anterior vem dentro dela)\ngit commit -m "Aula 13 - ..."\n# professor: publica no main do repo oficial\ngit push origin main'
    },
    {
      ph: { k: 'cycle', c: 1, n: 2 },
      t: 'Aluno: compara (opcional) e puxa o main',
      x: 'O TF do aluno continua intacto na <code>RA-tf-12</code>. Antes de puxar, ele pode comparar a folha com a Aula 13: o primeiro diff mostra o que ele fez; o segundo, o que difere da solução oficial, que vem dentro da Aula 13. Depois vem o mesmo pull de sempre, um fast-forward limpo: o <code>main</code> ganha a Aula 13 e a folha fica exatamente onde estava.',
      c: '# baixa as novidades do professor sem mexer em nada seu\ngit fetch upstream\n# opcional: o que VOCÊ fez no TF (desde a base comum)\ngit diff upstream/main...1234567-tf-12\n# opcional: sua folha contra a Aula 13 (a solução vem dentro dela)\ngit diff 1234567-tf-12 upstream/main\n# volta para o main\ngit switch main\n# puxa a Aula 13 (avanço limpo)\ngit pull --ff-only upstream main'
    },
    {
      ph: { k: 'cycle', c: 1, n: 3 },
      t: 'Aluno: cria a RA-tf-13, já em cima da Aula 13',
      x: 'O TF seguinte nasce do <code>main</code> atualizado, ou seja, <b>já em cima da solução do professor</b>, sem arrastar a alteração do TF anterior. A <code>RA-tf-12</code> permanece onde está.',
      w: 'Uma branch por TF, com o nome <code>RA-tf-NN</code> (ex.: <code>1234567-tf-12</code>) e, na raiz, o diretório <code>RA/tf-NN/</code> com o <code>RA.txt</code> (nome, RA e GitHub). O TF só vale se o <b>PR aparecer</b> no repositório do professor.',
      c: '# cria a branch do novo TF a partir do main, que já tem a Aula 13\ngit switch -c 1234567-tf-13\n# diretório com o seu RA e o subdiretório tf-13 (com o RA.txt dentro)\nmkdir -p 1234567/tf-13\n# ...faz o TF dentro desse diretório...\n# marca todos os arquivos alterados para o commit\ngit add -A\n# grava o TF na branch\ngit commit -m "TF-13"'
    },
    {
      ph: { k: 'cycle', c: 1, n: 4 },
      t: 'Aluno: push e novo Pull Request',
      x: 'Mesma coisa: push da folha para o fork e novo PR para o <code>main</code> do professor. Cada TF tem a sua folha e o seu PR, que ficam como registro da entrega.',
      w: 'Uma branch por TF, com o nome <code>RA-tf-NN</code> (ex.: <code>1234567-tf-12</code>) e, na raiz, o diretório <code>RA/tf-NN/</code> com o <code>RA.txt</code> (nome, RA e GitHub). O TF só vale se o <b>PR aparecer</b> no repositório do professor.',
      c: '# envia a nova branch para o seu fork\ngit push -u origin 1234567-tf-13\n\n# abre este link no navegador e confira: base = luan-tavares/...  main\nhttps://github.com/luan-tavares/unifaat-es-2026/compare/main...ALUNO:1234567-tf-13?expand=1'
    },

    {
      ph: { k: 'sum' },
      t: 'E assim por diante: Aula 10, 11...',
      x: 'O aluno só precisa do <code>main</code> (cópia do professor, só <code>pull</code>) e de uma folha <code>RA-tf-NN</code> por TF. Nenhuma folha volta para o <code>main</code>. O professor corrige abrindo o PR de cada aluno, e o fluxo da aula nunca depende do que o aluno fez. A cada aula, repete o ciclo. Deu erro? Veja a aba <b>Troubleshooting</b>.',
      w: 'Uma branch por TF, com o nome <code>RA-tf-NN</code> (ex.: <code>1234567-tf-12</code>) e, na raiz, o diretório <code>RA/tf-NN/</code> com o <code>RA.txt</code> (nome, RA e GitHub). O TF só vale se o <b>PR aparecer</b> no repositório do professor.',
      c: '# 1) vai para o main (a cópia do professor)\ngit switch main\n# 2) traz a aula nova\ngit pull --ff-only upstream main\n# 3) cria a branch do TF: RA-tf-NN\ngit switch -c RA-tf-NN\n# 3b) diretório com o seu RA e o subdiretório tf-NN, com o RA.txt (nome, RA, GitHub)\nmkdir -p RA/tf-NN\n# ...faz o TF nesse diretório e commita (git add -A, git commit)...\n# 4) envia a branch para o seu fork (depois, abre o PR)\ngit push -u origin RA-tf-NN'
    }
  ];

  /* aula de cada volta do ciclo, e passo em que cada volta começa */
  var CYCLES = [{ label: 'Aula 12', first: 2 }, { label: 'Aula 13', first: 6 }];

  /* ── desenho ─────────────────────────────────────────── */
  function el(name, attrs, parent){
    var n = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function(k){ n.setAttribute(k, attrs[k]); });
    if(parent){ parent.appendChild(n); }
    return n;
  }
  function layer(){ return el('g', {}, svg); }

  var defs = el('defs', {}, svg);
  var arrow = el('marker', { id: 'arr', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '7', markerHeight: '7', orient: 'auto' }, defs);
  el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'context-stroke' }, arrow);

  var gFrames = layer();
  var gLanes = layer();
  var gTies = layer();
  var gEdges = layer();
  var gNodes = layer();
  var gNotes = layer();
  var gTags = layer();
  var gDots = layer();

  var byId = {};
  COMMITS.forEach(function(c){ byId[c.id] = c; });

  function toggle(node, shown){ node.classList.toggle('g-off', !shown); }
  function mark(node, yes){ node.classList.toggle('new', yes); }

  /* molduras dos repositórios */
  var frames = FRAMES.map(function(f){
    var g = el('g', { 'class': 'gx' }, gFrames);
    el('rect', { 'class': 'frame ' + f.cls, x: f.x, y: f.y, width: f.w, height: f.h, rx: 16 }, g);
    var t = el('text', { 'class': 'frame-title', x: f.x + 16, y: f.y + 26 }, g);
    t.textContent = f.title;
    return { f: f, g: g };
  });

  var ghost = el('text', { 'class': 'ghost gx', x: 900, y: 806 }, gFrames);
  ghost.textContent = '+ 38 alunos, cada um com o seu fork e as suas folhas';

  /* faixas: aparecem junto com o primeiro commit que moram nelas */
  var lanes = Object.keys(LANES).map(function(key){
    var lane = LANES[key];
    var first = Math.min.apply(null, COMMITS.filter(function(c){ return c.lane === key; }).map(function(c){ return c.s; }));
    var g = el('g', { 'class': 'gx' }, gLanes);
    el('line', { 'class': 'lane-guide', x1: 150, x2: 1760, y1: lane.y, y2: lane.y }, g);
    var t = el('text', { 'class': 'lane-name', x: 40, y: lane.y + 4 }, g);
    t.textContent = lane.name;
    return { s: first, g: g };
  });

  /* laços tracejados: o mesmo commit (mesmo hash) em mais de um repositório */
  var groups = {};
  COMMITS.forEach(function(c){
    groups[c.h] = groups[c.h] || [];
    groups[c.h].push(c);
  });
  var ties = Object.keys(groups).filter(function(h){ return groups[h].length > 1; }).map(function(h){
    var path = el('path', { 'class': 'tie gx' }, gTies);
    return { members: groups[h], path: path };
  });

  /* rótulos "fork", "git pull"...: um por coluna e passo */
  var vias = [];
  var viaKeys = {};
  COMMITS.forEach(function(c){
    if(!c.via){ return; }
    var key = c.x + '-' + c.s;
    if(viaKeys[key]){ return; }
    viaKeys[key] = true;
    var t = el('text', { 'class': 'via gx', x: c.x + 10, y: 207 }, gTies);
    t.textContent = '↓ ' + c.via;
    vias.push({ s: c.s, node: t });
  });

  /* arestas pai → filho */
  COMMITS.forEach(function(c){
    if(!c.p){ return; }
    var a = byId[c.p];
    var ay = LANES[a.lane].y;
    var cy = LANES[c.lane].y;
    var d = 'M' + a.x + ',' + ay + ' L' + c.x + ',' + cy;
    if(ay !== cy){ d = 'M' + a.x + ',' + ay + ' C' + (a.x + 60) + ',' + ay + ' ' + (c.x - 60) + ',' + cy + ' ' + c.x + ',' + cy; }
    c.edge = el('path', { 'class': 'edge gx', d: d }, gEdges);
  });

  /* commits */
  COMMITS.forEach(function(c){
    var y = LANES[c.lane].y;
    var g = el('g', { 'class': 'commit gx k-' + c.k, transform: 'translate(' + c.x + ',' + y + ')' }, gNodes);
    el('circle', { 'class': 'halo', r: R + 9 }, g);
    el('circle', { 'class': 'dot', r: R }, g);
    var m = el('text', { 'class': 'c-msg', y: R + 19 }, g);
    m.textContent = c.m;
    var h = el('text', { 'class': 'c-hash', y: R + 35 }, g);
    h.textContent = c.h;
    var tip = el('title', {}, g);
    tip.textContent = c.h + ' · ' + c.m;
    c.node = g;
  });

  /* anotações */
  NOTES.forEach(function(n){
    if(n.k === 'text'){
      n.node = el('text', { 'class': 'note gx ' + n.c, x: n.x, y: n.y, 'text-anchor': n.a }, gNotes);
      n.node.textContent = n.s;
      return;
    }
    if(n.k === 'ring'){
      n.node = el('circle', { 'class': 'ring gx', cx: n.x, cy: n.y, r: n.r }, gNotes);
      return;
    }
    if(n.k === 'pr'){
      /* a seta para um pouco antes do commit, para a ponta não cobrir o nó */
      var dx = n.x2 - n.x1;
      var dy = n.y2 - n.y1;
      var len = Math.sqrt(dx * dx + dy * dy);
      var ex = n.x2 - dx / len * (R + 13);
      var ey = n.y2 - dy / len * (R + 13);
      n.node = el('path', { 'class': 'pr gx', d: 'M' + n.x1 + ',' + n.y1 + ' L' + ex.toFixed(1) + ',' + ey.toFixed(1), 'marker-end': 'url(#arr)' }, gNotes);
      return;
    }
    n.node = el('path', { 'class': 'diff gx', d: 'M' + n.x1 + ',' + n.y1 + ' L' + n.x2 + ',' + n.y2 }, gNotes);
  });

  /* ponteiros de branch */
  var tags = TAGS.map(function(t){
    var g = el('g', { 'class': 'tag ' + t.kind + ' gx' }, gTags);
    el('path', { 'class': 'stem', d: 'M0,-32 L0,-' + (R + 2) }, g);
    var rect = el('rect', { y: -56, height: 24, rx: 12 }, g);
    var text = el('text', { y: -39 }, g);
    return { t: t, g: g, rect: rect, text: text, shown: false, pushed: null };
  });

  function tagLabel(tag, pushed){
    var label = tag.t.t + (pushed ? ' ↑' : '');
    var w = label.length * 9 + 26;
    tag.text.textContent = label;
    tag.rect.setAttribute('width', w);
    tag.rect.setAttribute('x', -w / 2);
  }

  function placeTag(tag, step){
    var spot = null;
    tag.t.at.forEach(function(a){ if(a[0] <= step){ spot = a[1]; } });
    if(!spot){
      tag.shown = false;
      toggle(tag.g, false);
      return;
    }
    var c = byId[spot];
    var pos = 'translate(' + c.x + 'px,' + LANES[c.lane].y + 'px)';
    var pushed = tag.t.push !== undefined && step >= tag.t.push;
    if(pushed !== tag.pushed){
      tag.pushed = pushed;
      tagLabel(tag, pushed);
      tag.g.classList.toggle('pushed', pushed);
    }
    if(!tag.shown){
      /* primeira aparição: nasce no lugar, sem deslizar desde a origem */
      tag.g.style.transition = 'none';
      tag.g.style.transform = pos;
      void tag.g.getBoundingClientRect();
      tag.g.style.transition = '';
    }
    tag.g.style.transform = pos;
    tag.shown = true;
    toggle(tag.g, true);
  }

  /* ── passo atual ─────────────────────────────────────── */
  var step = 0;

  function render(){
    frames.forEach(function(x){ toggle(x.g, step >= x.f.s); });
    toggle(ghost, step >= 1);
    lanes.forEach(function(l){ toggle(l.g, step >= l.s); });

    COMMITS.forEach(function(c){
      var shown = step >= c.s;
      toggle(c.node, shown);
      mark(c.node, step === c.s);
      if(!c.edge){ return; }
      toggle(c.edge, shown);
      mark(c.edge, step === c.s);
    });

    ties.forEach(function(tie){
      var seen = tie.members.filter(function(c){ return step >= c.s; });
      toggle(tie.path, seen.length > 1);
      if(seen.length < 2){
        mark(tie.path, false);
        return;
      }
      var ys = seen.map(function(c){ return LANES[c.lane].y; });
      var top = Math.min.apply(null, ys);
      var bottom = Math.max.apply(null, ys);
      tie.path.setAttribute('d', 'M' + seen[0].x + ',' + top + ' L' + seen[0].x + ',' + bottom);
      mark(tie.path, seen.some(function(c){ return c.s === step && c.s > tie.members[0].s; }));
    });

    vias.forEach(function(v){ toggle(v.node, v.s === step); });
    NOTES.forEach(function(n){
      var on = step >= n.f && step <= n.t;
      toggle(n.node, on);
      if(n.k === 'diff'){ mark(n.node, on); }
    });
    tags.forEach(function(tag){ placeTag(tag, step); });

    panel();
    syncDots();
  }

  /* ── bolinhas andando nas linhas novas do passo ──────── */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dots = [];

  function syncDots(){
    dots.forEach(function(d){ d.node.remove(); });
    dots = [];
    if(reduce){ return; }
    var paths = Array.prototype.slice.call(svg.querySelectorAll('path.new:not(.g-off)'));
    paths.forEach(function(p, i){
      var c = el('circle', { 'class': 'pulse', r: 6 }, gDots);
      dots.push({ node: c, path: p, offset: i / paths.length });
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
  if(!reduce){ requestAnimationFrame(tick); }

  /* ── o ciclo: 4 etapas em círculo que se repetem ─────── */
  var ring = document.getElementById('ring');
  var CX = 215;
  var CY = 100;
  var RR = 62;
  var NODE_R = 19;
  var LABELS = [
    { x: 242, y: 43, a: 'start', s: 'professor publica' },
    { x: 304, y: 105, a: 'start', s: 'pull no main' },
    { x: 242, y: 167, a: 'start', s: 'RA-tf-NN: faz o TF' },
    { x: 126, y: 105, a: 'end', s: 'push + PR' }
  ];

  function polar(deg){
    var r = deg * Math.PI / 180;
    return [CX + RR * Math.cos(r), CY + RR * Math.sin(r)];
  }

  var arcs = [];
  var nodes = [];
  var center = null;
  var centerSub = null;

  function buildRing(){
    var rdefs = el('defs', {}, ring);
    var m = el('marker', { id: 'ring-arr', viewBox: '0 0 10 10', refX: '8', refY: '5', markerWidth: '6', markerHeight: '6', orient: 'auto' }, rdefs);
    el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'context-stroke' }, m);

    /* nó n fica em -90 (topo), 0, 90, 180: sentido horário */
    for(var i = 0; i < 4; i++){
      var from = polar(-90 + i * 90 + 24);
      var to = polar(-90 + (i + 1) * 90 - 24);
      var arc = el('path', { 'class': 'ring-arc', d: 'M' + from[0].toFixed(1) + ',' + from[1].toFixed(1) + ' A' + RR + ',' + RR + ' 0 0 1 ' + to[0].toFixed(1) + ',' + to[1].toFixed(1), 'marker-end': 'url(#ring-arr)' }, ring);
      arcs.push(arc);
    }

    for(var n = 0; n < 4; n++){
      var p = polar(-90 + n * 90);
      var g = el('g', { 'class': 'ring-node', tabindex: '0', role: 'button', 'aria-label': 'Etapa ' + (n + 1) + ': ' + LABELS[n].s }, ring);
      el('circle', { cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: NODE_R }, g);
      var num = el('text', { x: p[0].toFixed(1), y: (p[1] + 5).toFixed(1), 'class': 'ring-num' }, g);
      num.textContent = String(n + 1);
      var lab = el('text', { x: LABELS[n].x, y: LABELS[n].y, 'text-anchor': LABELS[n].a, 'class': 'ring-label' }, ring);
      lab.textContent = LABELS[n].s;
      g.dataset.n = String(n + 1);
      nodes.push({ g: g, lab: lab });
      g.addEventListener('click', function(ev){ goCycleNode(Number(ev.currentTarget.dataset.n)); });
      g.addEventListener('keydown', function(ev){
        if(ev.key !== 'Enter' && ev.key !== ' '){ return; }
        ev.preventDefault();
        goCycleNode(Number(ev.currentTarget.dataset.n));
      });
    }

    center = el('text', { x: CX, y: CY - 2, 'class': 'ring-center' }, ring);
    centerSub = el('text', { x: CX, y: CY + 17, 'class': 'ring-center-sub' }, ring);
  }
  buildRing();

  /* etapa clicada no círculo: na volta atual (ou na 1ª, se ainda não está num ciclo) */
  function goCycleNode(n){
    var cur = STEPS[step].ph;
    var cycle = cur.k === 'cycle' ? cur.c : (step >= CYCLES[1].first ? 1 : 0);
    go(CYCLES[cycle].first + n - 1);
  }

  function paintRing(){
    var ph = STEPS[step].ph;
    var inCycle = ph.k === 'cycle' || ph.k === 'sum';
    ring.classList.toggle('ring-off', !inCycle);
    ring.classList.toggle('ring-all', ph.k === 'sum');

    var cycle = ph.k === 'cycle' ? ph.c : (step >= CYCLES[1].first ? 1 : 0);
    center.textContent = ph.k === 'sum' ? '↻ Aula 10...' : (inCycle ? CYCLES[cycle].label : '↻');
    centerSub.textContent = ph.k === 'cycle' ? 'etapa ' + ph.n + ' de 4' : (ph.k === 'sum' ? 'repete' : 'ciclo da aula');

    nodes.forEach(function(x, i){
      var n = i + 1;
      x.g.classList.toggle('cur', ph.k === 'cycle' && ph.n === n);
      x.g.classList.toggle('done', ph.k === 'cycle' && n < ph.n);
      x.lab.classList.toggle('cur', ph.k === 'cycle' && ph.n === n);
    });

    /* volta do passo 4 para o 1: acende quando começa a 2ª aula */
    arcs.forEach(function(arc, i){
      var back = i === 3 && ph.k === 'cycle' && ph.c > 0 && ph.n === 1;
      arc.classList.toggle('flash', back);
    });
  }

  /* bloco de comandos: a linha de comentário (#) fica normal e o comando, em negrito.
     O texto copiado continua puro (os spans só mudam o peso da fonte). */
  function fillCmd(code, text){
    code.textContent = '';
    text.split('\n').forEach(function(line, i, all){
      var span = document.createElement('span');
      span.className = line.trim().charAt(0) === '#' ? 'cm' : 'ck';
      span.textContent = line;
      code.appendChild(span);
      if(i < all.length - 1){ code.appendChild(document.createTextNode('\n')); }
    });
  }
  window.gitFluxoFillCmd = fillCmd;

  /* ── painel, botões e teclado ────────────────────────── */
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var restart = document.getElementById('restart');
  var copy = document.getElementById('copy');
  var cmd = document.getElementById('step-cmd');
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-go]'));
  var dotsBox = document.getElementById('dots');

  function samePhase(a, b){
    if(a.k !== b.k){ return false; }
    return a.k !== 'cycle' || a.c === b.c;
  }

  var dotButtons = STEPS.map(function(s, i){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn';
    b.textContent = String(i + 1);
    b.title = s.t;
    /* respiro entre as fases: preparação, volta 1, volta 2, fechamento, fora do ciclo */
    if(i > 0 && !samePhase(STEPS[i - 1].ph, s.ph)){ b.classList.add('gap'); }
    b.addEventListener('click', function(){ go(i); });
    dotsBox.appendChild(b);
    return b;
  });

  function phaseText(){
    var ph = STEPS[step].ph;
    if(ph.k === 'setup'){ return 'Preparação · uma vez só'; }
    if(ph.k === 'cycle'){ return 'Ciclo da ' + CYCLES[ph.c].label + ' · etapa ' + ph.n + ' de 4 · repete a cada aula'; }
    if(ph.k === 'sum'){ return 'O ciclo se repete a cada aula'; }
    return '';
  }

  function panel(){
    var s = STEPS[step];
    document.getElementById('step-count').textContent = phaseText();
    document.getElementById('step-title').textContent = s.t;
    document.getElementById('step-text').innerHTML = s.x;
    var warn = document.getElementById('step-warn');
    warn.hidden = !s.w;
    warn.innerHTML = s.w || '';
    fillCmd(cmd, s.c);
    copy.textContent = 'copiar';
    prev.disabled = step === 0;
    next.disabled = step === STEPS.length - 1;
    chips.forEach(function(b){ b.setAttribute('aria-pressed', String(Number(b.dataset.go) === step)); });
    dotButtons.forEach(function(b, i){
      b.setAttribute('aria-pressed', String(i === step));
      b.classList.toggle('done', i < step);
    });
    paintRing();
  }

  function go(i){
    step = Math.max(0, Math.min(STEPS.length - 1, i));
    history.replaceState(null, '', '#passo-' + (step + 1));
    render();
  }

  chips.forEach(function(b){ b.addEventListener('click', function(){ go(Number(b.dataset.go)); }); });
  prev.addEventListener('click', function(){ go(step - 1); });
  next.addEventListener('click', function(){ go(step + 1); });
  restart.addEventListener('click', function(){ go(0); });
  copy.addEventListener('click', function(){
    if(!navigator.clipboard){ return; }
    navigator.clipboard.writeText(cmd.textContent).then(function(){ copy.textContent = 'copiado ✓'; });
  });

  window.addEventListener('keydown', function(e){
    if(e.ctrlKey || e.metaKey || e.altKey){ return; }
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)){ return; }
    if(document.getElementById('view-fluxo').hidden){ return; }
    if(e.key === 'ArrowRight'){ go(step + 1); }
    if(e.key === 'ArrowLeft'){ go(step - 1); }
    if(e.key === 'Home'){ go(0); }
    if(e.key === 'End'){ go(STEPS.length - 1); }
  });

  var start = /passo-(\d+)/.exec(location.hash);
  step = start ? Math.max(0, Math.min(STEPS.length - 1, Number(start[1]) - 1)) : 0;
  render();
})();
