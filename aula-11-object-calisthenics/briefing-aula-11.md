Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☐ 10☐ 11☒ 12☐ 13☐ 14☐ 15☐ 16☐


Título da aula:

Object Calisthenics


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Nas últimas aulas o Python ganhou classes, os três pilares da orientação a objetos e as estruturas de dados. Quem chegou até aqui já **consegue** escrever um programa orientado a objetos. Esta aula é sobre a pergunta seguinte: **como escrever um programa que outra pessoa (ou você, daqui a seis meses) consiga ler, mudar e confiar**. Em engenharia de software, esse é o ponto em que a profissão começa de verdade: o código que funciona é só o começo, porque ele vai ser **lido e alterado muito mais vezes do que foi escrito**, quase sempre por uma equipe.

O **Object Calisthenics** é um conjunto de regras de restrição para treinar esse olhar. "Calistenia" é o treino com o próprio peso do corpo: sem máquina, sem atalho, só disciplina repetida. A ideia é a mesma: durante o exercício, o programador se **proíbe** de algumas facilidades e descobre, na prática, o que elas escondiam.

O caminho da aula tem quatro passos. Primeiro, **de onde vêm as regras e por que restringir** (e por que elas não são lei). Segundo, **sete pontos principais**, agrupados em fluxo, dados, acesso e tamanho. Terceiro, **juntar tudo e saber quando não seguir**. Quarto, um fechamento: a **modularização**, o guarda-chuva que explica por que todas as regras existem, e uma **resenha sobre processo e trabalho em equipe**: regra de código só funciona quando a equipe combina, revisa e automatiza, e a **dívida técnica** mostra que entregar rápido com atalho é um empréstimo que não tem problema, desde que a gente saiba que está pegando.

Os arquivos completos estão em `src/11/`, um por ponto: `01_indentacao.py`, `02_sem_else.py`, `03_embrulhar_primitivos.py`, `04_colecao_primeira_classe.py`, `05_um_ponto_por_linha.py`, `06_diga_nao_pergunte.py`, `07_entidades_pequenas.py` e `08_divida_tecnica.py` (o da resenha) e `09_modularizacao.py` (o do fechamento).

2 - O que é e por que restringir

2.1 - Calistenia: o treino que dá nome à técnica

A palavra **calistenia** vem do grego: *kalos* (belo) e *sthenos* (força), ou seja, "força com beleza". É o treino que usa **apenas o peso do próprio corpo**: flexão, barra fixa, paralelas, agachamento, prancha, até movimentos avançados como o *muscle-up*. Não tem máquina nem anilha; o que se treina é **controle, técnica e consistência**. Alguns princípios da calistenia explicam bem a técnica de código:

- **Restrição que ensina:** sem máquina para "ajudar", o corpo aprende a se sustentar sozinho. Sem `else`, sem getters e sem listas soltas, o código aprende a se sustentar sozinho.
- **Técnica antes de carga:** quem faz flexão torta com muita repetição só se machuca. Quem escreve código aninhado com muita funcionalidade só gera dívida técnica.
- **Progressão:** ninguém começa pelo *muscle-up*; começa pela flexão no joelho e evolui. Aqui também: adotar **uma regra por vez** e só depois somar as outras.
- **Base serve a qualquer esporte:** a força de calistenia ajuda em corrida, escalada, luta. As regras servem a qualquer linguagem e a qualquer projeto.
- **Constância vence intensidade:** treinar pouco todo dia ganha de treinar muito uma vez. Refatorar um pouco a cada mudança ganha de "projeto de limpeza" a cada ano.

O nome é uma **metáfora**: Jeff Bay propôs treinar o desenho de código como se treina o corpo, sem equipamento e com disciplina.

2.2 - Origem

O Object Calisthenics foi apresentado por **Jeff Bay**, no capítulo "Object Calisthenics" do livro *The ThoughtWorks Anthology* (2008), com **nove regras**. O próprio texto propõe as regras como **exercício**: faça um projeto pequeno obedecendo todas, sem exceção, e observe como o desenho muda. Não é uma norma da indústria nem um mandamento: é um **treino**, parecido com o do músico que toca escala devagar para depois tocar música de verdade.

2.3 - Por que restringir ensina

Quando tudo é permitido, o caminho mais curto vence: um `if` dentro de um `for` dentro de outro `if`, uma lista passada de mão em mão, um `objeto.a.b.c.d` para chegar ao dado. Funciona hoje e **cobra amanhã**: cada atalho aumenta o **acoplamento** (uma parte do código depende dos detalhes da outra) e reduz a **coesão** (cada parte deveria fazer uma coisa só). As regras forçam, uma a uma, a pergunta "e se eu não pudesse fazer assim?", e a resposta quase sempre é **criar uma classe pequena ou mover um comportamento para o dono do dado**.

