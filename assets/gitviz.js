/* Linha do tempo do Git animada (ES, Aula 12).
   Cada <div data-gitviz="chave"> vira um grafo de commits em SVG que anda etapa por etapa:
   commits (círculos), seta para o pai, etiquetas (branch, HEAD), setas entre repositórios
   (fork, clone, pull, push, PR) e faixas ("Professor", "Seu fork", "Sua máquina").
   Uma cena é uma lista de etapas CUMULATIVAS: o que a etapa não repete continua como estava;
   repetir um id move ou troca o elemento (é assim que a etiqueta "main" anda); `del` remove.
   Começa sozinho, em loop; o aluno pausa (botão ou P) e anda etapa por etapa (botões ou , e .).
   A última etapa é a imagem completa: é a que as miniaturas e o PDF mostram.
   Rodar ANTES do slide.js (as miniaturas clonam o slide já desenhado). Sem else: early return. */
(function(){
  var deck = document.getElementById('deck');
  if(!deck){ return; }

  var NS = 'http://www.w3.org/2000/svg';
  /* modo vertical (celular, janela estreita ou tela em pé): viewBox mais estreito, letra maior,
     o fluxo do PR vira uma coluna. Muda de modo => recarrega (mantém o #slide). */
  var MQ = window.matchMedia('screen and (max-width: 719px), screen and (orientation: portrait)');
  var VERT = MQ.matches;
  function V(h, v){ return VERT ? v : h; }
  var W = V(1100, 640), S = V(110, 74), X0 = V(170, 152), R = V(17, 20), FS = V(1, 1.3);
  var TH = Math.round(22 * FS), TSTEP = Math.round(25 * FS);
  MQ.addEventListener('change', function(){ location.reload(); });

  /* ------------------------------------------------------------------ construtores */
  function C(id, col, row, par, cls, txt){
    return { t: 'c', id: id, col: col, row: row, par: par || [], cls: cls || 'tr', txt: txt === undefined ? id.toUpperCase() : txt };
  }
  function T(id, txt, at, kind, side, n){
    return { t: 't', id: id, txt: txt, at: at, kind: kind || 'b', side: side || 'up', n: n || 0 };
  }
  function AR(id, from, to, txt, cls, bend){
    return { t: 'a', id: id, from: from, to: to, txt: txt || '', cls: cls || 'pull', bend: bend || 0 };
  }
  function BAN(id, row, txt, sub){
    return { t: 'b', id: id, row: row, txt: txt, sub: sub || '' };
  }
  function X(id, x, y, txt, cls){
    return { t: 'x', id: id, x: x, y: y, txt: txt, cls: cls || '' };
  }
  /* caixa de repositório (x, y, largura, altura em coordenadas do desenho) */
  function N(id, x, y, w, h, txt, sub, cls){
    return { t: 'n', id: id, x: x, y: y, w: w, h: h, txt: txt, sub: sub || '', cls: cls || 'pf' };
  }
  function F(cmd, msg, set, del, hold){
    return { cmd: cmd || '', msg: msg, set: set || [], del: del || [], hold: hold || 8 };
  }
  function col(n){ return X0 + n * S; }

  /* repete A, B, C... em uma faixa (professor, fork ou máquina) */
  var LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];
  function serie(prefixo, row, n, cls, de){
    var out = [];
    var i;
    for(i = de || 0; i < n; i++){
      out.push(C(prefixo + LETRAS[i], i, row, i === 0 ? [] : [prefixo + LETRAS[i - 1]], cls || 'pf', LETRAS[i]));
    }
    return out;
  }

  /* ------------------------------------------------------------------ cenas */
  var CENAS = {};

  /* revisão: o commit e a linha do tempo */
  CENAS.commit = function(){
    return { h: V(170, 175), oy: V(84, 122), rh: V(70, 70), frames: [
      F('', 'Cada <b>commit</b> é uma foto do projeto e guarda um <b>ponteiro para o pai</b>. A cadeia deles é a linha do tempo. A <b>main</b> aponta para o último commit e o <b>HEAD</b> aponta para a main.',
        [C('a', 0, 0, [], 'tr', 'A'), C('b', 1, 0, ['a'], 'tr', 'B'), C('c', 2, 0, ['b'], 'tr', 'C'),
         T('main', 'main', 'c', 'b', 'up', 0), T('head', 'HEAD', 'c', 'h', 'up', 1)]),
      F('git add . &amp;&amp; git commit -m "D"', 'Um commit novo nasce ligado ao C. A <b>main</b> anda para ele, e o <b>HEAD</b>, que só aponta para a main, anda junto.',
        [C('d', 3, 0, ['c'], 'tr', 'D'), T('main', 'main', 'd', 'b', 'up', 0), T('head', 'HEAD', 'd', 'h', 'up', 1)]),
      F('git add . &amp;&amp; git commit -m "E"', 'Mais um. Uma linha reta, um commit depois do outro: <b>uma única linha do tempo</b>. Hoje vamos ter mais de uma.',
        [C('e', 4, 0, ['d'], 'tr', 'E'), T('main', 'main', 'e', 'b', 'up', 0), T('head', 'HEAD', 'e', 'h', 'up', 1)])
    ] };
  };

  /* branch: o multiverso, o galho vazio, a divergência */
  CENAS.branch = function(){
    return { h: V(250, 285), oy: V(78, 95), rh: V(84, 90), frames: [
      F('', 'Uma linha do tempo só: a <b>main</b> e o <b>HEAD</b> no mesmo commit.',
        [C('a', 0, 0, [], 'tr', 'A'), C('b', 1, 0, ['a'], 'tr', 'B'), C('c', 2, 0, ['b'], 'tr', 'C'),
         T('main', 'main', 'c', 'b', 'up', 0), T('head', 'HEAD', 'c', 'h', 'up', 1)]),
      F('git branch login', 'O <b>galho vazio</b>: uma branch recém-criada, <b>sem nenhum commit próprio</b>. É só um ponteiro novo apontando para o mesmo commit. Nenhum arquivo foi copiado, por isso é instantâneo.',
        [T('login', 'login', 'c', 'g', 'down', 0)], [], 10),
      F('git switch login', 'Viajar para o outro universo é <b>mover o HEAD</b> para a branch <b>login</b>. Os arquivos da pasta passam a espelhar essa branch.',
        [T('head', 'HEAD', 'c', 'h', 'down', 1)]),
      F('git commit -m "D"', 'O commit vai para o galho: o <b>login</b> andou, a <b>main</b> ficou parada no C.',
        [C('d', 3, 1, ['c'], 'gl', 'D'), T('login', 'login', 'd', 'g', 'down', 0), T('head', 'HEAD', 'd', 'h', 'down', 1)]),
      F('git switch main', 'Voltar para a main: os arquivos da pasta voltam ao estado do <b>C</b>. O que foi feito no galho some da pasta (e continua guardado no galho).',
        [T('head', 'HEAD', 'c', 'h', 'up', 1)]),
      F('git commit -m "E"', 'Agora são <b>dois universos paralelos</b>: a main com o E, o login com o D. Os dois existem ao mesmo tempo, e nenhum estragou o outro.',
        [C('e', 3, 0, ['c'], 'tr', 'E'), T('main', 'main', 'e', 'b', 'up', 0), T('head', 'HEAD', 'e', 'h', 'up', 1)], [], 10)
    ] };
  };

  /* merge sem commit novo: fast-forward */
  CENAS.ff = function(){
    return { h: V(250, 285), oy: V(78, 95), rh: V(84, 90), frames: [
      F('', 'A <b>main</b> parou no C e o galho <b>login</b> andou dois commits (D e E). Como a main <b>não andou</b>, dá para chegar lá em linha reta.',
        [C('a', 0, 0, [], 'tr', 'A'), C('b', 1, 0, ['a'], 'tr', 'B'), C('c', 2, 0, ['b'], 'tr', 'C'),
         C('d', 3, 1, ['c'], 'gl', 'D'), C('e', 4, 1, ['d'], 'gl', 'E'),
         T('main', 'main', 'c', 'b', 'up', 0), T('head', 'HEAD', 'c', 'h', 'up', 1), T('login', 'login', 'e', 'g', 'down', 0)], [], 9),
      F('git merge login', 'O merge traz o galho <b>para onde o HEAD está</b> (a main). Aqui o Git só <b>avança o ponteiro</b> da main até o E: é o <b>fast-forward</b>. Nenhum commit novo foi criado.',
        [C('d', 3, 1, ['c'], 'tr', 'D'), C('e', 4, 1, ['d'], 'tr', 'E'),
         T('main', 'main', 'e', 'b', 'up', 0), T('head', 'HEAD', 'e', 'h', 'up', 1)], [], 10),
      F('', 'Os commits do galho agora fazem parte da <b>main</b> (mudaram de cor). O galho <b>login</b> continua existindo, apontando para o E.',
        [], [], 8)
    ] };
  };

  /* merge com commit de merge (dois pais) */
  CENAS.merge = function(){
    return { h: V(250, 285), oy: V(78, 95), rh: V(84, 90), frames: [
      F('', 'Os <b>dois lados andaram</b>: a main tem o E e o login tem o D. Não dá para só avançar um ponteiro.',
        [C('a', 0, 0, [], 'tr', 'A'), C('b', 1, 0, ['a'], 'tr', 'B'), C('c', 2, 0, ['b'], 'tr', 'C'),
         C('d', 3, 1, ['c'], 'gl', 'D'), C('e', 3, 0, ['c'], 'tr', 'E'),
         T('main', 'main', 'e', 'b', 'up', 0), T('head', 'HEAD', 'e', 'h', 'up', 1), T('login', 'login', 'd', 'g', 'down', 0)], [], 9),
      F('git merge login', 'O Git cria um <b>commit de merge</b>: um commit novo com <b>dois pais</b>, um de cada lado (o único nó do grafo, na Aula 10, com duas setas de saída). Ele junta os dois universos.',
        [C('m', 4, 0, ['e', 'd'], 'mg', 'M'), T('main', 'main', 'm', 'b', 'up', 0), T('head', 'HEAD', 'm', 'h', 'up', 1)], [], 11),
      F('git branch -d login', 'Mesclar <b>não apaga o galho</b>. Apagar é outra decisão e só remove o <b>ponteiro</b> login: o commit D continua no histórico, alcançável pelo M.',
        [], ['login'], 10)
    ] };
  };

  /* galho que nunca é mesclado fica como histórico */
  CENAS.historico = function(){
    return { h: V(250, 285), oy: V(78, 95), rh: V(84, 90), frames: [
      F('', 'A <b>main</b> do professor, com três commits. Ela é o <b>tronco</b>.',
        [C('a', 0, 0, [], 'tr', 'A'), C('b', 1, 0, ['a'], 'tr', 'B'), C('c', 2, 0, ['b'], 'tr', 'C'),
         T('main', 'main', 'c', 'b', 'up', 0)]),
      F('git switch -c 6325000-tf-12', 'O aluno cria o <b>galho do TF</b> a partir da main e commita nele (X e Y).',
        [C('x', 3, 1, ['c'], 'gl', 'X'), C('y', 4, 1, ['x'], 'gl', 'Y'), T('tf', '6325000-tf-12', 'y', 'g', 'down', 0)]),
      F('', 'A <b>main</b> segue andando, com as aulas novas do professor (D, E, F). O galho do aluno ficou onde estava.',
        [C('d', 3, 0, ['c'], 'tr', 'D'), C('e', 4, 0, ['d'], 'tr', 'E'), C('f', 5, 0, ['e'], 'tr', 'F'), T('main', 'main', 'f', 'b', 'up', 0)], [], 9),
      F('', 'O galho <b>nunca é mesclado</b>: não volta para a main. Mas também <b>não some</b>: fica no GitHub como <b>histórico</b>, o registro da entrega.',
        [X('nota', V(col(5) + 20, 24), V(84 + 84 + 5, 272), 'nunca mesclado ➜ fica como histórico', 'gl')], [], 10)
    ] };
  };

  /* fork e clone */
  CENAS.fork = function(){
    var bp = [BAN('bp', 0, 'Professor', 'GitHub'), BAN('bf', 1.5, 'Seu fork', 'GitHub'), BAN('bm', 3, 'Sua máquina', 'local')];
    return { h: V(318, 396), oy: V(54, 64), rh: V(70, 88), bh: V(96, 120), frames: [
      F('', 'O repositório do <b>professor</b>. Qualquer um pode <b>ler</b> e clonar, mas só o dono escreve.',
        [bp[0]].concat(serie('p', 0, 3, 'pf'), [T('pm', 'main', 'pC', 'b', 'up', 0)])),
      F('botão Fork (no GitHub)', 'O <b>fork</b> cria uma <b>cópia do repositório do professor na SUA conta</b>, com todo o histórico (mesmos commits). Nela você tem permissão de escrita.',
        [bp[1], AR('fk', 'pB', 'fB', 'fork', 'fork', 0)].concat(serie('f', 1.5, 3, 'pf'), [T('fm', 'main', 'fC', 'b', 'up', 0)]), [], 10),
      F('git clone git@github.com:SEU-USUARIO/...', 'O <b>clone</b> traz o <b>seu fork</b> para o computador. O remote <b>origin</b> aponta para o fork (onde você escreve).',
        [bp[2], AR('cl', 'fB', 'mB', 'clone (origin)', 'pull', 0)].concat(serie('m', 3, 3, 'pf'), [T('mm', 'main', 'mC', 'b', 'up', 0)]), [], 10),
      F('git remote add upstream git@github.com:luan-tavares/...', 'O <b>upstream</b> é o repositório do professor cadastrado só para <b>ler</b>: de lá vêm as aulas novas.',
        [AR('up', 'mC', 'pC', 'upstream (só ler)', 'pull', V(210, 260))], [], 10)
    ] };
  };

  /* sync e pull */
  CENAS.sync = function(){
    var base = [BAN('bp', 0, 'Professor', 'GitHub'), BAN('bf', 1.5, 'Seu fork', 'GitHub'), BAN('bm', 3, 'Sua máquina', 'local')]
      .concat(serie('p', 0, 3, 'pf'), serie('f', 1.5, 3, 'pf'), serie('m', 3, 3, 'pf'),
        [T('pm', 'main', 'pC', 'b', 'up', 0), T('fm', 'main', 'fC', 'b', 'up', 0), T('mm', 'main', 'mC', 'b', 'up', 0)]);
    return { h: V(318, 396), oy: V(54, 64), rh: V(70, 88), bh: V(96, 120), frames: [
      F('', 'Tudo igual: o professor, o seu fork e a sua máquina estão no <b>C</b>.', base),
      F('', 'O professor publica a <b>aula nova</b> (commit D). O seu fork e a sua máquina <b>continuam no C</b>: nada se atualiza sozinho.',
        [C('pD', 3, 0, ['pC'], 'pf', 'D'), T('pm', 'main', 'pD', 'b', 'up', 0)], [], 9),
      F('git switch main &amp;&amp; git pull --ff-only upstream main', 'O <b>pull</b> traz o D direto do professor (upstream) para o <b>main</b> da sua máquina. O <b>--ff-only</b> só aceita avanço limpo: se o seu main tiver sido alterado, recusa.',
        [AR('pl', 'pD', 'mD', 'pull', 'pull', 120), C('mD', 3, 3, ['mC'], 'pf', 'D'), T('mm', 'main', 'mD', 'b', 'up', 0)], [], 11),
      F('botão Sync fork (no GitHub)', 'O <b>sync</b> do GitHub atualiza o <b>fork</b> na nuvem (opcional). Para o TF, o que importa é o pull: o seu <b>main</b> é só uma cópia do professor.',
        [AR('sy', 'pD', 'fD', 'sync', 'fork', 0), C('fD', 3, 1.5, ['fC'], 'pf', 'D'), T('fm', 'main', 'fD', 'b', 'up', 0)], ['pl'], 11)
    ] };
  };

  /* push só em outro galho e o Pull Request */
  CENAS.pr = function(){
    var base = [BAN('bp', 0, 'Professor', 'GitHub'), BAN('bf', 1.5, 'Seu fork', 'GitHub'), BAN('bm', 3, 'Sua máquina', 'local')]
      .concat(serie('p', 0, 4, 'pf'), serie('f', 1.5, 4, 'pf'), serie('m', 3, 4, 'pf'),
        [T('pm', 'main', 'pD', 'b', 'up', 0), T('fm', 'main', 'fD', 'b', 'up', 0), T('mm', 'main', 'mD', 'b', 'up', 0)]);
    return { h: V(318, 396), oy: V(54, 64), rh: V(70, 88), bh: V(96, 120), frames: [
      F('', 'Ponto de partida: o <b>main</b> está atualizado nos três lugares. Ninguém commita no main.', base),
      F('git push upstream main', 'Tentar escrever no <b>main do professor</b>: <b>recusado (403)</b>. Só o dono, e quem ele convidou, escreve ali.',
        [AR('no', 'mD', 'pD', '403 · sem permissão', 'no', V(270, 300))], [], 10),
      F('git switch -c 6325000-tf-12', 'O jeito certo: criar um <b>galho</b> a partir do main atualizado. Recém-criado, ele ainda é só um ponteiro, sem commit próprio.',
        [T('mg', '6325000-tf-12', 'mD', 'g', 'down', 0)], ['no'], 10),
      F('git add -A &amp;&amp; git commit -m "TF-12"', 'Os commits do TF ficam <b>só na sua máquina</b> (tracejados): ninguém mais os vê ainda.',
        [C('mX', 4, 3, ['mD'], 'gl loc', 'X'), C('mY', 5, 3, ['mX'], 'gl loc', 'Y'), T('mg', '6325000-tf-12', 'mY', 'g', 'down', 0)], [], 9),
      F('git push -u origin 6325000-tf-12', 'O <b>push</b> vai para o <b>seu fork</b> (origin), onde você tem permissão, e só do galho. O main do professor segue intocado.',
        [AR('ps', 'mX', 'fX', 'push', 'push', 0), C('mX', 4, 3, ['mD'], 'gl', 'X'), C('mY', 5, 3, ['mX'], 'gl', 'Y'),
         C('fX', 4, 1.5, ['fD'], 'gl', 'X'), C('fY', 5, 1.5, ['fX'], 'gl', 'Y'), T('fg', '6325000-tf-12', 'fY', 'g', 'down', 0)], [], 11),
      F('botão Compare &amp; pull request', 'O <b>Pull Request</b> é um <b>pedido</b>: &quot;professor, puxe o meu galho&quot;. Ele lê, comenta e avalia. Sozinho, não escreve nada no main.',
        [AR('pq', 'fY', 'pD', 'Pull Request', 'pr', V(90, 70)), X('prx', V(col(5) + 10, 452), V(54 + 5, 64 + 5), V('PR aberto, aguardando revisão', 'PR aberto'), 'gl')], ['ps'], 11),
      F('', 'O PR <b>nunca é mesclado</b>: a main do professor não muda e o galho fica no GitHub como <b>histórico</b> da entrega.',
        [X('prx', V(col(5) + 10, 452), V(54 + 5, 64 + 5), V('main intacta · PR não mesclado', 'PR não mesclado'), 'ok')], [], 10)
    ] };
  };

  /* o fluxo todo, só com repositórios e setas: fork, clone, pull do upstream, push e PR */
  CENAS.fluxopr = function(){
    /* horizontal: triângulo (professor em cima; fork à direita; máquina à esquerda).
       vertical: coluna (professor, fork, máquina), pull e PR contornando pelas laterais. */
    var P = V(N('np', 400, 18, 300, 112, 'Professor (upstream)', 'github.com/luan-tavares', 'pf'),
              N('np', 170, 12, 300, 104, 'Professor (upstream)', 'github.com/luan-tavares', 'pf'));
    var Fk = V(N('nf', 720, 232, 300, 112, 'Seu fork (origin)', 'github.com/SEU-USUARIO', 'tr'),
               N('nf', 170, 252, 300, 104, 'Seu fork (origin)', 'github.com/SEU-USUARIO', 'tr'));
    var M = V(N('nm', 80, 232, 300, 112, 'Sua máquina', 'terminal, VS Code', 'ink'),
              N('nm', 170, 492, 300, 104, 'Sua máquina', 'terminal, VS Code', 'ink'));
    var xp = V(X('xp', 550, 116, 'só o professor escreve', 'mut'), X('xp', 320, 104, 'só o professor escreve', 'mut'));
    var xf = V(X('xf', 870, 330, 'você escreve aqui', 'mut'), X('xf', 320, 344, 'você escreve aqui', 'mut'));
    var xm = V(X('xm', 230, 330, 'você trabalha aqui', 'mut'), X('xm', 320, 584, 'você trabalha aqui', 'mut'));
    var a1 = V(AR('a1', [650, 134], [790, 228], '① fork', 'fork', 0), AR('a1', [320, 120], [320, 248], '① fork', 'fork', 0));
    var a2 = V(AR('a2', [718, 264], [384, 264], '② clone (origin)', 'pull', 0), AR('a2', [250, 360], [250, 488], '② clone', 'pull', 0));
    var a3 = V(AR('a3', [470, 134], [250, 228], '③ pull upstream', 'pull', 0), AR('a3', [166, 64], [166, 544], '③ pull', 'pull', 190));
    var a4 = V(AR('a4', [384, 318], [716, 318], '④ push do galho', 'push', 0), AR('a4', [390, 488], [390, 360], '④ push', 'push', 0));
    var a5 = V(AR('a5', [930, 228], [704, 92], '⑤ Pull Request', 'pr', 70), AR('a5', [474, 304], [474, 64], '⑤ PR', 'pr', 170));
    return { h: V(372, 620), oy: 0, rh: 0, frames: [
      F('', 'O repositório do <b>professor</b>: você lê (clone e pull), mas <b>só ele escreve</b> no main.', [P, xp], [], 8),
      F('botão Fork (no GitHub)', '<b>① Fork:</b> uma cópia do repositório na <b>sua conta</b>. É no seu fork que você tem permissão de escrita.', [a1, Fk, xf], [], 9),
      F('git clone git@github.com:SEU-USUARIO/...', '<b>② Clone:</b> o seu fork vai para o computador. O <b>origin</b> aponta para ele.', [a2, M, xm], [], 9),
      F('git pull --ff-only upstream main', '<b>③ Pull do upstream:</b> as aulas novas vêm <b>direto do professor</b> para o seu main local. Nada é enviado.', [a3], [], 10),
      F('git push -u origin 6325000-tf-12', '<b>④ Push:</b> o galho do TF vai para o <b>seu fork</b> (origin), nunca para o professor.', [a4], [], 10),
      F('botão Compare & pull request (site do GitHub)', '<b>⑤ Pull Request:</b> o <b>pedido</b> para o professor puxar o seu galho. Ele corrige e fecha, sem mesclar.', [a5], [], 11)
    ] };
  };

  /* ------------------------------------------------------------------ SVG */
  function el(nome, attrs, cls){
    var e = document.createElementNS(NS, nome);
    if(cls){ e.setAttribute('class', cls); }
    if(attrs){ for(var k in attrs){ e.setAttribute(k, attrs[k]); } }
    return e;
  }

  /* ponta de seta: polígono com a ponta em (x,y) e a direção (tx,ty) já normalizada.
     (marker do SVG não sai no PDF, porque aponta para o <defs> de um slide oculto) */
  function ponta(x, y, tx, ty, tam){
    var nx = -ty, ny = tx, c = tam * 0.55;
    var bx = x - tx * tam, by = y - ty * tam;
    return (x) + ',' + (y) + ' ' + (bx + nx * c) + ',' + (by + ny * c) + ' ' + (bx - nx * c) + ',' + (by - ny * c);
  }
  /* resolve a etapa i: junta (cumulativo) todas as etapas de 0 a i */
  function estado(cena, i){
    var st = {};
    var ordem = [];
    var k, j, f, op;
    for(k = 0; k <= i; k++){
      f = cena.frames[k];
      for(j = 0; j < f.set.length; j++){
        op = f.set[j];
        if(!st[op.id]){ ordem.push(op.id); }
        st[op.id] = op;
      }
      for(j = 0; j < f.del.length; j++){
        delete st[f.del[j]];
      }
    }
    return { st: st, ordem: ordem };
  }

  function cx(cena, c){ return col(c.col); }
  function cy(cena, c){ return cena.oy + c.row * cena.rh; }

  function ponto(cena, st, ref){
    if(ref instanceof Array){ return { x: ref[0], y: ref[1], c: false }; }
    var c = st[ref];
    if(!c){ return null; }
    return { x: cx(cena, c), y: cy(cena, c), c: true };
  }

  function larguraTag(txt){ return Math.round((txt.length * 7.9 + 18) * FS); }

  function mostra(w, i, instantaneo){
    var cena = w.cena;
    var r = estado(cena, i);
    var st = r.st;
    var precisa = {};
    var novos = [];

    w.i = i;
    w.t = cena.frames[i].hold;
    w.root.classList.toggle('inst', !!instantaneo);

    function pega(id, camada, fabrica){
      var e = w.els[id];
      precisa[id] = true;
      if(e){ return e; }
      e = fabrica();
      e.classList.add('off');
      w.els[id] = e;
      w.camadas[camada].appendChild(e);
      novos.push(e);
      return e;
    }
    function move(e, x, y){ e.style.transform = 'translate(' + x + 'px,' + y + 'px)'; }

    r.ordem.forEach(function(id){
      var op = st[id];
      if(!op){ return; }
      var e;
      if(op.t === 'b'){
        var by = cena.oy + op.row * cena.rh - (cena.bh || 96) / 2;
        e = pega(id, 'b', function(){
          var g = el('g', null, 'bn');
          g.appendChild(el('rect', { x: 8, y: by, width: W - 16, height: cena.bh || 96, rx: 8 }, 'ban'));
          g.appendChild(el('text', { x: 20, y: by + (cena.bh || 96) / 2 - 2 }, 'ban-t')).textContent = op.txt;
          g.appendChild(el('text', { x: 20, y: by + (cena.bh || 96) / 2 + 16 }, 'ban-s')).textContent = op.sub;
          return g;
        });
        return;
      }
      if(op.t === 'n'){
        e = pega(id, 'b', function(){
          var g = el('g', null, 'nd ' + op.cls);
          g.appendChild(el('rect', { x: op.x, y: op.y, width: op.w, height: op.h, rx: 14 }));
          g.appendChild(el('text', { x: op.x + op.w / 2, y: op.y + op.h / 2 - 8 }, 'nd-t')).textContent = op.txt;
          g.appendChild(el('text', { x: op.x + op.w / 2, y: op.y + op.h / 2 + 18 }, 'nd-s')).textContent = op.sub;
          return g;
        });
        e.setAttribute('class', 'nd ' + op.cls + (novos.indexOf(e) >= 0 ? ' off' : ''));
        return;
      }
      if(op.t === 'c'){
        e = pega(id, 'c', function(){
          var g = el('g', null, 'cm ' + op.cls);
          g.appendChild(el('circle', { r: R }));
          g.appendChild(el('text', { x: 0, y: 1 })).textContent = op.txt;
          move(g, cx(cena, op), cy(cena, op));
          return g;
        });
        e.setAttribute('class', 'cm ' + op.cls + (novos.indexOf(e) >= 0 ? ' off' : ''));
        e.lastChild.textContent = op.txt;
        move(e, cx(cena, op), cy(cena, op));
        return;
      }
      if(op.t === 't'){
        var alvo = st[op.at];
        if(!alvo){ return; }
        var wd = larguraTag(op.txt);
        e = pega(id, 't', function(){
          var g = el('g', null, 'tg ' + op.kind);
          g.appendChild(el('rect', { x: 0, y: 0, height: TH }));
          g.appendChild(el('text', { y: TH / 2 + 1 }));
          return g;
        });
        e.setAttribute('class', 'tg ' + op.kind + (novos.indexOf(e) >= 0 ? ' off' : ''));
        e.firstChild.setAttribute('width', wd);
        e.lastChild.setAttribute('x', wd / 2);
        e.lastChild.textContent = op.txt;
        var tx = cx(cena, alvo) - wd / 2;
        var ty = cy(cena, alvo) - R - 8 - TH - op.n * TSTEP;
        if(op.side === 'down'){ ty = cy(cena, alvo) + R + 8 + op.n * TSTEP; }
        move(e, tx, ty);
        return;
      }
      if(op.t === 'a'){
        var p1 = ponto(cena, st, op.from);
        var p2 = ponto(cena, st, op.to);
        if(!p1 || !p2){ return; }
        var dx = p2.x - p1.x, dy = p2.y - p1.y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var ux = dx / len, uy = dy / len;
        var ini = p1.c ? R + 6 : 0;
        var fim = p2.c ? R + 12 : 6;
        var ax = p1.x + ux * ini, ay = p1.y + uy * ini;
        var bx = p2.x - ux * fim, by2 = p2.y - uy * fim;
        var nx = -uy, ny = ux;
        var mx = (ax + bx) / 2 + nx * op.bend, my = (ay + by2) / 2 + ny * op.bend;
        var d = 'M' + ax + ',' + ay + ' Q' + mx + ',' + my + ' ' + bx + ',' + by2;
        if(!op.bend){ d = 'M' + ax + ',' + ay + ' L' + bx + ',' + by2; }
        var lx = (ax + bx) / 2 + nx * op.bend / 2, ly = (ay + by2) / 2 + ny * op.bend / 2;
        e = pega(id, 'a', function(){
          var g = el('g', null, 'ar ' + op.cls);
          g.appendChild(el('path'));
          g.appendChild(el('polygon'));
          g.appendChild(el('text'));
          return g;
        });
        e.setAttribute('class', 'ar ' + op.cls + (novos.indexOf(e) >= 0 ? ' off' : ''));
        var tgx = bx - mx, tgy = by2 - my;
        if(!op.bend){ tgx = ux; tgy = uy; }
        var tl = Math.sqrt(tgx * tgx + tgy * tgy) || 1;
        tgx = tgx / tl; tgy = tgy / tl;
        e.firstChild.setAttribute('d', d);
        e.childNodes[1].setAttribute('points', ponta(bx + tgx * 12 * FS, by2 + tgy * 12 * FS, tgx, tgy, 14 * FS));
        e.lastChild.setAttribute('x', lx);
        e.lastChild.setAttribute('y', ly + 4);
        e.lastChild.textContent = op.txt;
        return;
      }
      if(op.t === 'x'){
        e = pega(id, 'x', function(){
          var tx2 = el('text', { x: op.x, y: op.y }, 'tx ' + op.cls);
          return tx2;
        });
        e.setAttribute('class', 'tx ' + op.cls + (novos.indexOf(e) >= 0 ? ' off' : ''));
        e.setAttribute('x', op.x);
        e.setAttribute('y', op.y);
        e.textContent = op.txt;
      }
    });

    /* setas para o pai (derivadas dos commits) */
    r.ordem.forEach(function(id){
      var c = st[id];
      if(!c || c.t !== 'c'){ return; }
      c.par.forEach(function(pid, k){
        var p = st[pid];
        if(!p){ return; }
        var eid = 'e:' + id + ':' + pid;
        var mesclou = c.par.length > 1 && k > 0;
        var e = pega(eid, 'e', function(){
          return el('g', null, 'ed');
        });
        var x1 = cx(cena, c) - R - 2, y1 = cy(cena, c);
        var x2 = cx(cena, p) + R + 7, y2 = cy(cena, p);
        var mx = (x1 + x2) / 2;
        var d = 'M' + x1 + ',' + y1 + ' C' + mx + ',' + y1 + ' ' + mx + ',' + y2 + ' ' + x2 + ',' + y2;
        if(Math.abs(y1 - y2) < 1){ d = 'M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2; }
        e.innerHTML = '';
        e.appendChild(el('path', { d: d }, 'ed' + (mesclou ? ' mg' : '')));
        e.appendChild(el('polygon', { points: ponta(x2 - 7, y2, -1, 0, 12) }, 'ed' + (mesclou ? ' mg' : '')));
        e.setAttribute('class', 'ed' + (novos.indexOf(e) >= 0 ? ' off' : ''));
      });
    });

    Object.keys(w.els).forEach(function(id){
      if(precisa[id]){ return; }
      w.els[id].classList.add('off');
    });
    if(!instantaneo){ void w.svg.getBoundingClientRect(); }
    novos.forEach(function(e){ e.classList.remove('off'); });
    Object.keys(precisa).forEach(function(id){ w.els[id].classList.remove('off'); });

    w.msg.innerHTML = cena.frames[i].msg;
    w.cmd.innerHTML = cena.frames[i].cmd;
    w.num.textContent = (i + 1) + '/' + cena.frames.length;
    Array.prototype.forEach.call(w.dots.children, function(d, k){ d.classList.toggle('on', k === i); });
  }

  /* ------------------------------------------------------------------ controles */
  var vivos = [];

  function pausa(w, sim){
    w.pausado = sim;
    w.btnPlay.textContent = sim ? '▶' : '❚❚';
    w.btnPlay.setAttribute('aria-label', sim ? 'Continuar a animação' : 'Pausar a animação');
  }
  function ir(w, i){
    var n = w.cena.frames.length;
    mostra(w, (i + n) % n, false);
  }

  function monta(root){
    var def = CENAS[root.getAttribute('data-gitviz')];
    if(!def){ return; }
    var cena = def();
    root.classList.add('gv');
    if(VERT){ root.classList.add('vert'); }
    root.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + cena.h + '" role="img" aria-label="Linha do tempo do Git"></svg>' +
      '<div class="gcap"><span class="gcmd"></span><span class="gmsg"></span></div>' +
      '<div class="gctl"><button type="button" data-a="ant" aria-label="Etapa anterior">◀</button>' +
        '<button type="button" data-a="play" aria-label="Pausar a animação">❚❚</button>' +
        '<button type="button" data-a="prox" aria-label="Próxima etapa">▶</button>' +
        '<span class="gdots">' + cena.frames.map(function(){ return '<i></i>'; }).join('') + '</span>' +
        '<span class="gn"></span><span class="ghint">P pausa · , e . andam as etapas</span></div>';
    var svg = root.querySelector('svg');
    var camadas = {};
    ['b', 'e', 'c', 'a', 't', 'x'].forEach(function(k){
      var g = el('g');
      camadas[k] = g;
      svg.appendChild(g);
    });
    var w = {
      root: root, slide: root.closest('.slide'), cena: cena, svg: svg, camadas: camadas, els: {}, i: 0, t: 0, on: false, pausado: false,
      cmd: root.querySelector('.gcmd'), msg: root.querySelector('.gmsg'), num: root.querySelector('.gn'), dots: root.querySelector('.gdots'),
      btnPlay: root.querySelector('[data-a="play"]')
    };
    // tela vertical: tocar na figura avança a etapa (pausa o automático)
    if(VERT){
      svg.addEventListener('click', function(){ pausa(w, true); ir(w, w.i + 1); });
    }
    root.addEventListener('click', function(e){
      var b = e.target.closest('[data-a]');
      if(b){
        var a = b.getAttribute('data-a');
        if(a === 'play'){ pausa(w, !w.pausado); return; }
        pausa(w, true);
        ir(w, a === 'prox' ? w.i + 1 : w.i - 1);
        return;
      }
      var d = e.target.closest('.gdots i');
      if(!d){ return; }
      pausa(w, true);
      ir(w, Array.prototype.indexOf.call(w.dots.children, d));
    });
    // PDF e miniaturas mostram a última etapa (a imagem completa)
    mostra(w, cena.frames.length - 1, true);
    var pedida = parseInt(new URLSearchParams(location.search).get('etapa'), 10);
    if(!isNaN(pedida)){ mostra(w, Math.min(Math.max(pedida - 1, 0), cena.frames.length - 1), true); pausa(w, true); w.fixa = true; }
    vivos.push(w);
  }

  Array.prototype.forEach.call(deck.querySelectorAll('[data-gitviz]'), monta);

  function visivel(){
    for(var i = 0; i < vivos.length; i++){
      if(!vivos[i].slide.hidden){ return vivos[i]; }
    }
    return null;
  }

  window.addEventListener('keydown', function(e){
    if(e.ctrlKey || e.metaKey || e.altKey){ return; }
    var w = visivel();
    if(!w){ return; }
    var k = e.key.toLowerCase();
    if(k === 'p'){ pausa(w, !w.pausado); return; }
    if(k === ','){ pausa(w, true); ir(w, w.i - 1); return; }
    if(k === '.'){ pausa(w, true); ir(w, w.i + 1); }
  });

  setInterval(function(){
    vivos.forEach(function(w){
      var ativo = !w.slide.hidden && !document.hidden;
      if(!ativo){ w.on = false; return; }
      if(w.fixa){ return; }
      if(!w.on){ w.on = true; pausa(w, false); mostra(w, 0, true); return; }
      if(w.pausado){ return; }
      w.t = w.t - 1;
      if(w.t > 0){ return; }
      ir(w, w.i + 1);
    });
  }, 450);

  window.GITVIZ = { vivos: vivos, mostra: mostra, pausa: pausa };
})();
