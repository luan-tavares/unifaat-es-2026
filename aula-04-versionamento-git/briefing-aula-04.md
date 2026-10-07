# Briefing — Aula 04: Versionamento e Git

1 - Introdução

Toda vez que vocês escrevem uma linha de código, editam um arquivo, ou apagam algo que "achavam" que não precisava mais, uma pergunta silenciosa fica no ar: e se der errado? E se aquela mudança quebrar o projeto inteiro, e vocês precisarem voltar para a versão de ontem, ou de uma hora atrás? Sem uma ferramenta que registre essa evolução, a resposta costuma ser desastrosa: pastas com nomes como projeto_final, projeto_final_v2, projeto_final_v2_agora_vai, cada uma uma cópia manual, incompleta, de um momento diferente do trabalho.

É exatamente esse problema que o controle de versão resolve, e é sobre ele que esta aula inteira vai girar. Existe uma ferramenta, criada especificamente para isso, chamada Git, que permite registrar cada mudança feita em um projeto, entender exatamente o que mudou, quando mudou, e voltar no tempo sempre que for preciso — sem depender de pastas duplicadas ou de memória. Antes de chegarmos lá, porém, é preciso fechar um ponto que ficou em aberto da aula passada: como o Windows e o Linux, rodando um "dentro" do outro através do WSL, enxergam os arquivos um do outro. Esse entendimento vai ser importante o ano inteiro, e é o primeiro passo de hoje.

2 - O filesystem compartilhado entre WSL e Windows

Na aula anterior, vimos que o WSL cria um ambiente Linux isolado, com seus próprios processos e sua própria memória, rodando dentro do Windows. Isso pode dar a impressão de que os dois sistemas são completamente separados, como se fossem dois computadores diferentes que não sabem da existência um do outro. Mas existe uma ponte importante entre eles: o filesystem, ou sistema de arquivos — a estrutura de pastas e arquivos que cada sistema operacional organiza e mantém.

O WSL foi construído para que essa ponte exista: o ambiente Linux consegue enxergar e acessar os arquivos que estão no disco do Windows, e o Windows, por sua vez, também consegue acessar os arquivos que estão dentro do ambiente Linux. Isso é o que se chama de filesystem compartilhado — os dois sistemas, apesar de isolados em termos de processos e memória, como vimos na aula passada, compartilham o mesmo disco físico por baixo, e o WSL constrói uma forma de "traduzir" o caminho de um sistema para o outro.

2.1 - O que é um path

Para entender como essa tradução funciona, precisamos relembrar um conceito que já apareceu, mas que vale reforçar: o path. Path (ou caminho) é o endereço de um arquivo ou pasta dentro do sistema de arquivos — a sequência de diretórios que você precisa atravessar, a partir de um ponto de partida, até chegar exatamente naquele arquivo ou pasta. É a mesma lógica de um endereço postal: rua, número, complemento — só que, em vez de cidade e bairro, temos pastas dentro de pastas.

Isso conecta direto com algo que vimos na aula 01: quando vocês entram num CLI, sem GUI, vocês não estão "soltos" num vazio — vocês estão sempre dentro de um diretório específico, e navegam de diretório em diretório usando comandos como cd. O path é justamente a forma de descrever essa posição: em qual diretório vocês estão agora, e por quais diretórios seria preciso passar para chegar a outro lugar.

O ponto importante aqui é que cada sistema operacional organiza e nomeia seus paths de um jeito próprio. Um exemplo prático: a pasta Área de Trabalho (Desktop) de um usuário chamado maria, no Windows, tem um path como:

```bash
C:\Users\maria\Desktop
```

Já esse mesmo Desktop, visto de dentro do ambiente Linux do WSL, aparece com um path completamente diferente:

```bash
/mnt/c/Users/maria/Desktop
```