Esse custo tem nome: **dívida técnica**. Cada atalho é um empréstimo; a regra é o hábito de pagar à vista.

2.4 - Os sete pontos desta aula

Das nove regras, a aula aprofunda sete, que cobrem o essencial. As duas que ficam de fora estão resumidas no fim da seção 6.

| # | Ponto | Em uma frase | Grupo |
|---|---|---|---|
| 1 | Um nível de indentação por método (*One level of indentation per method*) | Se aninhou, extraia | Fluxo |
| 2 | Não usar `else` (*Don't use the ELSE keyword*) | Saia cedo, ou comece com o valor padrão | Fluxo |
| 3 | Obsessão por tipos primitivos (*Primitive Obsession*): embrulhar primitivos e strings (*Wrap all primitives and strings*) | Nota é uma `Nota`, não um `float` | Dados |
| 4 | Coleção de primeira classe (*First-class collections*) | Quem tem uma lista não tem mais nada | Dados |
| 5 | Um ponto por linha (Lei de Demeter, *Law of Demeter*; *One dot per line*) | Fale só com os seus amigos, não fale com estranhos | Acesso |
| 6 | Sem getters, setters e properties (*No getters/setters/properties*; *Tell, Don't Ask*) | Diga ao objeto o que fazer, não pergunte | Acesso |
| 7 | Entidades pequenas (*Keep all entities small*; *No classes with more than two instance variables*) | Classe pequena, no máximo duas variáveis de instância | Tamanho |

A numeração acima é a **da aula**; no texto de Jeff Bay a ordem é outra (por exemplo, "sem getters" é a regra 9). Em cada ponto indicamos a regra de origem.

3 - Fluxo: o caminho que o código faz

3.1 - Ponto 1: um único nível de indentação por método (One level of indentation per method)

Cada nível de indentação é uma decisão que o leitor precisa **guardar na cabeça** para entender a linha de baixo. Três níveis (`for`, `if`, `for`) já pedem papel e caneta. A regra manda extrair o aninhado para um método com nome, e o nome vira a explicação.

O caso extremo tem apelido: **código hadouken** (também chamado de *arrow code* ou *pyramid of doom*). Quando os `if` se empilham um dentro do outro, a indentação cresce para a direita e o código desenha uma **seta**, parecida com a onda de energia do golpe *hadouken* do Street Fighter. O sintoma é inconfundível: o que importa (o `return "certificado emitido"`) está lá no fundo, e para chegar nele o leitor precisou **guardar quatro condições na cabeça**. A cura é o **fail first** (falhar primeiro): testar logo no começo o que está errado e **sair cedo** (cláusula de guarda ou *early return*, que reencontramos no ponto 2). O hadouken é o caso clássico em que o fail first mais aparece, e é a cara do Object Calisthenics: a restrição empurra o programador a tratar o erro primeiro e deixar o caminho feliz no fim, no nível 1:

```python
# ANTES (código hadouken): os if se empilham e a indentação vira uma seta >>>.
def certificado_antes(existe, matriculado, frequencia, nota):
    if existe:
        if matriculado:
            if frequencia >= 75:
                if nota >= 6:
                    return "certificado emitido"
    return "certificado negado"


# DEPOIS (fail first): testa o que está errado e sai cedo; tudo no nível 1, e cada saída diz o motivo.
def certificado(existe, matriculado, frequencia, nota):
    if not existe:
        return "negado: aluno não existe"
    if not matriculado:
        return "negado: sem matrícula"
    if frequencia < 75:
        return "negado: frequência abaixo de 75%"
    if nota < 6:
        return "negado: nota abaixo de 6"
    return "certificado emitido"
```

Outro exemplo, agora com laços aninhados:

```python
# ANTES: três níveis (for -> if -> for) na mesma função.
def aprovados_antes(turma):
    aprovados = []
    for nome in turma:
        if len(turma[nome]) > 0:
            soma = 0
            for nota in turma[nome]:
                soma += nota
            if soma / len(turma[nome]) >= 6:
                aprovados.append(nome)
    return aprovados


# DEPOIS: cada função faz uma coisa e tem no máximo um nível.
def media(notas):
    return sum(notas) / len(notas)


def foi_aprovado(notas):
    if len(notas) == 0:
        return False
    return media(notas) >= 6


def aprovados(turma):
    return [nome for nome in turma if foi_aprovado(turma[nome])]
```

A lógica é a mesma; o que mudou é que agora existe uma função chamada `foi_aprovado`, que **diz o que o teste significa**. Também ficou possível testar `media` sozinha, algo que o bloco aninhado não permitia.

3.2 - Ponto 2: não usar `else` (Don't use the ELSE keyword)

A escada de `if`, `elif` e `else` esconde um problema: para entender o último ramo, o leitor precisa lembrar de **todas as condições anteriores**. Existem três saídas, e o Python ajuda nas três. A primeira é o **fail first** do ponto 1 aplicado à escada de decisões:

```python
# 1) Retorno antecipado (fail first / cláusula de guarda): cada caso resolve e sai.
def conceito(nota):
    if nota >= 9:
        return "A"
    if nota >= 7:
        return "B"
    if nota >= 5:
        return "C"
    return "D"


# 2) Valor padrão antes do if: o if só sobrescreve quando precisa.
def situacao(media):
    resultado = "reprovado"
    if media >= 6:
        resultado = "aprovado"
    return resultado


# 3) Polimorfismo (Aula 09): cada classe sabe o seu desconto.
class Aluno:
    def desconto(self):
        return 0.5


class Visitante:
    def desconto(self):
        return 0.0


def preco_final(preco, cliente):
    return preco * (1 - cliente.desconto())
```

A terceira saída é a mais poderosa: em vez de **perguntar o tipo** (`if tipo == "aluno"`), cada tipo carrega a sua resposta. Quando surge um tipo novo, cria-se uma classe; as funções antigas **não mudam**. É o polimorfismo da Aula 09 resolvendo um problema de manutenção.

4 - Dados: o que guardamos e como

4.1 - Ponto 3: obsessão por tipos primitivos (Primitive Obsession; Wrap all primitives and strings)

Usar `int`, `float` e `str` soltos para representar conceitos do domínio (RA, nota, e-mail, dinheiro) tem nome em inglês: **Primitive Obsession**, em português **obsessão por tipos primitivos**. É um dos *code smells* ("mau cheiro" de código) catalogados por Martin Fowler no livro *Refactoring*. A regra do Object Calisthenics é a cura: **embrulhar todos os primitivos e strings** (*wrap all primitives and strings*) numa classe pequena.

Um `int` aceita qualquer inteiro, e um `float` aceita qualquer decimal. O RA e a nota são ambos números, e o sistema **não sabe a diferença**. A regra manda criar uma classe pequena para cada conceito do domínio:

```python
# ANTES: o primitivo aceita qualquer coisa.
def registrar_antes(ra, nota):
    return "RA " + str(ra) + " tirou " + str(nota)


print(registrar_antes(8.5, 1234))   # RA 8.5 tirou 1234 (trocou e ninguém reclamou)
print(registrar_antes(1234, 15))    # RA 1234 tirou 15 (nota 15 numa prova de 0 a 10)


# DEPOIS: o tipo carrega a regra, e o erro aparece na criação.
class Nota:
    def __init__(self, valor):
        if valor < 0 or valor > 10:
            raise ValueError("nota deve estar entre 0 e 10")
        self._valor = valor

    def aprovada(self):
        return self._valor >= 6

    def __str__(self):
        return str(self._valor)
```

Duas vantagens. A **validação mora num lugar só**: toda `Nota` do sistema já nasceu válida, e nenhuma função precisa conferir de novo. E o **nome do tipo documenta** a intenção. Uma ressalva de honestidade: as dicas de tipo (`ra: Ra`) **não são checadas** pelo Python em tempo de execução; servem ao editor e a ferramentas como o `mypy`. Quem barra o erro é a validação do construtor.

4.2 - Ponto 4: coleção de primeira classe (First-class collections)

Uma lista solta circula pelo programa e **qualquer um pode mexer nela** (o vazamento da lista da Aula 09). A regra manda que uma classe que tem uma coleção **não tenha mais nenhum outro atributo**, e que ofereça só os comportamentos que fazem sentido para aquele conjunto:

```python
class Turma:
    def __init__(self, alunos=()):
        self._alunos = list(alunos)

    def matricular(self, aluno):
        self._alunos.append(aluno)

    def aprovados(self):
        return Turma([aluno for aluno in self._alunos if aluno.aprovado()])

    def quantidade(self):
        return len(self._alunos)
```

Repare em `aprovados()`: ela devolve **outra `Turma`**, não a lista. O conjunto de aprovados também é uma turma e herda todos os comportamentos. É a Aula 10 voltando: a estrutura de dados deixa de ser um tipo nativo exposto e passa a ser **uma classe do domínio** com nome, regras e operações próprias.

5 - Acesso: quem fala com quem

5.1 - Ponto 5: um ponto por linha (Lei de Demeter, Law of Demeter; One dot per line)

A **Lei de Demeter**, nascida no projeto Demeter, na Northeastern University (fim dos anos 1980), diz em português simples: **fale só com os seus amigos**. Dito pelo outro lado, é o **"não fale com estranhos"** que ouvimos na infância: o amigo é quem o objeto conhece de verdade, e o estranho é o objeto que ele só alcançou passando por outro (o "pai do pai do pai"). Um objeto pode chamar a si mesmo, os seus atributos e os seus parâmetros; não deve atravessar um objeto para chegar a outro. Na árvore de arquivos da Aula 08:

```python
# ANTES: quem chama conhece a estrutura inteira da árvore.
print(tf.pai.pai.pai.pai.nome)      # C: (quatro pontos: se a árvore mudar, quebra aqui)


# DEPOIS: o item fala só com o pai direto, e o pai responde pelo resto.
class Item:
    def __init__(self, nome, pai=None):
        self._nome = nome
        self._pai = pai

    def disco(self):
        if self._pai is None:
            return self._nome
        return self._pai.disco()


print(arquivo.disco())              # C: (um ponto)
```

Cada ponto a mais é **uma dependência a mais** da estrutura interna de outro objeto. Se a árvore ganhar um nível, o primeiro código quebra em todos os lugares que o repetiram; o segundo não muda. Uma exceção prática: **encadear métodos que devolvem o mesmo tipo** (`"  Ola  ".strip().lower()`) não é navegar entre objetos, é uma sequência de transformações, e é aceita.

5.2 - Ponto 6: sem getters, setters e properties (No getters/setters/properties; Tell, Don't Ask)

Na Aula 09 o getter e o setter apareceram como "a porta controlada" da classe. O Object Calisthenics dá **um passo além**: mesmo controlada, a porta ainda **entrega o dado** para quem chama decidir o que fazer. O princípio chama-se **diga, não pergunte** (*tell, don't ask*):

```python
# ANTES: o objeto entrega o saldo, e quem chama decide a regra.
conta = ContaAberta(100)
if conta.get_saldo() >= 30:                      # a regra mora fora da conta
    conta.set_saldo(conta.get_saldo() - 30)      # e cada chamador pode esquecê-la
conta.set_saldo(-999)                            # nada impede isto


# DEPOIS: a regra mora na conta, e só existe o comportamento.
class Conta:
    def __init__(self, saldo):
        self._saldo = saldo

    def sacar(self, valor):
        if valor > self._saldo:
            raise ValueError("saldo insuficiente")
        self._saldo -= valor
```

Um `@property` de leitura é só um getter com outra roupa: a regra vale para ele também. O que a regra pede **não é esconder mais**, é **mover o comportamento para onde o dado vive**. Isso fecha o ciclo com o encapsulamento: encapsular é esconder o dado **para que a regra fique com um dono só**. Uma nota de bom senso: um objeto pode, sim, **responder uma pergunta calculada** (`disco()`, `aprovado()`), o que a regra combate é entregar o **estado cru** para o outro decidir.

6 - Tamanho: quanto cada coisa carrega

6.1 - Ponto 7: entidades pequenas (Keep all entities small; No classes with more than two instance variables)

Classe grande é classe que faz muita coisa, e classe que faz muita coisa **muda por muitos motivos**. A regra original de Jeff Bay dá uma ordem de grandeza: **classes de até cerca de 50 linhas**. Junto vem uma regra irmã: **no máximo duas variáveis de instância por classe**. O limite parece arbitrário, e é de propósito: com duas variáveis, a classe é obrigada a ter **um assunto só**.

```python
# ANTES: cinco dados, vários assuntos.
class ClienteGrande:
    def __init__(self, nome, sobrenome, rua, numero, cidade):
        ...


# DEPOIS: cada assunto vira uma classe pequena; o cliente só junta duas.
class Cliente:
    def __init__(self, nome, endereco):
        self._nome = nome              # um Nome (primeiro, sobrenome)
        self._endereco = endereco      # um Endereco (rua, cidade)

    def etiqueta(self):
        return self._nome.completo() + " - " + self._endereco.completo()
```

O resultado são **muitas classes pequenas** em vez de poucas gigantes, e esse é o ponto: navegar numa classe de 20 linhas é mais fácil do que numa de 400, e cada uma pode ser reaproveitada e testada sozinha.

As duas regras que ficaram de fora seguem a mesma lógica: **não abreviar nomes** (`calc_med_tot` obriga o leitor a decifrar; `media_total` já diz) e o limite de **tamanho de pacote** (agrupar poucas classes por pasta). Quem quiser aprofundar encontra as nove no texto original.

7 - Juntando tudo e saber quando não seguir

Cada regra sozinha é pequena; o ganho aparece no **conjunto**. Um programa feito sob as sete restrições tende a ter muitas classes minúsculas, métodos de poucas linhas, nomes que explicam o domínio e **pouquíssimas decisões espalhadas**: a regra de negócio fica dentro do objeto dono, e quem chama só dá ordens. O custo é real: **mais arquivos, mais classes e mais indireção** (o leitor pula de uma classe para outra para ver o que acontece). Por isso a regra é um **exercício**, e não uma meta a cumprir em todo código.

Quando relaxar, com honestidade:

- **Scripts curtos e descartáveis:** um `for` com `if` num script de uma noite não precisa de cinco classes.
- **Dados puros** (a linha de um CSV, a resposta de uma API): uma `dataclass` só com campos é legítima; o objeto não tem comportamento a proteger.
- **Idiomas da linguagem:** em Python, `property`, `dict` e compreensões são o jeito natural de escrever; a regra vale como **pergunta**, não como proibição cega.
- **Desempenho medido:** mais objetos custam memória e tempo. Só quando medido e relevante, e conscientemente.

O treino serve para que, **depois**, o programador relaxe a regra por escolha, e não por ignorância.

8 - Resenha: processo e trabalho em equipe

Esta seção é uma **resenha**: ela olha para as regras de fora e pergunta o que elas dizem sobre **como equipes constroem software**.

8.1 - Código é trabalho coletivo

Software de verdade quase nunca tem um autor só, nem um único momento de escrita. Ele é **mantido** durante anos, por pessoas que entram e saem. Cada regra da aula é, no fundo, um gesto de **cortesia com o próximo leitor**: o nível de indentação a menos, o nome sem abreviação, a validação que mora na `Nota`. Um código que só o autor entende é uma **dependência de pessoa** (se ela sai, o conhecimento sai junto).

8.2 - O acordo de equipe

Regra individual dura até o primeiro prazo apertado. Para valer, a equipe precisa **combinar**: um **padrão de codificação** escrito, com decisões como estas ("não usamos `else`", "toda nota é `Nota`") e o **porquê** de cada uma. O *Extreme Programming* (XP), descrito por Kent Beck em 1999, já trata disso como prática: **padrão de codificação**, **propriedade coletiva do código** (qualquer um pode alterar qualquer parte, e por isso todos seguem o mesmo padrão) e **refatoração contínua** (melhorar o desenho aos poucos, sem esperar um "projeto de limpeza").

8.3 - Revisão de código e pull request

Na Aula 05 o Git e o GitHub trouxeram o **pull request**. Ele é o lugar onde o acordo de equipe vira prática: outra pessoa lê a mudança **antes** de ela entrar na `main`. Uma boa revisão não é "eu faria diferente"; é **"isto fere o nosso acordo, e por quê"**. A diferença muda o clima da equipe: o feedback deixa de ser opinião pessoal e passa a ser **critério compartilhado**. Revisar também é a forma mais barata de **espalhar conhecimento** pela equipe.

8.4 - Automatizar o que dá para automatizar

Gente cansa e esquece; máquina não. Parte das regras pode ser **verificada por ferramenta** num passo de **integração contínua (CI)**: limites de complexidade (o `flake8` tem a opção `--max-complexity` e o `ruff` tem a regra `C901`), formatação, tipos. Assim o humano da revisão gasta a atenção no que a máquina não vê (o nome faz sentido? o conceito está no lugar certo?). Nem tudo é automatizável: "não usar getters" ou "classe com um assunto só" exigem julgamento.

8.5 - Praticar em conjunto: dojo, kata e programação em par

Como o Object Calisthenics é um treino, ele é feito para ser praticado **junto**. No **dojo**, a equipe resolve um problema pequeno (um **kata**) sob as restrições, em **programação em par** (um digita, outro pensa e questiona) ou em grupo. O aprendizado está na conversa: "por que você extraiu isso?", "e se a nota viesse errada?". Isso é transferência de conhecimento que nenhum documento faz.

8.6 - Processo: onde as regras entram no ciclo de desenvolvimento

Um **processo** é o jeito combinado de uma equipe levar uma ideia até o software em produção. Nos modelos em cascata, o desenho vem **inteiro antes** do código, e o custo de mudar cresce com o tempo. Nos métodos ágeis (XP, Scrum, Kanban), o software é entregue em **ciclos curtos**, e o código **precisa continuar fácil de mudar** a cada ciclo. É aí que as regras entram: elas **mantêm o custo da mudança baixo**. Sem testes e sem refatoração contínua, um processo ágil vira só pressa; com elas, vira **ritmo sustentável**. Um alerta honesto: nenhuma regra de código substitui **conversar com quem vai usar o software**; código bonito resolvendo o problema errado continua sendo o problema errado.

8.7 - Dívida técnica: o empréstimo consciente

Entregar rápido às vezes é a decisão certa: o cliente precisa do sistema na sexta, a demonstração é amanhã, o mercado não espera. Nessas horas escolhemos o atalho: copiar e colar, pular o teste, deixar o nome ruim, deixar o `if` aninhado. A metáfora da **dívida técnica**, atribuída a Ward Cunningham (1992), descreve isso como um **empréstimo**: pegamos velocidade agora e **pagamos depois, com juros**. O **principal** é o retrabalho para arrumar de vez. Os **juros** são o custo extra de cada mudança futura naquele trecho (mais difícil de ler, mais risco de quebrar, mais tempo para mexer), e crescem enquanto a dívida existir.

O ponto central: **não tem problema entrar em dívida técnica, desde que a gente saiba que está entrando.** Empresas pegam empréstimo para crescer, e isso é saudável; o que quebra é a dívida que ninguém sabe que existe. Martin Fowler chama as duas de dívida **prudente** e **imprudente**:

- **Dívida consciente (prudente):** decidida de olhos abertos, **registrada** (o quê, por quê, quanto custa e até quando) e com **plano de pagamento**. É um empréstimo.
- **Dívida inconsciente (imprudente):** ninguém anotou, ninguém lembra, e os juros crescem em silêncio até o dia em que a equipe não consegue mais mexer no código sem quebrar algo. É um descuido.

O mesmo atalho vira uma coisa ou outra conforme o que fazemos ao lado dele:

```python
# DÍVIDA TÉCNICA (consciente), sexta 17h:
# preco_professor é cópia de preco_aluno.
# Pagar: unificar em um dicionário de multiplicadores (ticket #42, sprint 3).
def preco_aluno(preco):
    return preco * 0.5


def preco_professor(preco):
    return preco * 0.7


# Pagamento (sprint 3): uma função, um dicionário, nada duplicado.
MULTIPLICADOR = {"aluno": 0.5, "professor": 0.7}


def preco_final(preco, tipo):
    return preco * MULTIPLICADOR[tipo]
```

Hábitos de uma equipe que usa a dívida como ferramenta: **registrar** cada atalho no backlog (comentário e ticket); **combinar** com o time e o cliente que foi uma decisão; **reservar** parte de cada ciclo para pagar; e **pagar antes que os juros pesem**. As ferramentas de pagamento são as desta aula e da anterior: **testes** (para mexer sem medo), **refatoração** e as regras do Object Calisthenics, que funcionam como "pagar à vista": cada regra seguida é uma dívida a menos nascendo.

8.8 - Para pensar (resenha da turma)

- Qual das sete regras mais incomodou ao tentar usar, e o que ela escondia no seu código?
- O que aconteceria em uma equipe de cinco pessoas **sem** acordo de código? E com um acordo que ninguém revisa?
- Que parte do acordo deveria ser automatizada, e qual parte só funciona com conversa?
- Quando seguir as regras ao pé da letra vira **excesso**?
- Qual foi o último atalho que você tomou, e ele estava **registrado** em algum lugar? Quando vai ser pago?

9 - Modularização: o guarda-chuva de todas as regras

9.1 - "Por que eu não posso usar else?"

Em algum momento alguém da turma vai torcer o nariz: "mas o `else` funciona, por que proibir?". É uma boa pergunta, e a resposta honesta não é "porque o Jeff Bay mandou". O `else` não é o vilão; ele costuma ser o **sintoma** de uma unidade de código fazendo coisa demais. Quando uma função precisa de uma escada de decisões, o que falta quase sempre é **modularizar melhor**: separar as decisões em unidades menores (uma função com retorno antecipado, uma classe que sabe a própria resposta). A restrição não proíbe por proibir: ela força a pergunta **"onde está a unidade que eu deixei de separar?"**.

9.2 - Modularizar é separar unidades de execução

**Modularizar** é dividir o programa em **unidades** pequenas, cada uma com uma **responsabilidade** e uma interface clara (o que recebe, o que devolve). Em Python a unidade pode ser uma função, uma classe, um arquivo (que o Python chama de *módulo*) ou um pacote; aqui a palavra vale no sentido amplo.

Uma forma de enxergar a ideia é pela **pilha de execução** (*call stack*): cada chamada de função vira um *frame* empilhado, e sai da pilha quando a função termina. Uma função que faz tudo é **um frame só carregando cinco responsabilidades**. Funções pequenas formam uma pilha curta, em que cada frame tem um nome e uma tarefa. E quando algo quebra, o *stack trace* (o relatório de erro do Python) lista os frames: com unidades pequenas ele **conta uma história** (`relatorio` chamou `foi_aprovado`, que chamou `media`) e aponta o culpado, que tem um nome e uma responsabilidade só.

```python
# ANTES: uma unidade só faz tudo (percorre, soma, calcula a média, decide e imprime).
def relatorio_antes(turma):
    for nome in turma:
        if len(turma[nome]) > 0:
            soma = 0
            for nota in turma[nome]:
                soma += nota
            media = soma / len(turma[nome])
            if media >= 6:
                print(nome, "aprovado")


# DEPOIS: cada função é uma unidade com uma responsabilidade, e a pilha vira uma história:
# relatorio -> foi_aprovado -> media.
def media(notas):
    return sum(notas) / len(notas)


def foi_aprovado(notas):
    return len(notas) > 0 and media(notas) >= 6


def relatorio(turma):
    for nome in turma:
        if foi_aprovado(turma[nome]):
            print(nome, "aprovado")
```

9.3 - As sete regras são uma ideia só

Cada ponto da aula é a mesma pergunta feita de um ângulo diferente:

| Ponto | Como é modularização |
|---|---|
| 1 - Um nível de indentação | Cada nível extraído vira uma unidade (função) com nome |
| 2 - Sem `else` | Cada decisão vira uma unidade: retorno antecipado em funções pequenas, ou classes que sabem a própria resposta |
| 3 - Obsessão por tipos primitivos | A regra do dado (a nota entre 0 e 10) mora numa unidade só, a `Nota` |
| 4 - Coleção de primeira classe | A lista tem um dono, a `Turma` |
| 5 - Lei de Demeter | É a **fronteira** da unidade: ela fala só com o vizinho direto |
| 6 - Diga, não pergunte | O comportamento mora na unidade dona do dado |
| 7 - Entidades pequenas | Cada unidade tem um assunto só |

Quando a pergunta vier ("por que não usar `else`?"), a resposta serve para os sete: **uma unidade melhor separada** é mais fácil de ler, de testar, de mudar e de consertar. É também a ponte para a próxima aula: **arquitetura** é modularizar em escala maior, decidindo as unidades de um sistema inteiro (camadas, módulos, serviços).

10 - Conclusão

O Object Calisthenics não ensina uma técnica nova, ensina uma **pergunta**: "e se eu não pudesse fazer assim?". Os sete pontos da aula respondem com o mesmo movimento: **pegar a decisão que estava espalhada e entregar ao objeto certo**. Os níveis de indentação viram métodos com nome, o `else` vira saída antecipada ou polimorfismo, o primitivo vira tipo, a lista vira classe, a cadeia de pontos vira um pedido, o getter vira ordem, e a classe grande vira várias pequenas. O resultado é código mais barato de **ler, testar e mudar**, e a explicação de fundo é uma só: a **modularização**, cada unidade de execução fazendo uma coisa.

Mas código é só metade da engenharia. A outra metade é a **equipe**: um acordo escrito, uma revisão que aplica o acordo, uma automação que cobre o repetitivo, e um processo que entrega em ciclos curtos. Na próxima aula, a **Arquitetura de Código**, o mesmo raciocínio sobe de escala: das regras de uma classe para as **decisões de estrutura** de um sistema inteiro.

11 - Referências

Jeff Bay — Object Calisthenics, em The ThoughtWorks Anthology (Pragmatic Bookshelf, 2008)
Kent Beck — Extreme Programming Explained: Embrace Change (Addison-Wesley, 1999)
Python Software Foundation — Tutorial de Python: Classes (https://docs.python.org/pt-br/3/tutorial/classes.html)
Python Software Foundation — Tutorial de Python: Estruturas de controle (https://docs.python.org/pt-br/3/tutorial/controlflow.html)
Martin Fowler — Refactoring: Improving the Design of Existing Code (Addison-Wesley, 1999)
Ward Cunningham — The WyCash Portfolio Management System (relato de experiência, OOPSLA, 1992), origem da metáfora da dívida técnica
Material de aulas anteriores: Aula 05 (Git e GitHub), Aula 08 (Paradigma Orientado a Objetos), Aula 09 (Os 3 Pilares da Orientação a Objetos) e Aula 10 (Estrutura de Dados).




Questões do TA:



QUESTÃO 1
Sobre o Object Calisthenics, qual afirmação está correta?

A) É uma lei obrigatória da orientação a objetos, que todo código Python precisa cumprir para rodar.

B) É um recurso do Python que bloqueia o uso de `else` e de getters em tempo de execução.

C) É um conjunto de regras de restrição, apresentado por Jeff Bay, para treinar o desenho orientado a objetos: funciona como exercício, e não como norma universal.

D) É um padrão de projeto (GoF) para criar objetos sem usar construtor.

E) É o nome da técnica que transforma classes em funções para deixar o código mais rápido.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 2
Considere a função abaixo:

```python
def nomes_aprovados(turma):
    resultado = []
    for aluno in turma:
        if aluno.aprovado():
            resultado.append(aluno.descrever())
    return resultado
```

Em relação à regra "um único nível de indentação por método", qual afirmação está correta?

A) A função tem dois níveis (`for` e `if`); extrair o teste para outro método, ou usar uma compreensão de lista, leva a função a um nível.

B) A função tem um nível, porque só existe um `for`.

