Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☒ 9☐ 10☐ 11☐ 12☐ 13☐ 14☐ 15☐ 16☐


Título da aula:

Paradigma Orientado a Objetos


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Na Aula 07, o Python entrou no curso como ferramenta, e os algoritmos viraram código: a conversão de decimal para binário e a ordenação com merge sort e quick sort. Todo esse código usou só o que a linguagem já traz pronto: números, textos, listas, tuplas e dicionários. A pergunta desta aula é: **o que fazer quando o dado que o programa precisa não existe pronto?**

Um sistema de verdade não trabalha só com números e textos. Ele trabalha com alunos, pedidos, arquivos, pastas — dados com vários campos e com comportamento próprio. Para criar esse tipo de dado, é preciso poder **desenhar o molde** dele. Esse molde é a **classe**, e o dado criado a partir dele é o **objeto**. O paradigma que organiza o código em torno de objetos se chama **orientação a objetos** (OOP, de *Object-Oriented Programming*).

Há também uma razão de planejamento. A ordem original do curso previa estruturas de dados antes da orientação a objetos, mas elas dependem dela: uma árvore, por exemplo, é feita de pedaços que apontam uns para os outros, e cada pedaço é um objeto. Por isso, **a orientação a objetos vem primeiro** e as estruturas de dados vêm logo depois, já com a ferramenta pronta.

Esta aula se divide em quatro partes. A primeira é um tópico só sobre **funções**: entrada, saída e o que acontece quando não há retorno. A segunda apresenta o **objeto**, a **classe**, as **propriedades**, os **métodos** e o **self**. A terceira explica o **construtor** (`__init__`) e como um objeto pode guardar outro. A quarta junta tudo numa classe que simula uma **árvore de arquivos**, em que cada item recebe o seu pai no construtor.

Os quatro pilares da orientação a objetos (abstração, encapsulamento, herança e polimorfismo) ficam para as próximas aulas. Aqui o foco é se acostumar com o Python e com a estrutura de uma classe.

2 - Funções: entrada e saída

2.1 - Parâmetros e argumentos

Uma função é um bloco de código com nome. Pense nela como uma máquina com **entrada** e **saída**: os valores entram, o corpo da função trabalha com eles e um resultado sai. Os dois nomes que costumam ser confundidos:

- **Parâmetro:** o nome que a função declara para **receber** um valor. Existe na definição, depois do `def`;
- **Argumento:** o valor de verdade, passado **na hora de chamar** a função.

```python
def calcular_media(primeira_nota, segunda_nota):
    soma = primeira_nota + segunda_nota
    media = soma / 2
    return media


resultado = calcular_media(8, 6)
print(resultado)    # 7.0
```

Aqui `primeira_nota` e `segunda_nota` são os parâmetros; `8` e `6` são os argumentos. Na chamada, o primeiro argumento entra no primeiro parâmetro, o segundo no segundo: **a ordem importa**.

2.2 - Retorno: return não é print

O **return** é a saída da função: ele devolve um valor para quem chamou e encerra a função na hora. Já o `print` só mostra um texto na tela e não devolve nada. É um erro muito comum de iniciante trocar um pelo outro, e a diferença aparece assim:

```python
def media_que_so_mostra(primeira_nota, segunda_nota):
    print((primeira_nota + segunda_nota) / 2)


valor = media_que_so_mostra(8, 6)   # mostra 7.0 na tela
print(valor)                        # None
```

A média foi mostrada, mas `valor` ficou vazio: a função não devolveu nada. Com `return`, o resultado pode ser guardado numa variável, somado, comparado ou passado para outra função. Com `print`, ele só existe na tela.

2.3 - Sem retorno: o void e o procedure

Nem toda função precisa devolver um resultado. Em C, uma função que não devolve nada é declarada como `void`. Uma função que só **faz** alguma coisa (mostrar na tela, gravar num arquivo, enviar uma mensagem) e não produz resultado é chamada de **procedimento** (*procedure*).

Em Python não existe uma palavra `void`: toda função devolve algo, e quando não há `return`, o que volta é **`None`**, o valor que representa "nada". É exatamente o `None` que apareceu no exemplo anterior.

