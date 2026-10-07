# Briefing — Aula 02: WSL 2 - Virtualização Linux

1 - Introdução

Na aula passada, entendemos o que é um sistema operacional e como ele se organiza em camadas: kernel, distro e GUI. Também vimos por que, ao longo deste ano, vamos trabalhar principalmente pelo terminal, e por que esse terminal será um terminal Linux, mesmo que o notebook de vocês rode Windows. Ficou uma pergunta em aberto: como, exatamente, um computador com Windows vai conseguir rodar um terminal Linux de verdade, sem trocar de sistema operacional?

A resposta está num conceito chamado virtualização, e é sobre ele que essa aula inteira gira. Antes de instalar qualquer coisa, vamos entender o que acontece "por baixo do capô" quando um sistema operacional roda dentro do outro — porque isso não é mágica, é engenharia. E, para entender isso direito, vamos precisar abrir um conceito que ainda não tínhamos formalizado: o que é um processo.

2 - O que é virtualização

Virtualização é a técnica que permite rodar um sistema operacional inteiro "dentro" de outro, como se fosse apenas mais um programa. O sistema operacional que já existia na máquina (o que instalou o hardware, por assim dizer) continua no controle total do processador, da memória e do disco. Mas, por cima dele, é possível criar um ambiente separado, com seu próprio sistema operacional completo rodando lá dentro, sem que um interfira diretamente no outro.

O nome que se dá para esse sistema operacional "de dentro" é máquina virtual (VM, de Virtual Machine). Ela se comporta, para quem está usando, como se fosse um computador de verdade — tem seu próprio sistema de arquivos, sua própria memória, seus próprios programas instalados — mas, fisicamente, está rodando como software dentro do hardware de outra máquina.

3 - Emulação: um sistema "fingindo" ser outro

Um primo próximo da virtualização é a emulação, e vale a pena diferenciar os dois rapidamente, porque o conceito ajuda a entender virtualização por contraste. Emulação é quando um sistema simula o comportamento de outro sistema, geralmente com uma arquitetura de hardware diferente da original.

O exemplo mais fácil de visualizar vem dos videogames: um emulador de Super Nintendo rodando no seu computador não tem, fisicamente, o processador de um Super Nintendo dentro dele. O emulador é um programa que interpreta as instruções feitas para o hardware antigo do console e as traduz, em tempo real, para instruções que o processador do seu computador atual entende. É por isso que emuladores geralmente exigem mais poder de processamento do que o hardware original: cada instrução está sendo "traduzida" na hora.

Virtualização é parecida na ideia (um sistema rodando dentro de outro), mas geralmente não exige essa tradução pesada, porque tanto a máquina virtual quanto a máquina real usam a mesma arquitetura de processador. Isso torna a virtualização, no geral, mais eficiente que a emulação — e é a técnica que vamos usar para rodar Linux dentro do Windows.

4 - Não pense a máquina como só hardware + software

Até aqui, é tentador imaginar um computador como uma equação simples: hardware embaixo, sistema operacional em cima, programas rodando dentro do sistema operacional. Mas essa imagem, embora não esteja errada, é incompleta.

O que a virtualização nos mostra é que, dentro dessa mesma estrutura, é possível ter outro sistema inteiro isolado rodando ao lado — não como um programa comum, mas como um conjunto próprio de processos, com sua própria memória reservada, se comportando como se tivesse hardware exclusivo, mesmo compartilhando o mesmo hardware físico por baixo. Para entender como esse isolamento é possível, precisamos entender a peça central de tudo isso: o processo.

5 - Processos: as unidades lógicas que fazem tudo acontecer

Um processo é a unidade lógica de execução de um sistema operacional — basicamente, é um programa em execução, com um espaço de memória próprio, reservado só para ele, e um conjunto de instruções sendo processadas naquele momento. Todo programa que roda em um computador, do navegador que vocês estão usando até o próprio sistema operacional, existe, na prática, como um ou mais processos.

Processos podem ser efêmeros ou permanentes. Um processo efêmero nasce, executa uma tarefa específica e é encerrado logo em seguida — por exemplo, quando você roda um comando simples no terminal e ele termina em segundos. Um processo permanente, por outro lado, é criado para continuar rodando em segundo plano por longos períodos, às vezes enquanto a máquina estiver ligada, como serviços de sistema ou o próprio processo que sustenta a interface gráfica.

É o conjunto de processos, orquestrados pelo kernel, que faz o sistema operacional funcionar de fato: cada clique, cada programa aberto, cada tarefa em segundo plano vira, por baixo dos panos, um ou mais processos disputando tempo de processador e espaço de memória, sob a supervisão do sistema operacional.

6 - Da isolação de processos ao conceito de máquina virtual