C) A função tem três níveis, contando o `return`.

D) A função respeita a regra, porque o `return` está fora do `for`.

E) A regra vale só para `if`; o `for` nunca conta como nível.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 3
Observe a função:

```python
def taxa(tipo):
    if tipo == "premium":
        return 0.0
    if tipo == "comum":
        return 0.05
    return 0.1
```

Qual técnica ela usa para dispensar o `else`?

A) Polimorfismo: cada tipo é uma classe com o seu método.

B) Valor padrão atribuído a uma variável antes do `if`.

C) Dicionário que mapeia o tipo para a taxa.

D) Retorno antecipado (cláusula de guarda): cada caso devolve e sai, e o último `return` cobre os demais.

E) Recursão: a função chama a si mesma até sobrar um caso.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 4
Qual é a principal vantagem de embrulhar a nota numa classe `Nota`, em vez de usar um `float` solto?

A) O programa passa a rodar mais rápido, porque objetos são mais leves que números.

B) A regra (entre 0 e 10) fica num único lugar, o tipo documenta a intenção, e um valor inválido é recusado na criação, em vez de viajar pelo sistema.

C) O Python passa a checar os tipos dos argumentos em tempo de execução, apenas por causa das dicas de tipo.

D) Deixa de ser necessário testar qualquer função que receba uma nota.

