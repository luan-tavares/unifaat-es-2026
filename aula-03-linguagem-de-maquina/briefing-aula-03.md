# Briefing — Aula 03: WSL 2 - Linguagem de Máquina

1 - Introdução

Vale um lembrete rápido antes de começar: esta aula integra o primeiro ano do curso de Análise e Desenvolvimento de Sistemas, e o motivo de se dedicar uma aula inteira a bits e bytes é justamente esse — antes de desenvolver qualquer sistema, é preciso entender, ainda que de forma introdutória, o que o computador realmente enxerga por baixo de tudo. E a resposta curta é: binário. Não só um arquivo, não só um número isolado — o computador inteiro, do sistema operacional ao menor aplicativo, é, literalmente, um binariozão gigante. Todo texto, toda imagem, todo som, todo programa que roda numa máquina é, no fundo, uma sequência enorme de 0s e 1s, e nada além disso.

Na aula anterior, foi apresentado o conceito de virtualização e como o WSL permite ter um Linux de verdade rodando dentro do Windows. Naquele contexto, surgiu de passagem um conceito que esta aula retoma com mais calma: o binário. Naquele momento, "binário" era o nome dado ao arquivo executável de um programa — o resultado final, compilado, que o sistema operacional procura e executa quando um comando é digitado no terminal.

Nesta aula, a palavra "binário" volta, mas com outro sentido — e entender essa diferença é o ponto de partida do texto. Além do arquivo executável, existe o sistema binário: a forma como qualquer computador, por baixo de tudo, representa informação. Antes de prosseguir com os comandos no terminal, vale a pena parar e entender o que realmente acontece dentro da máquina quando ela processa esses comandos — porque, no fim das contas, tudo o que um computador faz se resume a sequências de dois estados possíveis.

Esta aula se divide em duas partes. A primeira desce ao nível mais fundamental de um computador: bits, bytes, octetos, o sistema binário, o hexadecimal, uma pequena conta de análise combinatória que explica por que um único byte consegue representar exatamente 256 valores diferentes, e como esse mesmo byte pode ganhar significados diferentes dependendo de como é interpretado. A segunda parte volta à prática: com o ambiente Linux já instalado via WSL, são apresentados os primeiros comandos que permitem navegar, criar e visualizar arquivos e diretórios sem depender de nenhum clique.

2 - Linguagem de máquina

2.1 - Por que tudo vira 0 e 1

Todo processador é, fisicamente, um circuito elétrico. E um circuito elétrico, na sua forma mais simples, só consegue distinguir com segurança dois estados: corrente passando ou corrente não passando, ligado ou desligado. Não existe, no nível do hardware, um jeito confiável e barato de representar diretamente letras, números decimais ou imagens — existe apenas essa distinção binária entre dois estados elétricos.

É por isso que toda a informação que um computador manipula — texto, som, imagem, o próprio código de um programa — precisa, em algum momento, ser traduzida para uma sequência desses dois estados. Chama-se essa representação de sistema binário, e cada um desses estados individuais de bit (contração de "binary digit", ou "dígito binário"). Um bit vale 0 ou 1, nunca outra coisa.

2.2 - Bit, byte e octeto

Um único bit sozinho representa muito pouco: apenas duas possibilidades. Para representar algo minimamente útil — uma letra, um número maior, uma cor — os computadores agrupam bits em blocos. O agrupamento mais comum e mais importante é o byte: um conjunto de 8 bits, tratado como uma unidade só.

Byte e octeto são, na prática, sinônimos: octeto é o termo mais formal, usado especialmente em contextos de redes (como no endereçamento IP, onde cada um dos quatro números de um IPv4 é literalmente um octeto), enquanto "byte" é o termo mais usado no dia a dia da programação. Os dois significam exatamente a mesma coisa: 8 bits agrupados.

2.3 - Convertendo entre binário e decimal

O sistema decimal, usado no dia a dia, é posicional em base 10: cada posição de um número vale uma potência de 10, e por isso são usados dez algarismos diferentes (0 a 9). O sistema binário funciona pela mesma lógica, só que em base 2: cada posição vale uma potência de 2, e por isso existem apenas dois algarismos possíveis (0 e 1).

Para converter de binário para decimal, multiplica-se cada bit pelo valor da sua posição e somam-se os resultados. A tabela abaixo mostra as oito posições de um byte, o valor de cada uma (a potência de 2 correspondente) e um exemplo de byte preenchido:

| Posição | 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |
|---|---|---|---|---|---|---|---|---|
| Valor | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
| Byte de exemplo | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 |

Somando apenas as posições em que o bit vale 1: 8 (posição 2³) mais 2 (posição 2¹) resulta em 10. Ou seja, o byte `00001010` em binário equivale a 10 em decimal.

O caminho inverso — de decimal para binário — segue a lógica de ir "encaixando" as maiores potências de 2 possíveis dentro do número, até sobrar zero. Não é um processo mágico nem exclusivo de programador: é uma troca de base numérica, o mesmo tipo de operação que qualquer sistema posicional permite fazer.

2.4 - Hexadecimal: um atalho para representar binário

Escrever e ler números binários longos é cansativo e propenso a erro — um byte já tem 8 dígitos, e endereços de memória costumam ter vários bytes seguidos. Por isso, é comum representar valores binários usando outro sistema numérico: o hexadecimal, em base 16.

A vantagem do hexadecimal não é coincidência: 16 é uma potência de 2 (2⁴), o que significa que cada dígito hexadecimal representa exatamente 4 bits (o que se chama de nibble, ou "meio byte"). Como 4 bits em binário só assumem 16 combinações possíveis (de 0000 a 1111), cada uma dessas combinações recebe um símbolo hexadecimal único: os algarismos de 0 a 9 cobrem as dez primeiras combinações, e as letras de A a F cobrem as seis restantes (A=10, B=11, C=12, D=13, E=14, F=15).

Um byte inteiro sempre cabe em exatamente dois dígitos hexadecimais, porque 8 bits equivalem a dois blocos de 4 bits (dois nibbles):

| Representação | Primeiro Nibble | Segundo Nibble |
|---|---|---|
| Binário | 0100 | 0001 |
| Hexadecimal | 4 | 1 |

Juntando os dois dígitos, o byte `01000001` em binário equivale a 41 em hexadecimal, que por sua vez equivale a 65 em decimal. É por isso que cores em código (como `#FF0000` no vermelho puro) e endereços de memória costumam aparecer em hexadecimal: é uma forma compacta e fiel de escrever binário, sem perder nenhuma informação no caminho.

2.5 - Por que um byte tem exatamente 256 valores possíveis

Chega-se, então, à pergunta que fecha essa primeira parte matemática: por que, sempre que alguém fala em byte, aparece o número 256? E por que os valores de um byte vão de 0 a 255, e não de 1 a 256?

A resposta está na análise combinatória, mais especificamente num conceito chamado arranjo com repetição. Um byte é formado por 8 posições (os 8 bits), e cada posição pode assumir, de forma independente das outras, um entre 2 valores possíveis (0 ou 1). Quando se quer saber quantas sequências diferentes é possível formar preenchendo *p* posições, cada uma com *n* opções possíveis, e repetição é permitida, a conta é simplesmente *n* elevado a *p*.

Aplicando ao byte: *n* vale 2 (os dois valores possíveis por bit) e *p* vale 8 (os oito bits do byte). O total de combinações é, portanto, 2 elevado a 8, ou seja, 256. A contagem começa do zero — `00000000` já é uma combinação válida, e vale 0 — logo a última combinação possível, `11111111`, corresponde a 255, não a 256. São 256 valores possíveis, mas contados a partir do zero, e por isso o intervalo de um byte é sempre descrito como "de 0 a 255".

Essa mesma lógica de 2 elevado à quantidade de bits é o que está por trás de praticamente toda medida de capacidade em computação — é ela que explica, por exemplo, por que endereços IPv4 (formados por 4 octetos) vão de `0.0.0.0` a `255.255.255.255`, ou por que uma imagem "de 8 bits por canal de cor" só consegue representar 256 tons diferentes de cada cor.

2.6 - O byte é atômico, mas sua leitura não é: a tabela ASCII

Um byte é uma unidade atômica de armazenamento: não existe "meio byte" sendo interpretado sozinho, e não é possível dividi-lo em algo menor que ainda faça sentido isoladamente. Mas isso não significa que um byte tenha um único significado fixo. O mesmo byte pode ser lido de formas completamente diferentes, dependendo do contexto que o programa aplica sobre ele — o byte continua sendo o mesmo; o que muda é a "lente" usada para interpretá-lo.