```python
def mostrar_boletim(nome, media):
    print("Aluno:", nome, "| Média:", media)


mostrar_boletim("Ana", 7.0)
```

| Tipo | Tem entrada? | Tem return? | Exemplo |
|---|---|---|---|
| Função com retorno | Normalmente sim | Sim | `calcular_media(8, 6)` devolve `7.0` |
| Procedimento (void) | Pode ter | Não: devolve `None` | `mostrar_boletim("Ana", 7.0)` |
| Sem parâmetros | Não | Pode ter ou não | `mostrar_cabecalho()` |

2.4 - Valor padrão e mais de um retorno

Dois recursos do Python que vão aparecer nas classes. O primeiro é o **valor padrão**: se o argumento não for passado, o parâmetro assume o valor definido na declaração.

```python
def aprovado(media, media_minima=7):
    return media >= media_minima


print(aprovado(8))      # True
print(aprovado(6))      # False
print(aprovado(6, 5))   # True
```

O segundo é devolver **mais de um valor**: na verdade, o Python devolve uma tupla (Aula 07), e dá para desempacotar na chamada:

```python
def menor_e_maior(valores):
    menor = valores[0]
    maior = valores[0]
    for valor in valores:
        if valor < menor:
            menor = valor
        if valor > maior:
            maior = valor
    return menor, maior


minimo, maximo = menor_e_maior([7, 3, 9, 1, 5])
print(minimo, maximo)   # 1 9
```

E a regra do **sem else** continua valendo: cada condição resolve o seu caso com `return` e sai, deixando o caso geral para o final, como na função `situacao` da Aula 07. O código completo está em `src/08/funcoes.py`.

3 - Da struct ao objeto

3.1 - O que é um objeto

Antes de falar em classe, vale entender o que é um **objeto**. Um objeto é a representação, dentro do programa, de **uma coisa do problema** que se quer resolver: um aluno, um pedido, um arquivo, uma pasta. Essa coisa tem duas características:

- ela **tem** dados: o aluno tem nome, RA e notas;
- ela **sabe fazer** coisas com esses dados: o aluno recebe uma nota e calcula a própria média.

O objeto junta as duas coisas, **os dados e o que se faz com eles, num lugar só**. Até agora era diferente: os dados ficavam soltos (um texto numa variável, uma lista noutra) e as funções ficavam soltas, sem ligação clara com eles. Um `int` ou uma `str` não sabem nada sobre alunos. O objeto `ana`, sim: ele guarda `"Ana"`, `1234` e `[8, 9]`, e sabe calcular a média dessas notas.

3.2 - O molde: a classe

Se o objeto é o dado, de onde ele vem? Os tipos básicos (número, texto, booleano) já existem prontos, mas um "aluno" não. Em C, quando o programador precisa de um dado mais rico, ele cria uma **struct**: uma estrutura de dados que ele mesmo desenha, agrupando campos. A **classe** é a mesma ideia, com um acréscimo importante: além dos dados, ela agrupa também as funções que trabalham com eles.

A classe é um **molde**. Ela não é o dado: ela descreve **como o dado vai ser**. Ninguém come a forma do bolo; a forma serve para fazer quantos bolos forem necessários.

3.3 - Do molde ao objeto

O objeto é o dado criado a partir do molde (também chamado de **instância** da classe). Do mesmo molde saem quantos objetos quisermos, e cada um tem os seus próprios dados:

| | O que é | Analogia em C | Exemplo |
|---|---|---|---|
| **Classe** | O molde: define propriedades e métodos | A declaração da `struct` | `Aluno` |
| **Objeto** | O dado criado a partir do molde | A variável do tipo da `struct` | `ana`, `bruno` |

3.4 - Propriedades e métodos

Um objeto agrupa duas coisas:

- **Propriedades** (ou atributos): os **dados** do objeto. Cada propriedade é uma variável que pertence ao objeto e pode ser **de qualquer tipo**: número, texto, booleano, lista, dicionário e até outro objeto. O aluno tem `nome` (texto), `ra` (número) e `notas` (lista);
- **Métodos**: as **funções** que pertencem ao objeto. São as mesmas funções do tópico anterior, com parâmetros, argumentos e retorno, só que declaradas dentro da classe e chamadas a partir de um objeto, como em `ana.calcular_media()`.