E) A nota é convertida automaticamente para binário.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 5
Qual descrição corresponde a uma **coleção de primeira classe**?

A) Uma classe `Turma` com os atributos `_alunos` (lista), `_professor` e `_sala`.

B) Uma função que recebe uma lista de alunos e a devolve ordenada.

C) Uma lista global, usada por todas as funções do programa.

D) Uma classe que devolve a própria lista `_alunos` num método `obter_lista()`, para quem quiser alterar.

E) Uma classe `Turma` cujo único atributo é a lista `_alunos`, com comportamentos como `matricular` e `aprovados` (que devolve outra `Turma`), sem expor a lista.

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 6
Considere a linha `print(tf.pai.pai.pai.nome)`. Qual avaliação está correta?

A) Está correta, porque `nome` é um atributo e atributos podem ser acessados livremente.

B) Está correta, desde que a árvore nunca mude.

C) Viola a Lei de Demeter, pois quem chama conhece a estrutura interna da árvore; a solução é pedir ao `tf` um método (como `disco()`) que delegue ao pai.

D) Viola a regra porque `print` não deveria ser usado em classes.

E) Viola a regra apenas porque usa mais de dois pontos; com dois pontos seria correto.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 7
Qual alternativa descreve melhor o princípio "diga, não pergunte" aplicado a uma conta bancária?