O exemplo mais clássico dessa ideia é a tabela ASCII (American Standard Code for Information Interchange), um padrão que define qual caractere corresponde a cada valor decimal de 0 a 255 — exatamente o intervalo de um byte calculado na seção anterior. O byte `01000001`, por exemplo, pode ser lido de duas formas: como número, seguindo a conta da seção 2.3, ele vale 65 em decimal; como caractere, consultando a tabela ASCII como um dicionário, o valor 65 corresponde à letra A. A letra maiúscula "A" é, literalmente, o byte `01000001` — não existe um "A" guardado à parte na memória, existe esse número, e um programa (editor de texto, terminal, navegador) que decide interpretá-lo como caractere.

Alguns outros exemplos da tabela ASCII básica, para fixar o padrão:

| Caractere | Decimal | Binário |
|---|---|---|
| A | 65 | 01000001 |
| a | 97 | 01100001 |
| 0 | 48 | 00110000 |
| espaço | 32 | 00100000 |

Vale notar o padrão entre A (65) e a (97): a diferença de 32 entre maiúsculas e minúsculas não é coincidência — é assim que a tabela ASCII foi desenhada, e é por isso que, em várias linguagens de programação, é possível "converter" maiúscula em minúscula fazendo conta com esses números, sem depender de nenhuma função mágica por trás.

2.7 - De byte a megabyte

Com o byte estabelecido como unidade-base, as demais medidas de capacidade usadas no dia a dia — kilobyte, megabyte, gigabyte — são apenas múltiplos dele, do mesmo jeito que quilômetro é um múltiplo de metro. A diferença é que, em computação, esses múltiplos costumam seguir potências de 2, não potências de 10 exatas, por conta da própria lógica binária apresentada até aqui.

| Unidade | Equivalência | Em bytes |
|---|---|---|
| 1 byte | 8 bits | 1 |
| 1 kilobyte | 1.024 bytes | 2¹⁰ |
| 1 megabyte | 1.024 kilobytes | 1.048.576 (2²⁰) |
| 1 gigabyte | 1.024 megabytes | 1.073.741.824 (2³⁰) |

O número 1.024 aparece porque é a potência de 2 mais próxima de 1.000 (2¹⁰ = 1024) — um sistema em base 2 nunca "fecha" exatamente em 1.000 como o sistema decimal fecha, então a computação adotou o múltiplo de 2 mais próximo. É por isso, inclusive, que um pen drive "de 16 GB" costuma exibir um pouco menos que 16 GB quando conectado ao computador: o fabricante calcula em base 10 (1 GB = 1.000.000.000 bytes), enquanto o sistema operacional exibe em base 2 (1 GB = 1.073.741.824 bytes).

3 - Comandos básicos do terminal Linux

3.1 - Diretório: o nome técnico de "pasta"

Antes de emendar os comandos, vale fixar um termo que aparece ao longo de todo o curso: diretório. Diretório é simplesmente o nome técnico que o mundo Linux (e a computação em geral) usa para o que a interface gráfica chama de "pasta". É a mesma coisa — um contêiner que organiza arquivos e outros diretórios dentro dele, formando uma estrutura em árvore. A diferença é só de vocabulário: em ambiente gráfico, "pasta" comunica melhor a metáfora visual; em terminal, "diretório" é o termo padrão usado pela própria documentação dos comandos.

3.2 - Recursividade: repetir a mesma operação em cada nível

Outro conceito que aparece com frequência é recursividade. De forma simples: uma operação é recursiva quando ela se aplica a algo, e depois se aplica de novo, do mesmo jeito, a cada parte menor que compõe aquilo — até não sobrar mais nada para repetir.

No contexto de diretórios, isso fica bem concreto: um diretório pode conter arquivos, mas também pode conter outros diretórios dentro dele, que por sua vez podem conter mais diretórios, e assim por diante. Uma operação recursiva sobre um diretório não afeta só o que está diretamente dentro dele — ela "desce" e repete a mesma ação em cada subdiretório, e dentro de cada subdiretório dos subdiretórios, até alcançar o fim da árvore. É esse conceito que será visto na prática logo mais, com o comando `rm -r`.

3.3 - Cada comando também é um binário

Vale reconectar aqui com o outro sentido de "binário" apresentado na Aula 02: ao digitar `ls`, `cd` ou `mkdir` no terminal, na grande maioria dos casos está sendo solicitado ao sistema que execute um arquivo binário — um programa já compilado, esperando para ser executado. `ls` é um binário. `mkdir` é um binário. `cat` é um binário. O terminal, ao ler o que foi digitado, procura um arquivo executável com aquele nome exato e o executa — exatamente o mecanismo discutido na aula anterior.

