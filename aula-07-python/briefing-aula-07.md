Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☒ 8☐ 9☐ 10☐ 11☐ 12☐ 13☐ 14☐ 15☐ 16☐


Título da aula:

Introdução ao Python


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Na primeira aula do curso, ficou combinado que o ano teria duas grandes frentes. A primeira respondia a pergunta *onde e como o código realmente roda?*, e foi ela que ocupou todas as aulas até aqui: sistema operacional, terminal, Linux via WSL, bits e bytes, Git e GitHub. A segunda frente responde a outra pergunta: *como organizar o que se constrói para que não vire um caos?* É nela que entram Python, algoritmos, estruturas de dados, orientação a objetos e boas práticas — e é aqui, nesta aula, que essa segunda frente começa.

Vale também resgatar uma promessa feita lá na Aula 02. Ao explicar por que cada ambiente isolado tem seus próprios binários, o texto dizia: "um exemplo que vocês vão viver na prática logo mais no curso é o Python: ter o Python instalado no Windows não faz com que ele exista dentro do ambiente Linux". Esse "logo mais" chegou. A aula começa exatamente por aí: instalando o Python dos dois lados e entendendo o porquê.

Esta aula se divide em quatro partes. A primeira discute o papel de uma linguagem de programação dentro da engenharia de software e por que a escolhida para este ano é Python. A segunda prepara o ambiente: instalação no WSL e no Windows, o que é uma dependência e o que é um ambiente virtual (venv). A terceira reforça os tipos básicos — número, booleano, string, lista, tupla, dicionário — e as funções, sempre conectando com o que já foi visto no curso. A quarta, que é o coração da aula, apresenta o conceito de algoritmo e transforma em código duas coisas: a conversão de decimal para binário que já foi feita à mão no quadro, e dois algoritmos de ordenação — o bubble sort, o mais simples de entender, e o merge sort, que usa a estratégia de dividir para conquistar.

2 - A linguagem é só uma ferramenta

2.1 - Programar em uma linguagem não é saber programar

Existe uma confusão muito comum no início de qualquer curso de tecnologia: achar que aprender a programar é decorar uma linguagem. Não é. Uma linguagem de programação é uma **ferramenta** — um jeito de escrever, de forma que a máquina consiga executar, uma ideia que já existia antes do código. A ideia é o que importa: o algoritmo, a forma de organizar os dados, a divisão do problema em partes menores, a decisão de como o sistema vai crescer sem quebrar.

A comparação com a engenharia civil, usada na Aula 01, volta a servir aqui. Um engenheiro civil não é definido pela marca da betoneira que usa; ele é definido por saber calcular a estrutura, escolher o material certo para cada parte da obra e garantir que a ponte continue de pé daqui a trinta anos. A betoneira muda de obra para obra, e o conhecimento de engenharia vai junto. Com software é igual: quem entende o que é um algoritmo de ordenação escreve um em Python, em JavaScript, em C ou em qualquer outra linguagem — muda a sintaxe, não muda o raciocínio.

É por isso que o próprio nome da disciplina não é "Python". A divisão sucessiva por 2 que foi feita no quadro, com papel e caneta, já era um algoritmo — antes de qualquer linguagem entrar na história. Nesta aula, a mesma sequência de passos vai virar código, e a lição é justamente essa: o raciocínio veio primeiro; a linguagem só o tornou executável.

Fica, então, combinado o que é o **fim** e o que é o **meio** nesta disciplina. O que importa no curso são quatro coisas: **algoritmos**, **estruturas de dados**, **orientação a objetos** e **boas práticas**. Esse é o fim — o conhecimento que vai junto para qualquer linguagem, em qualquer emprego. O Python é o meio: a ferramenta escolhida para enxergar e praticar esses quatro conceitos.

| | O que é | Exemplos |
|---|---|---|
| **O fim** | Os conceitos que valem em qualquer linguagem | Algoritmos, estruturas de dados, orientação a objetos e boas práticas |
| **O meio** | A ferramenta usada para praticar os conceitos | Python, neste ano; JavaScript e TypeScript, em disciplinas seguintes |

2.2 - Por que Python neste ano

Neste ano, a ferramenta escolhida é Python, por três motivos práticos:

- **Legibilidade:** o código Python se parece muito com pseudocódigo, o que deixa o foco no conceito (o algoritmo, a estrutura, o objeto) e não em detalhes de sintaxe;
- **Ele já existe no ambiente de vocês:** o Ubuntu do WSL usa o próprio Python em várias ferramentas internas do sistema, então ele já vem instalado;
- **Presença no mercado:** automação, ciência de dados, inteligência artificial, back-end web, testes e scripts de infraestrutura — é difícil passar por uma área de tecnologia sem esbarrar nele.

Mas fica o aviso desde já: **a linguagem pode mudar nas próximas disciplinas, e isso é esperado.** Nas disciplinas dos próximos semestres, como Desenvolvimento Web e Frontend, o ecossistema passa a ser JavaScript e TypeScript, por exemplo. Quem sair deste ano sabendo só "Python" vai ter que recomeçar do zero a cada troca; quem sair entendendo algoritmos, estruturas de dados e orientação a objetos vai precisar aprender apenas a sintaxe nova — que é a parte mais fácil. Ao longo da carreira, vocês vão trocar de linguagem várias vezes; os conceitos desta disciplina vão junto em todas as trocas.

2.3 - O que vocês já viram, e o que muda aqui