A) Em vez de ler o saldo com um getter e decidir fora da conta, chama-se `conta.sacar(30)`, e a conta aplica a regra de saldo insuficiente.

B) Trocar `get_saldo()` por uma `property` chamada `saldo` resolve, porque deixa de ser um getter.

C) Tornar o atributo público (`conta.saldo`) resolve, porque tira a necessidade de métodos.

D) Criar um setter com validação resolve, porque a regra volta para a conta.

E) Pedir o saldo várias vezes seguidas garante que o valor está atualizado.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 8
Uma equipe combinou regras do Object Calisthenics como padrão de código, aplicadas por revisão de pull request e por verificações automáticas no CI. Qual é o principal ganho desse conjunto?

A) Garante que o software nunca terá bugs.

B) Dispensa as reuniões de equipe e a conversa com o cliente.

C) Substitui os testes automatizados.

D) O que é "código bom" passa a ser um acordo verificável: o feedback deixa de ser opinião pessoal, o conhecimento se espalha pela equipe, e a mudança é barrada antes de entrar na `main`.

E) Só traz benefício em equipes com mais de cinquenta pessoas.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 9
Entregar rápido com um atalho pode ser uma decisão legítima de engenharia. O que transforma esse atalho em dívida técnica **consciente**, e não em descuido?

A) Esconder o atalho do restante da equipe para não gerar preocupação.

B) Registrar o atalho (o que é, por que foi feito, quanto custa e até quando) e planejar o pagamento.

C) Nunca pagar a dívida, já que o cliente não percebe a diferença.

D) Repetir o atalho em todo o código, para que fique consistente.

E) Esperar os juros ficarem altos e só então avisar a equipe.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 10
Um aluno pergunta: "por que eu não posso usar `else`?". Qual resposta resume a ideia que une as regras da aula?

A) Porque o `else` é mais lento que o `if` em Python.

B) Porque o `else` foi removido da linguagem Python.

C) Porque a regra é arbitrária e serve só para punir quem a ignora.

D) Porque o `else` não funciona dentro de funções.

E) Porque o `else` costuma ser sintoma de uma unidade fazendo coisa demais: modularizar melhor (extrair funções, retornar cedo, usar polimorfismo) separa as decisões em unidades pequenas, cada uma com uma responsabilidade e uma pilha de execução fácil de ler.

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não