Existe uma exceção que vale citar: `cd` não é um binário separado, mas um comando embutido (built-in) do próprio programa que interpreta os comandos, chamado shell. Isso acontece porque mudar de diretório precisa alterar o estado do próprio terminal em execução, algo que um programa externo, rodando isolado como processo à parte, não conseguiria fazer sozinho. É um detalhe técnico, mas mostra bem que, por trás de cada comando, sempre existe uma explicação de engenharia — nunca é só "porque sim".

3.4 - Navegação, listagem e criação: o bloco de comandos

```bash
# pwd (print working directory): mostra o caminho completo do diretório atual.
# É sempre o primeiro comando útil para "se situar" dentro do terminal, já
# que, ao contrário da GUI, não há uma janela mostrando visualmente em que
# diretório o terminal se encontra.
pwd

# ls (list): lista os arquivos e diretórios que existem dentro do diretório
# atual. Sozinho, mostra só os nomes, sem muitos detalhes.
ls

# ls -la: a mesma listagem, mas com duas "flags" (opções) combinadas.
# -l (long format) mostra detalhes de cada item: permissões, dono, tamanho
# e data de modificação, um por linha, em vez de nomes soltos lado a lado.
# -a (all) includes também os arquivos e diretórios "ocultos" -- no Linux, tudo
# que começa com ponto (como .bashrc ou .git) é oculto por padrão e só
# aparece com essa flag.
ls -la

# cd (change directory): muda o diretório atual para o diretório indicado
# depois do comando. cd sozinho, sem nenhum argumento, sempre leva de volta
# para o diretório raiz do usuário (chamado de "home").
cd nome-do-diretorio

# cd .. sobe um nível: volta para o diretório "mãe" do diretório atual.
cd ..

# mkdir (make directory): cria um diretório novo com o nome indicado.
mkdir nome-do-novo-diretorio

# mkdir -p cria, de uma vez, uma sequência inteira de diretórios aninhados,
# mesmo que os diretórios intermediários ainda não existam -- sem o -p, o
# comando falharia se qualquer um dos diretórios do caminho não existisse.
mkdir -p projeto/src/utils

# touch: cria um arquivo vazio com o nome indicado (ou, se o arquivo já
# existir, apenas atualiza sua data de modificação sem alterar o conteúdo).
# É o jeito mais rápido de criar um arquivo em branco pelo terminal.
touch arquivo.txt

# cat (concatenate): mostra o conteúdo de um arquivo de texto diretamente
# na tela do terminal. É útil para uma leitura rápida de arquivos pequenos,
# sem precisar abrir um editor de texto separado.
cat arquivo.txt
```

3.5 - Removendo arquivos e diretórios: rm e rm -r

O comando de remoção merece atenção separada, porque é onde o conceito de recursividade da seção 3.2 aparece na prática — e porque é o comando mais fácil de gerar um erro irreversível.

```bash
# rm (remove): apaga um único arquivo. Ao contrário da lixeira de uma GUI, o
# terminal não pergunta "tem certeza?" por padrão -- o arquivo some direto,
# sem passar por nenhuma lixeira ou área de recuperação.
rm arquivo.txt

# rm, sozinho, NÃO apaga diretórios -- ele foi feito para arquivos, e retorna
# um erro caso seja usado diretamente sobre um diretório. Isso é proposital:
# apagar um diretório inteiro é uma ação maior, então o comando exige que
# isso seja solicitado explicitamente, com uma flag à parte.
rm nome-do-diretorio        # isso retorna erro, de propósito

# rm -r (recursive): agora sim apaga um diretório inteiro, aplicando a
# remoção recursivamente -- primeiro nos arquivos e subdiretórios mais
# internos, subindo nível por nível, até apagar o diretório indicado por
# completo. É exatamente o conceito de recursividade da seção 3.2, aplicado
# a uma operação real.
rm -r nome-do-diretorio
```

Vale reforçar: diferente de apagar um arquivo pela interface gráfica, onde ele geralmente vai para uma lixeira e pode ser recuperado, o terminal Linux não tem essa rede de segurança por padrão — e isso vale ainda mais para `rm -r`, que pode apagar dezenas ou centenas de arquivos de uma vez, em silêncio, sem nenhum aviso adicional. Isso não é um defeito — é uma consequência direta do que já foi discutido na Aula 01: o terminal fala diretamente com o sistema, sem a camada extra que a GUI adiciona (incluindo, nesse caso, a própria lixeira).

3.6 - Outros comandos úteis para o dia a dia