Vocês já estão vendo Python em outra disciplina deste semestre, com foco na linguagem em si: variáveis, tipos e operadores; estruturas de decisão com if, elif e else; laços for e while com break e continue; listas, tuplas, dicionários e conjuntos; funções com e sem retorno; modularização com import; leitura e escrita de arquivos .txt e .csv; tratamento de erros com try, except, finally e raise; uma introdução a logging e a RPA.

Ótimo: isso acelera o trabalho aqui. Esta disciplina não vai repetir a linguagem do zero — vai usar o Python como ferramenta para os conceitos de engenharia. A tabela abaixo mostra como os mesmos tópicos aparecem com outro olhar:

| Tópico já visto | O olhar de Engenharia de Software |
|---|---|
| Variáveis, tipos e operadores | O que cada tipo é por baixo, em bits e bytes (Aula 03) |
| if, elif, else | Código sem else: retorno antecipado e valor padrão |
| for, while, break, continue | Laços como parte de um algoritmo, com custo de execução |
| Listas, tuplas, dicionários, conjuntos | Estruturas de dados: quando usar cada uma e por quê |
| Funções e import | Organização do código, reaproveitamento e testes |
| Arquivos .txt e .csv | Dados persistidos e formatos de troca |
| try, except, finally, raise | Tratamento de erros como parte do projeto, não remendo |
| Logging e RPA | Observabilidade e automação, vistas mais à frente |

Um ponto da tabela merece destaque: nesta disciplina, **o else não é usado**. Não porque esteja errado na linguagem — ele funciona e vocês vão encontrá-lo em muito código por aí —, mas porque, como regra de estilo, código sem else fica mais plano: as condições de saída aparecem logo no começo (o chamado **retorno antecipado**, ou *early return*), e o caminho principal fica no final, sem blocos aninhados. Nos laços, o mesmo papel é cumprido pelo continue. Todos os exemplos desta aula seguem essa regra.

3 - Python é um binário que lê texto

3.1 - Linguagem interpretada

Na Aula 04, vimos que um binário executável é um arquivo já compilado, pronto para rodar, que o sistema procura quando um comando é digitado no terminal — `ls`, `mkdir` e `git` são exemplos. O Python se encaixa nessa mesma ideia, com um detalhe interessante: o comando `python3` também é um binário (escrito, inclusive, na linguagem C), mas a função dele é **ler um arquivo de texto com código Python e executá-lo**.

É isso que significa dizer que o Python é uma linguagem **interpretada**. Em uma linguagem compilada, como C, o código-fonte é traduzido inteiro para linguagem de máquina antes de rodar, e o resultado é um binário novo. Em uma linguagem interpretada, o programa que vocês escrevem continua sendo um arquivo de texto (com extensão .py), e quem roda de fato é o binário do interpretador, que lê esse texto e o executa. Por baixo, o Python ainda traduz o código para uma forma intermediária chamada **bytecode** (os arquivos .pyc que aparecem dentro da pasta `__pycache__`), mas isso acontece de forma automática e invisível.

```bash
# "which" mostra em qual pasta está o binário que o terminal vai executar
# quando o comando for digitado.
which python3

# Resultado esperado no Ubuntu do WSL:
# /usr/bin/python3
```

3.2 - Um pouco de história

O Python foi criado pelo holandês Guido van Rossum, que começou o projeto como passatempo nas férias de fim de ano de 1989 e publicou a primeira versão em 1991. O nome não tem nada a ver com a cobra: é uma homenagem ao grupo de comédia britânico Monty Python.

Há um episódio da história do Python que é, por si só, uma aula de engenharia de software. Em 2008 foi lançado o Python 3, uma versão que **quebrou a compatibilidade** com o Python 2: código escrito para a versão antiga deixava de funcionar na nova. A comunidade levou mais de uma década para migrar, e o Python 2 só foi oficialmente aposentado em 1º de janeiro de 2020. É por causa dessa transição que, até hoje, o comando no Linux se chama `python3`, e não apenas `python`: durante anos as duas versões conviveram na mesma máquina, e cada uma precisava de um binário com nome próprio. Mudar uma ferramenta usada por milhões de pessoas sem quebrar o que já existe é exatamente o tipo de problema que "só saber programar" não resolve.

Por fim, a linguagem tem um pequeno manifesto de estilo, o **Zen do Python**, escrito por Tim Peters e exibido quando se digita `import this` no interpretador. Duas das frases resumem bem o espírito desta disciplina: "legibilidade conta" e "explícito é melhor que implícito".

4 - Instalando o Python nos dois lados

4.1 - Por que instalar duas vezes

O motivo já foi visto na Aula 02 e reforçado na Aula 04 com o Git: o Windows e o Ubuntu do WSL são ambientes isolados, cada um com seus próprios processos, sua própria memória e **seus próprios binários**. Instalar o Python no Windows não o coloca dentro do WSL, e vice-versa. Dá para usar Python nos dois lados — e vale ter os dois instalados —, mas cada lado precisa do seu próprio binário executável.

4.2 - No Ubuntu do WSL

Como dito acima, o Ubuntu já traz o Python 3 instalado, porque usa ele internamente. O que costuma faltar são duas peças: o pip, que instala bibliotecas, e o módulo venv, que cria ambientes virtuais.

```bash
# Confere se o Python 3 já existe e qual é a versão.
# No Ubuntu 24.04, o resultado esperado é algo como "Python 3.12.3".
python3 --version

# Atualiza a lista de pacotes disponíveis no apt.
sudo apt update

# Instala o pip e o módulo de ambientes virtuais.
# (python3 já vem instalado, mas pedir de novo não causa problema.)
sudo apt install python3 python3-pip python3-venv

# Mostra onde está o binário: /usr/bin/python3.
which python3
```

