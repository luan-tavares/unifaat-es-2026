# Briefing — Aula 01: SO e Terminal

1 - Introdução

Antes de escrever a primeira linha de código, vale a pena parar num detalhe que quase ninguém questiona: por que essa disciplina se chama **Engenharia de Software**, e não simplesmente "Programação"? Afinal, o que vocês vão fazer aqui é escrever código — não seria mais direto chamar a matéria assim?

A resposta a essa pergunta define tudo o que vem pela frente neste ano, e é por ela que vamos começar.

**Programar** é a habilidade de escrever instruções que um computador executa. É uma habilidade técnica, individual, e — sejamos honestos — relativamente fácil de aprender em suas primeiras versões. Qualquer pessoa consegue escrever um programa que soma dois números depois de algumas horas de estudo.

**Engenharia**, em qualquer área — civil, mecânica, elétrica — é outra coisa. É a disciplina de construir coisas que funcionam não só uma vez, na tela do seu computador, mas que continuam funcionando quando: outras pessoas mexem nelas, o tempo passa, o sistema cresce, e coisas dão errado. Uma ponte não é projetada só para não cair no dia da inauguração — ela é projetada para resistir a anos de uso, variação de peso, clima, desgaste.

O termo "Engenharia de Software" nasceu oficialmente em 1968, numa conferência organizada pela OTAN. Na época, a indústria vivia o que ficou conhecido como a **crise do software**: projetos estouravam prazos, estouravam orçamentos, e muitos simplesmente não funcionavam quando entregues. O problema não era falta de gente que soubesse programar — era falta de disciplina, processo e responsabilidade em como o software era construído. Chamar aquilo de "engenharia" foi quase uma provocação: se existe rigor técnico para construir uma ponte, por que não deveria existir rigor equivalente para construir software?

É essa provocação de 1968 que ainda organiza o que vocês vão estudar este ano. Cada bloco desta grade existe porque **programar sozinho não é suficiente** — é preciso saber onde o código roda, como rastrear sua evolução, e como organizá-lo para que sobreviva ao tempo e a outras pessoas.

2 - Como o curso vai ser organizado

O ano se divide em duas grandes frentes, e cada uma responde a uma pergunta diferente sobre o que significa "fazer engenharia".

**No primeiro semestre**, a pergunta é: *onde e como o código realmente roda?* Antes de escrever qualquer sistema complexo, um engenheiro precisa entender o terreno em que está pisando — o sistema operacional, o terminal, e como rastrear a evolução do que constrói. É por isso que as primeiras aulas do ano são sobre sistema operacional, terminal, Linux via WSL, e Git/GitHub. Não é enrolação antes do "conteúdo de verdade" — é a fundação sem a qual o resto não se sustenta.

**No segundo semestre**, a pergunta muda para: *como organizar o que se constrói para que não vire um caos?* Aqui entram Python, orientação a objetos, e boas práticas de código. É a parte em que vocês vão programar de fato — mas já carregando a mentalidade de que código não é só "fazer funcionar uma vez", é fazer de um jeito que continue fazendo sentido daqui a seis meses, inclusive para vocês mesmos.

Ao longo do ano, cada ferramenta e conceito que vocês forem ganhando abre um caminho novo na carreira de quem programa. No fim do ano, vamos voltar a essa ideia e falar exatamente sobre isso — mas por enquanto, fica a semente plantada.

3 - O que é um Sistema Operacional

Todo computador — seja um notebook, um celular ou um servidor gigante numa empresa — precisa de um programa especial que fica entre você e o hardware da máquina. Esse programa é o **Sistema Operacional (SO)**.

Pense assim: o hardware do seu computador (processador, memória, disco) só entende sinais elétricos brutos. Você, como pessoa, não fala a língua do hardware — você clica, digita, arrasta janelas. O Sistema Operacional é o tradutor entre essas duas pontas. Ele é responsável por gerenciar a memória (decidir o que cada programa pode usar), gerenciar processos (decidir o que roda e quando), e gerenciar arquivos (organizar o que está salvo e onde).

Sem sistema operacional, cada programa teria que reinventar do zero como conversar com o hardware. Com ele, todo programa que vocês usam ou escrevem se apoia nessa camada de tradução já pronta.