Repare no padrão: todo o disco C: do Windows aparece, dentro do WSL, montado dentro da pasta /mnt/c/. É por isso que, sempre que vocês forem acessar algo do Windows a partir do terminal Linux, o caminho vai começar com /mnt/c/ — essa é a "porta de entrada" que o WSL cria para o disco do Windows. Fora dessa pasta /mnt/c/, o restante da estrutura de pastas do WSL (como a pasta pessoal do usuário Linux, algo como /home/maria) é um sistema de arquivos próprio do Ubuntu, que existe independentemente do Windows.

2.2 - Relembrando . e ..

Vale reforçar, agora que falamos de path, dois símbolos que vão aparecer o tempo todo na navegação por terminal, e que já foram citados na aula passada: o ponto único (.) representa o próprio diretório em que você está agora, e os dois pontos (..) representam o diretório pai — ou seja, um nível acima na estrutura de pastas, o diretório "anterior" a partir do qual o atual foi criado. Esses dois símbolos não são exclusivos do WSL nem do Linux — eles existem também no Windows —, mas vão ser especialmente úteis agora que começamos a instalar ferramentas e precisamos nos mover entre pastas com mais frequência.

3 - Binários e a instalação das primeiras ferramentas

Na aula passada, vimos o conceito mais cru de binário: a sequência de 0s e 1s que, no fim das contas, é a única linguagem que o hardware do computador realmente entende. Nesta aula, vamos dar um passo à frente e falar do binário executável — ou simplesmente bin, no jargão de CLI: o arquivo já compilado, pronto para ser executado, que o sistema procura sempre que você digita um comando no terminal. Vimos também, de forma mais teórica, que cada ambiente isolado — Windows de um lado, WSL Linux do outro — precisa ter seus próprios binários instalados, mesmo que o mesmo programa já exista no outro ambiente.

Chegou a hora de colocar isso em prática. Comandos como mkdir, ls, cp e cd, que vocês já usaram, são exemplos de binários que já vêm instalados por padrão em qualquer distro Linux, exatamente para permitir a navegação básica pelo sistema de arquivos. Mas, para o trabalho de verdade de um engenheiro de software, algumas ferramentas adicionais precisam ser instaladas manualmente — e é importante entender, desde já, que essa instalação é sempre isolada por máquina: mesmo que o computador do laboratório da faculdade já tenha essas ferramentas prontas, o notebook pessoal de cada um precisa passar pelo mesmo processo de instalação, porque cada ambiente (cada Windows, cada WSL) é independente dos demais.

3.1 - O que é uma IDE e por que ela importa

Antes de instalar a primeira ferramenta, vale entender o que ela é. IDE é a sigla para Integrated Development Environment (Ambiente de Desenvolvimento Integrado) — um programa que reúne, num só lugar, tudo o que um desenvolvedor precisa no dia a dia: um editor de texto pensado para código (com destaque de sintaxe, sugestões automáticas, identificação de erros antes mesmo de rodar o programa), um terminal integrado, ferramentas de depuração, e integração direta com sistemas de versionamento como o Git, que veremos ainda nesta aula.

A importância de uma IDE está em reduzir o atrito entre pensar em código e escrever código. Sem ela, seria preciso abrir um editor de texto simples, um terminal separado, e alternar constantemente entre janelas desconectadas umas das outras. Com uma IDE, esse fluxo inteiro acontece dentro do mesmo programa, o que economiza tempo e reduz erros — um ganho que se torna cada vez mais evidente à medida que os projetos crescem em tamanho e complexidade.

3.2 - Instalando o VS Code

A IDE que vamos usar ao longo do curso é o VS Code (Visual Studio Code), da Microsoft — uma das mais populares do mercado, gratuita, e com um ecossistema enorme de extensões. Diferente dos comandos de terminal que vimos até agora, o VS Code é um programa gráfico (GUI), o que significa que ele precisa ser instalado no Windows, e não dentro do ambiente Linux do WSL — afinal, é o Windows quem gerencia a tela, o mouse e as janelas da máquina de vocês.