Uma forma de lembrar: **propriedade é o que o objeto tem; método é o que o objeto faz**.

3.5 - O self: o objeto apontando para si mesmo

Se vários objetos nascem do mesmo molde, os métodos são escritos uma vez só e servem para todos. Surge um problema: quando o método `calcular_media` roda, **de qual aluno** é a lista de notas que ele deve somar? A resposta é o **`self`**.

O `self` é o primeiro parâmetro de todo método e aponta para **o próprio objeto que chamou o método**. Em `ana.adicionar_nota(8)`, o Python entrega a `ana` ao parâmetro `self` automaticamente; dentro do método, `self.notas` é a lista da Ana, e não a do Bruno. Sem o `self`, o objeto perderia a referência de quem é dono de cada propriedade.

```python
class Aluno:
    def adicionar_nota(self, nota):
        self.notas.append(nota)

    def calcular_media(self):
        soma = 0
        for nota in self.notas:
            soma = soma + nota
        return soma / len(self.notas)

    def situacao(self):
        media = self.calcular_media()
        if media >= 7:
            return "Aprovado"
        if media >= 5:
            return "Recuperação"
        return "Reprovado"
```

Para usar o molde, chamamos o nome da classe com parênteses, o que cria um objeto novo. As propriedades podem ser criadas uma a uma e os métodos são chamados com um ponto:

```python
ana = Aluno()
bruno = Aluno()

ana.nome = "Ana"
ana.ra = 1234
ana.notas = []

bruno.nome = "Bruno"
bruno.ra = 5678
bruno.notas = []

ana.adicionar_nota(8)
ana.adicionar_nota(9)
bruno.adicionar_nota(4)
bruno.adicionar_nota(6)

print(ana.nome, ana.calcular_media(), ana.situacao())        # Ana 8.5 Aprovado
print(bruno.nome, bruno.calcular_media(), bruno.situacao())  # Bruno 5.0 Recuperação
print(ana.notas)     # [8, 9]
print(bruno.notas)   # [4, 6]
print(ana is bruno)  # False
```

O mesmo método `situacao` deu resultados diferentes porque cada chamada usou o `self` de um objeto diferente. Há, porém, um defeito neste jeito de criar objetos: se alguém esquecer de criar `notas`, o `adicionar_nota` quebra com `AttributeError`. O molde deveria **garantir** que todo objeto já nasça completo. É para isso que serve o construtor. O código completo está em `src/08/classes.py`.

4 - O construtor

4.1 - O `__init__`

O **construtor** é um método especial, chamado automaticamente **no instante em que o objeto é criado**. Em Python, ele se chama `__init__` (com dois sublinhados de cada lado). Em outras linguagens o nome muda, como `constructor` em JavaScript ou `__construct` em PHP, mas o papel é o mesmo: dar ao objeto os seus valores iniciais.

Os argumentos passados na criação do objeto chegam como parâmetros do `__init__`:

```python
class Aluno:
    def __init__(self, nome, ra):
        self.nome = nome
        self.ra = ra
        self.notas = []

    def adicionar_nota(self, nota):
        self.notas.append(nota)

    def calcular_media(self):
        soma = 0
        for nota in self.notas:
            soma = soma + nota
        return soma / len(self.notas)


ana = Aluno("Ana", 1234)
ana.adicionar_nota(8)
ana.adicionar_nota(9)
print(ana.nome, ana.calcular_media())   # Ana 8.5
```

Antes eram cinco linhas para montar a Ana; agora é uma, e nenhuma propriedade fica faltando. Repare que `self.notas = []` está **dentro** do construtor: assim, cada objeto recebe a sua própria lista vazia.

4.2 - Um objeto dentro de outro

Como a propriedade pode ser de qualquer tipo, ela pode guardar **outro objeto**. O construtor recebe o objeto já pronto como argumento e o guarda numa propriedade. Isso se chama **injetar** o objeto:

```python
class Professor:
    def __init__(self, nome):
        self.nome = nome


class Turma:
    def __init__(self, nome, professor):
        self.nome = nome
        self.professor = professor
        self.alunos = []

    def matricular(self, aluno):
        self.alunos.append(aluno)


luan = Professor("Luan")
turma = Turma("ADS 2º semestre", luan)
turma.matricular(ana)
print(turma.professor.nome)    # Luan
print(turma.alunos[0].nome)    # Ana
```

A turma não copia o professor: ela guarda uma **referência** ao mesmo objeto `luan`. É essa ideia, um objeto que conhece outro, que vai montar a árvore da última parte. O código completo desta parte está em `src/08/construtor.py`.

5 - Árvore de arquivos

5.1 - O problema

Todo sistema de arquivos é uma **árvore**: uma pasta contém arquivos e outras pastas, que por sua vez contêm outras coisas. Cada item, exceto o primeiro (a **raiz**), tem exatamente **uma pasta pai**. O comando `tree` mostra isso no terminal, e o caminho que o `pwd` imprime (Aula 01) é a lista de pais, da raiz até o item.

```text
var/
    www/
        unifaat/
            src/
                funcoes.py
                classes.py
            README.md
```

Para simular isso em Python, não precisamos de duas classes. Uma pasta e um arquivo são o mesmo tipo de dado: ambos têm nome e pai. A única diferença é uma propriedade booleana, `eh_pasta`.

5.2 - A classe Item

O construtor recebe o `nome`, se é pasta e o **objeto pai**. O pai é opcional (valor padrão `None`), porque a raiz não tem pai. Quando o pai existe, o item novo se cadastra na lista de filhos dele:

```python
class Item:
    def __init__(self, nome, eh_pasta, pai=None):
        if pai is not None and not pai.eh_pasta:
            raise ValueError(pai.nome + " é um arquivo, não pode conter itens")

        self.nome = nome
        self.eh_pasta = eh_pasta
        self.pai = pai
        self.filhos = []

        if pai is not None:
            pai.filhos.append(self)
```

Três detalhes: o `raise ValueError` recusa a criação de um item dentro de um arquivo (só pasta contém itens); `pai.filhos.append(self)` usa o `self` para entregar o próprio objeto novo ao pai; e, como o pai é injetado, ele **precisa existir antes** do filho.

5.3 - Caminho, profundidade e recursão

Os métodos aproveitam que cada item conhece o seu pai. Para montar o caminho, o item pede ao pai o caminho dele, e assim sobe até a raiz. É a **recursão** da Aula 07: a função chama a si mesma num objeto mais próximo do fim, e a raiz (sem pai) é o **caso base**:

```python
    def caminho(self):
        if self.pai is None:
            return "/" + self.nome
        return self.pai.caminho() + "/" + self.nome

    def profundidade(self):
        if self.pai is None:
            return 0
        return self.pai.profundidade() + 1

    def mostrar(self):
        recuo = "    " * self.profundidade()
        sufixo = ""
        if self.eh_pasta:
            sufixo = "/"
        print(recuo + self.nome + sufixo)

        for filho in self.filhos:
            filho.mostrar()
```

O `caminho` e o `profundidade` sobem pelos pais; o `mostrar` desce pelos filhos, recuando 4 espaços por nível. Repare que não há `else`: o `return` antecipado trata a raiz e o resto fica para o final.

5.4 - Montando a árvore

```python
raiz = Item("var", True)
www = Item("www", True, raiz)
unifaat = Item("unifaat", True, www)
src = Item("src", True, unifaat)
leia_me = Item("README.md", False, unifaat)
funcoes = Item("funcoes.py", False, src)
classes = Item("classes.py", False, src)

raiz.mostrar()
print(funcoes.caminho())        # /var/www/unifaat/src/funcoes.py
print(funcoes.profundidade())   # 4
print(len(src.filhos))          # 2
```

Cada linha cria um objeto e injeta o pai no construtor. Quando se pede o caminho de `funcoes`, ele pergunta a `src`, que pergunta a `unifaat`, e assim por diante até `var`. O código completo está em `src/08/arvore_arquivos.py`, e o passo a passo, no raio-x da aula.

Essa estrutura, itens que apontam para outros itens, é o que as **estruturas de dados** vão explorar na sequência: a árvore é só uma delas.

