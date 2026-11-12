/* Aba Troubleshooting da página aulas/git-fluxo.
   Cada caso: o que o aluno fez, o que acontece, como corrigir (comandos sempre
   com um comentário em cima) e como evitar. Os casos que mexem na história dos
   commits trazem um mini-gráfico em quadros (antes → depois).
   Também cuida das abas (Fluxo do aluno / Troubleshooting) e do hash da URL.
   Sem else: early return / continue. */
(function(){
  var NS = 'http://www.w3.org/2000/svg';

  /* ── mini-gráfico ───────────────────────────────────── */
  var MW = 780;
  var X0 = 200;
  var DX = 110;
  var Y0 = 104;
  var ROW = 78;
  var MR = 12;

  function cm(id, lane, col, m, k, p){ return { id: id, lane: lane, col: col, m: m, k: k, p: p }; }
  function tg(t, at, kind){ return { t: t, at: at, kind: kind || 'main' }; }
  function nt(lane, col, s, dx, c){ return { lane: lane, col: col, s: s, dx: dx, c: c || 'warn' }; }
  function pick(all, ids){ return ids.map(function(id){ return all[id]; }); }

  function svgEl(name, attrs, parent){
    var n = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function(k){ n.setAttribute(k, attrs[k]); });
    if(parent){ parent.appendChild(n); }
    return n;
  }

  function drawMini(svg, g){
    svg.innerHTML = '';
    var height = Y0 + (g.lanes.length - 1) * ROW + 58;
    svg.setAttribute('viewBox', '0 0 ' + MW + ' ' + height);
    var xs = function(col){ return X0 + (col - 1) * DX; };
    var ys = function(lane){ return Y0 + lane * ROW; };
    var byId = {};
    g.commits.forEach(function(c){ byId[c.id] = c; });

    g.lanes.forEach(function(name, i){
      svgEl('line', { 'class': 'lane-guide', x1: 150, x2: MW - 10, y1: ys(i), y2: ys(i) }, svg);
      svgEl('text', { 'class': 'lane-name', x: 12, y: ys(i) + 4 }, svg).textContent = name;
    });

    g.commits.forEach(function(c){
      if(!c.p){ return; }
      var a = byId[c.p];
      var d = 'M' + xs(a.col) + ',' + ys(a.lane) + ' L' + xs(c.col) + ',' + ys(c.lane);
      if(a.lane !== c.lane){ d = 'M' + xs(a.col) + ',' + ys(a.lane) + ' C' + (xs(a.col) + 45) + ',' + ys(a.lane) + ' ' + (xs(c.col) - 45) + ',' + ys(c.lane) + ' ' + xs(c.col) + ',' + ys(c.lane); }
      svgEl('path', { 'class': 'edge', d: d }, svg);
    });

    g.commits.forEach(function(c){
      var grp = svgEl('g', { 'class': 'commit k-' + c.k, transform: 'translate(' + xs(c.col) + ',' + ys(c.lane) + ')' }, svg);
      svgEl('circle', { 'class': 'dot', r: MR }, grp);
      svgEl('text', { 'class': 'c-msg', y: MR + 18 }, grp).textContent = c.m;
    });

    /* dois ponteiros no mesmo commit: o segundo fica ao lado do nó */
    var count = {};
    g.tags.forEach(function(t){
      var c = byId[t.at];
      var side = count[t.at] || 0;
      count[t.at] = side + 1;
      var w = t.t.length * 8 + 22;
      var grp = svgEl('g', { 'class': 'tag ' + t.kind, transform: 'translate(' + xs(c.col) + ',' + ys(c.lane) + ')' }, svg);
      if(side === 0){
        svgEl('path', { 'class': 'stem', d: 'M0,-32 L0,-' + (MR + 2) }, grp);
        svgEl('rect', { x: -w / 2, y: -56, width: w, height: 24, rx: 12 }, grp);
        svgEl('text', { y: -39 }, grp).textContent = t.t;
        return;
      }
      svgEl('path', { 'class': 'stem', d: 'M' + (MR + 1) + ',0 L' + (MR + 14) + ',0' }, grp);
      svgEl('rect', { x: MR + 14, y: -12, width: w, height: 24, rx: 12 }, grp);
      svgEl('text', { x: MR + 14 + w / 2, y: 5 }, grp).textContent = t.t;
    });

    g.notes.forEach(function(n){
      svgEl('text', { 'class': 'note ' + n.c, x: xs(n.col) + n.dx, y: ys(n.lane) + 5, 'text-anchor': 'start' }, svg).textContent = n.s;
    });
  }

  /* ── casos ──────────────────────────────────────────── */
  var LANES3 = ['professor · main', 'aluno · main', 'RA-tf-12'];

  var C1 = {
    pA8: cm('pA8', 0, 1, 'Aula 12', 'base'),
    pA9: cm('pA9', 0, 3, 'Aula 13', 'base', 'pA8'),
    aA8: cm('aA8', 1, 1, 'Aula 12', 'base'),
    aA9: cm('aA9', 1, 3, 'Aula 13', 'base', 'aA8'),
    stray: cm('stray', 1, 2, 'TF-12', 'stray', 'aA8'),
    leaf: cm('leaf', 2, 2, 'TF-12', 'tf', 'aA8')
  };

  var LANES4 = ['professor · main', 'aluno · main', 'RA-tf-12', 'RA-tf-13'];
  var C2 = {
    pA8: cm('pA8', 0, 1, 'Aula 12', 'base'),
    pA9: cm('pA9', 0, 3, 'Aula 13', 'base', 'pA8'),
    aA8: cm('aA8', 1, 1, 'Aula 12', 'base'),
    aA9: cm('aA9', 1, 3, 'Aula 13', 'base', 'aA8'),
    t8: cm('t8', 2, 2, 'TF-12', 'tf', 'aA8'),
    bad: cm('bad', 2, 4, 'TF-13', 'stray', 't8'),
    t9: cm('t9', 3, 4, 'TF-13', 'tf', 'aA9')
  };

  var LANES5 = ['professor · main', 'aluno · main', 'RA-tf-13'];
  var C4 = {
    pA8: cm('pA8', 0, 1, 'Aula 12', 'base'),
    pA9: cm('pA9', 0, 2, 'Aula 13', 'base', 'pA8'),
    aA8: cm('aA8', 1, 1, 'Aula 12', 'base'),
    aA9: cm('aA9', 1, 2, 'Aula 13', 'base', 'aA8'),
    old: cm('old', 2, 2, 'TF-13', 'stray', 'aA8'),
    fix: cm('fix', 2, 3, 'TF-13', 'tf', 'aA9')
  };

  var CASES = [
    {
      t: 'Commitou direto no main',
      cat: 'Branch',
      short: 'git pull recusa: "Not possible to fast-forward"',
      did: 'Fez o TF e commitou com o <code>main</code> ativo, sem criar a branch <code>RA-tf-NN</code> antes. Ou usou <code>git branch nome</code>, que cria a branch mas <b>não entra nela</b>. O commit do TF foi parar no <code>main</code>, que só deveria receber pull.',
      sees: 'Funciona até o professor publicar a próxima aula. Aí o pull recusa, porque as histórias divergiram, e o <code>git status</code> mostra o <code>main</code> "à frente".',
      msg: 'git pull --ff-only upstream main\nfatal: Not possible to fast-forward, aborting.\n\ngit status\nOn branch main\nYour branch is ahead of \'origin/main\' by 1 commit.',
      fix: 'Guarda o commit numa branch com o nome certo e devolve o <code>main</code> ao estado do professor. Nada se perde. Se ainda houver arquivos sem commit, faça <code>git add -A</code> e <code>git commit</code> antes de tudo.',
      cmd: '# confere em que branch você está (o * marca a atual)\ngit branch\n# cria a branch correta apontando para o commit do TF (troque 1234567 pelo seu RA)\ngit branch 1234567-tf-12\n# baixa as novidades do professor\ngit fetch upstream\n# vai para o main\ngit switch main\n# devolve o main ao estado do professor (o commit do TF continua na branch criada acima)\ngit reset --hard upstream/main\n# volta para a branch do TF e continua\ngit switch 1234567-tf-12',
      prevent: 'Rode <code>git switch -c RA-tf-NN</code> <b>antes</b> de editar qualquer arquivo e confira o <code>*</code> do <code>git branch</code> antes de commitar.',
      frames: [
        { cap: '1 · o erro: o commit do TF foi para o main do aluno', g: { lanes: LANES3, commits: pick(C1, ['pA8', 'aA8', 'stray']), tags: [tg('main', 'pA8'), tg('main', 'stray')], notes: [] } },
        { cap: '2 · o professor publica a Aula 13 e o pull recusa: as histórias divergiram', g: { lanes: LANES3, commits: pick(C1, ['pA8', 'pA9', 'aA8', 'stray']), tags: [tg('main', 'pA9'), tg('main', 'stray')], notes: [nt(1, 3, '✗ pull --ff-only recusa', -10)] } },
        { cap: '3 · corrigindo: git branch cria a RA-tf-12 apontando para o commit do TF', g: { lanes: LANES3, commits: pick(C1, ['pA8', 'pA9', 'aA8', 'stray']), tags: [tg('main', 'pA9'), tg('main', 'stray'), tg('RA-tf-12', 'stray', 'leaf')], notes: [] } },
        { cap: '4 · corrigido: o main voltou a ser cópia do professor e o TF ficou na RA-tf-12', g: { lanes: LANES3, commits: pick(C1, ['pA8', 'pA9', 'aA8', 'aA9', 'leaf']), tags: [tg('main', 'pA9'), tg('main', 'aA9'), tg('RA-tf-12', 'leaf', 'leaf')], notes: [] } }
      ]
    },
    {
      t: 'Fez o TF-13 dentro da branch do TF-12',
      cat: 'Branch',
      short: 'o PR do TF-12 mostra os commits do TF-13 junto',
      did: 'Terminou o TF-12, não criou a branch nova e continuou commitando na <code>RA-tf-12</code>. Os commits do TF-13 ficaram empilhados em cima dos do TF-12.',
      sees: 'O PR do TF-12 passa a mostrar também os commits do TF-13, porque o PR segue a branch. Não existe a branch <code>RA-tf-13</code>: o TF-13 não tem PR próprio, e o TF só vale se o <b>PR aparecer</b> no repositório do professor: ele não vale até ser corrigido.',
      msg: 'git log --oneline\n3f9a1c2 TF-13 parte 2\n8b2d7e4 TF-13 parte 1\na2c9d34 ajustes\na11f0b2 TF-12',
      fix: 'Cria a <code>RA-tf-13</code> em cima do main do professor, copia só os commits do TF-13 e devolve a <code>RA-tf-12</code> ao que ela era. Use os <b>seus</b> hashes (os do exemplo são ilustrativos). Se o <code>cherry-pick</code> der conflito, resolva, rode <code>git add -A</code> e <code>git cherry-pick --continue</code>.',
      cmd: '# lista os commits e ANOTE os hashes: os do TF-12 e os do TF-13\ngit log --oneline -8\n# baixa a aula mais nova do professor\ngit fetch upstream\n# cria a branch certa do TF-13 em cima do main do professor (troque 1234567 pelo seu RA)\ngit switch -c 1234567-tf-13 upstream/main\n# copia só os commits do TF-13, do mais antigo para o mais novo (use os seus hashes)\ngit cherry-pick 8b2d7e4 3f9a1c2\n# envia a branch nova para o seu fork\ngit push -u origin 1234567-tf-13\n# volta para a branch do TF-12\ngit switch 1234567-tf-12\n# devolve a branch do TF-12 ao último commit dela (use o seu hash)\ngit reset --hard a2c9d34\n# atualiza o fork (--force-with-lease é seguro: só sobrescreve o que é seu)\ngit push --force-with-lease origin 1234567-tf-12',
      prevent: 'Ao começar cada TF novo, o primeiro comando é <code>git switch main</code> e o segundo, <code>git switch -c RA-tf-NN</code>.',
      frames: [
        { cap: '1 · o erro: os commits do TF-13 foram para a RA-tf-12', g: { lanes: LANES4, commits: pick(C2, ['pA8', 'pA9', 'aA8', 'aA9', 't8', 'bad']), tags: [tg('main', 'pA9'), tg('main', 'aA9'), tg('RA-tf-12', 'bad', 'leaf')], notes: [nt(2, 4, '✗ TF-13 sem branch própria', 22)] } },
        { cap: '2 · corrigido: a RA-tf-13 nasce do main e leva só o TF-13; a RA-tf-12 volta ao que era', g: { lanes: LANES4, commits: pick(C2, ['pA8', 'pA9', 'aA8', 'aA9', 't8', 't9']), tags: [tg('main', 'pA9'), tg('main', 'aA9'), tg('RA-tf-12', 't8', 'leaf'), tg('RA-tf-13', 't9', 'leaf')], notes: [] } }
      ]
    },
    {
      t: 'Esqueceu de voltar para o main antes do pull',
      cat: 'Pull',
      short: 'o pull acontece com a branch do TF ativa',
      did: 'Na aula seguinte rodou o pull sem sair da branch do TF: esqueceu o <code>git switch main</code>. A aula nova tenta entrar dentro da folha.',
      sees: 'Com <code>--ff-only</code>, o Git recusa. Sem ele, cria um commit de merge dentro da folha, e o PR passa a incluir a aula inteira.',
      msg: 'git pull --ff-only upstream main\nfatal: Not possible to fast-forward, aborting.\n\ngit branch\n* 1234567-tf-12\n  main',
      fix: 'Sai da folha e puxa no <code>main</code>.',
      cmd: '# mostra em que branch você está (o * marca a atual)\ngit branch\n# vai para o main, que é onde o pull acontece\ngit switch main\n# agora sim: traz a aula nova\ngit pull --ff-only upstream main',
      extra: { t: 'Se já rodou o pull sem --ff-only e criou o merge dentro da folha', cmd: '# volta a folha ao estado de antes do merge (só vale logo depois do pull)\ngit reset --hard ORIG_HEAD\n# vai para o main\ngit switch main\n# puxa a aula do jeito certo\ngit pull --ff-only upstream main' },
      prevent: 'Comece toda aula com <code>git switch main</code> e confira com <code>git branch</code> antes do pull.'
    },
    {
      t: 'Começou o TF sem dar pull',
      cat: 'Pull',
      short: 'o PR diz "This branch is behind"',
      did: 'Criou a <code>RA-tf-13</code> sem atualizar o <code>main</code> antes: a branch nasceu da aula antiga.',
      sees: 'O TF é feito em cima do código da Aula 12, sem a solução do TF-12, que vem dentro da Aula 13. O GitHub avisa que a branch está desatualizada e o código pode nem rodar.',
      msg: 'This branch is 1 commit behind luan-tavares:main.',
      fix: 'Recria a branch em cima da aula nova e traz só os commits do TF. Use os <b>seus</b> hashes. Se o <code>cherry-pick</code> der conflito, resolva, rode <code>git add -A</code> e <code>git cherry-pick --continue</code>.',
      cmd: '# anote os hashes dos seus commits do TF\ngit log --oneline -5\n# baixa as novidades do professor\ngit fetch upstream\n# renomeia a branch antiga para sobrar o nome certo (troque 1234567 pelo seu RA)\ngit branch -m 1234567-tf-13 1234567-tf-13-velha\n# cria a branch do TF de novo, agora em cima da aula nova\ngit switch -c 1234567-tf-13 upstream/main\n# traz só os commits do TF (primeiro^..último, com os seus hashes)\ngit cherry-pick 9c1d2e3^..4f5a6b7\n# apaga a branch velha, que não serve mais\ngit branch -D 1234567-tf-13-velha\n# se a velha já tinha sido enviada, sobrescreve no fork (só o que é seu)\ngit push -u --force-with-lease origin 1234567-tf-13',
      prevent: 'Ordem de ouro: <code>git switch main</code>, <code>git pull --ff-only upstream main</code> e só depois <code>git switch -c RA-tf-NN</code>.',
      frames: [
        { cap: '1 · o erro: a RA-tf-13 nasceu do main antigo (Aula 12)', g: { lanes: LANES5, commits: pick(C4, ['pA8', 'pA9', 'aA8', 'old']), tags: [tg('main', 'pA9'), tg('main', 'aA8'), tg('RA-tf-13', 'old', 'leaf')], notes: [nt(2, 2, '✗ não tem a Aula 13', 24)] } },
        { cap: '2 · corrigido: o main puxou a Aula 13 e a RA-tf-13 foi refeita em cima dela', g: { lanes: LANES5, commits: pick(C4, ['pA8', 'pA9', 'aA8', 'aA9', 'fix']), tags: [tg('main', 'pA9'), tg('main', 'aA9'), tg('RA-tf-13', 'fix', 'leaf')], notes: [] } }
      ]
    },
    {
      t: 'Push recusado: Permission denied (403)',
      cat: 'Push e PR',
      short: 'denied to ALUNO: o push foi para o repo do professor',
      did: 'Tentou dar push no repositório do professor: rodou <code>git push upstream ...</code> ou clonou o repo do professor em vez do próprio fork, e o <code>origin</code> aponta para ele.',
      sees: 'O GitHub recusa, porque o aluno não tem escrita no repo do professor.',
      msg: 'remote: Permission to luan-tavares/unifaat-es-2026.git denied to ALUNO.\nfatal: unable to access \'https://github.com/luan-tavares/unifaat-es-2026.git/\': The requested URL returned error: 403',
      fix: 'O <code>origin</code> tem que ser o <b>seu fork</b> e o <code>upstream</code>, o repo do professor. Se ainda não fez o fork, clique em <b>Fork</b> no GitHub antes. Se o <code>set-url</code> responder "No such remote", use <code>git remote add</code> no lugar.',
      cmd: '# mostra para onde apontam origin e upstream\ngit remote -v\n# origin tem que ser o SEU fork (troque ALUNO pelo seu usuário do GitHub)\ngit remote set-url origin git@github.com:ALUNO/unifaat-es-2026.git\n# upstream tem que ser o repo do professor (só para ler)\ngit remote set-url upstream git@github.com:luan-tavares/unifaat-es-2026.git\n# envia a branch para o SEU fork\ngit push -u origin 1234567-tf-12',
      prevent: 'O destino do push é sempre o <code>origin</code>: <code>git push -u origin RA-tf-NN</code>. Nunca o <code>upstream</code>.'
    },
    {
      t: 'git push sem destino (no upstream branch)',
      cat: 'Push e PR',
      short: 'fatal: The current branch ... has no upstream branch',
      did: 'Rodou <code>git push</code> numa branch nova, sem dizer para onde enviar.',
      sees: 'O Git não sabe qual remoto usar e não envia nada.',
      msg: 'fatal: The current branch 1234567-tf-12 has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream origin 1234567-tf-12',
      fix: 'Na primeira vez de cada branch, diga o destino com <code>-u</code>. Nos próximos pushes basta <code>git push</code>.',
      cmd: '# envia a branch para o seu fork e guarda o destino (-u = --set-upstream)\ngit push -u origin 1234567-tf-12',
      prevent: 'Primeiro push de toda branch: <code>git push -u origin RA-tf-NN</code>.'
    },
    {
      t: 'Pull Request aberto no lugar errado',
      cat: 'Push e PR',
      short: 'o PR não aparece para o professor',
      did: 'Abriu o PR com a base errada (o próprio fork em vez do repo do professor) ou abriu antes de enviar a branch.',
      sees: 'O PR aparece só no fork do aluno e nada chega na lista do professor. Ou o GitHub diz que não há nada para comparar.',
      msg: 'base repository: ALUNO/unifaat-es-2026           <- ERRADO\nbase repository: luan-tavares/unifaat-es-2026      <- CERTO\n\nThere isn\'t anything to compare.',
      fix: 'Feche o PR errado (botão <b>Close pull request</b>) e abra o novo pelo link. O título é <code>TF-NN · RA · Nome</code>.',
      cmd: '# garante que a branch está no fork (se já estiver, responde "Everything up-to-date")\ngit push -u origin 1234567-tf-12\n# abre este link no navegador (troque ALUNO e o RA) e confira: base = luan-tavares/...  main\nhttps://github.com/luan-tavares/unifaat-es-2026/compare/main...ALUNO:1234567-tf-12?expand=1',
      prevent: 'Antes de clicar em Create pull request, confira o cabeçalho: <code>base repository</code> tem que ser <code>luan-tavares/...</code>.'
    },
    {
      t: 'O commit não pegou nenhum arquivo',
      cat: 'Commit',
      short: 'nothing added to commit',
      did: 'Editou os arquivos, mas esqueceu de marcá-los com <code>git add</code>, ou mexeu em arquivo ignorado pelo <code>.gitignore</code>.',
      sees: 'O commit falha ou sai vazio, e o PR chega sem as mudanças.',
      msg: 'git commit -m "TF-12"\nOn branch 1234567-tf-12\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n        src/resources/ts/exemplo.ts\n\nnothing added to commit but untracked files present (use "git add" to track)',
      fix: 'Marque os arquivos e commite de novo. Depois confira se o commit existe.',
      cmd: '# mostra o que mudou e o que ainda não foi marcado para commit\ngit status\n# marca todos os arquivos alterados\ngit add -A\n# agora o commit pega as mudanças\ngit commit -m "TF-12"\n# confere que o commit existe na branch\ngit log --oneline -3',
      prevent: 'Antes de commitar, <code>git status</code>. Depois, <code>git log --oneline -3</code>.'
    },
    {
      t: 'Não consegue trocar de branch',
      cat: 'Branch',
      short: 'Your local changes would be overwritten by checkout',
      did: 'Tem arquivos modificados e sem commit e tentou <code>git switch</code> para outra branch.',
      sees: 'O Git recusa a troca para não perder o trabalho.',
      msg: 'error: Your local changes to the following files would be overwritten by checkout:\n        src/resources/ts/exemplo.ts\nPlease commit your changes or stash them before you switch branches.\nAborting',
      fix: 'Se o que está modificado é o TF, commite na branch em que você está. Se é só rascunho, guarde de lado com <code>stash</code>. <b>Nunca</b> use <code>git checkout .</code> nem <code>git reset --hard</code> sem ter certeza: eles apagam o trabalho.',
      cmd: '# opção 1 (é o TF): marca tudo\ngit add -A\n# grava na branch em que você está (confira antes com "git branch")\ngit commit -m "TF-12"\n# agora a troca funciona\ngit switch main',
      extra: { t: 'Opção 2: é só rascunho e você quer guardar de lado', cmd: '# guarda as alterações de lado, sem commitar\ngit stash\n# a troca de branch funciona\ngit switch main\n# traz o rascunho de volta quando quiser\ngit stash pop' },
      prevent: 'Commite (ou faça stash) antes de trocar de branch.'
    },
    {
      t: 'Permission denied (publickey)',
      cat: 'Configuração',
      short: 'a chave SSH não está cadastrada no GitHub',
      did: 'Não cadastrou a chave SSH na própria conta do GitHub (ou gerou a chave e não colou a pública).',
      sees: 'Qualquer comando por SSH (clone, pull, push) falha.',
      msg: 'git@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.',
      fix: 'Gere a chave, cadastre a <b>pública</b> na sua conta e teste. No Windows, use o Git Bash.',
      cmd: '# gera um par de chaves (aperte Enter nas perguntas)\nssh-keygen -t ed25519 -C "seu-email@exemplo.com"\n# mostra a chave PÚBLICA: copie a linha inteira\ncat ~/.ssh/id_ed25519.pub\n# GitHub > Settings > SSH and GPG keys > New SSH key > cole a linha copiada\n# testa a conexão: deve responder "Hi SEU_USUARIO!"\nssh -T git@github.com',
      extra: { t: 'Só para ler o repo do professor: dá para usar HTTPS (sem login)', cmd: '# troca o upstream para HTTPS: o pull de um repo público não pede login\ngit remote set-url upstream https://github.com/luan-tavares/unifaat-es-2026.git' },
      prevent: 'Teste <code>ssh -T git@github.com</code> no primeiro dia, junto com o fork.'
    },
    {
      t: '"upstream" não existe',
      cat: 'Configuração',
      short: "fatal: 'upstream' does not appear to be a git repository",
      did: 'Não rodou o <code>git remote add upstream ...</code> na preparação, ou digitou errado.',
      sees: 'O pull não encontra o repo do professor.',
      msg: "fatal: 'upstream' does not appear to be a git repository\nfatal: Could not read from remote repository.",
      fix: 'Veja quais remotos existem e adicione o que falta. O certo são dois: <code>origin</code> (seu fork) e <code>upstream</code> (professor).',
      cmd: '# lista os remotos que existem (precisa ter origin e upstream)\ngit remote -v\n# adiciona o upstream: o repo do professor, só para ler\ngit remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git\n# confere: agora as duas linhas aparecem\ngit remote -v',
      extra: { t: 'Se o upstream já existe, mas com a URL errada', cmd: '# corrige a URL do upstream\ngit remote set-url upstream git@github.com:luan-tavares/unifaat-es-2026.git' },
      prevent: 'Na preparação, uma vez só: fork, clone e <code>git remote add upstream</code>.'
    }
  ];

  var DIAG = '# em que branch você está (o * marca a atual)\ngit branch\n# o que mudou e o que falta commitar\ngit status\n# os últimos commits, em grafo, de todas as branches\ngit log --oneline --graph --all -10\n# para onde apontam origin (seu fork) e upstream (professor)\ngit remote -v';

  /* ── montagem da aba ────────────────────────────────── */
  var view = document.getElementById('view-erros');
  var viewFluxo = document.getElementById('view-fluxo');
  var tabFluxo = document.getElementById('tab-fluxo');
  var tabErros = document.getElementById('tab-erros');
  document.getElementById('erros-count').textContent = String(CASES.length);

  function h(tag, cls, html){
    var n = document.createElement(tag);
    if(cls){ n.className = cls; }
    if(html !== undefined){ n.innerHTML = html; }
    return n;
  }

  function cmdBlock(title, cmd){
    var box = h('div', 'cmd-block');
    if(title){ box.appendChild(h('h4', '', title)); }
    var pre = h('pre');
    var code = h('code');
    window.gitFluxoFillCmd(code, cmd);
    pre.appendChild(code);
    box.appendChild(pre);
    var copy = h('button', 'btn', 'copiar');
    copy.type = 'button';
    copy.addEventListener('click', function(){
      if(!navigator.clipboard){ return; }
      navigator.clipboard.writeText(cmd).then(function(){ copy.textContent = 'copiado ✓'; });
    });
    box.appendChild(copy);
    return box;
  }

  function miniBlock(frames){
    var box = h('div', 'mini-block');
    var svg = svgEl('svg', { 'class': 'mini', role: 'img', 'aria-label': 'Mini-gráfico de commits, antes e depois' }, box);
    var nav = h('div', 'mini-nav');
    var prev = h('button', 'btn', '←');
    var next = h('button', 'btn', '→');
    prev.type = 'button';
    next.type = 'button';
    var cap = h('span', 'mini-cap');
    nav.appendChild(prev);
    nav.appendChild(next);
    nav.appendChild(cap);
    box.appendChild(nav);
    var at = 0;
    function show(i){
      at = Math.max(0, Math.min(frames.length - 1, i));
      drawMini(svg, frames[at].g);
      cap.textContent = frames[at].cap;
      prev.disabled = at === 0;
      next.disabled = at === frames.length - 1;
    }
    prev.addEventListener('click', function(){ show(at - 1); });
    next.addEventListener('click', function(){ show(at + 1); });
    show(0);
    return box;
  }

  function caseCard(c, i){
    var d = h('details', 'case');
    d.id = 'erro-' + (i + 1);
    d.dataset.cat = c.cat;
    var sum = h('summary');
    sum.appendChild(h('span', 'case-n', String(i + 1)));
    var head = h('span', 'case-head');
    head.appendChild(h('span', 'case-t', c.t));
    head.appendChild(h('span', 'case-short', c.short));
    sum.appendChild(head);
    sum.appendChild(h('span', 'case-cat', c.cat));
    d.appendChild(sum);

    var body = h('div', 'case-body');
    var cols = h('div', 'case-cols');
    var did = h('div', 'case-col');
    did.appendChild(h('h3', '', 'O que o aluno fez'));
    did.appendChild(h('p', '', c.did));
    var sees = h('div', 'case-col');
    sees.appendChild(h('h3', '', 'O que acontece'));
    sees.appendChild(h('p', '', c.sees));
    var msg = h('pre', 'msg');
    msg.textContent = c.msg;
    sees.appendChild(msg);
    cols.appendChild(did);
    cols.appendChild(sees);
    body.appendChild(cols);

    if(c.frames){ body.appendChild(miniBlock(c.frames)); }

    body.appendChild(h('h3', '', 'Como corrigir'));
    body.appendChild(h('p', '', c.fix));
    body.appendChild(cmdBlock('', c.cmd));
    if(c.extra){ body.appendChild(cmdBlock(c.extra.t, c.extra.cmd)); }
    body.appendChild(h('p', 'prevent', '<b>Para evitar:</b> ' + c.prevent));
    d.appendChild(body);
    return d;
  }

  var intro = h('div', 'diag');
  intro.appendChild(h('h3', '', 'Antes de tudo: descubra onde você está'));
  intro.appendChild(h('p', '', 'Quase todo erro de Git some quando você olha para estes quatro comandos. Rode, leia a resposta e só então siga para o caso certo.'));
  intro.appendChild(cmdBlock('', DIAG));
  view.appendChild(intro);

  /* filtro por categoria */
  var cats = ['Todos'];
  CASES.forEach(function(c){ if(cats.indexOf(c.cat) === -1){ cats.push(c.cat); } });
  var bar = h('div', 'case-bar');
  var chips = cats.map(function(cat){
    var b = h('button', 'btn', cat);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(cat === 'Todos'));
    b.addEventListener('click', function(){
      chips.forEach(function(x){ x.setAttribute('aria-pressed', String(x === b)); });
      cards.forEach(function(card){ card.hidden = cat !== 'Todos' && card.dataset.cat !== cat; });
    });
    bar.appendChild(b);
    return b;
  });
  var toggleAll = h('button', 'btn ghost', 'abrir todos');
  toggleAll.type = 'button';
  toggleAll.addEventListener('click', function(){
    var open = toggleAll.textContent === 'abrir todos';
    cards.forEach(function(card){ card.open = open; });
    toggleAll.textContent = open ? 'fechar todos' : 'abrir todos';
  });
  bar.appendChild(toggleAll);
  view.appendChild(bar);

  var list = h('div', 'case-list');
  var cards = CASES.map(function(c, i){
    var card = caseCard(c, i);
    list.appendChild(card);
    return card;
  });
  view.appendChild(list);

  /* ── abas e hash ────────────────────────────────────── */
  var views = {
    fluxo: { tab: tabFluxo, view: viewFluxo, hash: '' },
    comandos: { tab: document.getElementById('tab-cmds'), view: document.getElementById('view-cmds'), hash: '#comandos' },
    erros: { tab: tabErros, view: view, hash: '#erros' }
  };

  function select(name){
    Object.keys(views).forEach(function(key){
      views[key].tab.setAttribute('aria-selected', String(key === name));
      views[key].view.hidden = key !== name;
    });
  }

  function openFromHash(){
    var m = /^#erro-(\d+)$/.exec(location.hash);
    if(location.hash === '#comandos'){
      select('comandos');
      return;
    }
    if(location.hash !== '#erros' && !m){ return; }
    select('erros');
    if(!m){ return; }
    var card = document.getElementById('erro-' + m[1]);
    if(!card){ return; }
    card.open = true;
    card.scrollIntoView();
  }

  Object.keys(views).forEach(function(name){
    views[name].tab.addEventListener('click', function(){
      select(name);
      history.replaceState(null, '', views[name].hash || location.pathname + location.search);
    });
  });
  document.getElementById('go-erros').addEventListener('click', function(){ tabErros.click(); });
  cards.forEach(function(card){
    card.addEventListener('toggle', function(){
      if(!card.open || view.hidden){ return; }
      history.replaceState(null, '', '#' + card.id);
    });
  });
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
