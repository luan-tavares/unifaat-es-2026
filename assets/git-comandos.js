/* Aba "Comandos Git" da página aulas/git-fluxo: o significado de cada comando
   que aparece no fluxo e no troubleshooting. Cada comando: o que faz, o que é
   cada parte (flags), quando usar, cuidado e um exemplo com comentário em cima.
   A troca de abas fica em git-troubleshooting.js. Sem else: early return / continue. */
(function(){
  var view = document.getElementById('view-cmds');
  var fill = window.gitFluxoFillCmd;

  var GROUPS = ['Preparação (uma vez)', 'Dia a dia (o ciclo da aula)', 'Para corrigir erros', 'Chave SSH'];

  var CMDS = [
    /* ── preparação ── */
    {
      g: 0, cmd: 'Fork (botão do GitHub)',
      what: 'Não é um comando: é um botão. Cria uma <b>cópia do repositório do professor na sua conta</b>. É no seu fork que você tem permissão de escrita.',
      parts: [],
      when: '<b>ANTES do clone</b>, uma vez só no semestre.',
      careful: 'Se você clonar o repo do professor em vez do seu fork, o push é recusado (403).',
      ex: '# no navegador: abra o repo do professor e clique no botão Fork (canto superior direito)\n# https://github.com/luan-tavares/unifaat-es-2026'
    },
    {
      g: 0, cmd: 'git clone <url>',
      what: 'Baixa o repositório inteiro (todos os commits) para uma pasta nova e configura o remoto <code>origin</code> apontando para a URL usada.',
      parts: [['git@github.com:ALUNO/...git', 'a URL SSH do <b>seu fork</b> (ALUNO = seu usuário do GitHub)']],
      when: 'Uma única vez, logo depois do fork.',
      careful: 'A URL tem que ser a do <b>seu fork</b>, não a do professor.',
      ex: '# baixa o SEU fork para a pasta unifaat-es-2026 (troque ALUNO pelo seu usuário)\ngit clone git@github.com:ALUNO/unifaat-es-2026.git'
    },
    {
      g: 0, cmd: 'cd <pasta>',
      what: 'Não é do Git: é do terminal. Entra na pasta do projeto, onde os comandos do Git passam a valer.',
      parts: [],
      when: 'Depois do clone, e sempre que abrir um terminal novo.',
      ex: '# entra na pasta do projeto clonado\ncd unifaat-es-2026'
    },
    {
      g: 0, cmd: 'git remote add upstream <url>',
      what: 'Dá o apelido <code>upstream</code> a outro repositório: o <b>do professor</b>. Serve só para <b>ler</b> as aulas novas.',
      parts: [['remote', 'gerencia os endereços de outros repositórios'], ['add', 'cadastra um endereço novo'], ['upstream', 'o apelido (poderia ser qualquer nome; usamos este)']],
      when: 'Uma vez, logo depois do clone.',
      careful: 'Se já existir um remoto com esse nome, dá erro (use <code>set-url</code> para corrigir).',
      ex: '# cadastra o repo do professor com o apelido upstream (só para ler)\ngit remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git'
    },
    {
      g: 0, cmd: 'git remote -v',
      what: 'Lista os repositórios remotos cadastrados e suas URLs. O certo são dois: <code>origin</code> (seu fork) e <code>upstream</code> (professor).',
      parts: [['-v', '"verbose": mostra as URLs, não só os nomes']],
      when: 'Para conferir a preparação ou quando o push/pull falhar.',
      ex: '# mostra para onde apontam origin (seu fork) e upstream (professor)\ngit remote -v'
    },
    {
      g: 0, cmd: 'git remote set-url <nome> <url>',
      what: 'Troca a URL de um remoto que já existe.',
      parts: [['set-url', 'altera o endereço'], ['<nome>', 'origin ou upstream']],
      when: 'Quando o <code>origin</code> está apontando para o professor, ou o <code>upstream</code> está com a URL errada.',
      ex: '# corrige o origin para apontar para o SEU fork (troque ALUNO pelo seu usuário)\ngit remote set-url origin git@github.com:ALUNO/unifaat-es-2026.git'
    },

    /* ── dia a dia ── */
    {
      g: 1, cmd: 'git switch <branch>',
      what: 'Troca para outra branch: o Git passa a trabalhar nela. Os arquivos da pasta mudam para o estado dessa branch.',
      parts: [['switch', 'troca de branch'], ['main', 'a branch do professor (cópia, onde ninguém commita)']],
      when: 'Etapa 2 do ciclo: ir para o <code>main</code> antes do pull. E para voltar a uma folha.',
      careful: 'Com arquivos modificados e sem commit, o Git pode recusar a troca. Commite ou use <code>git stash</code>.',
      ex: '# vai para o main (a cópia do professor)\ngit switch main'
    },
    {
      g: 1, cmd: 'git switch -c <nova-branch>',
      what: 'Cria uma branch nova a partir de onde você está <b>e já entra nela</b>. É assim que se cria a branch de cada TF.',
      parts: [['-c', '"create": cria a branch'], ['1234567-tf-12', 'o nome obrigatório: <code>RA-tf-NN</code> (seu RA, <code>-tf-</code>, número do TF com 2 dígitos)']],
      when: 'Etapa 3 do ciclo, <b>antes</b> de editar qualquer arquivo e <b>depois</b> do pull.',
      careful: 'Use o nome certo (<code>RA-tf-NN</code>): ele identifica de quem é o PR. Não confunda com <code>git branch nome</code>, que cria mas <b>não entra</b>.',
      ex: '# cria a branch do TF e já entra nela (troque 1234567 pelo seu RA)\ngit switch -c 1234567-tf-12'
    },
    {
      g: 1, cmd: 'git pull --ff-only upstream main',
      what: 'Traz a aula nova do repo do professor para o seu <code>main</code>. O <code>pull</code> é um <em>fetch</em> (baixa) mais um <em>merge</em> (junta).',
      parts: [['pull', 'baixa e junta'], ['--ff-only', '"fast-forward only": só aceita avanço limpo. Se não der, recusa, em vez de criar um commit de merge'], ['upstream', 'de qual repositório (o do professor)'], ['main', 'de qual branch']],
      when: 'Etapa 2 do ciclo, <b>estando no main</b>.',
      careful: 'Se der "Not possible to fast-forward", o seu <code>main</code> foi alterado (veja o Troubleshooting) ou você não está no <code>main</code>.',
      ex: '# traz a aula nova; só aceita avanço limpo (se der erro, o main foi alterado)\ngit pull --ff-only upstream main'
    },
    {
      g: 1, cmd: 'git add -A',
      what: 'Marca <b>todos</b> os arquivos novos, alterados e apagados para entrarem no próximo commit (a "área de preparação").',
      parts: [['add', 'marca para o commit'], ['-A', '"all": tudo, inclusive arquivos novos e apagados']],
      when: 'Depois de fazer o TF, antes do commit.',
      careful: 'Sem o <code>add</code>, o commit sai vazio ("nothing added to commit").',
      ex: '# marca todos os arquivos alterados para o commit\ngit add -A'
    },
    {
      g: 1, cmd: 'git commit -m "mensagem"',
      what: 'Grava um commit (uma "foto" do projeto) na <b>branch em que você está</b>, com a mensagem entre aspas.',
      parts: [['commit', 'grava a foto'], ['-m', '"message": a mensagem vai na própria linha']],
      when: 'Depois do <code>git add -A</code>, na branch do TF.',
      careful: 'Só entra no commit o que foi marcado com <code>git add</code>. Confira a branch com <code>git branch</code> antes: commit no <code>main</code> é erro.',
      ex: '# grava o TF na branch atual\ngit commit -m "TF-12"'
    },
    {
      g: 1, cmd: 'git push -u origin <branch>',
      what: 'Envia a branch para o <b>seu fork</b> no GitHub.',
      parts: [['push', 'envia commits'], ['-u', '"set upstream": guarda o destino; nos próximos pushes basta <code>git push</code>'], ['origin', 'o seu fork'], ['1234567-tf-12', 'a branch a enviar']],
      when: 'Etapa 4 do ciclo, uma vez por branch nova; depois, abrir o Pull Request.',
      careful: 'O destino é sempre o <code>origin</code> (seu fork), nunca o <code>upstream</code> (professor): lá você não tem permissão.',
      ex: '# envia a branch para o SEU fork e guarda o destino\ngit push -u origin 1234567-tf-12'
    },
    {
      g: 1, cmd: 'git status',
      what: 'Mostra em que branch você está, o que mudou e o que já foi marcado para o commit.',
      parts: [],
      when: 'Sempre que estiver em dúvida, e antes de commitar.',
      ex: '# mostra a branch atual, o que mudou e o que falta commitar\ngit status'
    },
    {
      g: 1, cmd: 'git branch',
      what: 'Lista as branches locais. O <code>*</code> marca a branch atual.',
      parts: [['git branch nome', 'cria uma branch com esse nome, <b>mas não entra nela</b>']],
      when: 'Antes de commitar, para conferir que não está no <code>main</code>.',
      ex: '# lista as branches (o * marca a atual)\ngit branch'
    },
    {
      g: 1, cmd: 'git log --oneline --graph --all -10',
      what: 'Mostra o histórico de commits de forma resumida.',
      parts: [['--oneline', 'um commit por linha'], ['--graph', 'desenha as ligações entre os commits'], ['--all', 'de todas as branches, não só da atual'], ['-10', 'só os 10 últimos']],
      when: 'Para ver onde cada branch está.',
      ex: '# os últimos commits, em grafo, de todas as branches\ngit log --oneline --graph --all -10'
    },
    {
      g: 1, cmd: 'git fetch upstream',
      what: 'Baixa as novidades do repo do professor <b>sem mexer em nenhuma branch sua</b>. Só atualiza a cópia de leitura <code>upstream/main</code>.',
      parts: [['fetch', 'baixa, mas não junta'], ['upstream', 'o repo do professor']],
      when: 'Antes de comparar a sua folha com a aula nova (<code>git diff</code>).',
      ex: '# baixa as novidades do professor sem mexer em nada seu\ngit fetch upstream'
    },
    {
      g: 1, cmd: 'git diff <a>...<b>',
      what: 'Mostra diferenças entre dois pontos do histórico.',
      parts: [['a...b (três pontos)', 'o que <b>b</b> mudou desde a base comum com <b>a</b>: "o que eu fiz"'], ['a b (sem pontos)', 'a diferença entre as duas pontas: "folha contra gabarito"']],
      when: 'Etapa 2 da volta seguinte, para ver o seu TF contra a aula nova.',
      ex: '# o que VOCÊ fez no TF (desde a base comum com a aula)\ngit diff upstream/main...1234567-tf-12\n# sua folha contra a aula nova (a solução vem dentro dela)\ngit diff 1234567-tf-12 upstream/main'
    },

    /* ── correções ── */
    {
      g: 2, cmd: 'git reset --hard <ref>',
      what: 'Move a branch atual para outro ponto <b>e apaga as alterações não commitadas</b>. Usado para devolver o <code>main</code> ao estado do professor.',
      parts: [['reset', 'move a ponta da branch'], ['--hard', 'também reescreve os arquivos da pasta (perde o que não foi commitado)'], ['upstream/main', 'para onde mover'], ['ORIG_HEAD', 'o ponto de antes da última operação grande (um pull, por exemplo)']],
      when: 'Só nas correções do Troubleshooting.',
      careful: '<b>Perigoso:</b> só use com o seu trabalho já guardado em outra branch.',
      ex: '# devolve o main ao estado do professor (guarde seu trabalho em outra branch ANTES)\ngit reset --hard upstream/main'
    },
    {
      g: 2, cmd: 'git cherry-pick <hash>',
      what: 'Copia um commit específico para a branch atual (com um hash novo).',
      parts: [['<hash>', 'o código do commit (veja em <code>git log --oneline</code>)'], ['a^..b', 'um intervalo: do commit <b>a</b> até o <b>b</b>'], ['--continue', 'depois de resolver um conflito']],
      when: 'Para levar só os commits do TF para uma branch nova.',
      ex: '# copia os commits do TF para a branch atual (use os seus hashes)\ngit cherry-pick 8b2d7e4 3f9a1c2'
    },
    {
      g: 2, cmd: 'git branch -m / -D',
      what: 'Renomeia ou apaga uma branch local.',
      parts: [['-m velho novo', '"move": renomeia'], ['-D nome', 'apaga à força, mesmo sem merge']],
      when: 'Ao refazer uma branch de TF.',
      careful: 'O <code>-D</code> apaga a branch local; confira que não é a única cópia do trabalho.',
      ex: '# renomeia a branch antiga para sobrar o nome certo\ngit branch -m 1234567-tf-13 1234567-tf-13-velha\n# apaga a branch velha, que não serve mais\ngit branch -D 1234567-tf-13-velha'
    },
    {
      g: 2, cmd: 'git stash / git stash pop',
      what: 'Guarda as alterações não commitadas de lado e devolve depois.',
      parts: [['stash', 'guarda de lado e deixa a pasta limpa'], ['stash pop', 'traz de volta o que foi guardado']],
      when: 'Quando precisa trocar de branch e não quer commitar ainda.',
      ex: '# guarda as alterações de lado, sem commitar\ngit stash\n# traz o rascunho de volta quando quiser\ngit stash pop'
    },
    {
      g: 2, cmd: 'git push --force-with-lease origin <branch>',
      what: 'Sobrescreve a branch no <b>seu fork</b> com a sua versão local. É a versão "segura" do force push.',
      parts: [['--force-with-lease', 'só sobrescreve se ninguém mexeu na branch remota desde a sua última leitura']],
      when: 'Depois de reescrever uma branch que já tinha sido enviada.',
      careful: 'Só no <b>seu</b> fork e só na <b>sua</b> branch de TF. Nunca no <code>main</code>.',
      ex: '# atualiza a branch no seu fork (só sobrescreve o que é seu)\ngit push --force-with-lease origin 1234567-tf-12'
    },

    /* ── chave SSH ── */
    {
      g: 3, cmd: 'ssh-keygen -t ed25519 -C "email"',
      what: 'Gera um par de chaves SSH: uma <b>privada</b> (fica só no seu computador) e uma <b>pública</b> (você cadastra no GitHub).',
      parts: [['-t ed25519', 'o tipo (algoritmo) da chave'], ['-C "email"', 'um comentário para identificar a chave']],
      when: 'Uma vez, antes do clone por SSH.',
      careful: 'Nunca envie ou cole o arquivo da chave privada (o que <b>não</b> termina em <code>.pub</code>).',
      ex: '# gera um par de chaves (aperte Enter nas perguntas)\nssh-keygen -t ed25519 -C "seu-email@exemplo.com"'
    },
    {
      g: 3, cmd: 'cat ~/.ssh/id_ed25519.pub',
      what: 'Mostra o conteúdo da chave <b>pública</b>, para você copiar e colar no GitHub (Settings, SSH and GPG keys).',
      parts: [['.pub', 'a terminação que indica a chave pública']],
      when: 'Logo depois de gerar a chave.',
      ex: '# mostra a chave PÚBLICA: copie a linha inteira\ncat ~/.ssh/id_ed25519.pub'
    },
    {
      g: 3, cmd: 'ssh -T git@github.com',
      what: 'Testa se o GitHub reconhece a sua chave.',
      parts: [['-T', 'não abre terminal, só testa a conexão']],
      when: 'Depois de cadastrar a chave.',
      ex: '# testa a conexão: deve responder "Hi SEU_USUARIO!"\nssh -T git@github.com'
    }
  ];

  document.getElementById('cmds-count').textContent = String(CMDS.length);

  function h(tag, cls, html){
    var n = document.createElement(tag);
    if(cls){ n.className = cls; }
    if(html !== undefined){ n.innerHTML = html; }
    return n;
  }

  function card(c){
    var d = h('article', 'cmd-card');
    d.dataset.text = (c.cmd + ' ' + c.what).replace(/<[^>]+>/g, '').toLowerCase();

    var head = h('h3', 'cmd-name');
    var name = h('code');
    name.textContent = c.cmd;
    head.appendChild(name);
    d.appendChild(head);

    d.appendChild(h('p', 'cmd-what', c.what));

    if(c.parts.length){
      var dl = h('dl', 'cmd-parts');
      c.parts.forEach(function(p){
        var dt = h('dt');
        var tok = h('code');
        tok.textContent = p[0];
        dt.appendChild(tok);
        dl.appendChild(dt);
        dl.appendChild(h('dd', '', p[1]));
      });
      d.appendChild(dl);
    }

    d.appendChild(h('p', 'cmd-when', '<b>Quando usar:</b> ' + c.when));
    if(c.careful){ d.appendChild(h('p', 'cmd-careful', '<b>Cuidado:</b> ' + c.careful)); }

    var pre = h('pre');
    var code = h('code');
    fill(code, c.ex);
    pre.appendChild(code);
    d.appendChild(pre);

    var copy = h('button', 'btn', 'copiar');
    copy.type = 'button';
    copy.addEventListener('click', function(){
      if(!navigator.clipboard){ return; }
      navigator.clipboard.writeText(c.ex).then(function(){ copy.textContent = 'copiado ✓'; });
    });
    d.appendChild(copy);
    return d;
  }

  var intro = h('div', 'diag');
  intro.appendChild(h('h3', '', 'O significado de cada comando'));
  intro.appendChild(h('p', '', 'Todos os comandos que aparecem no fluxo e no troubleshooting, com o que cada parte quer dizer. Nos exemplos, a linha de <b>comando</b> está em negrito e o <b>comentário</b> (<code>#</code>) explica o que ela faz.'));
  var search = h('input', 'cmd-search');
  search.type = 'search';
  search.placeholder = 'filtrar comandos (ex.: push, switch, reset)';
  search.setAttribute('aria-label', 'Filtrar comandos');
  intro.appendChild(search);
  view.appendChild(intro);

  var sections = GROUPS.map(function(title, gi){
    var sec = h('section', 'cmd-group');
    sec.appendChild(h('h2', 'cmd-group-title', title));
    var grid = h('div', 'cmd-grid');
    var cards = CMDS.filter(function(c){ return c.g === gi; }).map(function(c){
      var el = card(c);
      grid.appendChild(el);
      return el;
    });
    sec.appendChild(grid);
    view.appendChild(sec);
    return { sec: sec, cards: cards };
  });

  search.addEventListener('input', function(){
    var q = search.value.trim().toLowerCase();
    sections.forEach(function(s){
      var shown = 0;
      s.cards.forEach(function(el){
        var on = !q || el.dataset.text.indexOf(q) !== -1;
        el.hidden = !on;
        if(on){ shown += 1; }
      });
      s.sec.hidden = shown === 0;
    });
  });
})();
