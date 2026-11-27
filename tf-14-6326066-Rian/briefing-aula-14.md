Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☐ 10☐ 11☐ 12☐ 13☐ 14☒ 15☐ 16☐


Título da aula:

Linux Básico


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Na **Aula 01** vimos que um sistema operacional tem camadas: **kernel**, **distro** e **GUI**. Naquele dia foi só um mapa rápido, e de lá para cá vocês já usaram bastante o terminal: instalaram o Ubuntu no WSL, navegaram com `ls` e `cd`, versionaram com Git, baixaram e descompactaram arquivos. Esta aula volta ao mapa com o que vocês já sabem, para **ligar os pontos**: o que exatamente é o Linux, de onde vêm todos esses "Linux" diferentes, por que o terminal consegue executar qualquer coisa, como se instala um programa e **quem pode fazer o quê** dentro do sistema.

O caminho tem seis passos e um bônus. Primeiro, **o Linux é o kernel**: o que é um kernel, o que seria o dele no Windows e no macOS, e por que o macOS e o Linux parecem tão próximos. Segundo, **distro e GUI**: as famílias de distribuições, as derivações e as interfaces gráficas por cima. Terceiro, **tudo o que fazemos no terminal é executar um binário**: `git`, `unzip`, `curl` e companhia. Quarto, o **gerenciador de pacotes**: como se instala um binário que não existe, com toda a sua árvore de dependências, e por que quem programa tende a escolher a distro pelo gerenciador. Quinto, os **diretórios**: a raiz `/` (o "C:" do Linux), o `/mnt` e o ponto de montagem, o `/home` e os **dot files**, que guardam as configurações de cada usuário. Sexto, **usuários, grupos e permissões**: a notação `rwx` que aparece no `ls -la`, e os comandos `chmod` e `chown`. Por fim, um **bônus**: usar um dot file (o `.bashrc`) para mostrar o **branch do Git no prompt**.

2 - O Linux é o kernel

2.1 - O que é o kernel

**Kernel** significa **núcleo**. É o primeiro programa que o computador carrega depois de ligar e **o único que conversa diretamente com o hardware**. Todo o resto (o terminal, o navegador, o VS Code, o Python) é programa de usuário e **pede ao kernel** quando precisa de algo: ler um arquivo do disco, usar um pedaço da memória, abrir uma conexão de rede, desenhar na tela.

Na prática, o kernel é o **árbitro** de tudo o que acontece na máquina, e as suas responsabilidades se dividem em quatro frentes. A primeira é o **gerenciamento de processos**: como há muito mais programas em execução do que núcleos de processador, o kernel decide qual programa usa o processador e por quanto tempo, revezando entre eles tão rápido que parece simultâneo (é por isso que dá para ouvir música, programar e baixar um arquivo ao mesmo tempo). A segunda é a **memória**: o kernel entrega a cada programa a sua parte da RAM e **impede que um programa leia ou corrompa a memória de outro**, e é essa separação que faz um programa travado não derrubar o sistema inteiro. A terceira é o **sistema de arquivos**: o kernel organiza o disco em arquivos e diretórios e controla **quem pode ler ou alterar cada um**, assunto que veremos no fim da aula. A quarta são os **dispositivos**: teclado, disco, rede e placa de vídeo são acessados por meio dos **drivers**, que fazem parte do kernel e traduzem as particularidades de cada componente para um jeito padrão de usá-lo.

Um programa pede algo ao kernel por uma **chamada de sistema** (*system call*). Quando vocês rodam `cat arquivo.txt`, o `cat` não toca o disco: ele **pede** ao kernel que abra e leia o arquivo, e o kernel devolve o conteúdo.

2.2 - O kernel no Windows e no macOS

Todo sistema operacional tem um kernel. A diferença é de quem é e se dá para trocar:

| Sistema | Kernel | Quem mantém | Dá para montar a sua versão? |
| --- | --- | --- | --- |
| **Windows** | Windows NT (`ntoskrnl.exe`) | Microsoft | Não: pacote fechado e único |
| **macOS** | XNU, dentro do Darwin | Apple | Não: só roda em hardware da Apple |
| **Linux** | Linux | Comunidade (milhares de pessoas e empresas) | **Sim**: o código é aberto |

O ponto importante está na última linha: **quem pega o kernel Linux e monta um sistema completo por cima é livre para fazer isso**, e é daí que nascem as distribuições. No Windows e no macOS o kernel, as ferramentas e a interface gráfica vêm **colados num pacote só**, e vocês não escolhem cada peça.

2.3 - Linux e macOS: parecidos, mas não são o mesmo kernel

Uma observação que apareceu em sala e merece ser registrada: **o macOS e o Linux são muito parecidos de usar**, principalmente no terminal, e isso não é coincidência. Os dois pertencem à família **Unix**. O Unix foi criado no final dos anos 1960 nos laboratórios da Bell Labs (por Ken Thompson e Dennis Ritchie) e definiu o jeito de organizar um sistema operacional: tudo é arquivo, uma árvore de diretórios com raiz `/`, vários usuários com permissões, programas pequenos que se combinam pela linha de comando. A partir dele surgiram duas linhagens que importam para nós:

- **O macOS** descende do Unix pela linhagem **BSD** (Berkeley). O seu kernel, o **XNU**, combina o microkernel **Mach** com componentes do **BSD**, e o sistema tem **certificação UNIX** oficial.
- **O Linux** foi escrito **do zero** por Linus Torvalds em 1991, **sem usar código do Unix original**, mas copiando o seu comportamento e as suas regras. Por isso se diz que é **"Unix-like"** (parecido com Unix), e não que é Unix.

