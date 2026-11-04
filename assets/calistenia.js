/* Slides "jeito ruim x jeito bom" (ES, Aula 11).
   Cada <div data-cali="chave"> vira um painel duplo: código ruim (esquerda) e bom (direita),
   uma animação embaixo de cada um e a legenda da etapa. Começa sozinho, em loop; o aluno pausa
   (botão ou P) e anda etapa por etapa (botões ou , e .).
   Uma cena é uma lista de etapas (frames); cada etapa diz qual lado é o foco, quais linhas de
   código acendem e como fica o palco (itens que andam por transição CSS). O que a etapa não
   repete (código, linhas visíveis, selo, itens) continua como estava.
   Rodar ANTES do slide.js: as miniaturas clonam o slide já com a última etapa desenhada.
   Sem else: early return. */
(function(){
  var deck = document.getElementById('deck');
  if(!deck){ return; }

  /* ------------------------------------------------------------------ itens do palco (556 x 130) */
  function pos(it, p){
    if(p.dx === undefined){ return { x: p.x, y: p.y }; }
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
  function rot(id, t, x, y, w){ return item(id, t, x, y, w || 200, 20, 'lbl lbl-e'); }

  function fr(msg, foco, r, b, hold){
    return { msg: msg, foco: foco, r: r || {}, b: b || {}, hold: hold || 6 };
  }
  function selo(t, tipo){ return [t, tipo]; }

  /* ------------------------------------------------------------------ cena: código hadouken */
  function hadouken(){
    var rc = [
      'def certificado(existe, matriculado, freq, nota):',
      '    if existe:',
      '        if matriculado:',
      '            if freq >= 75:',
      '                if nota >= 6:',
      '                    return "emitido"',
      '    return "negado"'
    ];
    var bc = [
      'def certificado(existe, matriculado, freq, nota):',
      '    if not existe:',
      '        return "negado: sem aluno"',
      '    if not matriculado:',
      '        return "negado: sem matrícula"',
      '    if freq < 75:',
      '        return "negado: frequência"',
      '    if nota < 6:',
      '        return "negado: nota"',
      '    return "emitido"'
    ];
    var T = ['existe', 'matriculado', 'freq ≥ 75', 'nota ≥ 6'];
    function K(n, cls){
      var a = [rot('rt', 'na cabeça do leitor:', 8, 10, 220)];
      for(var i = 0; i < n; i++){
        a.push(item('k' + i, T[i], 8 + i * 136, 48, 128, 44, cls || 'm-esc', { from: { dx: 0, dy: -30 } }));
      }
      return a;
    }
    function G(t, cls){
      return [rot('rt', 'na cabeça do leitor:', 8, 10, 220), item('g', t, 8, 48, 200, 44, cls || 'm-esc')];
    }
    var F = [];
    F.push(fr('Código hadouken: cada if abre um nível e a indentação vira uma seta apontando para a direita (>>>).', 'r',
      { code: rc, ate: 7, hl: { 2: 'on' }, badge: selo('níveis: 1', 'ruim'), items: K(1) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Segundo if, dentro do primeiro: o leitor já guarda duas condições.', 'r', { hl: { 3: 'on' }, badge: selo('níveis: 2', 'ruim'), items: K(2) }));
    F.push(fr('Terceiro nível. Para entender a linha de baixo, é preciso lembrar de todas as de cima.', 'r', { hl: { 3: 'dim', 4: 'on' }, badge: selo('níveis: 3', 'ruim'), items: K(3) }));
    F.push(fr('Quarto nível: o código virou uma seta. São 4 condições na cabeça.', 'r', { hl: { 2: 'ruim', 3: 'ruim', 4: 'ruim', 5: 'on' }, badge: selo('níveis: 4', 'ruim'), items: K(4) }));
    F.push(fr('Só no fundo da escada acontece o que importa, e o leitor carregou tudo até chegar aqui.', 'r', { hl: { 6: 'ok' }, items: K(4, 'm-mov') }));
    F.push(fr('E o "negado" fica lá embaixo, sem dizer qual das 4 condições falhou.', 'r', { hl: { 7: 'ruim' }, items: K(4, 'm-ruim') }));

    F.push(fr('Jeito bom, o fail first: testar primeiro o que está ERRADO e sair cedo (cláusula de guarda).', 'b',
      { hl: {} },
      { ate: 3, hl: { 2: 'on' }, badge: selo('fail first · nível 1', 'bom'), items: G('existe?') }));
    F.push(fr('Próxima guarda. A anterior já foi resolvida: não precisa mais ser lembrada.', 'b', {}, { ate: 5, hl: { 4: 'on' }, items: G('matriculado?') }));
    F.push(fr('Cada guarda é uma linha no nível 1, com o motivo da recusa ao lado.', 'b', {}, { ate: 7, hl: { 6: 'on' }, items: G('freq ≥ 75?') }));
    F.push(fr('Última guarda.', 'b', {}, { ate: 9, hl: { 8: 'on' }, items: G('nota ≥ 6?') }));
    F.push(fr('Passou por todas: só então faz o que importa. Nada ficou pendente na cabeça.', 'b', {}, { ate: 10, hl: { 10: 'ok' }, items: G('nada pendente', 'm-ler') }));
    F.push(fr('Mesma lógica: nível 4 contra nível 1, e cada saída diz o motivo.', 'rb',
      { hl: { 2: 'ruim', 3: 'ruim', 4: 'ruim', 5: 'ruim' }, badge: selo('níveis: 4', 'ruim'), items: K(4, 'm-ruim') },
      { hl: {}, badge: selo('níveis: 1', 'bom') }, 8));
    return {
      arq: { r: 'src/11/01_indentacao.py', b: 'src/11/01_indentacao.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: extrair o aninhado */
  function extracao(){
    var rc = [
      'def aprovados(turma):',
      '    aprovados = []',
      '    for nome in turma:',
      '        if len(turma[nome]) > 0:',
      '            soma = 0',
      '            for nota in turma[nome]:',
      '                soma += nota',
      '            if soma / len(turma[nome]) >= 6:',
      '                aprovados.append(nome)',
      '    return aprovados'
    ];
    var bc = [
      'def media(notas):',
      '    return sum(notas) / len(notas)',
      '',
      'def foi_aprovado(notas):',
      '    if len(notas) == 0:',
      '        return False',
      '    return media(notas) >= 6',
      '',
      'def aprovados(turma):',
      '    return [nome for nome in turma',
      '            if foi_aprovado(turma[nome])]'
    ];
    var T = ['for nome', 'tem notas?', 'for nota', 'média ≥ 6?'];
    function K(n, cls){
      var a = [rot('rt', 'na cabeça do leitor:', 8, 10, 220)];
      for(var i = 0; i < n; i++){
        a.push(item('k' + i, T[i], 8 + i * 136, 48, 128, 44, cls || 'm-esc', { from: { dx: 0, dy: -30 } }));
      }
      return a;
    }
    function fn(n){
      var a = [];
      var nomes = ['media()', 'foi_aprovado()', 'aprovados()'];
      var dica = ['só a conta', 'só a decisão', 'só percorre'];
      for(var i = 0; i < n; i++){
        a.push(item('f' + i, nomes[i] + '<small>' + dica[i] + '</small>', 8 + i * 193, 40, 160, 52, 'm-ler', { from: { dx: 0, dy: -36 } }));
      }
      if(n > 1){ a.push(lin('l1', 201, 66, 168, 66, 'pt m-mov')); }
      if(n > 2){ a.push(lin('l2', 394, 66, 361, 66, 'pt m-mov')); }
      return a;
    }
    var F = [];
    F.push(fr('Outro caso: laços aninhados. Um for para percorrer a turma...', 'r',
      { code: rc, ate: 10, hl: { 3: 'on' }, badge: selo('níveis: 1', 'ruim'), items: K(1) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('...um if dentro do for: 2 níveis.', 'r', { hl: { 3: 'dim', 4: 'on' }, badge: selo('níveis: 2', 'ruim'), items: K(2) }));
    F.push(fr('...e um for dentro do if: 3 níveis só para somar as notas.', 'r', { hl: { 3: 'dim', 4: 'dim', 6: 'on', 7: 'on' }, badge: selo('níveis: 3', 'ruim'), items: K(3) }));
    F.push(fr('E a decisão de aprovar mora no meio da conta.', 'r', { hl: { 8: 'on', 9: 'ok' }, badge: selo('níveis: 3', 'ruim'), items: K(4) }));
    F.push(fr('Uma função, 3 níveis, 3 assuntos misturados: percorrer, calcular média e decidir.', 'r', { hl: { 3: 'ruim', 4: 'ruim', 5: 'ruim', 6: 'ruim', 7: 'ruim', 8: 'ruim', 9: 'ruim' }, items: K(4, 'm-ruim') }));

    F.push(fr('Jeito bom: cada assunto vira uma função com nome. O nome é a explicação.', 'b',
      { hl: {} },
      { ate: 2, hl: { 1: 'on', 2: 'ok' }, badge: selo('níveis: 1', 'bom'), items: fn(1) }));
    F.push(fr('A decisão ganha nome: foi_aprovado. Um if só, com saída cedo.', 'b', {}, { ate: 7, hl: { 4: 'on', 5: 'on', 6: 'on', 7: 'ok' }, items: fn(2) }));
    F.push(fr('Quem percorre só chama as outras: 1 nível, lido como uma frase.', 'b', {}, { ate: 11, hl: { 9: 'on', 10: 'ok', 11: 'ok' }, items: fn(3) }));
    F.push(fr('Mesma lógica. Agora media() pode ser testada sozinha e o nome explica cada teste.', 'rb',
      { hl: { 3: 'ruim', 4: 'ruim', 5: 'ruim', 6: 'ruim', 7: 'ruim', 8: 'ruim', 9: 'ruim' }, badge: selo('níveis: 3', 'ruim'), items: K(4, 'm-ruim') },
      { hl: {}, badge: selo('níveis: 1', 'bom') }, 8));
    return {
      arq: { r: 'src/11/01_indentacao.py', b: 'src/11/01_indentacao.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: sem else */
  function semElse(){
    var rc = [
      'def conceito(nota):',
      '    if nota >= 9:',
      '        c = "A"',
      '    elif nota >= 7:',
      '        c = "B"',
      '    elif nota >= 5:',
      '        c = "C"',
      '    else:',
      '        c = "D"',
      '    return c'
    ];
    var bc = [
      'def conceito(nota):',
      '    if nota >= 9:',
      '        return "A"',
      '    if nota >= 7:',
      '        return "B"',
      '    if nota >= 5:',
      '        return "C"',
      '    return "D"'
    ];
    var rc2 = [
      'def preco_final(preco, tipo):',
      '    if tipo == "aluno":',
      '        d = 0.5',
      '    elif tipo == "professor":',
      '        d = 0.3',
      '    elif tipo == "visitante":',
      '        d = 0.0',
      '    return preco * (1 - d)'
    ];
    var rc3 = [
      'def preco_final(preco, tipo):',
      '    if tipo == "aluno":',
      '        d = 0.5',
      '    elif tipo == "professor":',
      '        d = 0.3',
      '    elif tipo == "visitante":',
      '        d = 0.0',
      '    elif tipo == "bolsista":',
      '        d = 0.8',
      '    return preco * (1 - d)'
    ];
    var bc2 = [
      'class Aluno:',
      '    def desconto(self): return 0.5',
      'class Visitante:',
      '    def desconto(self): return 0.0',
      'def preco_final(preco, cliente):',
      '    return preco * (1 - cliente.desconto())'
    ];
    var bc3 = [
      'class Aluno:',
      '    def desconto(self): return 0.5',
      'class Bolsista:',
      '    def desconto(self): return 0.8',
      'class Visitante:',
      '    def desconto(self): return 0.0',
      'def preco_final(preco, cliente):',
      '    return preco * (1 - cliente.desconto())'
    ];
    function lembrar(n, fim){
      var t = ['não é ≥ 9', 'não é ≥ 7', 'não é ≥ 5'];
      var a = [rot('rt', 'o else só se entende lembrando de tudo isto:', 8, 10, 330)];
      for(var i = 0; i < n; i++){
        a.push(item('m' + i, t[i], 8 + i * 136, 48, 128, 44, 'm-esc', { from: { dx: 0, dy: -30 } }));
      }
      if(fim){ a.push(item('me', 'else', 416, 48, 128, 44, 'm-ruim', { from: { dx: 0, dy: -30 } })); }
      return a;
    }
    function portas(passo){
      var t = ['A: ≥ 9', 'B: ≥ 7', 'C: ≥ 5', 'D: resto'];
      var a = [rot('rt', 'nota = 4 entra e cai na primeira que servir:', 8, 6, 340)];
      for(var i = 0; i < 4; i++){
        var cls = '';
        if(i < passo){ cls = 'm-visto'; }
        if(i === 3 && passo >= 3){ cls = 'm-ler'; }
        a.push(item('p' + i, t[i], 8 + i * 138, 64, 126, 44, cls));
      }
      a.push(item('tk', '4', 52 + Math.min(passo, 3) * 138, 30, 38, 28, 'm-esc pilula'));
      return a;
    }
    function tipos(novo){
      var a = [
        item('pf', 'preco_final()', 8, 44, 170, 50, 'm-mov'),
        item('t0', 'aluno', 220, 8, 150, 30, 'm-visto'),
        item('t1', 'professor', 220, 50, 150, 30, 'm-visto'),
        item('t2', 'visitante', 220, 92, 150, 30, 'm-visto')
      ];
      if(novo){
        a.push(item('t3', 'bolsista: NOVO', 392, 50, 150, 30, 'm-ruim', { from: { dx: 40, dy: 0 } }));
        a.push(lin('la', 392, 65, 180, 70, 'pt m-ruim'));
      }
      return a;
    }
    function objs(novo){
      var a = [
        item('o0', 'Aluno<small>desconto() = 0.5</small>', 8, 8, 170, 46, 'm-ler'),
        item('o1', 'Visitante<small>desconto() = 0.0</small>', 8, 76, 170, 46, 'm-ler'),
        item('pf', 'preco_final()<small>não pergunta o tipo</small>', 330, 40, 214, 52, 'm-mov'),
        lin('l0', 330, 58, 180, 30, 'pt m-mov'),
        lin('l1', 330, 76, 180, 98, 'pt m-mov')
      ];
      if(novo){
        a[0] = item('o0', 'Aluno<small>desconto() = 0.5</small>', 8, 4, 170, 36, 'm-ler');
        a[1] = item('o1', 'Visitante<small>desconto() = 0.0</small>', 8, 90, 170, 36, 'm-ler');
        a.push(item('o2', 'Bolsista<small>desconto() = 0.8</small>', 8, 47, 170, 36, 'm-esc', { from: { dx: -40, dy: 0 } }));
        a.push(lin('l2', 330, 66, 180, 65, 'pt m-mov'));
        a[2] = item('pf', 'preco_final()<small>NÃO mudou</small>', 330, 40, 214, 52, 'm-ler');
      }
      return a;
    }
    var F = [];
    F.push(fr('O jeito comum: uma escada de if / elif / else. Veja a nota 4 descer por ela.', 'r',
      { code: rc, ate: 10, hl: { 2: 'on' }, badge: selo('com else', 'ruim'), items: lembrar(1) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Não é ≥ 9. Segue para o próximo teste.', 'r', { hl: { 4: 'on' }, items: lembrar(2) }));
    F.push(fr('Não é ≥ 7 também. A lista do que o leitor precisa lembrar só cresce.', 'r', { hl: { 6: 'on' }, items: lembrar(3) }));
    F.push(fr('O else não tem condição: para entendê-lo é preciso lembrar das 3 anteriores.', 'r', { hl: { 8: 'ruim', 9: 'ok' }, items: lembrar(3, true) }));

    F.push(fr('Sem else, em fail first: cada if resolve e sai (retorno antecipado). O mesmo 4 entra de novo.', 'b',
      { hl: {} },
      { ate: 8, hl: { 2: 'on' }, badge: selo('fail first', 'bom'), items: portas(0) }));
    F.push(fr('Falhou, mas nada precisa ser lembrado: a próxima linha vale por si só.', 'b', {}, { hl: { 4: 'on' }, items: portas(1) }));
    F.push(fr('Mais uma porta que não serve.', 'b', {}, { hl: { 6: 'on' }, items: portas(2) }));
    F.push(fr('O último return cobre o resto: o leitor não carregou nenhuma condição.', 'b', {}, { hl: { 8: 'ok' }, items: portas(3) }));
    F.push(fr('Mesma resposta (D). Só o jeito ruim obriga a lembrar do que ficou lá em cima.', 'rb',
      { hl: {}, badge: selo('lembrar: 3', 'ruim') }, { hl: {}, badge: selo('lembrar: 0', 'bom') }, 7));

    F.push(fr('Outro else comum: perguntar o tipo (if tipo == ...) para escolher o comportamento.', 'r',
      { code: rc2, ate: 8, hl: { 2: 'on', 4: 'on', 6: 'on' }, badge: selo('pergunta o tipo', 'ruim'), items: tipos(false) },
      { code: bc2, ate: 6, hl: {}, badge: selo('cada um sabe o seu', 'bom'), items: objs(false) }, 7));
    F.push(fr('Chega um tipo novo, o "bolsista": é preciso EDITAR a função (mais um elif) e retestar tudo.', 'r',
      { code: rc3, ate: 10, hl: { 8: 'ruim', 9: 'ruim' }, badge: selo('mexe em código velho', 'ruim'), items: tipos(true) }, {}, 7));
    F.push(fr('Jeito bom: polimorfismo (Aula 09). Cada classe sabe o seu desconto; ninguém pergunta o tipo.', 'b',
      { hl: {} }, { hl: { 1: 'on', 2: 'on', 3: 'on', 4: 'on' } }, 7));
    F.push(fr('Tipo novo = classe nova. O preco_final não muda: nada que já funcionava foi tocado.', 'b',
      {}, { code: bc3, ate: 8, hl: { 3: 'ok', 4: 'ok' }, badge: selo('só acrescenta', 'bom'), items: objs(true) }, 8));
    return {
      arq: { r: 'src/11/02_sem_else.py', b: 'src/11/02_sem_else.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: embrulhar primitivos */
  function primitivos(){
    var rc = [
      'def registrar(ra, nota):',
      '    salvar(ra, nota)',
      '',
      'registrar(8.5, 1234)     # trocou RA e nota',
      'registrar(1234, 15)      # nota 15?'
    ];
    var bc = [
      'class Nota:',
      '    def __init__(self, valor):',
      '        if valor < 0 or valor > 10:',
      '            raise ValueError("0 a 10")',
      '        self._valor = valor',
      '',
      'registrar(Ra(1234), Nota(8.5))',
      'Nota(15)     # recusa na entrada'
    ];
    var N = ['entrada', 'cálculo', 'banco', 'boletim'];
    function pipe(tk, tkTxt, tkCls, falha){
      var a = [];
      for(var i = 0; i < 4; i++){
        a.push(item('p' + i, N[i], 8 + i * 140, 62, 108, 44, falha === i ? 'm-ruim' : ''));
      }
      for(var j = 0; j < 3; j++){
        a.push(lin('s' + j, 118 + j * 140, 84, 146 + j * 140, 84, 'pt'));
      }
      if(tk >= 0){ a.push(item('tk', tkTxt, 36 + tk * 140, 16, 52, 32, tkCls || 'm-esc pilula')); }
      return a;
    }
    function pipeBom(tk, tkTxt, tkCls, estado){
      var a = [item('g', 'Nota(...)<small>porta: 0 a 10</small>', 8, 62, 124, 50, estado === 'x' ? 'm-ruim' : 'm-mov')];
      var N2 = ['cálculo', 'banco', 'boletim'];
      for(var i = 0; i < 3; i++){
        var cls = '';
        if(estado === 'ok'){ cls = 'm-ler'; }
        a.push(item('p' + i, N2[i], 168 + i * 128, 62, 108, 44, cls));
      }
      for(var j = 0; j < 3; j++){
        a.push(lin('s' + j, 134 + j * 128, 84, 164 + j * 128, 84, 'pt'));
      }
      if(tk >= 0){ a.push(item('tk', tkTxt, tk, 16, 52, 32, tkCls || 'm-esc pilula')); }
      return a;
    }
    var F = [];
    F.push(fr('Com int e float soltos, o RA e a nota são só números: nada reclama da troca.', 'r',
      { code: rc, ate: 5, hl: { 4: 'on' }, badge: selo('erro aparece: nunca', 'ruim'), items: pipe(0, '8.5', 'm-esc pilula') },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Nota 15 numa prova de 0 a 10? Também passa: o tipo float aceita.', 'r', { hl: { 5: 'on' }, items: pipe(0, '15') }));
    F.push(fr('O 15 anda pelo cálculo...', 'r', { hl: { 5: 'on' }, items: pipe(1, '15') }));
    F.push(fr('...chega ao banco e é salvo...', 'r', { hl: { 5: 'on' }, items: pipe(2, '15') }));
    F.push(fr('...e só no boletim alguém estranha. O erro viajou, longe da causa.', 'r', { hl: { 5: 'ruim' }, badge: selo('erro aparece: no fim', 'ruim'), items: pipe(3, '15', 'm-ruim pilula', 3) }));

    F.push(fr('Jeito bom: a nota vira uma classe, e a regra mora na criação dela.', 'b',
      { hl: {} },
      { ate: 8, hl: { 1: 'on', 2: 'on', 3: 'on', 4: 'on' }, badge: selo('regra num lugar só', 'bom'), items: pipeBom(-1) }));
    F.push(fr('Nota(8.5) é válida: atravessa a porta e segue.', 'b', {}, { hl: { 7: 'on' }, items: pipeBom(480, '8.5', 'm-ler pilula', 'ok') }));
    F.push(fr('Nota(15) é recusada na entrada, no ponto exato do erro.', 'b', {}, { hl: { 8: 'ruim' }, badge: selo('erro aparece: na entrada', 'bom'), items: pipeBom(40, '15', 'm-ruim pilula', 'x') }));
    F.push(fr('Mesmo valor 15: o jeito ruim leva até o fim; o bom barra na porta.', 'rb',
      { hl: {}, badge: selo('erro aparece: no fim', 'ruim') }, { hl: {} }, 8));
    return {
      arq: { r: 'src/11/03_embrulhar_primitivos.py', b: 'src/11/03_embrulhar_primitivos.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: coleção de primeira classe */
  function colecao(){
    var rc = [
      'turma = []                       # lista solta',
      'turma.append(Aluno("Ana", 8.5))',
      '',
      'def aprovados(turma): ...        # qualquer função alcança',
      '',
      'turma.append(None)               # lixo entra',
      'turma.clear()                    # e alguém apaga tudo'
    ];
    var bc = [
      'class Turma:',
      '    def __init__(self, alunos=()):',
      '        self._alunos = list(alunos)',
      '',
      '    def matricular(self, aluno):',
      '        self._alunos.append(aluno)',
      '',
      '    def aprovados(self):',
      '        return Turma([aluno for aluno in self._alunos',
      '                      if aluno.aprovado()])'
    ];
    function lista(extra, fim){
      var a = [
        item('fx', 'turma', 190, 6, 358, 118, 'moldura'),
        item('al0', 'Ana', 204, 62, 84, 40, 'm-mov'),
        item('al1', 'Bruno', 296, 62, 84, 40, 'm-mov'),
        item('al2', 'Diego', 388, 62, 84, 40, 'm-mov')
      ];
      if(fim === 'none'){
        a.push(item('al3', 'None', 480, 62, 60, 40, 'm-ruim', { from: { dx: 0, dy: -50 } }));
      }
      if(fim === 'vazia'){
        a = [item('fx', 'turma (vazia)', 190, 6, 358, 118, 'moldura m-ruim')];
      }
      return a.concat(extra || []);
    }
    function atores(n){
      var a = [];
      var t = ['função A', 'função B', 'script'];
      for(var i = 0; i < n; i++){
        a.push(item('at' + i, t[i], 8, 8 + i * 40, 120, 32, 'm-esc', { from: { dx: -30, dy: 0 } }));
        a.push(lin('ar' + i, 130, 24 + i * 40, 188, 40 + i * 24, 'pt m-esc'));
      }
      return a;
    }
    function parede(extra, vazio){
      var a = [
        item('fx', 'Turma (privada)', 150, 4, 398, 122, 'moldura forte m-ler'),
        item('al0', 'Ana', 214, 62, 90, 40, 'm-mov'),
        item('al1', 'Bruno', 314, 62, 90, 40, 'm-mov'),
        item('al2', 'Diego', 414, 62, 90, 40, 'm-mov'),
        item('pt', 'porta: matricular()', 126, 34, 184, 26, 'm-ler')
      ];
      return a.concat(extra || []);
    }
    var F = [];
    F.push(fr('Uma lista solta é de todo mundo: qualquer parte do código alcança.', 'r',
      { code: rc, ate: 7, hl: { 1: 'on', 2: 'on' }, badge: selo('lista exposta', 'ruim'), items: lista() },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Funções, scripts, qualquer um pode chegar na mesma lista.', 'r', { hl: { 4: 'on' }, items: lista(atores(3)) }));
    F.push(fr('Ninguém valida o que entra: um None entra e quebra quem usar depois.', 'r', { hl: { 6: 'ruim' }, badge: selo('lista exposta', 'ruim'), items: lista(atores(3), 'none') }));
    F.push(fr('E basta um clear() distraído para apagar a turma inteira.', 'r', { hl: { 7: 'ruim' }, badge: selo('qualquer um mexe', 'ruim'), items: lista(atores(3), 'vazia') }));

    F.push(fr('Jeito bom: a lista vira atributo privado de uma classe, e a classe não tem mais nada.', 'b',
      { hl: {} },
      { ate: 10, hl: { 1: 'on', 2: 'on', 3: 'ok' }, badge: selo('lista escondida', 'bom'), items: parede() }));
    F.push(fr('Só se entra pela porta: matricular() valida e coloca na lista.', 'b', {}, {
      hl: { 5: 'on', 6: 'ok' },
      items: parede([
        item('al3', 'Eva', 4, 28, 90, 40, 'm-ler', { from: { dx: -4, dy: 0 } }),
        lin('en', 96, 44, 124, 46, 'pt m-ler')
      ])
    }));
    F.push(fr('Quem está fora não alcança a lista: a tentativa bate na parede.', 'b', {}, {
      hl: { 3: 'ok' },
      items: parede([
        item('at0', 'clear()', 8, 78, 100, 32, 'm-esc'),
        lin('ar0', 110, 94, 168, 94, 'm-ruim'),
        item('xx', '✕', 170, 80, 28, 28, 'm-ruim pilula')
      ])
    }));
    F.push(fr('aprovados() devolve OUTRA Turma, nunca a lista crua: a estrutura vira classe do domínio.', 'b', {}, {
      hl: { 8: 'on', 9: 'ok', 10: 'ok' },
      items: parede([
        item('sa', 'Turma<small>aprovados</small>', 8, 78, 100, 42, 'm-ler'),
        lin('ls', 212, 92, 110, 100, 'pt m-ler')
      ])
    }));
    F.push(fr('Mesma coleção: solta, qualquer um mexe; embrulhada, só as operações da turma.', 'rb',
      { hl: {}, items: lista(atores(3)) }, { hl: {}, items: parede() }, 8));
    return {
      arq: { r: 'src/11/04_colecao_primeira_classe.py', b: 'src/11/04_colecao_primeira_classe.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: Lei de Demeter */
  function demeter(){
    var rc = [
      '# quem chama conhece a árvore inteira',
      'disco = tf.pai.pai.pai.pai.nome',
      '',
      '# a árvore ganhou um nível no meio...',
      '# ...e o mesmo código devolve "Users"'
    ];
    var bc = [
      'class Item:',
      '    def disco(self):',
      '        if self._pai is None:',
      '            return self._nome',
      '        return self._pai.disco()',
      '',
      'disco = tf.disco()     # um ponto'
    ];
    var NOMES5 = ['tf-08.py', 'Trabalhos', 'Desktop', 'Users', 'C:'];
    var NOMES6 = ['tf-08.py', 'Trabalhos', 'Projetos', 'Desktop', 'Users', 'C:'];
    function arvore(nomes, marcas){
      var n = nomes.length;
      var step = n === 5 ? 110 : 92;
      var w = n === 5 ? 84 : 76;
      var a = [];
      nomes.forEach(function(nome, i){
        var cls = marcas[i] || '';
        if(nome === 'Projetos'){ cls = marcas[i] || 'm-esc'; }
        a.push(item('t' + nome, '<span style="font-size:.8rem">' + nome + '</span>', 8 + i * step, 90, w, 34, cls));
      });
      return a;
    }
    function quem(){ return item('q', 'quem chama', 8, 10, 110, 34, 'm-mov'); }
    function ruimSaltos(k){
      var a = [quem(), lin('a0', 62, 44, 50, 90, 'pt m-ler')];
      var m = {};
      for(var i = 0; i < k; i++){
        a.push(lin('b' + i, 8 + i * 110 + 84, 107, 8 + (i + 1) * 110, 107, 'pt m-ruim'));
        m[i + 1] = 'm-ruim';
      }
      m[0] = 'm-ler';
      return a.concat(arvore(NOMES5, m));
    }
    function bomPergunta(k){
      var a = [quem(), lin('a0', 62, 44, 50, 90, 'pt m-ler')];
      var m = { 0: 'm-ler' };
      for(var i = 0; i < k; i++){
        a.push(lin('b' + i, 8 + i * 110 + 84, 107, 8 + (i + 1) * 110, 107, 'pt m-mov'));
        m[i + 1] = 'm-mov';
      }
      return a.concat(arvore(NOMES5, m));
    }
    var F = [];
    F.push(fr('Para achar o disco, quem chama conhece a estrutura toda e atravessa 4 objetos: 4 pontos.', 'r',
      { code: rc, ate: 2, hl: { 2: 'on' }, badge: selo('pontos: 0', 'ruim'), items: ruimSaltos(0) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Primeiro ponto: tf.pai. Já é um objeto que quem chama não deveria conhecer.', 'r', { badge: selo('pontos: 1', 'ruim'), items: ruimSaltos(1) }));
    F.push(fr('Segundo ponto: .pai.pai. Cada ponto é um estranho no caminho.', 'r', { badge: selo('pontos: 2', 'ruim'), items: ruimSaltos(2) }));
    F.push(fr('Terceiro ponto.', 'r', { badge: selo('pontos: 3', 'ruim'), items: ruimSaltos(3) }));
    F.push(fr('Quarto ponto: chegou em C:. Funciona, mas o código está amarrado ao desenho da árvore.', 'r', { badge: selo('pontos: 4', 'ruim'), items: ruimSaltos(4) }));
    F.push(fr('A árvore ganhou um nível (Projetos)...', 'r', { ate: 5, hl: { 4: 'on' }, items: [quem()].concat(arvore(NOMES6, { 0: 'm-ler', 1: 'm-ruim', 2: 'm-esc', 3: 'm-ruim', 4: 'm-ruim' })) }));
    F.push(fr('...e o mesmo código agora devolve "Users": quebrou em silêncio, em todo lugar que copiou a cadeia.', 'r',
      { hl: { 5: 'ruim' }, badge: selo('quebrou', 'ruim'), items: [quem(), item('res', 'Users', 130, 10, 80, 34, 'm-ruim', { from: { x: 440, y: 90 } })].concat(arvore(NOMES6, { 0: 'm-ler', 1: 'm-ruim', 2: 'm-esc', 3: 'm-ruim', 4: 'm-ruim' })) }));

    F.push(fr('Jeito bom: não fale com estranhos. Quem chama só conhece o amigo: tf.', 'b',
      { hl: {} },
      { ate: 7, hl: { 7: 'on' }, badge: selo('pontos: 1', 'bom'), items: bomPergunta(0) }));
    F.push(fr('O tf não sabe a resposta, mas tem um amigo que sabe: pergunta ao pai direto.', 'b', {}, { hl: { 2: 'on', 5: 'on' }, items: bomPergunta(1) }));
    F.push(fr('O pai repete o mesmo gesto, cada um falando só com o seu amigo.', 'b', {}, { hl: { 5: 'on' }, items: bomPergunta(3) }));
    F.push(fr('Até chegar na raiz, que não tem pai e responde com o próprio nome.', 'b', {}, { hl: { 3: 'on', 4: 'ok' }, items: bomPergunta(4) }));
    F.push(fr('A resposta volta pelo mesmo caminho, e quem chamou só viu um ponto.', 'b', {}, {
      hl: { 7: 'ok' },
      items: [quem(), item('res', 'C:', 130, 10, 80, 34, 'm-ler', { from: { x: 450, y: 90 } }), lin('a0', 62, 44, 50, 90, 'pt m-ler')].concat(arvore(NOMES5, { 0: 'm-ler', 1: 'm-mov', 2: 'm-mov', 3: 'm-mov', 4: 'm-mov' }))
    }));
    F.push(fr('Com a árvore maior, quem chama não mudou nada e a resposta continua "C:".', 'b', {}, {
      items: [quem(), item('res', 'C:', 130, 10, 80, 34, 'm-ler'), lin('a0', 62, 44, 50, 90, 'pt m-ler')].concat(arvore(NOMES6, { 0: 'm-ler', 1: 'm-mov', 2: 'm-esc', 3: 'm-mov', 4: 'm-mov', 5: 'm-mov' }))
    }, 7));
    F.push(fr('Mesma pergunta: 4 pontos que quebram contra 1 ponto que sobrevive à mudança.', 'rb',
      { hl: {}, badge: selo('pontos: 4', 'ruim') }, { hl: {}, badge: selo('pontos: 1', 'bom') }, 8));
    return {
      arq: { r: 'src/11/05_um_ponto_por_linha.py', b: 'src/11/05_um_ponto_por_linha.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: diga, não pergunte */
  function diga(){
    var rc = [
      'if conta.get_saldo() >= 30:',
      '    conta.set_saldo(conta.get_saldo() - 30)',
      '',
      'conta.set_saldo(-999)    # ninguém impede'
    ];
    var bc = [
      'class Conta:',
      '    def sacar(self, valor):',
      '        if valor > self._saldo:',
      '            raise ValueError("saldo insuficiente")',
      '        self._saldo -= valor',
      '',
      'conta.sacar(30)',
      'conta.sacar(500)    # a conta recusa'
    ];
    function cena(saldo, cls, msg, falaTxt, falaCls, decide){
      var a = [
        item('qc', decide || 'quem chama', 8, 24, 150, 74, 'm-mov'),
        item('cb', 'Conta', 372, 6, 176, 118, 'moldura'),
        item('sd', 'saldo: ' + saldo, 392, 64, 136, 40, cls)
      ];
      if(msg){ a.push(item('fa', msg, 200, 22, 140, 32, falaCls || 'm-esc')); }
      if(falaTxt){ a.push(lin('seta', 160, 70, 370, 70, 'pt ' + falaTxt)); }
      return a;
    }
    var F = [];
    F.push(fr('Com getter e setter, o saldo sai da conta: ela só entrega e recebe.', 'r',
      { code: rc, ate: 4, hl: { 1: 'on' }, badge: selo('pergunta e decide fora', 'ruim'), items: cena(100, 'm-mov', 'get_saldo()', 'm-esc', 'm-esc') },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Quem chama recebe o 100 e decide sozinho: 100 ≥ 30? A regra mora FORA da conta.', 'r',
      { hl: { 1: 'on' }, items: cena(100, 'm-mov', '100', 'm-ler', 'm-ler', '100 ≥ 30?') }));
    F.push(fr('E devolve o resultado da conta feita lá fora: set_saldo(70).', 'r',
      { hl: { 2: 'on' }, items: cena(70, 'm-esc', 'set_saldo(70)', 'm-esc', 'm-esc', 'decidiu') }));
    F.push(fr('Nada impede outro chamador de fazer set_saldo(-999): a regra nunca foi da conta.', 'r',
      { hl: { 4: 'ruim' }, badge: selo('qualquer um quebra', 'ruim'), items: cena(-999, 'm-ruim', 'set_saldo(-999)', 'm-ruim', 'm-ruim', 'outro chamador') }));

    F.push(fr('Jeito bom: diga o que quer (sacar 30) e a conta aplica a própria regra.', 'b',
      { hl: {} },
      { ate: 8, hl: { 7: 'on' }, badge: selo('diz e a conta decide', 'bom'), items: cena(100, 'm-mov', 'sacar(30)', 'm-ler', 'm-ler') }));
    F.push(fr('A regra está dentro da classe: confere o saldo e só então desconta.', 'b', {}, { hl: { 3: 'on', 5: 'ok' }, items: cena(70, 'm-ler', 'sacar(30)', 'm-ler', 'm-ler', 'só pediu') }));
    F.push(fr('Pediu demais? A conta recusa sozinha, e o saldo continua 70.', 'b', {}, { hl: { 8: 'on', 4: 'ruim' }, items: cena(70, 'm-ler', 'sacar(500)', 'm-ruim', 'm-ruim', 'só pediu').concat([item('rec', '✕ saldo insuficiente', 172, 92, 196, 28, 'm-ruim')]) }));
    F.push(fr('Mesma conta: no jeito ruim a regra se espalha; no bom ela tem dono.', 'rb',
      { hl: {}, items: cena(-999, 'm-ruim', 'set_saldo(-999)', 'm-ruim', 'm-ruim', 'outro chamador') },
      { hl: {}, items: cena(70, 'm-ler', 'sacar(500)', 'm-ruim', 'm-ruim', 'só pediu').concat([item('rec', '✕ saldo insuficiente', 172, 92, 196, 28, 'm-ruim')]) }, 8));
    return {
      arq: { r: 'src/11/06_diga_nao_pergunte.py', b: 'src/11/06_diga_nao_pergunte.py' },
      frames: F
    };
  }

  /* ------------------------------------------------------------------ cena: entidades pequenas */
  function pequenas(){
    var rc = [
      'class ClienteGrande:',
      '    def __init__(self, nome, sobrenome,',
      '                 rua, numero, cidade):',
      '        self._nome = nome',
      '        self._sobrenome = sobrenome',
      '        self._rua = rua',
      '        self._numero = numero',
      '        self._cidade = cidade'
    ];
    var b1 = [
      'class Nome:',
      '    def __init__(self, primeiro, sobrenome):',
      '        self._primeiro = primeiro',
      '        self._sobrenome = sobrenome'
    ];
    var b2 = [
      'class Endereco:',
      '    def __init__(self, rua, cidade):',
      '        self._rua = rua',
      '        self._cidade = cidade'
    ];
    var b3 = [
      'class Cliente:',
      '    def __init__(self, nome, endereco):',
      '        self._nome = nome',
      '        self._endereco = endereco'
    ];
    function grande(n){
      var t = ['nome', 'sobrenome', 'rua', 'número', 'cidade'];
      var a = [item('gx', 'ClienteGrande', 8, 4, 540, 122, 'moldura')];
      for(var i = 0; i < n; i++){
        a.push(item('c' + i, t[i], 20 + i * 104, 58, 96, 40, 'm-esc', { from: { dx: 0, dy: -30 } }));
      }
      return a;
    }
    function nome(){
      return [
        item('bn', 'Nome', 8, 4, 262, 122, 'moldura m-ler'),
        item('n0', 'primeiro', 22, 58, 112, 40, 'm-mov', { from: { dx: 0, dy: -40 } }),
        item('n1', 'sobrenome', 144, 58, 112, 40, 'm-mov', { from: { dx: 0, dy: -40 } })
      ];
    }
    function endereco(fundiu){
      var a = [
        item('be', 'Endereco', 286, 4, 262, 122, 'moldura m-ler'),
        item('n2', fundiu ? 'rua, nº' : 'rua', 300, 58, 112, 40, 'm-mov', { from: { dx: 0, dy: -40 } }),
        item('n4', 'cidade', 422, 58, 112, 40, 'm-mov', { from: { dx: 0, dy: -40 } })
      ];
      if(!fundiu){ a.push(item('n3', 'nº', 440, 24, 44, 26, 'm-esc', { from: { dx: 0, dy: -30 } })); }
      return a;
    }
    function cliente(){
      return [
        item('bc', 'Cliente (2 variáveis)', 4, 0, 548, 130, 'moldura forte m-ler'),
        item('bn', 'Nome', 14, 28, 250, 92, 'moldura m-ler'),
        item('be', 'Endereco', 288, 28, 250, 92, 'moldura m-ler'),
        item('n0', 'primeiro', 24, 70, 112, 38, 'm-mov'),
        item('n1', 'sobrenome', 142, 70, 112, 38, 'm-mov'),
        item('n2', 'rua, nº', 298, 70, 112, 38, 'm-mov'),
        item('n4', 'cidade', 416, 70, 112, 38, 'm-mov')
      ];
    }
    var F = [];
    F.push(fr('Uma classe que guarda tudo do cliente: começa com o nome...', 'r',
      { code: rc, ate: 8, hl: { 4: 'on', 5: 'on' }, badge: selo('variáveis: 2', 'neutro'), items: grande(2) },
      { code: b1, ate: 0, badge: null, items: [] }));
    F.push(fr('...passa para o endereço: rua e número...', 'r', { hl: { 6: 'on', 7: 'on' }, badge: selo('variáveis: 4', 'ruim'), items: grande(4) }));
    F.push(fr('...e a cidade. São 5 variáveis de instância e vários assuntos numa classe só.', 'r', { hl: { 8: 'on' }, badge: selo('variáveis: 5', 'ruim'), items: grande(5) }));
    F.push(fr('Trocar o formato do endereço mexe na mesma classe que cuida do nome: ela muda por muitos motivos.', 'r', { hl: { 4: 'ruim', 5: 'ruim', 6: 'ruim', 7: 'ruim', 8: 'ruim' }, items: grande(5).map(function(x){ return x.id === 'gx' ? item('gx', 'ClienteGrande', 8, 4, 540, 122, 'moldura m-ruim') : x; }) }, {}, 7));

    F.push(fr('Jeito bom: cada assunto vira uma classe pequena. Primeiro o Nome, com 2 variáveis.', 'b',
      { hl: {} },
      { code: b1, ate: 4, hl: { 3: 'on', 4: 'on' }, badge: selo('variáveis: 2', 'bom'), items: nome() }));
    F.push(fr('Depois o Endereço: rua, número e cidade...', 'b', {}, { code: b2, ate: 4, hl: { 3: 'on', 4: 'on' }, items: nome().concat(endereco(false)) }, 7));
    F.push(fr('...o número vira parte da rua (rua, nº): de novo 2 variáveis.', 'b', {}, { hl: { 3: 'ok' }, items: nome().concat(endereco(true)) }));
    F.push(fr('O Cliente só junta as duas peças: 2 variáveis, e cada peça pode ser testada e reaproveitada.', 'b', {}, { code: b3, ate: 4, hl: { 3: 'on', 4: 'on' }, badge: selo('cada classe: 2', 'bom'), items: cliente() }, 8));
    F.push(fr('Muitas classes pequenas, cada uma com um assunto, no lugar de uma gigante.', 'rb',
      { hl: {}, badge: selo('variáveis: 5', 'ruim') }, { hl: {} }, 8));
    return {
      arq: { r: 'src/11/07_entidades_pequenas.py', b: 'src/11/07_entidades_pequenas.py' },
      frames: F
    };
  }


  /* ------------------------------------------------------------------ cena: dívida técnica */
  function divida(){
    var rc = [
      '# sexta, 17h: o cliente precisa hoje',
      'def preco_aluno(preco):',
      '    return preco * 0.5',
      '',
      'def preco_professor(preco):',
      '    return preco * 0.7',
      '',
      '# copiei e colei: "depois eu arrumo"'
    ];
    var bc = [
      '# DÍVIDA TÉCNICA (consciente), sexta 17h:',
      '# preco_professor é cópia de preco_aluno.',
      '# Pagar: unificar em um dicionario (ticket #42, sprint 3)',
      'def preco_aluno(preco):',
      '    return preco * 0.5',
      '',
      'def preco_professor(preco):',
      '    return preco * 0.7'
    ];
    var bc2 = [
      '# Pagamento (sprint 3): nada duplicado.',
      'MULTIPLICADOR = {"aluno": 0.5, "professor": 0.7}',
      '',
      'def preco_final(preco, tipo):',
      '    return preco * MULTIPLICADOR[tipo]'
    ];
    function barras(alt, cls, extra){
      var a = [rot('rt', 'custo de mexer aqui (os juros):', 8, 2, 280)];
      for(var i = 0; i < 4; i++){
        a.push(item('s' + i, 'sprint ' + (i + 1), 52 + i * 120, 112, 90, 16, 'lbl'));
        if(alt[i] === undefined){ continue; }
        a.push(item('b' + i, '', 70 + i * 120, 108 - alt[i], 56, alt[i], (cls && cls[i]) || 'm-esc'));
      }
      return a.concat(extra || []);
    }
    var F = [];
    F.push(fr('Sexta, 17h: o cliente precisa hoje. A pressa pede um atalho (copiar e colar), e às vezes é a decisão certa.', 'r',
      { code: rc, ate: 8, hl: { 1: 'on' }, badge: selo('dívida sem saber', 'ruim'), items: barras([18]) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Ninguém anotou nada: a dívida existe, mas é invisível. O empréstimo foi feito sem recibo.', 'r', { hl: { 8: 'ruim' }, items: barras([18]) }));
    F.push(fr('Sprint 2: mexer nesse trecho custa um pouco mais. São os juros.', 'r', { hl: {}, items: barras([18, 36]) }));
    F.push(fr('Sprint 3: mais caro ainda, e ninguém lembra por quê. Os juros se acumulam.', 'r', { items: barras([18, 36, 56], ['m-esc', 'm-esc', 'm-ruim']) }));
    F.push(fr('Sprint 4: toda mudança pesa. A dívida cresceu sem ninguém decidir pagar.', 'r', { badge: selo('juros: só crescem', 'ruim'), items: barras([18, 36, 56, 76], ['m-ruim', 'm-ruim', 'm-ruim', 'm-ruim']) }, {}, 7));

    F.push(fr('Jeito bom: a mesma pressa, mas entrando em dívida de olhos abertos. O empréstimo vem com recibo.', 'b',
      { hl: {} },
      { code: bc, ate: 8, hl: { 1: 'on', 2: 'on', 3: 'on' }, badge: selo('dívida consciente', 'bom'), items: barras([18], ['m-esc'], [item('tk', 'ticket #42', 360, 26, 120, 26, 'm-mov', { from: { dx: 0, dy: -24 } })]) }));
    F.push(fr('Registrada: o quê, por quê, quanto custa e até quando. Todo o time sabe que existe.', 'b', {}, { hl: { 1: 'ok', 2: 'ok', 3: 'ok' }, items: barras([18], ['m-esc'], [item('tk', 'ticket #42', 360, 26, 120, 26, 'm-mov')]) }));
    F.push(fr('Sprint 2: os juros aparecem (um pouco mais caro mexer), mas eram esperados e estão no plano.', 'b', {}, { hl: {}, items: barras([18, 34], ['m-esc', 'm-esc'], [item('tk', 'ticket #42', 360, 26, 120, 26, 'm-mov')]) }));
    F.push(fr('Sprint 3: o time paga a dívida e unifica as duas funções.', 'b', {}, {
      code: bc2, ate: 5, hl: { 2: 'ok', 4: 'ok', 5: 'ok' }, badge: selo('quitada na sprint 3', 'bom'),
      items: barras([18, 34], ['m-ler', 'm-ler'], [item('tk', 'ticket #42 ✓', 360, 26, 120, 26, 'm-ler'), item('q', 'quitada', 306, 70, 100, 30, 'm-ler', { from: { dx: 0, dy: -30 } })])
    }, 7));
    F.push(fr('Mesma pressa, dois destinos: sem saber, os juros só crescem; sabendo, a dívida é registrada e paga.', 'rb',
      { hl: {}, badge: selo('juros: só crescem', 'ruim') }, { hl: {} }, 8));
    return {
      arq: { r: 'src/11/08_divida_tecnica.py', b: 'src/11/08_divida_tecnica.py' },
      frames: F
    };
  }


  /* ------------------------------------------------------------------ cena: modularização (a pilha de execução) */
  function modulos(){
    var rc = [
      'def relatorio_antes(turma):',
      '    for nome in turma:',
      '        if len(turma[nome]) > 0:',
      '            soma = 0',
      '            for nota in turma[nome]:',
      '                soma += nota',
      '            media = soma / len(turma[nome])',
      '            if media >= 6:',
      '                print(nome, "aprovado")'
    ];
    var bc = [
      'def media(notas):',
      '    return sum(notas) / len(notas)',
      '',
      'def foi_aprovado(notas):',
      '    return len(notas) > 0 and media(notas) >= 6',
      '',
      'def relatorio(turma):',
      '    for nome in turma:',
      '        if foi_aprovado(turma[nome]):',
      '            print(nome, "aprovado")'
    ];
    function pilhaR(erro){
      var a = [
        rot('pl', 'pilha de execução (stack):', 8, 2, 260),
        item('fr', 'relatorio_antes()<small>percorre · soma · média · decide · imprime</small>', 130, 24, 300, 96, erro ? 'm-ruim' : 'm-esc')
      ];
      if(erro){ a.push(item('er', 'erro<small>em qual das 5?</small>', 440, 44, 108, 40, 'm-ruim', { from: { dx: 20, dy: 0 } })); }
      return a;
    }
    function pilhaB(n, topoCls, erro){
      var nomes = ['relatorio()<small>percorre e imprime</small>', 'foi_aprovado()<small>decide</small>', 'media()<small>só a conta</small>'];
      var a = [rot('pl', 'pilha de execução (stack):', 8, 4, 260)];
      for(var i = 0; i < n; i++){
        var cls = 'm-ler';
        if(i === n - 1 && topoCls){ cls = topoCls; }
        a.push(item('p' + i, nomes[i], 130, 94 - i * 36, 300, 32, cls, { from: { dx: 0, dy: -36 } }));
      }
      if(erro){ a.push(item('er', 'erro aponta<small>media()</small>', 440, 22, 108, 36, 'm-ruim', { from: { dx: 20, dy: 0 } })); }
      return a;
    }
    var F = [];
    F.push(fr('Um relatório escrito de uma vez só: uma unidade de execução faz tudo.', 'r',
      { code: rc, ate: 9, hl: { 1: 'on' }, badge: selo('unidades: 1', 'ruim'), items: pilhaR(false) },
      { code: bc, ate: 0, badge: null, items: [] }));
    F.push(fr('Na pilha de execução é um frame só, carregando 5 responsabilidades misturadas.', 'r',
      { hl: { 2: 'ruim', 3: 'ruim', 4: 'ruim', 5: 'ruim', 6: 'ruim', 7: 'ruim', 8: 'ruim', 9: 'ruim' }, items: pilhaR(false) }));
    F.push(fr('Se algo quebrar aqui dentro, o erro aponta a função inteira: o culpado pode ser qualquer uma das 5 coisas.', 'r',
      { hl: { 7: 'ruim' }, items: pilhaR(true) }));

    F.push(fr('Jeito bom: separar as unidades de execução. Cada função faz uma coisa e vira um frame com nome próprio.', 'b',
      { hl: {} },
      { code: bc, ate: 10, hl: { 7: 'on', 8: 'on', 9: 'on', 10: 'on' }, badge: selo('unidades: 3', 'bom'), items: pilhaB(1) }));
    F.push(fr('relatorio() chama foi_aprovado(): um frame novo é empilhado (push).', 'b', {}, { hl: { 4: 'on', 5: 'on' }, items: pilhaB(2) }));
    F.push(fr('foi_aprovado() chama media(): mais um frame, e cada um tem uma tarefa só.', 'b', {}, { hl: { 1: 'on', 2: 'on' }, items: pilhaB(3) }));
    F.push(fr('Se algo quebrar, o stack trace conta uma história (relatorio, foi_aprovado, media) e aponta o culpado, com nome.', 'b', {}, { hl: { 1: 'ruim', 2: 'ruim' }, items: pilhaB(3, 'm-ruim', true) }, 7));
    F.push(fr('Mesmo programa. Modularizar é separar as unidades de execução: cada uma faz uma coisa e a pilha vira uma história legível.', 'rb',
      { hl: {}, badge: selo('unidades: 1', 'ruim'), items: pilhaR(true) },
      { hl: {}, badge: selo('unidades: 3', 'bom'), items: pilhaB(3) }, 9));
    return {
      arq: { r: 'src/11/09_modularizacao.py', b: 'src/11/09_modularizacao.py' },
      frames: F
    };
  }

  var CENAS = {
    hadouken: hadouken, extracao: extracao, 'sem-else': semElse, primitivos: primitivos,
    colecao: colecao, demeter: demeter, diga: diga, pequenas: pequenas, divida: divida, modulos: modulos
  };

  /* ------------------------------------------------------------------ motor */
  var LADOS = ['r', 'b'];
  var vivos = [];

  function resolver(frames){
    var st = {};
    LADOS.forEach(function(l){ st[l] = { code: [], ate: 0, items: [], badge: null }; });
    return frames.map(function(f){
      var out = { msg: f.msg, foco: f.foco, hold: f.hold };
      LADOS.forEach(function(l){
        var s = f[l] || {};
        var cur = st[l];
        if(s.code){ cur.code = s.code; if(s.ate === undefined){ cur.ate = s.code.length; } }
        if(s.ate !== undefined){ cur.ate = s.ate; }
        if(s.items){ cur.items = s.items; }
        if(s.badge !== undefined){ cur.badge = s.badge; }
        out[l] = { code: cur.code, ate: cur.ate, items: cur.items, badge: cur.badge, hl: s.hl || {} };
      });
      return out;
    });
  }

  function esc(s){
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function linhaHtml(txt, n){
    var i = txt.indexOf('#');
    var cod = i < 0 ? txt : txt.slice(0, i);
    var com = i < 0 ? '' : '<span class="cm">' + esc(txt.slice(i)) + '</span>';
    return '<span class="ln">' + n + '</span><span class="tx">' + esc(cod) + com + '</span>';
  }

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

  function aplicar(L, items){
    var vistos = {};
    items.forEach(function(it){
      vistos[it.id] = true;
      var el = L.els[it.id];
      var cls = 'ci ' + (it.line ? 'lin ' : '') + it.cls;
      if(!el){
        el = document.createElement('div');
        L.els[it.id] = el;
        L.canvas.appendChild(el);
        el.className = cls + (it.from && !it.line ? ' bola' : '');
        geo(el, it, it.from);
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
    Object.keys(L.els).forEach(function(id){
      if(vistos[id]){ return; }
      var el = L.els[id];
      delete L.els[id];
      var it = el._it || {};
      el.style.opacity = '0';
      if(it.to){ geo(el, it, it.to); }
      setTimeout(function(){ if(el.parentNode){ el.parentNode.removeChild(el); } }, 650);
    });
  }

  function lado(L, s, seco){
    var chave = s.code.join('\n');
    if(L.chave !== chave){
      L.chave = chave;
      L.codigo.innerHTML = s.code.map(function(t, k){
        return '<div class="cl">' + linhaHtml(t, k + 1) + '</div>';
      }).join('');
    }
    var linhas = L.codigo.children;
    for(var k = 0; k < linhas.length; k++){
      var extra = s.hl[k + 1] ? ' ' + s.hl[k + 1] : '';
      var oculta = k >= s.ate ? ' oculta' : '';
      linhas[k].className = 'cl' + extra + oculta;
    }
    L.selo.textContent = s.badge ? s.badge[0] : '';
    L.selo.className = 'cbadge ' + (s.badge ? s.badge[1] : '');
    if(seco){ L.canvas.classList.add('sem-trans'); }
    aplicar(L, s.items);
    if(seco){ void L.canvas.offsetWidth; L.canvas.classList.remove('sem-trans'); }
  }

  function mostra(w, i, seco){
    var f = w.frames[i];
    w.i = i;
    w.t = f.hold;
    LADOS.forEach(function(l){ lado(w.lados[l], f[l], seco); });
    w.root.setAttribute('data-foco', f.foco);
    w.msg.textContent = f.msg;
    w.num.textContent = 'etapa ' + (i + 1) + '/' + w.frames.length;
    Array.prototype.forEach.call(w.dots.children, function(d, k){ d.classList.toggle('on', k === i); });
  }

  function pausa(w, sim){
    w.pausado = sim;
    w.root.classList.toggle('pausado', sim);
    w.btnPlay.textContent = sim ? '▶' : '❚❚';
    w.btnPlay.setAttribute('aria-label', sim ? 'Continuar a animação' : 'Pausar a animação');
  }

  function ir(w, i){
    var n = w.frames.length;
    mostra(w, (i + n) % n, false);
  }

  function monta(root){
    var def = CENAS[root.getAttribute('data-cali')];
    if(!def){ return; }
    var cena = def();
    var frames = resolver(cena.frames);
    root.classList.add('cali');
    root.innerHTML =
      '<div class="ccols">' +
        '<section class="cp cp-r"><header class="chd"><span class="ctag">JEITO RUIM</span><span class="cfile">' + cena.arq.r + '</span><span class="cbadge"></span></header>' +
          '<div class="ccode"></div><div class="cstage"><div class="ccanvas"></div></div></section>' +
        '<section class="cp cp-b"><header class="chd"><span class="ctag">JEITO BOM</span><span class="cfile">' + cena.arq.b + '</span><span class="cbadge"></span></header>' +
          '<div class="ccode"></div><div class="cstage"><div class="ccanvas"></div></div></section>' +
      '</div>' +
      '<div class="ccap"><span class="cmsg"></span></div>' +
      '<div class="cctl"><button type="button" data-a="ant" aria-label="Etapa anterior">◀</button>' +
        '<button type="button" data-a="play" aria-label="Pausar a animação">❚❚</button>' +
        '<button type="button" data-a="prox" aria-label="Próxima etapa">▶</button>' +
        '<span class="cdots">' + frames.map(function(){ return '<i></i>'; }).join('') + '</span>' +
        '<span class="cn"></span><span class="chint">P pausa · , e . andam as etapas</span></div>';
    var w = {
      root: root, slide: root.closest('.slide'), frames: frames, i: 0, t: 0, on: false, pausado: false, lados: {},
      msg: root.querySelector('.cmsg'), num: root.querySelector('.cn'), dots: root.querySelector('.cdots'),
      btnPlay: root.querySelector('[data-a="play"]')
    };
    var paineis = root.querySelectorAll('.cp');
    LADOS.forEach(function(l, k){
      var p = paineis[k];
      w.lados[l] = { codigo: p.querySelector('.ccode'), canvas: p.querySelector('.ccanvas'), selo: p.querySelector('.cbadge'), els: {}, chave: null };
    });
    root.addEventListener('click', function(e){
      var b = e.target.closest('[data-a]');
      if(b){
        var a = b.getAttribute('data-a');
        if(a === 'play'){ pausa(w, !w.pausado); return; }
        pausa(w, true);
        ir(w, a === 'prox' ? w.i + 1 : w.i - 1);
        return;
      }
      var d = e.target.closest('.cdots i');
      if(!d){ return; }
      pausa(w, true);
      ir(w, Array.prototype.indexOf.call(w.dots.children, d));
    });
    // PDF e miniaturas mostram a última etapa (os dois lados completos)
    mostra(w, frames.length - 1, true);
    var pedida = parseInt(new URLSearchParams(location.search).get('etapa'), 10);
    if(!isNaN(pedida)){ mostra(w, Math.min(Math.max(pedida - 1, 0), frames.length - 1), true); pausa(w, true); w.fixa = true; }
    vivos.push(w);
  }

  Array.prototype.forEach.call(deck.querySelectorAll('[data-cali]'), monta);

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

  window.CALI = { vivos: vivos, mostra: mostra, pausa: pausa };
})();