6 - Conclusão

Esta aula começou com uma pergunta: o que fazer quando o dado de que o programa precisa não existe pronto? A resposta foi desenhar o molde. Antes disso, as **funções** foram vistas por inteiro: o parâmetro recebe, o argumento é o valor passado, o `return` devolve, e a função sem retorno, o procedimento (o `void` do C), devolve `None`.

Com isso, o **objeto** apareceu como uma coisa do problema, com dados e comportamento juntos, e a **classe** como o molde dele, do mesmo jeito que a `struct` do C, mas agrupando também os métodos. O objeto agrupa **propriedades** (o que ele tem, de qualquer tipo) e **métodos** (o que ele faz). O **self** garante que vários objetos do mesmo molde não percam a referência de quem é dono de cada dado. O **construtor** (`__init__`) faz o objeto nascer completo, e a propriedade pode guardar outro objeto.

Por fim, a árvore de arquivos reuniu tudo: uma única classe, `Item`, em que o construtor recebe o objeto pai e o encadeamento de pais forma a árvore. A mesma ideia sustenta as estruturas de dados, que serão o tema da próxima aula.

7 - Referências

Python Software Foundation — Tutorial de Python: Classes (https://docs.python.org/pt-br/3/tutorial/classes.html)
Python Software Foundation — Tutorial de Python: Definindo funções (https://docs.python.org/pt-br/3/tutorial/controlflow.html#defining-functions)
Python Software Foundation — Modelo de dados: object.__init__ (https://docs.python.org/pt-br/3/reference/datamodel.html#object.__init__)
Material de aulas anteriores: Aula 01 (SO, CLI e GUI), Aula 03 (Linguagem de Máquina) e Aula 07 (Introdução ao Python).




Questões do TA:



QUESTÃO 1
Considere a função abaixo e a sua chamada:

```python
def saudar(nome):
    return "Olá, " + nome


mensagem = saudar("Ana")
```

Segundo o texto, qual afirmação descreve corretamente os termos envolvidos?

A) "Ana" é o parâmetro e nome é o argumento.

B) nome é o parâmetro, declarado pela função para receber o valor, e "Ana" é o argumento, passado na chamada.

C) nome e "Ana" são ambos parâmetros, apenas escritos em lugares diferentes.

D) mensagem é o argumento, porque guarda o resultado da função.

E) saudar é o parâmetro, porque é o nome que vem depois do def.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 2
Considere o código abaixo:

```python
def dobrar(numero):
    print(numero * 2)


resultado = dobrar(4)
print(resultado)
```

O que será impresso?

A) Apenas 8

B) Apenas None

C) Primeiro 4 e depois 8

D) Primeiro 8 e depois None

E) Um erro, porque toda função precisa ter return

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 3
Segundo o texto, qual é o papel do self nos métodos de uma classe?

A) Apontar para o próprio objeto que chamou o método, de modo que objetos criados do mesmo molde não percam a referência de quem é dono de cada propriedade.

B) Apontar para a classe pai, permitindo reaproveitar o código da herança.

C) Criar uma cópia da classe a cada chamada do método.

D) Declarar que o método não devolve nenhum valor, como o void do C.

E) Garantir que todos os objetos da mesma classe compartilhem os mesmos valores nas propriedades.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 4
Considere o código abaixo:

```python
class Contador:
    def __init__(self):
        self.valor = 0

    def somar(self):
        self.valor = self.valor + 1


a = Contador()
b = Contador()
a.somar()
a.somar()
b.somar()
print(a.valor, b.valor)
```

O que será impresso?

A) 3 3

B) 1 2

C) 2 1

D) 0 0

E) 3 0

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 5
Considere a classe Item da árvore de arquivos, vista no texto, e o código abaixo:

```python
raiz = Item("var", True)
www = Item("www", True, raiz)
arquivo = Item("a.py", False, www)

print(arquivo.caminho())
print(arquivo.profundidade())
```

O que será impresso?

A) /var/www/a.py e depois 3

B) /www/a.py e depois 1

C) a.py e depois 0

D) /var/www e depois 2

E) /var/www/a.py e depois 2

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não