Um detalhe que costuma confundir: no Ubuntu, o comando é `python3`. Digitar só `python` pode resultar em "command not found", e isso não é erro de instalação — é herança da transição entre as versões 2 e 3, explicada na seção anterior.

4.3 - No Windows

No Windows, o instalador oficial é baixado no site do Python (https://www.python.org/downloads/). Durante a instalação, existe uma caixa de seleção que faz toda a diferença: **"Add python.exe to PATH"**. Ela precisa ser marcada. Sem ela, o Python é instalado, mas o terminal não sabe onde encontrá-lo.

```powershell
# No PowerShell, confere a versão instalada.
python --version

# Mostra em qual pasta está o binário encontrado.
# (No PowerShell, "where" sozinho é outro comando; por isso o ".exe".)
where.exe python
```

Uma pegadinha comum do Windows: se o Python ainda não foi instalado e alguém digita `python` no terminal, o Windows abre a Microsoft Store em vez de mostrar um erro. Isso acontece porque o próprio Windows vem com um "atalho" com esse nome, que só aponta para a loja. Se isso acontecer, é sinal de que o Python de verdade ainda não está instalado — ou que a caixa do PATH não foi marcada.

4.4 - O PATH: onde o terminal procura os binários

A caixa "Add python.exe to PATH" leva a um conceito que vale formalizar. Na Aula 04, path foi apresentado como o endereço de um arquivo ou pasta. O **PATH**, em maiúsculas, é uma variável do sistema que guarda uma **lista de pastas**: quando um comando é digitado, o terminal procura um binário com aquele nome em cada uma dessas pastas, em ordem, e executa o primeiro que encontrar. Se o binário não estiver em nenhuma delas, o resultado é "command not found" — mesmo que o programa esteja instalado em outro lugar do disco.

```bash
# Mostra a lista de pastas onde o terminal procura binários,
# separadas por dois-pontos.
echo $PATH
```

A tabela abaixo resume as diferenças entre os dois lados:

| | Ubuntu (WSL) | Windows |
|---|---|---|
| Como instalar | `sudo apt install python3 python3-pip python3-venv` | Instalador do python.org, marcando "Add python.exe to PATH" |
| Comando | `python3` | `python` |
| Onde mora o binário | `/usr/bin/python3` | Dentro da pasta do usuário, em AppData |
| Como descobrir onde está | `which python3` | `where.exe python` |
| Ativar um venv | `source .venv/bin/activate` | `.venv\Scripts\Activate.ps1` |

5 - Dependências e ambientes virtuais

5.1 - O que é uma dependência

Quase nenhum programa de verdade é escrito inteiramente do zero. Um sistema que consulta uma API usa uma biblioteca pronta para fazer requisições; um que gera planilhas usa uma biblioteca de planilhas; um que lida com datas usa uma biblioteca de datas. Cada um desses códigos escritos por outras pessoas, dos quais o seu projeto precisa para funcionar, é uma **dependência**.

No Python, as bibliotecas de terceiros ficam publicadas no **PyPI** (Python Package Index) e são instaladas com o **pip**, o gerenciador de pacotes da linguagem — da mesma forma que o apt instala programas no Ubuntu. E é aqui que nasce o problema: cada projeto depende de bibliotecas em **versões específicas**. O projeto A precisa da versão 1 de uma biblioteca; o projeto B, na mesma máquina, precisa da versão 2, que mudou o funcionamento. Se as duas forem instaladas no mesmo lugar, uma sobrescreve a outra, e um dos projetos quebra. É a origem da frase mais famosa (e mais temida) da área: "na minha máquina funciona".

5.2 - O próprio Ubuntu se protege

O Ubuntu leva esse problema tão a sério que, nas versões recentes, ele simplesmente **recusa** a instalação de bibliotecas com pip direto no Python do sistema. Quem tentar vai receber um erro chamado `externally-managed-environment`. O motivo é de engenharia: o próprio Ubuntu usa o Python em ferramentas internas, e uma biblioteca instalada na versão errada poderia quebrar o sistema operacional. A mensagem de erro já sugere a solução: usar um ambiente virtual.

5.3 - O venv: isolamento, de novo

Um **ambiente virtual** (venv) é uma pasta dentro do projeto que funciona como um Python particular: tem seu próprio interpretador e seu próprio espaço para bibliotecas, de forma que o que for instalado ali não interfere em nenhum outro projeto, nem no Python do sistema.

A ideia não é nova para vocês. Na Aula 02, a virtualização isolava um sistema operacional inteiro, com seus processos e sua memória. O venv aplica o mesmo princípio de isolamento, só que em escala muito menor e muito mais leve: não há máquina virtual, não há hypervisor, há apenas uma pasta. E o mecanismo usado para "ativar" o ambiente é justamente o PATH visto na seção anterior: ativar o venv coloca a pasta de binários do ambiente **na frente** da lista do PATH, e por isso o comando `python` passa a encontrar primeiro o interpretador do projeto.

```bash
# Cria o ambiente virtual em uma pasta chamada .venv
# (o ponto no início deixa a pasta oculta, como o .git).
python3 -m venv .venv

# Ativa o ambiente. O início da linha do terminal passa a mostrar (.venv).
source .venv/bin/activate

# Com o ambiente ativo, "python" aponta para o binário do projeto.
which python

# Resultado esperado: /caminho/do/projeto/.venv/bin/python

# Instala uma biblioteca só dentro deste ambiente.
pip install requests

# Desativa o ambiente e volta ao Python do sistema.
deactivate
```

Repare no nome da pasta onde ficam os executáveis do ambiente no Linux: `bin`. É, literalmente, a pasta de binários do projeto. No Windows, a mesma pasta se chama `Scripts`, e a ativação no PowerShell é feita com `.venv\Scripts\Activate.ps1`. Se o PowerShell bloquear a execução do script de ativação, o comando `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` libera scripts locais para o usuário atual.

5.4 - O que vai para o Git, e o que não vai

O venv conversa diretamente com as Aulas 04 e 05. A pasta .venv pode ter centenas de megabytes de bibliotecas, e ela só funciona na máquina onde foi criada. Por isso, ela **nunca vai para o repositório**: entra no arquivo .gitignore. O que vai para o repositório é uma lista das dependências, normalmente em um arquivo chamado requirements.txt, para que qualquer pessoa consiga recriar o ambiente na própria máquina.

```bash
# Gera a lista de bibliotecas instaladas no ambiente, com as versões exatas.
pip freeze > requirements.txt

# Em outra máquina, depois de criar e ativar um venv novo,
# instala exatamente as mesmas versões.
pip install -r requirements.txt
```

Uma forma de lembrar: o requirements.txt é a **receita**; a pasta .venv é o **prato pronto**. Versiona-se a receita, não o prato.

- **A pasta .venv vai para o .gitignore;**
- **O requirements.txt vai para o repositório;**
- Cada projeto tem o seu próprio venv, nunca compartilhado;
- Antes de instalar qualquer biblioteca, conferir se o (.venv) aparece no início da linha do terminal.

6 - Reforçando o básico: tipos e funções

6.1 - O tipo é a lente

Na Aula 03, uma frase resumiu a tabela ASCII: "o byte é atômico, mas sua leitura não é". O mesmo byte 01000001 pode ser lido como o número 65 ou como a letra A — o que muda é a lente que o programa aplica. Em programação, essa lente tem nome: **tipo**. O tipo diz como um valor deve ser interpretado e quais operações fazem sentido com ele.

No Python, o tipo pertence ao **valor**, não à variável. Não é preciso declarar nada: a variável é só um nome que aponta para um valor, e a função type() mostra qual é o tipo desse valor.

```python
idade = 19
media = 7.5
aprovado = True
nome = "Ana"

print(type(idade))      # <class 'int'>
print(type(media))      # <class 'float'>
print(type(aprovado))   # <class 'bool'>
print(type(nome))       # <class 'str'>
```

6.2 - Números: int e float

O tipo **int** guarda números inteiros e, no Python, não tem limite de tamanho: 2 ** 100 funciona sem problema, diferente do byte da Aula 03, que parava em 255. O tipo **float** guarda números com casas decimais e carrega uma consequência direta da representação binária: alguns valores simples em decimal não têm representação exata em binário. O exemplo clássico é 0.1 + 0.2, que resulta em 0.30000000000000004. Para valores de dinheiro, por isso, o mais seguro é trabalhar com inteiros em centavos.

Dois operadores merecem atenção especial, porque são exatamente as duas operações feitas no quadro na conversão para binário: a **divisão inteira** (//), que devolve só o quociente, e o **resto da divisão** (%), também chamado de módulo.

```python
print(7 / 2)     # 3.5  -> divisão comum, sempre devolve float
print(7 // 2)    # 3    -> divisão inteira: só o quociente
print(7 % 2)     # 1    -> resto da divisão
print(2 ** 10)   # 1024 -> potência

# O Python já traz conversões de base prontas:
print(bin(45))            # 0b101101
print(int("101101", 2))   # 45
print(hex(255))           # 0xff
```

6.3 - Booleanos: o bit de volta

O tipo **bool** tem só dois valores possíveis, True e False, e é o resultado de toda comparação (==, !=, <, >, <=, >=). Os operadores lógicos são escritos por extenso: and, or e not. Um detalhe que conecta direto com a Aula 03: no Python, o bool é, por baixo, um inteiro, em que True vale 1 e False vale 0 — exatamente como um bit. Por isso, True + True resulta em 2.

6.4 - Strings: texto é uma sequência de números

O tipo **str** guarda texto, escrito entre aspas simples ou duplas. Uma string é uma **sequência de caracteres**, e cada caractere, como visto na Aula 03, é por baixo um número. O Python mostra isso com duas funções: ord() devolve o número de um caractere, e chr() faz o caminho inverso.

```python
print(ord("A"))              # 65
print(chr(65))               # A
print(ord("a") - ord("A"))   # 32, a diferença entre maiúsculas e minúsculas

nome = "Python"
print(nome[0])     # P   -> o primeiro caractere fica no índice 0
print(nome[-1])    # n   -> índices negativos contam do fim
print(len(nome))   # 6

nota = 8.5
print(f"{nome} tirou {nota}")   # f-string: monta texto com valores
```

Vale um complemento à Aula 03: a tabela ASCII é, na verdade, o começo de uma tabela muito maior, chamada **Unicode**, que dá um número para praticamente todo caractere de todos os idiomas — o "ã" é o 227, o símbolo do euro é o 8364. As strings do Python 3 usam Unicode, e é por isso que acentos funcionam normalmente. Outra característica importante é que strings são **imutáveis**: nenhuma operação altera a string original, toda operação cria uma string nova.

6.5 - Listas: o array do Python

Em muitas linguagens, uma sequência de valores guardados em ordem e acessados por posição se chama **array**. No Python, o equivalente do dia a dia é a **lista** (list), escrita entre colchetes. A lista é ordenada, acessada por índice começando em zero, e **mutável**: dá para trocar, incluir e remover elementos depois de criada.

```python
notas = [7, 3, 9]

notas.append(5)       # inclui no final
notas[0] = 8          # troca o valor da posição 0

print(notas)          # [8, 3, 9, 5]
print(len(notas))     # 4
```

Uma armadilha que vai aparecer no algoritmo de ordenação: escrever b = a, com listas, **não copia** a lista — só cria um segundo nome para o mesmo objeto, e alterar uma altera a outra. Para copiar de verdade, usa-se a.copy().

6.6 - Tuplas: valores que andam juntos

A **tupla** (tuple) é parecida com a lista, mas **imutável**, e é escrita entre parênteses. Ela serve para agrupar valores que pertencem um ao outro, e permite o **desempacotamento**: distribuir os valores da tupla em várias variáveis de uma vez. Um exemplo que vai ser útil logo adiante é a função divmod(), que faz a divisão inteira e o resto ao mesmo tempo e devolve os dois numa tupla.

```python
ponto = (10, 20)
x, y = ponto              # desempacotamento: x = 10, y = 20

print(divmod(45, 2))      # (22, 1) -> quociente e resto juntos
quociente, resto = divmod(45, 2)

# Trocar o valor de duas variáveis com uma tupla, sem variável auxiliar:
a, b = 1, 2
a, b = b, a
print(a, b)               # 2 1
```

6.7 - Dicionários: busca por chave

O **dicionário** (dict) guarda pares de **chave e valor**, escritos entre chaves. Em vez de buscar um valor pela posição, como na lista, busca-se pela chave. A própria Aula 03 já usou essa ideia sem o nome técnico, ao dizer que a tabela ASCII é consultada "como um dicionário": dado um caractere, encontra-se o número.

```python
ascii_parcial = {"A": 65, "a": 97, "0": 48}
print(ascii_parcial["A"])   # 65

aluno = {"nome": "Ana", "ra": 1234, "nota": 8.5}
aluno["nota"] = 9.0                       # altera um valor
print(aluno["nome"])                      # Ana
print(aluno.get("email", "sem e-mail"))   # consulta segura, com valor padrão
```

Buscar uma chave que não existe com colchetes gera um erro (KeyError); o método get() devolve um valor padrão no lugar. Listas, tuplas e dicionários vão ser aprofundados na aula de estruturas de dados — aqui o objetivo é só reconhecê-los e usá-los.

6.8 - Funções: dar nome a um conjunto de passos

Uma **função** agrupa um trecho de código sob um nome, recebe valores pelos **parâmetros** e devolve um resultado com **return**. Uma função sem return devolve None, o valor que representa "nada". A regra de ouro, que vai valer para o resto do curso: a função recebe tudo de que precisa pelos parâmetros e entrega o resultado pelo return, sem depender de nada de fora dela.

É também nas funções que a regra do "sem else" aparece com mais força. O return encerra a função na hora, então cada condição pode resolver o seu caso e sair, deixando o caso geral para o final:

```python
def situacao(media):
    if media >= 7:
        return "Aprovado"
    if media >= 5:
        return "Recuperação"
    return "Reprovado"


print(situacao(8))   # Aprovado
print(situacao(6))   # Recuperação
print(situacao(3))   # Reprovado
```

Resumo dos tipos vistos nesta parte:

| Tipo | Exemplo | Mutável | Para que serve |
|---|---|---|---|
| `int` | `45` | Não | Números inteiros, sem limite de tamanho |
| `float` | `7.5` | Não | Números com casas decimais (com imprecisão binária) |
| `bool` | `True` | Não | Verdadeiro ou falso, o "bit" da linguagem |
| `str` | `"Ana"` | Não | Texto, uma sequência de caracteres |
| `list` | `[7, 3, 9]` | Sim | Sequência ordenada que muda: o "array" |
| `tuple` | `(22, 1)` | Não | Valores fixos que andam juntos |
| `dict` | `{"A": 65}` | Sim | Busca de valor por chave |

7 - Algoritmos

7.1 - O que é um algoritmo

Um **algoritmo** é uma sequência finita de passos bem definidos que resolve um problema. "Finita" porque precisa terminar; "bem definidos" porque cada passo não pode deixar dúvida sobre o que fazer. Uma receita de bolo é um algoritmo; as instruções para montar um móvel também.

A palavra vem do nome de um matemático persa do século IX, al-Khwarizmi, que trabalhou em Bagdá e escreveu sobre métodos sistemáticos de cálculo — da forma latinizada do nome dele surgiu "algorismo", e depois "algoritmo". Ou seja: algoritmos existem há muito mais tempo do que computadores. E vocês já executaram um nesta disciplina, com papel e caneta: a divisão sucessiva por 2.

7.2 - Do quadro para o código: decimal para binário

O método feito no quadro, revisado na Aula 06, tem quatro passos:

1. Dividir o número por 2 e anotar o resto, que só pode ser 0 ou 1.
2. Trocar o número pelo quociente da divisão.
3. Repetir enquanto o quociente não chegar a zero.
4. Ler os restos de baixo para cima.

Refazendo o exemplo da Aula 06, com o número 45:

| Número | Resto (número % 2) | Quociente (número // 2) | Binário montado até aqui |
|---|---|---|---|
| 45 | 1 | 22 | 1 |
| 22 | 0 | 11 | 01 |
| 11 | 1 | 5 | 101 |
| 5 | 1 | 2 | 1101 |
| 2 | 0 | 1 | 01101 |
| 1 | 1 | 0 | 101101 |

Agora, o mesmo algoritmo em Python. Repare que cada passo da lista vira uma linha de código, e as duas operações do quadro são exatamente os operadores % e // vistos na seção 6.2:

```python
def decimal_para_binario(numero):
    if numero == 0:
        return "0"

    binario = ""
    while numero > 0:
        resto = numero % 2
        binario = str(resto) + binario
        numero = numero // 2

    return binario


print(decimal_para_binario(45))   # 101101
print(decimal_para_binario(10))   # 1010
print(decimal_para_binario(65))   # 1000001 -> o "A" da tabela ASCII
```

Três detalhes desse código valem a conversa em sala:

- **Ler de baixo para cima:** na Aula 06, foi dito que o erro mais comum no quadro é ler os restos de cima para baixo. No código, isso é resolvido colocando cada resto novo **na frente** do texto já montado (str(resto) + binario). Se a linha fosse escrita ao contrário (binario + str(resto)), o resultado sairia invertido — o mesmo erro do quadro, agora em código;
- **O caso do zero:** no quadro, ninguém converte o zero. No código, sem o if do começo, o while nunca rodaria e a função devolveria um texto vazio. Pensar nos casos de borda — os casos que "ninguém testa" — é uma das diferenças entre programar e fazer engenharia;
- **Retorno antecipado:** o caso especial é resolvido e encerrado logo no início, sem else, e o caminho principal fica no corpo da função.

A mesma ideia pode ser escrita usando uma lista e uma tupla, que acabaram de ser revisadas. Aqui, divmod() devolve o quociente e o resto juntos, os restos vão sendo guardados numa lista, e no final a lista é invertida — que é, literalmente, o "ler de baixo para cima":

```python
def decimal_para_binario_lista(numero):
    if numero == 0:
        return "0"

    restos = []
    while numero > 0:
        numero, resto = divmod(numero, 2)
        restos.append(str(resto))

    restos.reverse()
    return "".join(restos)


print(decimal_para_binario_lista(45))   # 101101
```

E o caminho inverso, de binário para decimal, também visto na Aula 03: multiplicar cada bit pelo valor da sua posição (uma potência de 2) e somar tudo, começando pela posição mais à direita:

```python
def binario_para_decimal(binario):
    decimal = 0
    posicao = 0
    for digito in reversed(binario):
        decimal += int(digito) * 2 ** posicao
        posicao += 1
    return decimal


print(binario_para_decimal("101101"))   # 45
```

7.3 - Conferindo o próprio algoritmo

Como saber se o algoritmo está certo? Testando alguns números à mão é um começo, mas um engenheiro vai além: compara o resultado com uma referência confiável, em muitos casos de uma vez. A função bin() do próprio Python serve de referência (basta remover o prefixo "0b" que ela coloca na frente), e a instrução assert interrompe o programa com erro se a comparação falhar:

```python
for n in range(256):
    assert decimal_para_binario(n) == bin(n)[2:]
    assert binario_para_decimal(bin(n)[2:]) == n

print("Os 256 valores de um byte conferem!")
```

Em três linhas, o algoritmo foi conferido para todos os 256 valores possíveis de um byte. Esse é o embrião de algo que vai ganhar nome e ferramentas próprias mais adiante no curso: **testes automatizados**.

7.4 - Ordenação: o bubble sort

Ordenar é um dos problemas mais clássicos da computação, e está por trás de coisas do dia a dia: a lista de contatos em ordem alfabética, o ranking de notas, os produtos do mais barato para o mais caro. Existem dezenas de algoritmos de ordenação, e o mais simples de entender é o **bubble sort** (ordenação por bolha).

A ideia é: percorrer a lista comparando cada elemento com o vizinho da direita; se estiverem fora de ordem, trocar os dois de lugar. Ao final de uma passada completa, o maior valor terá "borbulhado" até a última posição. Repete-se o processo, ignorando a parte do final que já está pronta, até que uma passada inteira aconteça sem nenhuma troca — sinal de que a lista está ordenada.

```python
def bubble_sort(valores):
    lista = valores.copy()
    n = len(lista)

    for passada in range(n - 1):
        trocou = False
        for i in range(n - 1 - passada):
            if lista[i] <= lista[i + 1]:
                continue
            lista[i], lista[i + 1] = lista[i + 1], lista[i]
            trocou = True

        if not trocou:
            break

    return lista


notas = [7, 3, 9, 1, 5]
print(bubble_sort(notas))   # [1, 3, 5, 7, 9]
print(notas)                # [7, 3, 9, 1, 5] -> a lista original não mudou
```

Acompanhando passada a passada com a lista [7, 3, 9, 1, 5]:

| Passada | Lista ao final da passada | O que aconteceu |
|---|---|---|
| 1 | [3, 7, 1, 5, 9] | O 9, maior valor, chegou ao fim |
| 2 | [3, 1, 5, 7, 9] | O 7 chegou ao seu lugar |
| 3 | [1, 3, 5, 7, 9] | O 3 e o 1 trocaram; lista ordenada |
| 4 | [1, 3, 5, 7, 9] | Nenhuma troca: o algoritmo para |

Quase tudo o que foi revisado na seção 6 aparece nesse código:

- **Lista e cópia:** a função trabalha numa cópia (valores.copy()) para não alterar a lista de quem a chamou — sem isso, a armadilha da seção 6.5 apareceria;
- **Tupla na troca:** a linha lista[i], lista[i + 1] = lista[i + 1], lista[i] troca os dois vizinhos usando desempacotamento de tupla. Em muitas linguagens, essa troca exige uma variável auxiliar;
- **continue no lugar do else:** se o par já está em ordem, o laço pula para o próximo par logo no começo, e a troca fica no caminho principal;
- **bool como sinalizador:** a variável trocou registra se houve alguma troca na passada; se não houve, o break encerra o algoritmo mais cedo.

E como o algoritmo só usa o operador <=, ele funciona com qualquer tipo que saiba ser comparado — inclusive strings. Aqui a Aula 03 aparece de novo: strings são comparadas pelo número de cada caractere, e todas as maiúsculas (65 a 90) vêm antes de todas as minúsculas (97 a 122):

```python
print(bubble_sort(["Carla", "ana", "Bruno"]))   # ['Bruno', 'Carla', 'ana']
```

O "ana", com inicial minúscula, foi parar no fim — não por erro do algoritmo, mas porque, para o computador, "a" é 97 e "C" é 67.

7.5 - Dividir para conquistar: o merge sort

O bubble sort é fácil de entender, mas tem um problema: no pior caso, ele compara cada elemento com quase todos os outros. Existe uma estratégia muito mais eficiente, que vai ser **importantíssima nas próximas aulas**: **dividir para conquistar**. Em vez de atacar o problema inteiro de uma vez, divide-se o problema em partes menores, resolve-se cada parte e junta-se o resultado.

O **merge sort** (ordenação por intercalação) aplica essa estratégia em duas fases:

1. **Dividir:** cortar a lista ao meio, e cada metade ao meio de novo, até sobrarem listas de um único item. Uma lista de um item só já está ordenada, por definição.
2. **Conquistar:** juntar (intercalar) as metades de volta, duas a duas, sempre mantendo a ordem, até reconstruir a lista inteira.

Acompanhando com a lista [7, 3, 9, 1, 5, 8, 2, 6]:

| Fase | Situação das listas |
|---|---|
| Início | [7, 3, 9, 1, 5, 8, 2, 6] |
| Dividir | [7, 3, 9, 1] e [5, 8, 2, 6] |
| Dividir | [7, 3], [9, 1], [5, 8] e [2, 6] |
| Dividir | [7], [3], [9], [1], [5], [8], [2] e [6] |
| Conquistar | [3, 7], [1, 9], [5, 8] e [2, 6] |
| Conquistar | [1, 3, 7, 9] e [2, 5, 6, 8] |
| Conquistar | [1, 2, 3, 5, 6, 7, 8, 9] |

Repare: oito itens foram divididos por 2 três vezes até chegar a um item só — e 2 elevado a 3 é exatamente 8. É a mesma divisão por 2 da conversão para binário, agora aplicada a uma lista.

O passo de intercalar é simples porque as duas metades já chegam ordenadas: basta comparar o primeiro item de cada uma, levar o menor para o resultado e repetir. Para juntar [1, 3, 7, 9] com [2, 5, 6, 8], compara-se 1 com 2 (vai o 1), depois 3 com 2 (vai o 2), depois 3 com 5 (vai o 3), e assim por diante.

```python
def merge_sort(lista):
    if len(lista) <= 1:
        return lista

    meio = len(lista) // 2
    esquerda = merge_sort(lista[:meio])
    direita = merge_sort(lista[meio:])

    return intercalar(esquerda, direita)


def intercalar(esquerda, direita):
    resultado = []
    i = 0
    j = 0
    while i < len(esquerda) and j < len(direita):
        if esquerda[i] <= direita[j]:
            resultado.append(esquerda[i])
            i += 1
            continue
        resultado.append(direita[j])
        j += 1

    resultado.extend(esquerda[i:])
    resultado.extend(direita[j:])
    return resultado


print(merge_sort([7, 3, 9, 1, 5, 8, 2, 6]))   # [1, 2, 3, 5, 6, 7, 8, 9]
```

Alguns pontos do código:

- **Dividir por 2 em código:** a linha meio = len(lista) // 2 usa a mesma divisão inteira da conversão para binário, e o fatiamento lista[:meio] e lista[meio:] separa as duas metades;
- **Recursão:** a função merge_sort chama a si mesma para cada metade. Uma função que se aplica de novo a partes menores do próprio problema é **recursiva** — o mesmo conceito de recursividade visto na Aula 03 com o comando rm -r, que se aplica a cada subdiretório até chegar ao fim da árvore;
- **Caso base:** toda recursão precisa de um ponto de parada. Aqui é o if do começo: uma lista com um item (ou nenhum) é devolvida como está, sem dividir mais. Sem ele, a função se chamaria para sempre;
- **Sem else, de novo:** dentro do intercalar, quando o item da esquerda é o menor, ele é levado ao resultado e o continue segue para a próxima comparação; o caso da direita fica no caminho principal. No final, o extend() acrescenta o que sobrou de um dos lados, que já está ordenado.

7.6 - Por que dividir por 2 importa

O Python já tem a função sorted() e o método sort() das listas. O algoritmo usado por eles se chama **Timsort**, criado em 2002 por Tim Peters — o mesmo autor do Zen do Python —, e ele é construído justamente em cima do merge sort. Então por que escrever ordenações à mão?

Pelo mesmo motivo que fez a turma converter números para binário no quadro, mesmo existindo a função bin(): **entender antes de usar**. E entender por dentro mostra a diferença de custo entre as duas estratégias.

Quantas vezes dá para dividir 1.000 por 2 até chegar em 1? Umas 10 vezes — que é, não por acaso, a quantidade de dígitos de 1.000 em binário (1111101000). O merge sort faz cerca de 10 rodadas de intercalação, cada uma passando pelos mil itens. O bubble sort, no pior caso, compara quase todo mundo com todo mundo:

| Itens | Bubble sort (pior caso) | Merge sort |
|---|---|---|
| 1.000 | cerca de 500 mil comparações | cerca de 10 mil |
| 1.000.000 | cerca de 500 bilhões | cerca de 20 milhões |

Com um milhão de itens, o bubble sort faz milhares de vezes mais trabalho. O custo do bubble sort não cresce na mesma proporção da lista — cresce muito mais rápido —, enquanto a estratégia de dividir por 2 mantém o crescimento sob controle. Essa ideia de dividir o problema ao meio vai voltar várias vezes nas próximas aulas, a começar pelas estruturas de dados.

8 - Conclusão

Esta aula abriu a segunda frente do curso. Começou com uma ideia que vale para a carreira inteira: a linguagem de programação é uma ferramenta, e o que se leva de uma linguagem para outra são os conceitos — algoritmos, estruturas de dados, orientação a objetos e boas práticas. Neste ano a ferramenta é Python; nas próximas disciplinas ela pode mudar, e os conceitos vão junto.

Em seguida, o Python foi instalado dos dois lados, no Ubuntu do WSL e no Windows, cumprindo a promessa feita na Aula 02: dois ambientes isolados, dois binários. O PATH explicou como o terminal encontra esses binários, e o mesmo PATH explicou como o venv funciona — um isolamento leve, por projeto, que resolve o problema das dependências em versões diferentes. A pasta .venv fica fora do Git; o requirements.txt entra.

Depois, os tipos básicos foram revisados como lentes sobre os mesmos bits da Aula 03: int sem limite, float com imprecisão binária, bool como um bit, str como sequência de números, lista como o array do Python, tupla para valores que andam juntos e dicionário para busca por chave, além das funções e do retorno antecipado. Por fim, o conceito de algoritmo levou a divisão sucessiva por 2 do quadro para o código, com teste automático contra os 256 valores de um byte, e apresentou dois algoritmos de ordenação: o bubble sort, que compara vizinhos, e o merge sort, que divide a lista por 2 até sobrar um item e depois intercala as metades — a estratégia de dividir para conquistar, que vai sustentar as próximas aulas.

Nas próximas aulas, essas peças ganham profundidade: listas, tuplas e dicionários passam a ser estudados como estruturas de dados, com suas vantagens e custos, abrindo caminho para a orientação a objetos.

9 - Referências

Python Software Foundation — Documentação oficial do Python 3 (https://docs.python.org/pt-br/3/)
Python Software Foundation — Download do Python (https://www.python.org/downloads/)
Python Software Foundation — venv: criação de ambientes virtuais (https://docs.python.org/pt-br/3/library/venv.html)
PEP 20 — The Zen of Python (https://peps.python.org/pep-0020/)
PEP 668 — Marking Python base environments as "externally managed" (https://peps.python.org/pep-0668/)
Thomas H. Cormen et al. — Algoritmos: Teoria e Prática
Material de aulas anteriores: Aula 02 (WSL 2 - Virtualização Linux), Aula 03 (Linguagem de Máquina), Aula 04 (Versionamento e Git) e Aula 06 (Revisão).




Questões do TA:



QUESTÃO 1
Segundo o texto, qual é a forma correta de lidar com o ambiente virtual de um projeto Python em relação ao Git?

A) Versionar a pasta .venv inteira, para que outras pessoas não precisem instalar nada.

B) Não usar Git em projetos que têm ambiente virtual.

C) Versionar apenas o binário do Python que fica dentro da pasta .venv.

D) Colocar a pasta .venv no .gitignore e versionar o arquivo requirements.txt, que permite recriar o ambiente com pip install -r requirements.txt.

E) Apagar o requirements.txt antes de cada commit, para não expor as dependências do projeto.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 2
Considere a função abaixo, apresentada no texto:

```python
def decimal_para_binario(numero):
    if numero == 0:
        return "0"

    binario = ""
    while numero > 0:
        resto = numero % 2
        binario = str(resto) + binario
        numero = numero // 2

    return binario

print(decimal_para_binario(6))
```

O que será impresso?

A) 011

B) 110

C) 0110