A instalação é feita normalmente, como qualquer programa do Windows: baixando o instalador no site oficial (code.visualstudio.com) e seguindo o assistente de instalação. O detalhe interessante aparece depois: durante a instalação, o VS Code registra, no Windows, um binário chamado code, que pode ser chamado diretamente pelo terminal — inclusive pelo terminal Linux do WSL, graças à ponte de comunicação que o WSL cria entre os dois sistemas.

Isso significa que, estando dentro do terminal do WSL, dentro de qualquer pasta do Linux, o seguinte comando abre o VS Code do Windows, já apontando para aquela pasta:

```bash
# O comando "code" é o binário do VS Code, registrado durante a instalação no Windows.
# Quando chamado de dentro do WSL, ele não abre uma cópia "Linux" do VS Code --
# ele se comunica com o VS Code já instalado no Windows e abre a janela gráfica
# dele por lá, mas apontando para a pasta atual do ambiente Linux.
# O ponto (.) aqui significa "a pasta em que estou agora", como vimos na seção 2.2.
code .
```

Se o comando code não for reconhecido dentro do WSL na primeira tentativa, normalmente basta fechar e reabrir o terminal depois da instalação do VS Code no Windows — o instalador se encarrega de deixar esse binário disponível também no ambiente Linux.

3.3 - Instalando o Git

O Git, ferramenta central desta aula, também precisa ser instalado nos dois ambientes, mas de formas diferentes, já que cada sistema operacional tem seu próprio jeito de instalar programas.

No Windows, a instalação segue o mesmo caminho do VS Code: baixar o instalador oficial no site git-scm.com e seguir o assistente gráfico de instalação.

Já no WSL, como estamos dentro de um ambiente Linux baseado em Ubuntu, a instalação é feita por terminal, usando o apt — o gerenciador de pacotes padrão do Ubuntu, responsável por baixar, instalar e atualizar programas dentro da distro:

```bash
# "sudo" executa o comando com permissões de administrador, necessárias para instalar programas.
# "apt update" atualiza a lista de pacotes disponíveis para instalação, garantindo que
# a versão baixada do Git seja a mais recente conhecida pelo sistema.
sudo apt update
# "apt install git" instala, de fato, o binário do Git dentro do ambiente Linux do WSL.
# O "-y" confirma automaticamente qualquer pergunta de "deseja continuar? (s/n)".
sudo apt install git -y
# Para confirmar que a instalação funcionou e ver a versão instalada:
git --version
```

Vale reforçar o motivo de instalar em ambos os lados: como vimos na aula passada, o Windows e o ambiente Linux do WSL têm seus próprios binários isolados. Ter o Git instalado no Windows não faz com que ele exista automaticamente dentro do WSL, e vice-versa — cada ambiente exige sua própria instalação.

3.4 - Vim: um editor de texto por terminal

Além de uma IDE gráfica como o VS Code, existe uma outra forma, ainda mais "crua", de editar arquivos de texto: diretamente pelo terminal, sem nenhuma interface gráfica. O programa mais tradicional para isso é o Vim, um editor de texto que roda inteiramente dentro da CLI.

O Vim tem uma particularidade que vale ser mencionada, mesmo sem entrarmos em detalhes agora: sua curva de aprendizado é conhecida por ser bastante íngreme, já que ele funciona por atalhos de teclado e "modos" de operação, bem diferente da lógica de clicar e digitar à qual estamos acostumados. Não vamos nos aprofundar nele nesta disciplina, mas fica registrado, para quem tiver curiosidade de explorar por conta própria, dois recursos voltados justamente para praticar Vim de um jeito mais leve: o site vimified.com e o vim-adventures.com, este último no formato de jogo.

4 - Git: controle de versão

Com o Git instalado nos dois ambientes, chegou a hora de entender, de fato, o que ele faz e por que ele é considerado uma das ferramentas mais importantes da rotina de qualquer desenvolvedor.

4.1 - Por que versionar um código importa