O resultado é que os **conceitos e os comandos são praticamente os mesmos**: `ls`, `cd`, `pwd`, `chmod`, `chown`, `ssh`, `git`, o `/home` (no macOS, `/Users`), as permissões `rwx` e o `PATH` funcionam nos dois, porque ambos seguem o padrão **POSIX**, que define como um sistema Unix deve se comportar. Quem aprende o terminal no Linux consegue trabalhar num Mac quase sem adaptação, e é por isso que tanta gente de desenvolvimento usa Mac. Já o **Windows não é Unix**: o kernel NT tem outra origem, outra organização (letras de unidade, `\` nos caminhos) e outro terminal, e é justamente por isso que usamos o **WSL**, para ter um Linux de verdade dentro dele.

Mas atenção ao que é parecido e ao que **não** é. A semelhança é de **conceito e de interface**: o código dos dois kernels é **completamente diferente**. Isso aparece em detalhes do dia a dia: o macOS usa as ferramentas do **BSD** (algumas opções do `sed` ou do `ls` mudam de um para o outro) enquanto o Linux usa as do **GNU**; o macOS não tem `apt` e usa o **Homebrew**; e um programa compilado para um **não roda** no outro sem ser recompilado, porque cada kernel oferece as suas próprias chamadas de sistema. Dá para **ver isso na máquina** com o comando `uname`, que imprime o nome do kernel:

```bash
# uname -s: mostra o nome do kernel em uso.
# No Linux (e no WSL) imprime "Linux"; no macOS imprime "Darwin".
uname -s

# uname -a: mostra tudo (kernel, nome da máquina, versão e arquitetura).
uname -a
```

```text
$ uname -s          <- no WSL / Ubuntu
Linux

$ uname -s          <- no macOS
Darwin
```

2.4 - O Linux é só o kernel

Aqui vai a frase mais importante do tópico: **"Linux" é, a rigor, só o kernel**. Ele foi criado em **1991** por **Linus Torvalds**, na época um estudante finlandês, como um projeto pessoal, e hoje é mantido de forma aberta e colaborativa.

Um kernel sozinho **não é utilizável**: não tem terminal, não tem `ls`, não tem `cp`, não tem como instalar nada. Quem forneceu essas ferramentas básicas foi o projeto **GNU** (iniciado em 1983 por Richard Stallman), e por isso alguns chamam o conjunto de **GNU/Linux**. Na conversa do dia a dia todo mundo diz só "Linux" para o sistema inteiro, e vocês podem fazer o mesmo, desde que saibam a diferença: **o kernel é um; o sistema que a gente usa é kernel + ferramentas + o resto**.

Vale lembrar que o **Android** também usa o kernel Linux, só que com um pacote totalmente diferente por cima. É o mesmo kernel num celular, num servidor de nuvem, numa TV e no seu WSL.

3 - Distribuição (distro) e interface gráfica

3.1 - O que é uma distro

Como o kernel é aberto, qualquer pessoa ou empresa pode juntar **o kernel + as ferramentas básicas (GNU) + um gerenciador de pacotes + programas padrão + configurações** e entregar tudo pronto como **um sistema**. Esse pacote montado é uma **distribuição**, ou **distro**. Todas usam o mesmo kernel Linux por baixo, mas cada uma tem suas escolhas: como instalar programas, quanto tempo dura cada versão, quão novo ou estável é o software.

3.2 - Famílias, modelos principais e derivações

Existem centenas de distros, mas quase todas nascem de poucas **famílias**. Uma distro pode ser **derivada** de outra: pega a base dela e muda o que quiser. Por isso é comum ouvir "o Ubuntu é baseado no Debian". As famílias que vocês mais vão encontrar:

| Família | Distro-base | Derivações e parentes | Gerenciador | Onde aparece |
| --- | --- | --- | --- | --- |
| **Debian** | Debian | Ubuntu, Linux Mint, Pop!_OS, Kali | `apt` (pacote `.deb`) | Desktop, servidores, WSL |
| **Red Hat** | RHEL (Red Hat Enterprise Linux) | Fedora, CentOS Stream, Rocky Linux, AlmaLinux | `dnf` (pacote `.rpm`) | Empresas e servidores corporativos |
| **Arch** | Arch Linux | Manjaro, EndeavourOS | `pacman` | Quem gosta de controle total e software sempre novo |
| **SUSE** | SUSE Linux Enterprise | openSUSE | `zypper` (pacote `.rpm`) | Servidores corporativos, principalmente na Europa |
| **Alpine** | Alpine Linux | (independente) | `apk` | **Containers**: a imagem é minúscula |

Todas elas partem do mesmo kernel e se organizam em gerações: a **família** é a distro-base, e as derivadas pegam a base dela e mudam o que quiserem.

| Família (base) | 1ª geração (derivadas) | 2ª geração |
| --- | --- | --- |
| **Debian** | Ubuntu, Kali | Linux Mint e Pop!_OS (derivadas do Ubuntu) |
| **Red Hat** | Fedora, Rocky Linux, AlmaLinux | (sem derivadas relevantes) |
| **Arch** | Manjaro, EndeavourOS | (sem derivadas relevantes) |
| **SUSE** | openSUSE | (sem derivadas relevantes) |
| **Alpine** | (independente) | (sem derivadas relevantes) |

Duas observações. A primeira: o **Ubuntu**, que vocês usam no WSL, é **filho do Debian**, e o **Linux Mint** e o **Pop!_OS** são **filhos do Ubuntu**, então tudo o que vale para um vale, na maior parte, para os parentes. A segunda: o **Fedora** é a versão comunitária e "da frente" da Red Hat, e o **Rocky** e o **AlmaLinux** nasceram para ser **cópias gratuitas** do RHEL. No mercado de servidores, **Debian/Ubuntu** e **Red Hat e parentes** dominam; no mundo de containers, **Alpine** e Debian aparecem em quase toda imagem Docker.

3.3 - A GUI por cima: ambientes gráficos

Por cima do kernel e da distro ainda existe a **interface gráfica** (GUI, que vimos na Aula 01). No Linux ela é **uma peça separada e trocável**, chamada de **ambiente de desktop** (*desktop environment*). A mesma distro pode vir com ambientes diferentes, e o mesmo ambiente roda em distros diferentes, o que reforça a separação entre as camadas. O **GNOME** tem um visual limpo e minimalista, com foco em poucas janelas e atalhos de teclado, e é o padrão do Ubuntu e do Fedora. O **KDE Plasma** é conhecido pela enorme quantidade de opções de personalização e por um jeito de usar mais próximo do Windows. O **COSMIC** é um ambiente novo, criado pela System76 (a empresa do Pop!_OS) e escrito em **Rust**, que é o padrão do Pop!_OS atual. Existem ainda opções leves, como **XFCE** e **LXQt**, pensadas para máquinas com poucos recursos.

E num **servidor** normalmente **não existe GUI nenhuma**: só o kernel, a distro e o terminal. É por isso que, de novo, quem programa precisa dominar o terminal. A pilha completa fica assim:

| Camada (de cima para baixo) | O que é | Exemplos |
| --- | --- | --- |
| **Aplicativos** | Os programas que o usuário abre e usa | navegador, VS Code, git, python |
| **GUI** (opcional) | Interface gráfica; um servidor normalmente não tem | GNOME, KDE, COSMIC |
| **Distro** | Ferramentas GNU, gerenciador de pacotes e configurações | Ubuntu, Fedora |
| **Kernel** | O núcleo: processos, memória, arquivos e dispositivos | Linux |
| **Hardware** | A máquina física | CPU, RAM, disco, rede |

4 - No terminal, executamos qualquer coisa

4.1 - Cada comando é um binário

Na Aula 03 vimos que `ls`, `mkdir` e `cat` são **binários**: arquivos executáveis já compilados. Essa ideia vale para **tudo**. Quando vocês digitam um comando, o shell procura um arquivo executável com aquele nome e pede ao kernel que o rode. Não existe "comando mágico do terminal": **existe programa instalado**. Por isso o terminal **executa qualquer coisa que exista na máquina**: a mesma linha de comando que lista arquivos também roda o Git, o Python, o Docker, o compilador e até uma IA.

Vocês já fizeram isso sem perceber. Baixar e descompactar um arquivo, por exemplo, são **dois binários**:

```bash
# curl: baixa o conteúdo de uma URL. A opção -L segue redirecionamentos
# e -O salva o arquivo com o nome que ele tem no servidor.
curl -L -O https://exemplo.com/projeto.zip

# wget: outro binário que faz o mesmo jeito de baixar (um ou outro, você escolhe).
wget https://exemplo.com/projeto.zip

# unzip: descompacta um arquivo .zip no diretório atual.
unzip projeto.zip

# tar: descompacta (e cria) arquivos .tar.gz, o "zip" mais comum no Linux.
# x = extract (extrair), z = gzip, f = file (o arquivo a seguir).
tar -xzf projeto.tar.gz

# git clone: baixa um repositório inteiro (o histórico todo) de uma vez.
git clone https://github.com/luan-tavares/unifaat-es-2026.git
```

4.2 - Onde o terminal acha o binário: o PATH

Como o shell sabe onde está o `git`? Existe uma variável de ambiente chamada **`PATH`**, com uma lista de diretórios separados por `:`. Ao digitar um comando, o shell procura o executável **em cada um desses diretórios, na ordem**, e roda o primeiro que achar.

```bash
# which: mostra QUAL arquivo será executado quando você digita o comando.
which git

# echo $PATH: imprime a lista de diretórios onde o shell procura binários.
echo $PATH

# type: diz se o comando é um binário, um comando embutido do shell (como o cd)
# ou um apelido (alias).
type cd
```

Os binários ficam espalhados em **alguns diretórios conhecidos**, e cada um tem um papel. O nome **`bin`** vem de *binary* e **`sbin`** de *system binaries*, os programas de **administração do sistema**:

| Diretório | O que guarda | Quem costuma usar |
| --- | --- | --- |
| `/bin` | Binários **essenciais** do sistema (`ls`, `cp`, `cat`). Nas distros atuais é só um **atalho** (link simbólico) para `/usr/bin` | Todos os usuários |
| `/sbin` | Binários de **administração** (`reboot`, `fdisk`, `iptables`). Também é atalho, para `/usr/sbin` | Administrador (`root` ou `sudo`) |
| `/usr/bin` | A **maioria dos programas** instalados pelo gerenciador de pacotes (`git`, `python3`, `unzip`) | Todos os usuários |
| `/usr/sbin` | Programas de administração instalados pelo gerenciador (`adduser`, `useradd`, servidores como o `nginx`) | Administrador |
| `/usr/local/bin` | Programas instalados **à mão**, fora do gerenciador: as atualizações do sistema não mexem aqui | Todos os usuários |
| `~/.local/bin` | Binários **só do seu usuário** (ferramentas instaladas sem `sudo`, como as do `pip install --user`) | Apenas o dono do `/home` |

Dá para conferir o atalho e ver que o `ls` mora mesmo em `/usr/bin`:

```bash
# ls -ld: mostra o diretório em si (e não o conteúdo). A seta -> indica o link simbólico:
# /bin aponta para usr/bin, ou seja, são o mesmo lugar.
ls -ld /bin /sbin

# which ls: mostra o caminho do binário que será executado.
which ls
```

```text
lrwxrwxrwx 1 root root 7 ... /bin -> usr/bin
lrwxrwxrwx 1 root root 8 ... /sbin -> usr/sbin
/usr/bin/ls
```

Dois detalhes importantes. **A ordem do `PATH` importa**: se dois diretórios têm um binário com o mesmo nome, vence o que aparece **primeiro** na lista, e é assim que um binário do seu usuário (`~/.local/bin`) pode sobrepor o do sistema. E **um diretório só vale se estiver no `PATH`**: um binário colocado fora dele só roda informando o caminho completo (`./programa` ou `/caminho/programa`). Se `which git` não mostrar nada, **o binário não existe naquela máquina** (ou não está no `PATH`), e a mensagem `command not found` quer dizer só isso. A boa notícia: **se não existe, é só instalar**, e quem instala é o gerenciador de pacotes.

5 - Gerenciador de pacotes (de dependências)

5.1 - A árvore de dependências

Quase nenhum programa vive sozinho. O `git`, por exemplo, precisa de uma biblioteca para falar HTTPS, outra para compactar dados, o Perl para alguns scripts, e cada uma dessas pode precisar de outras. Esse encadeamento é a **árvore de dependências**:

```text
git
 |-- libc6              (funções básicas do C)
 |-- libcurl3t64-gnutls (falar HTTP/HTTPS)
 |-- zlib1g             (compactar dados)
 |-- libpcre2-8-0       (expressões regulares)
 |-- perl               (alguns scripts do git)
 |-- liberror-perl
 `-- git-man            (a documentação, o man)
```

Se tivéssemos que baixar tudo isso **na mão**, descobrir quais versões combinam e instalar na ordem certa, seria trabalhoso e sujeito a erro, já que uma versão incompatível faz o programa falhar sem uma explicação clara. O **gerenciador de pacotes** resolve isso: **você pede um programa só, e ele baixa o programa e toda a sua árvore de dependências**, na versão certa, de um repositório confiável, e ainda guarda o registro do que instalou para poder **atualizar** ou **remover** depois, sem sujeira.

```bash
# sudo: executa o comando seguinte como administrador (pede a sua senha).
# Instalar, atualizar e remover programas mexe em diretórios do sistema,
# então todos esses comandos de apt precisam do sudo na frente.
# apt update: atualiza a LISTA de pacotes disponíveis (não instala nada ainda).
sudo apt update

# apt upgrade: atualiza de verdade os pacotes JÁ instalados para as versões
# novas que a lista (baixada no update) mostrou.
sudo apt upgrade -y

# apt install: instala o pacote e TODAS as dependências que faltarem.
# O -y responde "sim" automaticamente à confirmação.
sudo apt install unzip -y

# apt show: mostra os detalhes do pacote, inclusive as dependências (Depends).
apt show git

# apt-cache depends: lista só as dependências diretas de um pacote.
apt-cache depends git

# apt search: procura pacotes pelo nome ou pela descrição.
apt search tree

# apt remove: desinstala o pacote.
sudo apt remove unzip

# apt autoremove: remove dependências que ninguém mais está usando.
sudo apt autoremove
```

O **`sudo`** (*superuser do*) executa **um único comando** com poderes de administrador. Ele aparece em todos os comandos acima porque instalar, atualizar e remover programas **mexe em diretórios do sistema** (como `/usr/bin`), e isso só o administrador pode fazer; sem o `sudo` o `apt` responde com `Permission denied`. Na primeira vez da sessão ele pede a **sua senha** (que não aparece na tela enquanto você digita), e voltaremos a ele na seção de permissões.

Os dois comandos de atualização costumam ser **confundidos**, e juntos formam uma rotina:

| Comando | O que faz | Muda algum programa? |
| --- | --- | --- |
| `sudo apt update` | Baixa a **lista** atualizada de pacotes e versões disponíveis nos repositórios | **Não**: só atualiza o "catálogo" |
| `sudo apt upgrade` | **Instala as versões novas** dos pacotes que já estão na máquina, usando esse catálogo | **Sim**: atualiza os programas |

O gerenciador de pacotes **não serve só para instalar: ele também atualiza** e remove, e faz isso sem precisar olhar o conteúdo de cada programa instalado. O segredo são os **hashes** (a "impressão digital" de um arquivo: se um único byte mudar, o hash muda). Na prática:

1. O `update` baixa uns poucos arquivos pequenos dos repositórios, os **índices**, que listam cada pacote disponível com a sua **versão** e o **hash** do arquivo. O próprio índice também tem hash e vem **assinado** pelo repositório, então o `apt` só baixa de novo o que **mudou** e sabe que a lista é autêntica.
2. Se o hash de um índice mudou, **algum pacote foi atualizado** no repositório. O `apt` compara a versão listada com a que está instalada na máquina e marca como atualizável quem tem versão mais nova.
3. O `upgrade` baixa **apenas** esses pacotes (não a máquina inteira) e **confere o hash** de cada arquivo baixado contra o do índice: se não bater, o arquivo está corrompido ou foi adulterado, e o `apt` recusa a instalação.

Ou seja, **ele não precisa abrir cada programa para saber se mudou**: basta comparar os hashes e as versões do índice. Os outros gerenciadores (`dnf`, `pacman`, `zypper`, `apk`) seguem a mesma lógica, cada um com os seus comandos de atualização.

Por isso a ordem importa: **primeiro `update`, depois `upgrade`**. Se pularmos o `update`, o `apt` ainda enxerga o catálogo antigo e não sabe que existem versões novas (ou tenta instalar uma versão que já saiu do repositório e falha com *Unable to locate package* ou erro 404). É por isso que a rotina antes de instalar qualquer coisa numa máquina nova é:

```bash
# update primeiro (atualiza o catálogo), upgrade depois (atualiza os programas).
# O && só executa o segundo comando se o primeiro der certo.
sudo apt update && sudo apt upgrade -y
```

5.2 - Os principais gerenciadores e a família de cada um

Cada família de distro tem o **seu** gerenciador, e o formato do pacote muda junto:

| Gerenciador | Família | Formato | Instalar o git |
| --- | --- | --- | --- |
| **apt** (por baixo, `dpkg`) | Debian, Ubuntu, Mint, Pop!_OS | `.deb` | `sudo apt install git` |
| **dnf** (antes `yum`; por baixo, `rpm`) | Red Hat, Fedora, Rocky, Alma | `.rpm` | `sudo dnf install git` |
| **pacman** | Arch, Manjaro | `.pkg.tar.zst` | `sudo pacman -S git` |
| **zypper** | SUSE, openSUSE | `.rpm` | `sudo zypper install git` |
| **apk** | Alpine | `.apk` | `apk add git` |

Fora do Linux a ideia é a mesma: o **Homebrew** (`brew`) no macOS e, no Windows, o **winget** (que já vem com o sistema) e o **Chocolatey** (`choco`), que **não vem instalado**, mas pode ser instalado e funciona como o `apt` do Windows (`choco install git`). Ou seja, mesmo no Windows dá para instalar programas por linha de comando, com a árvore de dependências resolvida pelo gerenciador. E ela vai além do sistema: o `pip` (Python), o `npm` (JavaScript) e o `composer` (PHP) são **gerenciadores de dependências de linguagem**, e funcionam igual: você declara o que precisa e ele resolve a árvore inteira. O gerenciador de pacotes do sistema cuida dos **programas**; o da linguagem cuida das **bibliotecas do seu projeto**.

5.3 - A escolha da distro pelo gerenciador

Uma observação do professor, de quem vive isso no mercado: **quem programa tende a escolher a distro pelo gerenciador de pacotes**. O kernel é o mesmo, a GUI se troca, mas é o gerenciador que vocês vão usar **todos os dias**: é ele que define quantos programas existem prontos, quão novas são as versões, como se resolve um conflito e que tutorial da internet funciona copiado e colado. O ecossistema do **apt** (Debian e Ubuntu) tem a maior quantidade de documentação, tutoriais e imagens prontas, e é por isso que o Ubuntu é a nossa escolha para o curso. Quem trabalha em empresa com Red Hat vai viver de `dnf`, e quem gosta de ter software sempre novo vai de Arch e `pacman`.

6 - Diretórios, /home e os dot files

6.1 - A árvore de diretórios

No Linux **não existem letras de unidade** como `C:\` e `D:\`. Existe **uma árvore só**, que começa na **raiz**, `/` (o *root directory*, que **não tem relação com o usuário root**). A raiz é o **equivalente ao `C:\` do Windows**: o começo de tudo, e todo o resto (outros discos, pen drives, até informações do sistema) aparece **pendurado nela**. Os diretórios principais:

| Diretório | O que guarda |
| --- | --- |
| `/` | A raiz: o começo de tudo |
| `/home` | Uma pasta **para cada usuário** (`/home/luan`): seus arquivos e suas configurações |
| `/etc` | **Configurações do sistema** inteiro (valem para todos os usuários) |
| `/usr/bin`, `/bin` | Os **binários** dos comandos (`ls`, `git`, `cat`...) |
| `/var` | Dados que **mudam o tempo todo**: logs, filas, bancos |
| `/tmp` | Arquivos temporários |
| `/root` | A pasta pessoal do administrador (`root`) |
| `/mnt/c` | **No WSL:** o disco `C:` do Windows |

6.2 - O /mnt e o ponto de montagem

No Windows, ao espetar um pen drive aparece uma letra nova (`E:\`). No Linux **não nasce letra nenhuma**: o dispositivo é **montado** em algum diretório da árvore, e esse diretório passa a **ser o conteúdo do pen drive**. Isso é o **ponto de montagem** (*mount point*): **um diretório que serve de porta de entrada para outro disco ou dispositivo**. Montar um pen drive em `/mnt/pendrive` faz o `ls /mnt/pendrive` listar os arquivos dele; desmontar tira o conteúdo e o diretório volta a ser uma pasta vazia. O mesmo vale para um segundo HD, um SSD externo, um cartão SD ou uma pasta de rede.

Por convenção, o **`/mnt`** é o lugar para montagens manuais, e os desktops costumam montar pen drives automaticamente em `/media/seu-usuario/`. E é por isso que o `/mnt` **aparece tanto no WSL**: o Windows monta os discos dele ali, e o `C:\` vira **`/mnt/c`**, o `D:\` vira `/mnt/d`.

```bash
# ls /mnt/c: lista o disco C: do Windows, visto de dentro do WSL.
ls /mnt/c

# mount: mostra o que está montado e onde (a lista é longa, o grep filtra).
mount | grep mnt

# mount (com sudo): monta um dispositivo (ex.: o pen drive /dev/sdb1) em um diretório.
sudo mount /dev/sdb1 /mnt/pendrive

# umount: desmonta (note que é "umount", sem o n). Faça antes de tirar o pen drive.
sudo umount /mnt/pendrive
```

6.3 - O /home e o til

O **`/home`** é o diretório pessoal de cada usuário: o lugar onde **você** pode criar, apagar e configurar o que quiser, sem precisar de permissão de administrador. O atalho para ela é o **til (`~`)**: `~` é o mesmo que `/home/luan`, e o `cd` sem argumento leva para lá (como vimos na Aula 03).

```bash
# Os três comandos levam ao mesmo lugar: a pasta pessoal do usuário.
cd ~
cd /home/luan
cd

# pwd mostra o caminho completo para confirmar onde estamos.
pwd
```

Uma dica de WSL: **trabalhem dentro do `/home`** (o sistema de arquivos do Linux) e não em `/mnt/c`. Em `/mnt/c` os arquivos pertencem ao Windows, o `chmod` não funciona direito e tudo fica mais lento.

6.4 - Dot files e dot folders: as configurações do usuário

Na Aula 03 vimos que, no Linux, **tudo que começa com ponto é oculto** e só aparece com `ls -a`. Esses itens são os **dot files** (arquivos) e **dot folders** (pastas), e quase sempre são **as configurações do usuário**. Em vez de uma tela de "Configurações" e um registro central (como o Windows), o Linux guarda as preferências de cada programa **num arquivo de texto na pasta pessoal**, que vocês podem ler, editar, copiar e versionar.

```bash
# ls -a: lista tudo, inclusive o que começa com ponto.
ls -a ~
```

Alguns que vocês já têm (ou vão ter):

| Item | Para que serve |
| --- | --- |
| `~/.bashrc` | Configuração do **terminal** (Bash): atalhos, cores, o prompt. É lido **toda vez** que um terminal abre |
| `~/.profile` | Configuração de login (variáveis de ambiente, como o `PATH`) |
| `~/.gitconfig` | Configuração do **Git**: o `user.name`, o `user.email` que vocês definiram na Aula 04 |
| `~/.ssh/` | **Pasta** das chaves SSH da Aula 05 (a chave privada fica aqui) |
| `~/.config/` | **Pasta** onde vários programas modernos guardam as suas configurações |
| `~/.bash_history` | O histórico dos comandos digitados (é o que a seta para cima usa) |

Duas consequências práticas. **Configurar um programa é editar um arquivo de texto**, e por isso dá para **copiar essas configurações** para outra máquina e o ambiente fica igual (muita gente versiona os seus dot files no GitHub). E **cada usuário tem os seus**: o `.bashrc` do `luan` não afeta o do usuário `maria`.

7 - Usuários, grupos e permissões

7.1 - Quem é quem: usuário, grupo e root

O Linux foi pensado desde o começo para **vários usuários na mesma máquina** (um servidor tem dezenas). Cada processo e cada arquivo tem um **dono**, e o kernel confere isso **a cada pedido**. Três conceitos:

- **Usuário:** uma conta, com um nome e um número (**UID**) e uma pasta em `/home`.
- **Grupo:** um conjunto de usuários, para dar a **vários** a mesma permissão de uma vez (por exemplo, o grupo `dev`). Todo usuário tem um grupo principal e pode estar em outros.
- **root:** o administrador, o usuário de **UID 0**, que pode **tudo**. Por isso não se trabalha como root: usa-se o **`sudo`** para elevar **um único comando** quando necessário.

```bash
# whoami: mostra o nome do usuário atual.
whoami

# id: mostra o UID, o grupo principal e todos os grupos do usuário.
id

# groups: lista só os grupos do usuário.
groups

# sudo: executa UM comando como administrador (pede a sua senha).
sudo apt update
```

As contas ficam em `/etc/passwd` e os grupos em `/etc/group` (arquivos de texto, que dá para ler com `cat`). Para criar um usuário e adicionar alguém a um grupo existem `adduser` e `usermod`:

```bash
# Cria o usuário maria (com pasta em /home/maria).
sudo adduser maria

# usermod -aG: ACRESCENTA (-a) a maria ao grupo (-G) "dev", sem tirar dos outros.
sudo usermod -aG dev maria
```

7.2 - Lendo o ls -la: a notação rwx

Na Aula 03 usamos `ls -la` e passamos direto pelas primeiras colunas. Agora vamos lê-las:

```text
-rwxr-xr--  1  luan  dev   1234  Nov 25 10:00  deploy.sh
drwxr-xr-x  3  luan  luan  4096  Nov 25 09:30  projetos
│└┬┘└┬┘└┬┘     │     │
│ │  │  │      │     └── grupo dono
│ │  │  │      └──────── usuário dono
│ │  │  └─────────────── permissões de TODO O RESTO (others)
│ │  └────────────────── permissões do GRUPO
│ └───────────────────── permissões do DONO (user)
└─────────────────────── tipo: - arquivo, d diretório, l link
```

A **primeira letra** diz o tipo (`-` arquivo, `d` diretório). As **nove seguintes** são **três trios**, na ordem **dono, grupo e outros**, e em cada trio vêm três letras: **r**ead (ler), **w**rite (escrever) e e**x**ecute (executar). Uma letra no lugar significa "tem a permissão"; um `-` significa "não tem". Lendo `-rwxr-xr--`:

| Quem | Trio | Pode |
| --- | --- | --- |
| **Dono** (`luan`) | `rwx` | ler, escrever e executar |
| **Grupo** (`dev`) | `r-x` | ler e executar, **não** escrever |
| **Outros** | `r--` | **só** ler |

O significado muda um pouco quando o item é um **diretório**: **r** é poder **listar** o conteúdo, **w** é poder **criar e apagar** arquivos dentro dele, e **x** é poder **entrar** nele (`cd`). Sem o `x`, o `cd` dá `Permission denied`.

7.3 - chmod: mudar as permissões

O **`chmod`** (*change mode*) altera as permissões. Existem duas formas. A **simbólica** diz quem (`u` dono, `g` grupo, `o` outros, `a` todos) e o que acrescentar (`+`) ou tirar (`-`):

```bash
# Cria um script de teste.
echo 'echo "deploy ok"' > deploy.sh

# Sem o x, o sistema se recusa a executar o arquivo.
./deploy.sh
# bash: ./deploy.sh: Permission denied

# chmod u+x: acrescenta (+) a permissão de executar (x) para o dono (u).
chmod u+x deploy.sh
./deploy.sh

# chmod g-w: tira (-) a escrita (w) do grupo (g).
chmod g-w deploy.sh

# chmod o-rwx: tira TUDO dos outros (o).
chmod o-rwx deploy.sh
```

A forma **numérica** soma um valor para cada permissão: **r = 4, w = 2, x = 1**. É o binário da Aula 03 de novo: cada letra é **um bit** (`rwx` = `111` = 7; `r-x` = `101` = 5; `r--` = `100` = 4). Um número por trio, na ordem dono, grupo, outros:

| Número | Binário | Letras | Significado |
| --- | --- | --- | --- |
| **7** | `111` | `rwx` | ler, escrever e executar |
| **6** | `110` | `rw-` | ler e escrever |
| **5** | `101` | `r-x` | ler e executar |
| **4** | `100` | `r--` | só ler |
| **0** | `000` | `---` | nada |

```bash
# 755 = rwx (dono) r-x (grupo) r-x (outros): o padrão de scripts e diretórios.
chmod 755 deploy.sh

# 644 = rw- r-- r--: o padrão de arquivos comuns (só o dono edita).
chmod 644 notas.txt

# 600 = rw- --- ---: SÓ o dono lê e escreve. É o que a chave SSH privada exige.
chmod 600 ~/.ssh/id_ed25519

# -R aplica em TUDO dentro do diretório (a recursão da Aula 03).
chmod -R 755 projetos
```

Dois cuidados. **O SSH recusa uma chave privada com permissão aberta demais** (a mensagem é `UNPROTECTED PRIVATE KEY FILE`), e a solução é o `chmod 600` acima, o que liga com a chave da Aula 05. E o famoso `chmod -R 777` ("libera tudo para todo mundo") é uma solução que **abre uma brecha de segurança**: se um erro de permissão aparecer, entendam **quem** precisa de **qual** permissão e deem só ela.

7.4 - chown: mudar o dono

O **`chown`** (*change owner*) troca o **usuário** e o **grupo** donos de um arquivo. Como mexe em quem manda no arquivo, normalmente exige `sudo`.

```bash
# chown usuário:grupo arquivo -- muda o dono E o grupo de uma vez.
sudo chown luan:dev deploy.sh

# Só o dono (sem os dois pontos).
sudo chown maria deploy.sh

# Só o grupo (com os dois pontos na frente).
sudo chown :dev deploy.sh

# -R aplica em tudo dentro do diretório.
sudo chown -R luan:dev projetos
```

Um erro clássico que isso resolve: rodar um comando com `sudo` **cria arquivos cujo dono é o root**, e depois o seu usuário comum **não consegue editar nem apagar** o que acabou de gerar. A solução é devolver o dono com `sudo chown -R seu-usuario:seu-usuario pasta`.

8 - Bônus: mostrar o branch do Git no terminal

Para fechar com um exemplo de dot file em ação (Seção 6.4), dá para fazer o terminal **mostrar em qual branch do Git estamos**, e isso evita o erro comum de commitar no branch errado (Aula 12). O Git já vem com um script que faz isso, o `git-sh-prompt`. Basta pedir ao `.bashrc` que o carregue e mudar o **prompt** (a variável `PS1`):

```bash
# Abre o .bashrc no editor nano (qualquer editor serve).
nano ~/.bashrc

# ---- Acrescente ESTAS linhas no final do arquivo ----

# Carrega a função __git_ps1, que devolve o nome do branch atual.
source /usr/lib/git-core/git-sh-prompt

# Mostra um * se houver alteração ainda não commitada.
export GIT_PS1_SHOWDIRTYSTATE=1

# PS1 é o texto do prompt: usuário@máquina:pasta (branch)$
PS1='\u@\h:\w$(__git_ps1 " (%s)")\$ '
```

Salve (no nano: `Ctrl+O`, `Enter`, `Ctrl+X`) e peça ao terminal para **reler** o arquivo, sem precisar fechar:

```bash
# source: executa o arquivo no terminal atual, aplicando a mudança agora.
source ~/.bashrc
```

Dentro de um repositório o prompt passa a mostrar o branch, e fora dele volta ao normal:

```text
luan@pc:~/unifaat-es-2026 (main)$
luan@pc:~/unifaat-es-2026 (RA123-tf-14 *)$     <- o * indica alteração não commitada
luan@pc:~$                                      <- fora de um repositório
```

Existe também a opção mais bonita e com mais recursos, o **Starship** (um prompt configurável, que também mostra o branch, a linguagem do projeto e mais). A ideia é a mesma: **uma linha no `.bashrc`** e o terminal ganha uma "extensão". Para o curso, o `git-sh-prompt` já resolve e não instala nada.

9 - Conclusão

O **Linux é o kernel**: o núcleo que fala com o hardware e atende os pedidos dos programas, e que no Windows e no macOS tem equivalentes fechados (NT e XNU). Uma **distro** junta o kernel com ferramentas e um **gerenciador de pacotes**, e as centenas de distros nascem de poucas **famílias** (Debian, Red Hat, Arch, SUSE, Alpine), com derivações como o Ubuntu. Por cima vem a **GUI** (GNOME, KDE, COSMIC), que é opcional e trocável.

No terminal, **tudo é um binário** que o shell acha pelo `PATH`; se não existe, o **gerenciador de pacotes** (`apt`, `dnf`, `pacman`...) instala o programa **com toda a árvore de dependências** de uma vez, e é por esse gerenciador que o desenvolvedor costuma escolher a distro. O `/home` guarda os arquivos de cada usuário e os **dot files** guardam as suas configurações, como o `.bashrc` que pode até mostrar o branch do Git. E o kernel confere, a cada pedido, **quem pode fazer o quê**: o `ls -la` mostra o dono, o grupo e o trio `rwx` de cada arquivo, o **`chmod`** muda as permissões e o **`chown`** muda o dono.

Na próxima aula fazemos a **revisão** para a prova do 2º bimestre.

10 - Referências

Linus Torvalds e David Diamond — Just for Fun: The Story of an Accidental Revolutionary (HarperBusiness)
Richard Stallman — Linux and the GNU Project (https://www.gnu.org/gnu/linux-and-gnu.html)
The Linux Kernel Archives — Documentação do kernel (https://www.kernel.org/doc/html/latest/)
Debian — Manual de referência do Debian: gerenciamento de pacotes (https://www.debian.org/doc/manuals/debian-reference/)
Ubuntu — Documentação: instalando software com apt (https://documentation.ubuntu.com/server/how-to/software/package-management/)
Linux man-pages — chmod(1), chown(1), ls(1) (https://man7.org/linux/man-pages/)
Git — git-sh-prompt, o script que mostra o branch no prompt (em /usr/lib/git-core/git-sh-prompt)
Material de aulas anteriores: Aula 01 (SO e Terminal), Aula 02 (WSL e Virtualização), Aula 03 (Linguagem de Máquina), Aula 04 (Versionamento e Git), Aula 05 (Git e GitHub) e Aula 12 (Branches, Fork e Pull Request).



Questões do TA:



QUESTÃO 1
Segundo o texto, o que é o Linux, a rigor?

A) Um sistema operacional completo, com terminal, interface gráfica e gerenciador de pacotes já incluídos.

B) Apenas o kernel: o núcleo que fala com o hardware, sobre o qual as distribuições montam o sistema completo.

C) Uma distribuição criada pela Microsoft para rodar dentro do Windows.

D) Uma interface gráfica, concorrente do GNOME e do KDE.

E) Um gerenciador de pacotes usado pelas distros da família Debian.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 2
Sobre kernel, distro e GUI, é correto afirmar que:

A) O Ubuntu e o Fedora usam kernels completamente diferentes, sem relação nenhuma com o Linux.

B) GNOME, KDE Plasma e COSMIC são distribuições, e não ambientes gráficos.

C) No Windows e no macOS o kernel (NT e XNU) vem fechado dentro de um pacote único, ao contrário do Linux, em que qualquer pessoa pode montar uma distro sobre o mesmo kernel.

D) A GUI é obrigatória em qualquer sistema Linux, inclusive nos servidores.

E) O kernel é a camada responsável por desenhar janelas e ícones na tela.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 3
Qual das alternativas associa corretamente a distribuição à sua família e ao gerenciador de pacotes?

A) Ubuntu: família Debian, gerenciador apt.

B) Fedora: família Debian, gerenciador apt.

C) Arch Linux: família Red Hat, gerenciador dnf.

D) Alpine Linux: família SUSE, gerenciador zypper.

E) Rocky Linux: família Arch, gerenciador pacman.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 4
O terminal consegue executar o `git`, o `unzip` ou o `curl` porque:

A) O terminal tem todos esses programas embutidos e nunca precisa de arquivos externos.

B) Cada comando é um binário (arquivo executável) que o shell procura nos diretórios listados no PATH; se ele não existir na máquina, é preciso instalá-lo.

C) O kernel converte qualquer texto digitado em um programa novo automaticamente.

D) Esses comandos só funcionam dentro de uma interface gráfica.

E) O PATH é um arquivo que guarda o histórico de todos os comandos já digitados.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 5
Qual é a principal vantagem de um gerenciador de pacotes como o `apt`?

A) Ele dispensa o uso do `sudo` em qualquer instalação.

B) Ele só funciona com programas que não têm dependências.

C) Ele instala o programa pedido e toda a sua árvore de dependências de uma vez, na versão certa, e registra o que instalou para poder atualizar ou remover depois.

D) Ele compila o kernel de novo a cada programa instalado.

E) Ele troca a interface gráfica da distro por outra, sem que o usuário precise pedir.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 6
Sobre o `/home` e os dot files, é correto afirmar que:

A) O `/home` guarda as configurações do sistema inteiro, que valem para todos os usuários.

B) Arquivos que começam com ponto, como o `.bashrc` e o `.gitconfig`, ficam ocultos no `ls` comum e guardam as configurações do usuário na sua pasta pessoal.

C) O `.bashrc` é lido apenas uma vez, na instalação do Linux, e nunca mais.

D) A pasta `~/.ssh` guarda os binários dos comandos, como o `ls` e o `git`.

E) Dot files só existem no Windows; no Linux as configurações ficam num registro central.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 7
Um arquivo aparece no `ls -la` como `-rwxr-xr-- 1 luan dev script.sh`. O que cada grupo de permissão pode fazer?

A) O dono (luan) lê, escreve e executa; o grupo (dev) lê e executa; os outros apenas leem.

B) O dono (luan) apenas lê; o grupo (dev) lê, escreve e executa; os outros executam.

C) Todos os usuários podem ler, escrever e executar, sem restrição.

D) O dono (luan) lê e executa; o grupo (dev) lê, escreve e executa; os outros não podem nada.

E) Somente o root pode abrir o arquivo; os demais recebem Permission denied.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 8
Qual comando deixa um arquivo com as permissões `rw-r--r--` (o padrão de um arquivo comum, em que só o dono pode editar)?

A) `chmod 755 arquivo.txt`

B) `chmod 777 arquivo.txt`

C) `chmod 600 arquivo.txt`

D) `chmod 644 arquivo.txt`

E) `chmod 421 arquivo.txt`

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 9
Depois de rodar um comando com `sudo`, os arquivos gerados ficaram com o root como dono, e o seu usuário comum não consegue mais editá-los. Qual comando devolve a propriedade para o usuário `luan` e o grupo `luan`, em tudo dentro da pasta `projetos`?

A) `chmod -R luan:luan projetos`

B) `sudo chown -R luan:luan projetos`

C) `sudo apt install luan projetos`

D) `chown projetos luan:luan`

E) `sudo usermod -aG luan projetos`

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não




QUESTÃO 10
Um aluno observou que o macOS e o Linux são muito parecidos de usar no terminal. Qual explicação está correta?

A) Os dois usam exatamente o mesmo código de kernel, por isso um programa compilado para um roda no outro sem alterações.

B) Os dois pertencem à família Unix e seguem o padrão POSIX, então conceitos e comandos como ls, chmod e ssh são parecidos, mas os kernels (XNU e Linux) são códigos diferentes.

C) O macOS é uma distribuição Linux modificada pela Apple.

D) O Linux é derivado do Windows NT, e por isso o terminal dele é parecido com o do macOS.

E) A semelhança é apenas visual: no macOS os comandos do terminal não existem.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não