D) 6

E) None

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 3
Considere o algoritmo bubble sort apresentado no texto, aplicado à lista [4, 2, 5, 1]. Como a lista fica ao final da **primeira passada**?

A) [1, 2, 4, 5]

B) [4, 2, 1, 5]

C) [2, 4, 5, 1]

D) [1, 4, 2, 5]

E) [2, 4, 1, 5]

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 4
De acordo com o texto, por que o comando abaixo imprime ['Uva', 'banana', 'maçã']?

```python
print(sorted(["maçã", "Uva", "banana"]))
```

A) Porque strings são comparadas pelo número de cada caractere, e as letras maiúsculas têm números menores que as minúsculas na tabela de caracteres.

B) Porque a função sorted() ordena as palavras pela quantidade de letras.

C) Porque palavras com acento são sempre colocadas no fim da lista.

D) Porque a função sorted() não funciona com strings e devolve a lista na ordem inversa.

E) Porque o Python ordena as strings pela ordem em que foram digitadas.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 5
Segundo o texto, por que, depois de ativar um ambiente virtual com source .venv/bin/activate, o comando python passa a executar o interpretador do projeto, e não o do sistema?

A) Porque a ativação apaga o Python do sistema enquanto o ambiente estiver ativo.

B) Porque o venv cria uma máquina virtual completa, com hypervisor, dentro do WSL.

C) Porque a ativação coloca a pasta de binários do ambiente (.venv/bin) na frente da lista do PATH, e o terminal executa o primeiro binário com aquele nome que encontrar.

D) Porque o pip reinstala o Python inteiro a cada pip install feito dentro do ambiente.

E) Porque o Git passa a controlar qual versão do Python deve ser usada no projeto.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não