Os três sistemas operacionais que vocês provavelmente já ouviram falar — **Windows**, **macOS** e **Linux** — resolvem esse mesmo problema de formas diferentes, com filosofias diferentes de quem controla o quê e como. O Windows é o mais comum em computadores pessoais e empresas; o macOS roda exclusivamente em máquinas da Apple; o Linux é, na prática, o sistema que move a maior parte da internet — servidores, serviços em nuvem, boa parte da infraestrutura que faz sites e aplicativos funcionarem. É por isso que, ao longo deste ano, vocês vão trabalhar principalmente com Linux — mesmo estando em um notebook com Windows, usando uma ferramenta chamada WSL, que veremos na próxima aula.

4 - Camadas de um Sistema: Kernel, Distro e GUI

Dentro de um sistema operacional, existem camadas com responsabilidades diferentes. Três conceitos valem a pena entender já, porque vão aparecer o ano inteiro.

**Kernel** é o núcleo do sistema operacional — a parte mais próxima do hardware, responsável por gerenciar memória, processos e dispositivos. É a camada que praticamente ninguém vê diretamente, mas que sustenta tudo o que roda por cima dela.

**Distro** (abreviação de "distribuição") é um conceito que vem do mundo Linux. Como o Linux é um projeto aberto, várias organizações e comunidades pegam o mesmo kernel e montam, em cima dele, um pacote completo de sistema: gerenciador de arquivos, programas padrão, forma de instalar aplicativos, aparência visual. Cada um desses pacotes montados é uma distribuição diferente — Ubuntu, Debian e Fedora são exemplos de distros. Elas compartilham o mesmo núcleo (kernel Linux), mas entregam experiências e ferramentas diferentes por cima dele.

**GUI** (*Graphical User Interface*, ou Interface Gráfica) é a camada visual: janelas, ícones, botões, o mouse que arrasta coisas na tela. É como a imensa maioria das pessoas interage com um computador no dia a dia, e é intuitiva justamente porque foi desenhada para não exigir conhecimento técnico.

Vale entender como essas camadas aparecem em cada sistema operacional:

**No Linux:**

- Kernel: o kernel Linux, mantido de forma aberta e colaborativa por milhares de desenvolvedores no mundo todo.
- Distro: como explicado acima, existem várias — Ubuntu é a que vamos usar neste curso, por ser uma das mais populares e bem documentadas.
- GUI: cada distro pode oferecer interfaces gráficas diferentes (GNOME, KDE, entre outras), já que no mundo Linux até a aparência visual é modular e escolhível.

**No Windows:**

- Kernel: o Windows NT Kernel, desenvolvido e mantido exclusivamente pela Microsoft, de forma fechada.
- Distro: não existe esse conceito no Windows — é um pacote único, fechado, que já vem pronto e não pode ser remontado por terceiros como acontece no Linux.
- GUI: a interface gráfica do Windows, com sua barra de tarefas, menu iniciar e janelas características, é praticamente inseparável do sistema.

**No macOS:**

- Kernel: o Darwin (baseado em XNU), mantido pela Apple.
- Distro: assim como no Windows, não existe o conceito de distribuição — o macOS é um pacote único e fechado, exclusivo para hardware da própria Apple.
- GUI: a interface gráfica do macOS, conhecida por seu design consistente e polido, também vem integrada de fábrica ao sistema.

Além dessas camadas, existe ainda outra forma de interagir com o computador, que não depende de nenhuma delas em especial: a **CLI** (*Command Line Interface*, ou Interface de Linha de Comando). É a forma de usar o computador digitando comandos de texto, em vez de clicar em elementos visuais — o que popularmente se chama de "terminal". Para quem nunca usou, parece mais difícil, já que não tem botão nem ícone explicando o que fazer. Mas é exatamente essa interface que vocês vão aprender a dominar ao longo deste ano, e o próximo tópico explica por quê.

5 - Por que o terminal importa

Aqui está um ponto que talvez pareça contraintuitivo: **a interface gráfica (GUI) não é gratuita**. Toda aquela camada de janelas, ícones e animações que faz o computador parecer amigável consome memória e processamento só para existir e ser desenhada na tela — antes mesmo de você ter feito qualquer coisa útil com ela.

O terminal, por outro lado, fala diretamente com o sistema, sem essa camada extra. Isso o torna mais rápido e mais leve. Mas a razão mais importante para um desenvolvedor não é velocidade — é que **comandos de terminal podem ser repetidos e automatizados**. Um clique de mouse não pode ser facilmente salvo, reaproveitado ou executado automaticamente mil vezes; um comando de terminal, sim. Essa diferença é o que separa "usar um computador" de "programar" — e é por isso que praticamente todo profissional de tecnologia, em algum nível, precisa saber trabalhar por linha de comando.