Agora conseguimos juntar as peças. Quando criamos uma máquina virtual, o que estamos fazendo, na prática, é isolar um conjunto de processos e uma área de memória, de forma que esse conjunto se comporte como se fosse um sistema completo e independente — com seus próprios processos, sua própria gestão de memória, seu próprio sistema de arquivos — mesmo estando fisicamente dentro do mesmo hardware da máquina que já existia.

É esse isolamento que permite que, no mesmo hardware físico, existam dois conjuntos de binários completamente separados, cada um com sua própria memória e seus próprios processos, sem que um enxergue ou interfira diretamente no outro. Um deles é o sistema operacional "de fora" (no nosso caso, o Windows); o outro é o sistema operacional "de dentro", isolado, rodando como máquina virtual (no nosso caso, o Linux).

7 - Binários e por que tudo precisa ser instalado duas vezes

Uma consequência direta desse isolamento é importante de entender antes de seguirmos: como a máquina virtual tem seus próprios processos e sua própria memória, ela não tem acesso aos programas que já estavam instalados na máquina original. São dois ambientes separados, cada um com seu próprio conjunto de programas instalados.

Isso significa que, se quisermos usar um programa dentro da máquina virtual Linux, ele precisa estar instalado ali dentro, mesmo que já esteja instalado no Windows por fora. Um exemplo que vocês vão viver na prática logo mais no curso é o Python: ter o Python instalado no Windows não faz com que ele exista dentro do ambiente Linux que vamos configurar — é preciso instalá-lo também lá dentro.

Esse é um bom gancho para entender um conceito do CLI: o binário. Binário, no contexto de linha de comando, é o arquivo executável de um programa — o resultado final, já compilado, pronto para ser executado pelo sistema operacional. Quando você digita `python` ou `git` no terminal, o sistema está procurando, entre as pastas conhecidas da máquina, um arquivo binário com esse nome para executar. Se esse binário não existir naquele ambiente específico (porque ele está isolado em outro, como vimos), o comando simplesmente não funciona — daí a necessidade de instalar cada programa dentro de cada ambiente em que ele será usado.

8 - WSL: virtualização nativa do Linux no Windows

Existem várias formas de rodar uma máquina virtual, mas a Microsoft criou uma solução pensada especificamente para o problema que estamos resolvendo: rodar Linux de forma prática dentro do Windows. Essa solução se chama WSL — Windows Subsystem for Linux.

O WSL é uma camada de virtualização construída pela própria Microsoft e integrada ao Windows, que permite rodar uma distro Linux completa (no nosso caso, Ubuntu) de forma leve e integrada ao sistema, sem precisar configurar uma máquina virtual tradicional do zero, com telas de instalação separadas e interfaces gráficas pesadas. É, na prática, a forma mais direta de ter um terminal Linux real funcionando dentro do computador de vocês.

9 - Hypervisor e BIOS: o que precisa estar habilitado

Para que qualquer virtualização funcione — seja o WSL, seja outra ferramenta que vocês usarão futuramente, como o Docker (que também roda sobre uma base Linux) — o processador da máquina precisa de uma peça de software especial chamada hypervisor. O hypervisor é o componente responsável por gerenciar e isolar as máquinas virtuais, controlando como cada uma acessa memória e processamento do hardware físico.

Para o hypervisor funcionar, o processador precisa ter esse suporte de virtualização habilitado na BIOS (a configuração mais baixa do computador, acessada antes mesmo do sistema operacional carregar) — geralmente aparece como "Virtualization Technology (VT-x)" em processadores Intel ou "SVM Mode" em processadores AMD. Em muitos notebooks essa opção já vem habilitada de fábrica, mas em alguns é preciso entrar na BIOS manualmente e ativá-la antes de instalar o WSL.

10 - Passo a passo: instalando o WSL e o Ubuntu

Com o hypervisor habilitado na BIOS, o processo de instalação do WSL é simples e feito quase inteiramente por linha de comando, usando o PowerShell do Windows (o único momento em que ainda vamos usar um terminal do próprio Windows, antes de migrarmos de vez para o terminal Linux).

```
# Abra o PowerShell como Administrador (botão direito > Executar como administrador)
# antes de rodar qualquer um dos comandos abaixo.

# 1. Instala o WSL e já configura a versão 2 (mais performática, baseada em virtualização real)
#    e a distro Ubuntu como padrão, tudo em um único comando.
wsl --install

# 2. Reinicie o computador quando o processo pedir.
#    O reinício é necessário porque o Windows precisa ativar componentes
#    de virtualização no nível do sistema (o hypervisor do Windows, o Hyper-V).

# 3. Após reiniciar, o Ubuntu deve abrir automaticamente uma janela de terminal
#    e pedir para você criar um usuário e senha para o ambiente Linux.
#    Esse usuário é exclusivo do ambiente Linux dentro do WSL -- não é o
#    mesmo usuário/senha do Windows.

# 4. Para conferir se a instalação funcionou e qual versão do WSL está rodando:
wsl --list --verbose

# 5. Caso precise instalar o Ubuntu manualmente (por exemplo, se o passo 1
#    instalou o WSL mas não a distro), o comando abaixo lista as distros
#    disponíveis na loja da Microsoft:
wsl --list --online

# 6. E este instala a distro Ubuntu especificamente:
wsl --install -d Ubuntu
```