Versionar um código significa manter um histórico organizado de todas as mudanças feitas nele ao longo do tempo — quem mudou o quê, quando, e por quê. Sem isso, qualquer projeto de software real vira, cedo ou tarde, um risco constante: uma alteração que parecia pequena pode quebrar uma funcionalidade que já estava funcionando, e sem um histórico confiável, não existe um jeito seguro de voltar atrás.

O controle de versão resolve exatamente esse problema. Com ele, cada mudança relevante feita no código pode ser registrada como um "ponto de salvamento" — um momento específico da história do projeto, que pode ser revisitado, comparado, ou restaurado a qualquer momento, mesmo que dezenas de outras mudanças tenham acontecido depois. Isso dá liberdade para experimentar e errar: se algo der errado, sempre existe um caminho de volta.

4.2 - Como o Git funciona: pensando em linha do tempo

De forma mais técnica, o Git organiza o histórico de um projeto como um grafo — uma estrutura de pontos conectados por linhas, onde cada ponto representa um estado específico do projeto em determinado momento. Mas, para começar, vale pensar nisso de um jeito mais simples e visual: como uma linha do tempo.

Imagine que cada vez que vocês salvam um progresso importante no projeto, o Git tira uma "fotografia" completa de como todos os arquivos estavam naquele instante. Essa fotografia é o que se chama de commit. Um commit não é uma cópia de um arquivo isolado — é um retrato de todo o projeto, naquele ponto específico da linha do tempo, com uma mensagem explicando o que mudou desde a fotografia anterior. Conforme o projeto avança, essa linha do tempo vai se formando: commit depois de commit, cada um representando um passo da evolução do código, sempre na ordem em que aconteceram, e sempre podendo ser revisitados depois.

É essa sequência de fotografias — a linha do tempo de commits — que forma, tecnicamente, o grafo que o Git mantém por trás dos panos. Por enquanto, e ao longo de todo o restante do curso deste semestre, essa linha vai ser sempre única e sequencial, sem desvios — o conceito de "branch" (ramificações dessa linha do tempo, permitindo caminhos paralelos de desenvolvimento) fica de fora por ora, e será visto em outra disciplina.

4.3 - Comandos básicos do Git

Com o conceito de commit em mente, vamos ao fluxo prático. Para experimentar, imagine que vocês vão criar, dentro do VS Code, um arquivo simples chamado anotacoes.txt, dentro de uma pasta de projeto qualquer.

O primeiro passo é transformar essa pasta em um repositório Git — ou seja, avisar o Git que, a partir daquele momento, ele deve começar a observar e registrar o histórico dos arquivos ali dentro:

```bash
# "git init" transforma a pasta atual em um repositório Git.
# Isso cria, de forma escondida, uma pasta oculta chamada ".git" dentro do diretório,
# que é onde o Git vai guardar todo o histórico de commits daquele projeto.
# Esse comando só precisa ser rodado uma vez, no início do projeto.
git init
```

A partir daí, qualquer mudança feita nos arquivos da pasta pode ser acompanhada com o comando status, que funciona como uma espécie de raio-x do momento atual do projeto:

```bash
# "git status" mostra o estado atual do repositório: quais arquivos foram
# modificados, quais são novos e ainda não foram registrados pelo Git,
# e quais já estão prontos para virar parte do próximo commit.
# É um comando seguro, que nunca altera nada -- só informa.
git status
```

Suponha agora que vocês acabaram de criar o arquivo anotacoes.txt e escreveram nele a primeira linha de texto. Nesse momento, o Git já percebe que existe um arquivo novo (isso apareceria no git status), mas ainda não o considera parte do histórico — é preciso avisar explicitamente ao Git que aquele arquivo deve entrar na próxima fotografia. Esse aviso é feito com o comando add:

```bash
# "git add" prepara um arquivo (ou vários) para entrar no próximo commit.
# Pense nisso como "separar", numa mesa, exatamente os arquivos que
# devem fazer parte da próxima fotografia do projeto.
# O ponto (.) aqui significa "todos os arquivos modificados ou novos
# dentro da pasta atual", como vimos na seção 2.2 -- ou seja, este
# comando prepara tudo de uma vez, em vez de escolher arquivo por arquivo.
git add .
```

Com os arquivos preparados, o commit em si é criado com o comando commit, sempre acompanhado de uma mensagem explicando o que foi feito:

```bash
# "git commit" cria, de fato, a fotografia do projeto no estado atual,
# incluindo tudo o que foi preparado com "git add" anteriormente.
# A flag "-m" permite escrever a mensagem do commit direto na linha de comando,
# entre aspas -- essa mensagem deve descrever, de forma breve e clara,
# o que mudou desde o commit anterior.
git commit -m "Cria anotacoes.txt com a primeira anotacao"
```

A partir desse primeiro commit, o histórico do projeto começa a existir de verdade. Cada vez que novas mudanças forem feitas — por exemplo, adicionando uma segunda linha ao arquivo anotacoes.txt — o mesmo fluxo se repete: git add para preparar, git commit para fotografar. Para visualizar essa linha do tempo formada por esses commits, existe o comando log:

```bash
# "git log" exibe o histórico de commits do projeto, do mais recente
# para o mais antigo. Para cada commit, mostra um codigo unico de
# identificacao (o "hash"), o autor, a data, e a mensagem escrita
# na hora do commit -- exatamente a linha do tempo que discutimos
# na secao 4.2, agora em forma de comandos.
git log
```

Esse código único que aparece ao lado de cada commit no git log é o que permite, futuramente, "voltar" para um ponto específico da linha do tempo. Se, por exemplo, vocês perceberem que uma mudança recente quebrou algo no arquivo, e quiserem recuperar exatamente como aquele arquivo estava em um commit anterior, o comando checkout, apontando para o código daquele commit, resolve isso:

```bash
# "git checkout" seguido do codigo (hash) de um commit e do nome do arquivo
# restaura aquele arquivo especifico exatamente como ele estava naquele
# momento da linha do tempo, sem afetar os demais arquivos do projeto.
# O codigo do commit (algo como "a1b2c3d") e obtido a partir do "git log".
git checkout a1b2c3d -- anotacoes.txt
```

Por fim, vale conhecer mais um comando bastante usado no dia a dia, para comparar o que mudou em um arquivo antes de decidir se aquilo deve virar um commit:

```bash
# "git diff" mostra, linha a linha, exatamente o que foi alterado
# nos arquivos desde o ultimo commit -- o que foi removido e o que
# foi adicionado. E util para revisar uma mudanca antes de rodar
# "git add" e "git commit", garantindo que o commit vai registrar
# exatamente o que se pretende.
git diff
```

Vale reforçar: por enquanto, todo esse histórico de commits vive apenas na máquina de cada um, dentro da pasta .git criada pelo git init. Ainda não existe nenhuma cópia desse histórico em outro lugar, nem qualquer forma de compartilhar esse projeto com outra pessoa — isso é o que o GitHub vai resolver, e é o assunto completo da próxima aula.

4.4 - HEAD, soft delete e hard delete

No exemplo anterior, usamos o código (hash) de um commit específico para restaurar um arquivo a um ponto passado da linha do tempo. Isso funciona, mas exige copiar e colar um código longo e pouco intuitivo, como a1b2c3d, toda vez que se quer referenciar um commit. O Git oferece uma forma mais prática de fazer essa mesma referência, através de um conceito chamado HEAD.

HEAD é, de forma simples, um ponteiro que aponta sempre para o commit em que vocês estão "parados" no momento — normalmente, o commit mais recente da linha do tempo, o último criado. Pensando na metáfora da linha do tempo de fotografias, HEAD é como um marcador que diz "estou aqui agora". A grande vantagem de usar HEAD, em vez do código do commit, é que ele pode ser combinado com uma contagem de "quantos passos para trás" se quer andar na linha do tempo, sem precisar saber o código de nenhum commit específico:

```bash
# "HEAD" sozinho se refere ao commit atual, o mais recente da linha do tempo.
# "HEAD~1" se refere a um commit antes do atual, "HEAD~2" a dois commits
# antes, e assim por diante -- e um jeito de "andar para tras" na linha
# do tempo sem precisar copiar nenhum codigo de commit.
# Este exemplo restaura o arquivo anotacoes.txt para como ele estava
# um commit atras, usando HEAD em vez do hash visto no exemplo anterior.
git checkout HEAD~1 -- anotacoes.txt
```

Além de restaurar um arquivo específico, existe uma operação mais radical: mover o próprio ponteiro HEAD para trás na linha do tempo, descartando os commits mais recentes por inteiro. Essa operação é feita com o comando reset, e é aqui que entram os dois conceitos que dão nome a esta seção: soft delete e hard delete — duas formas diferentes de "apagar" commits, com consequências bem distintas.

Um soft delete (feito com a flag --soft) move o ponteiro HEAD para um commit anterior, mas preserva todo o trabalho feito nos commits descartados como alterações ainda presentes nos arquivos, prontas para serem preparadas (add) e commitadas novamente. É como desfazer a fotografia, mas manter tudo o que havia sido fotografado, ainda visível e disponível na mesa de trabalho. Já um hard delete (feito com a flag --hard) move o ponteiro HEAD para um commit anterior e descarta completamente qualquer alteração feita depois dele — os arquivos voltam a ficar exatamente como estavam naquele commit antigo, sem nenhum vestígio das mudanças mais recentes:

```bash
# "git reset --soft HEAD~1" volta o ponteiro HEAD um commit para tras,
# mas mantem as alteracoes daquele ultimo commit descartado ainda
# presentes nos arquivos, como se tivessem acabado de ser feitas --
# um soft delete, que preserva o trabalho para ser commitado de novo.
git reset --soft HEAD~1

# "git reset --hard HEAD~1" volta o ponteiro HEAD um commit para tras
# e descarta por completo as alteracoes daquele ultimo commit,
# fazendo os arquivos voltarem exatamente ao estado anterior --
# um hard delete, que apaga o trabalho sem deixar rastro.
# Por ser uma operacao que perde trabalho de forma irreversivel,
# deve ser usado com cautela.
git reset --hard HEAD~1
```

A diferença entre os dois é, portanto, uma diferença de risco: o soft delete é uma forma segura de "desfazer" um commit sem perder o trabalho feito, útil quando se quer reorganizar ou corrigir a mensagem de um commit recente antes de refazê-lo. O hard delete, por sua vez, é uma ferramenta poderosa, mas perigosa — indicada apenas quando se tem certeza absoluta de que as mudanças descartadas realmente não são mais necessárias, já que não existe, depois de um hard delete, um caminho simples de volta.

Vale a pena guardar esses dois termos, porque eles não vão aparecer só aqui. Ao longo do curso de ADS, o par soft delete e hard delete volta a se repetir em outros contextos, com a mesma lógica de fundo. Um exemplo bastante comum aparece em Banco de Dados: lá, um soft delete costuma significar marcar um registro como "removido" através de uma coluna ou flag (como um campo deletado ou ativo), sem de fato apagar a linha da tabela — o dado continua fisicamente presente, apenas escondido das consultas normais, podendo ser restaurado depois. Já um hard delete, em Banco de Dados, é a remoção definitiva da linha, através de um comando como DELETE, sem deixar nenhum rastro recuperável. Reconhecer essa mesma ideia se repetindo em ferramentas diferentes é um bom exemplo de como conceitos de engenharia de software atravessam disciplinas — o nome muda de contexto, mas a lógica por trás continua sendo a mesma.

5 - Conclusão