É por isso, também, que as próximas aulas deste semestre giram em torno do terminal: primeiro aprendendo a configurar um ambiente Linux (via WSL) dentro do próprio Windows, depois dominando os comandos básicos que permitem navegar, criar e manipular arquivos sem depender de nenhum clique — e, em seguida, usando exatamente esse ambiente para aprender **Git e GitHub**, as ferramentas que registram e rastreiam a evolução de um projeto de software ao longo do tempo.

Depois dessa base construída, o curso muda de foco: a segunda parte do ano é dedicada a **Python** e aos fundamentos de **orientação a objetos** — não apenas escrever código que funciona, mas organizá-lo de um jeito que reflita boas práticas de engenharia, o que nos leva de volta à pergunta com que começamos esta aula.

6 - Rumo ao terminal Linux

Ao longo deste ano, vocês vão se acostumar a trabalhar por terminal como parte natural da rotina de quem programa. Um ponto importante: esse terminal **não será o do Windows** — nem o CMD, nem o PowerShell. Vamos trabalhar diretamente com um terminal Linux, pelas razões já apresentadas: é o ambiente mais usado em servidores, no mercado de trabalho, e é onde as ferramentas que vocês vão aprender ao longo do ano (a começar por Git e GitHub) funcionam da forma mais direta e padronizada.

Para ter um terminal Linux de verdade rodando dentro do computador de vocês, sem precisar trocar de sistema operacional, é preciso entender antes um conceito chamado **virtualização** — a técnica que permite rodar um sistema operacional inteiro "dentro" de outro. É exatamente esse o assunto da próxima aula: vamos entender o que é virtualização e, a partir dela, configurar o ambiente Linux que vamos usar o ano inteiro.

7 - Conclusão

Voltando à pergunta do início desta aula: por que essa disciplina se chama Engenharia de Software?

Porque, ao longo deste ano, vocês vão perceber que cada ferramenta que aprendem — terminal, Linux, Git, orientação a objetos — existe para resolver um problema que "só saber programar" não resolve: como construir algo que sobreviva ao tempo, a outras pessoas, e ao crescimento. Isso é o que separa quem escreve código de quem constrói software de verdade.

Na próxima aula, entendemos virtualização e damos o primeiro passo prático: configurar o ambiente Linux que vocês vão usar o ano inteiro.

Questões do TA:

QUESTÃO 1

Segundo o texto, qual é a principal diferença entre "programar" e "fazer engenharia de software"?

A) Programar exige conhecimento de matemática avançada, enquanto engenharia não.

B) Engenharia de software é apenas escrever código mais rápido do que um programador comum.

C) Programar é escrever instruções que funcionam uma vez; engenharia é construir algo que sobrevive ao tempo, a outras pessoas e ao crescimento.

D) Não existe diferença real entre os dois termos, é apenas uma questão de nome.

E) Engenharia de software é a parte do curso dedicada exclusivamente ao uso do terminal.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 2

Sobre as camadas Kernel, Distro e GUI, é correto afirmar que:

A) O conceito de "distro" existe igualmente no Windows, macOS e Linux, com o mesmo significado nos três.

B) O kernel é a camada visual do sistema operacional, responsável pelos ícones e janelas.

C) No Linux, diferentes distribuições (como Ubuntu, Debian e Fedora) compartilham o mesmo kernel, mas entregam pacotes e ferramentas diferentes por cima dele.

D) O Windows permite que terceiros montem suas próprias distribuições a partir do Windows NT Kernel.

E) A GUI é obrigatória para que um sistema operacional funcione, já que sem ela o kernel não consegue gerenciar memória.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 3

De acordo com o texto, por que o terminal é tão importante para quem programa, além de consumir menos memória que a interface gráfica?

A) Porque comandos de terminal podem ser repetidos e automatizados, algo que um clique de mouse não permite com a mesma facilidade.

B) Porque o terminal é a única forma de instalar programas em qualquer sistema operacional.

C) Porque a GUI foi descontinuada nos sistemas operacionais modernos.

D) Porque o terminal substitui completamente a necessidade de aprender uma linguagem de programação.

E) Porque apenas o terminal permite usar o Git e o GitHub, enquanto a GUI não tem nenhuma relação com versionamento.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não