A partir do momento em que o terminal do Ubuntu abre e pede usuário e senha, vocês já estão, oficialmente, dentro de um sistema operacional Linux completo, rodando como máquina virtual isolada dentro do próprio Windows — com seus próprios processos, sua própria memória e, como vimos, seus próprios binários, que precisarão ser instalados um a um conforme forem sendo necessários ao longo do curso.

11 - Conclusão

Nesta aula, saímos da teoria geral sobre sistemas operacionais e entramos em um nível mais profundo: entendemos que um computador não precisa ser pensado apenas como hardware mais um sistema operacional, mas pode abrigar outros sistemas inteiros, isolados, rodando como conjuntos independentes de processos e memória — o que chamamos de máquina virtual. Vimos que processos são as unidades lógicas que sustentam tudo o que um sistema operacional faz, podendo ser efêmeros ou permanentes, e que é justamente o isolamento desses processos que torna a virtualização possível.

Entendemos também por que programas precisam ser instalados separadamente em cada ambiente isolado, o que nos levou ao conceito de binário no terminal, e por que o WSL é a ferramenta que vamos usar para ter um Linux de verdade rodando dentro do Windows, apoiado por um hypervisor habilitado na BIOS da máquina.

Com o ambiente já instalado, a próxima aula parte para a prática: os comandos básicos do terminal Linux, que vão permitir navegar, criar e manipular arquivos e pastas sem depender de nenhum clique — o primeiro passo real rumo à rotina de quem trabalha por linha de comando no dia a dia.

12 - Referências

Microsoft. Documentação oficial do Windows Subsystem for Linux (WSL).
Canonical. Documentação oficial do Ubuntu para WSL.
Material de aula anterior: Aula 01 - SO, CLI e GUI.

Questões do TA:

QUESTÃO 1
Qual é a principal diferença entre virtualização e emulação?
A) Virtualização sempre exige tradução de instruções entre arquiteturas diferentes, enquanto emulação nunca exige isso.
B) Emulação simula o comportamento de um sistema com arquitetura de hardware diferente, exigindo tradução de instruções em tempo real, enquanto virtualização geralmente usa a mesma arquitetura de processador, sendo mais eficiente.
C) Não existe diferença prática entre os dois conceitos, são apenas nomes diferentes para a mesma técnica.
D) Virtualização só funciona em videogames, enquanto emulação só funciona em computadores.
E) Emulação é mais eficiente que virtualização porque não depende do processador da máquina.
Gabarito: B)
Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 2
Sobre processos, de acordo com o briefing, é correto afirmar que:
A) Processos são apenas arquivos salvos no disco, sem relação com execução de programas.
B) Só existem processos permanentes; processos efêmeros não fazem parte de um sistema operacional.
C) Um processo é a unidade lógica de execução do sistema, podendo ser efêmero ou permanente, e é o conjunto de processos que sustenta o funcionamento do sistema operacional.
D) Processos só existem dentro de máquinas virtuais, nunca no sistema operacional principal.
E) O hypervisor é um tipo de processo efêmero responsável por encerrar programas automaticamente.
Gabarito: C)
Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 3
Por que, segundo o briefing, um programa como o Python precisa ser instalado tanto no Windows quanto dentro do ambiente Linux (WSL)?
A) Porque o Windows não permite a instalação de linguagens de programação.
B) Porque a máquina virtual, sendo isolada, tem seus próprios processos e memória, e não tem acesso aos binários instalados no sistema operacional "de fora".
C) Porque o Python é incompatível com qualquer sistema Linux.
D) Porque o hypervisor bloqueia binários duplicados entre os dois ambientes.
E) Porque o WSL apaga automaticamente os programas instalados no Windows.
Gabarito: B)
Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 4
Sobre o hypervisor e a instalação do WSL, o briefing afirma que:
A) O hypervisor é dispensável para o WSL, sendo necessário apenas para o Docker.
B) O suporte de virtualização deve estar habilitado na BIOS (como VT-x ou SVM Mode) para que o hypervisor funcione corretamente, sendo um pré-requisito para instalar o WSL.
C) A BIOS não tem nenhuma relação com a instalação de máquinas virtuais.
D) O comando wsl --install deve ser rodado dentro do próprio terminal Linux, após a instalação do Ubuntu.
E) O hypervisor é a interface gráfica do Ubuntu instalada junto com o WSL.
Gabarito: B)
Misturar as alternativas? (x ) Sim (  ) Não