Além do bloco principal acima, alguns comandos aparecem com bastante frequência assim que se começa a manipular arquivos de verdade pelo terminal, e vale já conhecer:

```bash
# cp (copy): copia um arquivo ou diretório de um lugar para outro, mantendo
# o original intacto.
cp origem.txt destino.txt

# mv (move): move um arquivo ou diretório de lugar. O mesmo comando também
# serve para renomear um arquivo, já que "renomear" é, tecnicamente,
# mover um arquivo para o mesmo lugar com um nome diferente.
mv nome-antigo.txt nome-novo.txt

# man (manual): abre o manual oficial de qualquer comando, explicando
# todas as suas opções disponíveis. É a forma de "perguntar ao próprio
# terminal" como um comando funciona, sem precisar sair dele.
man ls
```

4 - Conclusão

Nesta aula, o texto desceu ao nível mais fundamental de um computador para mostrar que, por trás de qualquer clique, comando ou programa, existe apenas uma sequência de bits — dois estados possíveis, agrupados em bytes de 8 em 8, e representados de forma compacta em hexadecimal quando escritos por humanos. Foi apresentada, com uma pequena conta de análise combinatória, a razão pela qual esse agrupamento de 8 bits resulta exatamente em 256 valores possíveis, indo de 0 a 255, além do fato de que esse mesmo byte, sendo atômico, pode carregar significados diferentes dependendo de como é interpretado — como mostra a tabela ASCII, que transforma números em letras.

A segunda parte voltou à prática do terminal Linux, apresentando o que é um diretório, o que é recursividade, e o fato de que cada comando digitado é, na maioria dos casos, um binário sendo executado — os primeiros comandos que permitem efetivamente trabalhar por linha de comando: navegar entre diretórios com `cd`, listar conteúdo com `ls -la`, criar diretórios e arquivos com `mkdir` e `touch`, visualizar arquivos com `cat`, e remover arquivos e diretórios (inclusive de forma recursiva) com `rm` e `rm -r`.

Com o terminal já em uso na prática, a próxima aula avança para o próximo pilar da fundação deste semestre: Git e GitHub, as ferramentas que permitem registrar e rastrear a evolução de um projeto de software ao longo do tempo — exatamente o tipo de disciplina que, como discutido na Aula 01, separa "programar" de "fazer engenharia de software".

Questões do TA:

QUESTÃO 1
Segundo o texto, por que um byte é capaz de representar exatamente 256 valores diferentes, numerados de 0 a 255?
A) Porque um byte tem 256 bits, e cada bit representa um valor de 0 a 255.
B) Porque, com 8 bits e 2 valores possíveis por bit, o total de combinações é 2 elevado a 8 (arranjo com repetição), resultando em 256 sequências possíveis, contadas a partir do zero.
C) Porque o sistema hexadecimal só permite 256 símbolos diferentes.
D) Porque 256 é o número máximo de arquivos que um octeto consegue armazenar.
E) Porque cada byte equivale a 256 bytes menores, chamados de nibbles.
Gabarito: B)
Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 2
Sobre a tabela ASCII e a ideia de que "o byte é atômico, mas sua leitura não é", é correto afirmar que:
A) O byte `01000001` só pode significar o número 65, nunca a letra 'A'.
B) A tabela ASCII altera fisicamente o byte, transformando-o em um tipo de dado diferente.
C) O mesmo byte pode ser interpretado como número ou como caractere dependendo do contexto aplicado pelo programa, e a tabela ASCII define qual caractere corresponde a cada valor decimal de 0 a 255.
D) Cada caractere da tabela ASCII ocupa 256 bytes de memória.
E) A tabela ASCII só é usada para representar números, nunca letras.
Gabarito: C)
Misturar as alternativas? (x ) Sim (  ) Não

QUESTÃO 3
De acordo com o texto, qual a relação entre o comando `rm -r` e o conceito de recursividade?
A) `rm -r` apaga apenas o primeiro arquivo encontrado dentro do diretório, ignorando o restante.
B) `rm -r` aplica a remoção recursivamente, apagando arquivos e subdiretórios mais internos e subindo nível por nível até remover o diretório indicado por completo.
C) `rm -r` só funciona em diretórios vazios, sem nenhum arquivo dentro.
D) `rm -r` é idêntico ao `rm` comum, mudando apenas a velocidade de execução.
E) `rm -r` move os arquivos para uma lixeira antes de apagá-los definitivamente.
Gabarito: B)
Misturar as alternativas? (x ) Sim (  ) Não