Nesta aula, fechamos um ponto pendente da aula anterior — como o Windows e o WSL compartilham o mesmo sistema de arquivos, ainda que sejam ambientes isolados em termos de processos e memória — e usamos esse entendimento para instalar, de forma isolada em cada máquina, as primeiras ferramentas de verdade da rotina de um desenvolvedor: o VS Code como IDE, o Git como sistema de controle de versão, e uma menção ao Vim como alternativa de edição por terminal.

A partir daí, entramos no assunto central da aula: por que versionar um projeto é indispensável, e como o Git faz isso na prática, organizando o histórico de um código como uma linha do tempo de commits, cada um representando uma fotografia completa do projeto em um momento específico. Vimos os comandos que sustentam esse fluxo básico — init, status, add, commit, log, checkout e diff — sempre trabalhando dentro de uma única linha do tempo, sem ramificações.

Na próxima aula, damos o passo que falta para que esse histórico deixe de existir só na máquina de cada um: o GitHub, a ferramenta que permite enviar (dar push) o histórico do Git para a internet, compartilhar projetos com outras pessoas, e colaborar em um mesmo código de forma organizada.

Questões do TA:

QUESTÃO 1
Segundo o texto, o que explica o fato de o Desktop do Windows e o Desktop do WSL aparecerem com paths tão diferentes (C:\Users\... de um lado e /mnt/c/Users/... do outro), mesmo sendo, na prática, a mesma pasta física?
A) O WSL cria uma cópia duplicada de cada arquivo do Windows, por isso os caminhos são diferentes.
B) Cada sistema operacional organiza e nomeia seu sistema de arquivos à sua própria maneira, e o WSL monta o disco do Windows dentro de uma pasta própria do Linux para tornar esse acesso possível.
C) O Desktop do Windows e o Desktop do WSL são, na verdade, pastas completamente diferentes e sem nenhuma relação entre si.
D) O path muda apenas por uma questão estética do terminal, sem nenhum motivo técnico por trás.
E) Isso acontece porque o Windows não permite que o Linux acesse nenhum arquivo seu, e o path do WSL é apenas uma simulação.
Gabarito: B)
Misturar as alternativas? (x) Sim (  ) Não

QUESTÃO 2
De acordo com o texto, qual é a diferença central entre o binário "cru" (0s e 1s) mencionado como pano de fundo e o binário executável (bin) explicado nesta aula, no contexto de terminal?
A) Não existe diferença real; os dois termos descrevem exatamente a mesma coisa.
B) O binário cru é a linguagem básica que o hardware entende, enquanto o binário executável é um arquivo já compilado, pronto para ser executado, que o sistema procura quando um comando é digitado no terminal.
C) O binário executável só existe no Windows, enquanto o binário cru só existe no Linux.
D) O binário cru é usado apenas por IDEs, enquanto o binário executável é usado apenas por editores de texto como o Vim.
E) O binário executável é uma tradução do Git para linguagem de máquina, enquanto o binário cru é exclusivo de arquivos de texto.
Gabarito: B)
Misturar as alternativas? (x) Sim (  ) Não

QUESTÃO 3
Pensando na metáfora da linha do tempo usada no texto para explicar o Git, qual das opções abaixo melhor descreve a diferença conceitual entre um soft delete e um hard delete ao se voltar a um commit anterior?
A) Soft delete e hard delete são apenas dois nomes diferentes para o mesmo comando, sem nenhuma diferença prática entre eles.
B) O soft delete apaga permanentemente os commits mais recentes, enquanto o hard delete apenas os esconde temporariamente.
C) O soft delete volta o ponteiro HEAD para um commit anterior, mas preserva o trabalho feito depois dele como alterações ainda disponíveis; o hard delete volta o HEAD da mesma forma, mas descarta esse trabalho por completo, sem deixar rastro.
D) O soft delete só pode ser usado com o hash de um commit, enquanto o hard delete só pode ser usado com o HEAD.
E) A diferença entre os dois está apenas na velocidade de execução do comando, e não no que acontece com os arquivos.
Gabarito: C)
Misturar as alternativas? (x) Sim (  ) Não
