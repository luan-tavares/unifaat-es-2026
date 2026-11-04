Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☒ 10☐ 11☐ 12☐ 13☐ 14☐ 15☐ 16☐


Título da aula:

Os 3 Pilares da Orientação a Objetos


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Na Aula 08, o Python ganhou classes. O dado que não existia pronto passou a ter molde, e a árvore de arquivos virou uma classe `Item` em que cada objeto guarda o seu pai e os seus filhos. Só que o `Item` da Aula 08 tem um defeito que, na hora, passou despercebido: **qualquer pessoa, de qualquer lugar do programa, pode estragar o objeto**.

```python
pasta.nome = 1                    # o nome virou um número
pasta.filhos = "qualquer coisa"   # a árvore inteira se perdeu
pasta.altura = 1.70               # uma propriedade que nunca foi declarada
```

Nenhuma dessas linhas dá erro. O programa segue em frente com um objeto quebrado, e o erro só aparece lá na frente, longe de quem o causou. Escrever `objeto.propriedade = valor` de fora da classe é feio e é perigoso: a classe perde o controle sobre os próprios dados.

Esta aula resolve isso em cinco passos. Primeiro, os **modificadores de acesso** (público, protegido e privado) e o motivo de o Python precisar de ajuda para tê-los de verdade. Segundo, as ferramentas que fecham a cerca: **getters e setters** (`property`) e o `__slots__`. Terceiro, o sentido prático da palavra **abstrair**. Quarto, os **três pilares** da orientação a objetos (encapsulamento, herança e polimorfismo), todos aplicados na árvore de arquivos, com a abstração aparecendo dentro de cada um. Quinto, a **interface**, que mostra a abstração sozinha e abre a discussão sobre um **quarto pilar**.

Todos os exemplos reaproveitam a estrutura de dados da aula passada. Os arquivos completos estão em `src/09/`: `visibilidade.py`, `encapsulamento.py` e `pilares.py`.

2 - Quem pode ver o quê: modificadores de acesso

2.1 - Os três níveis

Um **modificador de acesso** define quem pode ler ou alterar uma propriedade ou chamar um método. A ideia é dividir o que é **interface** da classe (o que o mundo de fora pode usar) do que é **detalhe interno** (o que só ela precisa saber):

| Nível | Quem acessa | Em Java | Em Python |
|---|---|---|---|
| **Público** | Qualquer um | `public` | `self.nome` |
| **Protegido** | A própria classe e as suas filhas | `protected` | `self._nome` (só convenção) |
| **Privado** | Somente a própria classe | `private` | `self.__nome` (renomeação automática) |

A diferença que importa está na última coluna. **Em Java, o compilador proíbe**: acessar um `private` de fora nem compila. **Em Python, a convenção pede**: o sublinhado é um aviso aos outros programadores de que "isto é interno, não mexa". O Python confia no programador, e a frase que resume essa filosofia é "somos todos adultos aqui".

2.2 - Um ponto fraco do Python para a orientação a objetos

Esse é o ponto do Python que precisa de correção para que a orientação a objetos seja de fato praticada. Uma linguagem que não impede o acesso de fora deixa o **encapsulamento** (que veremos como pilar) na dependência da boa vontade de quem usa a classe. Isso não torna o Python "menos orientado a objetos": em Python, tudo é objeto (números, funções e até as próprias classes), mais do que em Java, que tem tipos primitivos. O correto é dizer que **o Python é orientado a objetos no modelo e permissivo na disciplina**. A pergunta para pensar: ele "não é OO", ou apenas "não me obriga a ser"?

A boa notícia é que a linguagem oferece ferramentas para **apertar a cerca**, e a aula usa todas elas: o sublinhado duplo, a `property` e o `__slots__`.

2.3 - Protegido e privado em Python

O **protegido** é só convenção: um sublinhado na frente (`self._pai`) avisa que aquilo é assunto da classe e das filhas. Nada impede o acesso de fora.

O **privado** tem um mecanismo de verdade, o ***name mangling*** (renomeação de nomes): com dois sublinhados na frente (`self.__filhos`), o Python troca o nome por `_Classe__filhos` por baixo dos panos. Quem escrever `item.__filhos` de fora não encontra nada:

```python
class ItemConvencao:
    def __init__(self, nome):
        self.nome = nome       # público
        self._pai = None       # protegido (convenção)
        self.__filhos = []     # privado (renomeado)


item = ItemConvencao("Users")
item._pai = "lixo"             # a convenção pede para não, mas nada impede
print(item.__filhos)           # AttributeError: não existe com esse nome
print(item._ItemConvencao__filhos)   # [] : o nome renomeado
```

A última linha mostra que o privado do Python **não é um cofre**: quem souber a regra de renomeação ainda chega lá. O objetivo não é blindar, é deixar o caminho certo óbvio e o caminho errado inconveniente.

2.4 - Métodos também têm visibilidade

A mesma regra vale para os **métodos**. Um método com um sublinhado (`_anexar`) é protegido por convenção; com dois (`__validar_nome`) é privado e renomeado. A regra de bolso: o que é **detalhe de implementação** vira privado; o que a classe oferece como serviço fica público; o que só as classes filhas precisam, fica protegido.

```python
class ItemConvencao:
    def _anexar(self, filho):          # protegido: assunto da família
        self.__filhos.append(filho)

    def __conferir(self):              # privado: assunto só desta classe
        return len(self.__filhos) >= 0
```

3 - Fechando a cerca: getters, setters e `__slots__`

3.1 - Getter e setter: a porta controlada

Se a propriedade é privada, o mundo de fora conversa com ela por **métodos de acesso**: o **getter** controla a **leitura** e o **setter** controla a **escrita**, e é no setter que mora a validação. Em Python isso se escreve com `@property` (getter) e `@nome.setter` (setter), e quem usa continua escrevendo `item.nome`, com a sintaxe limpa, enquanto por trás há regras. Dá para montar três comportamentos diferentes:

| Combinação | O que permite | Exemplo no `Item` |
|---|---|---|
| Getter + setter com validação | Ler e escrever, com regra | `nome` (recusa vazio e `/`) |
| Só getter | Só ler (`item.pai = x` dá erro) | `pai` e `eh_pasta` |
| Nem setter, só comportamento | Mudar só por um método | `mover_para(destino)` |

```python
class Item:
    def __init__(self, nome, eh_pasta, pai=None):
        self.__validar_nome(nome)
        self.__nome = nome
        self.__eh_pasta = eh_pasta
        self.__pai = None
        self.__filhos = []

    def __validar_nome(self, nome):
        if nome == "" or "/" in nome:
            raise ValueError("nome inválido: " + repr(nome))

    @property
    def nome(self):                    # getter
        return self.__nome

    @nome.setter
    def nome(self, novo_nome):         # setter com validação
        self.__validar_nome(novo_nome)
        self.__nome = novo_nome

    @property
    def pai(self):                     # só getter: somente leitura
        return self.__pai
```

O encapsulamento mais forte **nem libera setter**. No lugar de `item.pai = destino`, que deixaria a árvore inconsistente (o item novo não entraria na lista de filhos do novo pai), a classe oferece **comportamento**: `item.mover_para(destino)`. É o método que sabe tirar o item da pasta antiga, colocar na nova, recusar mover uma pasta para dentro dela mesma e recusar mover algo para dentro de um arquivo. O princípio: **exponha o que o objeto faz, não o dado cru**.

3.2 - O vazamento da lista

Há uma armadilha clássica: tornar `filhos` privado e devolver a lista no getter **não basta**, porque quem recebe a lista consegue alterá-la (`pasta.filhos.append(...)`) sem passar por nenhuma regra. A solução é devolver uma **cópia imutável**, uma tupla:

```python
    @property
    def filhos(self):
        return tuple(self.__filhos)    # cópia: .append() não existe em tupla
```

A lição vale para qualquer estrutura de dados: **encapsular não é só esconder o nome, é não entregar a referência que permite burlar as regras**.

3.3 - Atributos nascem na atribuição

O Python não declara as propriedades: elas passam a existir **no momento em que alguém atribui** (`self.x = ...`). É por isso que `pasta.altura = 1.70` cria uma propriedade nova sem reclamar. Todos os atributos de um objeto ficam num dicionário interno, o `__dict__`, que aceita qualquer chave nova. Uma confusão comum em quem vem de Java: um `nome = ""` escrito **no corpo da classe**, fora do `__init__`, não é a propriedade do objeto, é um atributo **da classe**, compartilhado por todos.

3.4 - Fechando a porta com `__slots__`

O `__slots__` lista os **únicos atributos permitidos** e elimina o `__dict__`. Com isso, nada novo nasce:

```python
class Item:
    __slots__ = ("__nome", "__eh_pasta", "__pai", "__filhos")
```

Agora `tf.altura = 1.70` levanta `AttributeError`. Os nomes privados podem ser escritos como estão: o Python aplica a renomeação sozinho. Como bônus, o objeto ocupa menos memória. Três pegadinhas:

- Se a classe mãe **não** tem `__slots__`, a filha volta a ter `__dict__`, e a cerca abre de novo;
- `__slots__ = ()` significa "nenhum atributo novo", e é o que a classe filha usa quando não acrescenta nada;
- Para imutabilidade total, o Python 3.10+ oferece `@dataclass(frozen=True, slots=True)`, que bloqueia a reatribuição **e** atributos novos.

3.5 - O Item encapsulado, na prática

Juntando tudo, o `Item` da Aula 08 fica assim por fora (o arquivo `encapsulamento.py` tem o código completo e roda de ponta a ponta). As tentativas de estragar o objeto agora falham, todas com mensagem clara:

```python
tf.nome = "tf-09-final.py"            # passa: o setter valida e aceita
tf.nome = ""                          # ValueError: nome inválido
tf.pai = None                         # AttributeError: property 'pai' ... has no setter
tf.altura = 1.70                      # AttributeError: ... no attribute 'altura'
trabalhos.filhos.append(tf)           # AttributeError: 'tuple' ... no attribute 'append'
usuarios.mover_para(trabalhos)        # ValueError: não dá para mover para dentro dela mesma

tf.mover_para(desktop)                # o caminho certo
```

Um detalhe do `mover_para`: ele mexe em `destino.__filhos`, a lista **privada de outro objeto**. Isso é permitido porque **privado é da classe, não do objeto**: dentro da classe `Item`, qualquer `Item` pode acessar o `__filhos` de outro `Item`. Java funciona do mesmo jeito.

E o contrato continua sendo a única proteção: `tf._Item__nome` ainda lê o valor. O Python não é cofre. Mas agora quem quebra a regra **precisou fazer de propósito**.

4 - Abstrair: o sentido prático da palavra

Antes dos pilares, a palavra que vai atravessar o resto da aula. **Abstrair**, no sentido geral (e não só na programação), é **recortar o essencial e ignorar o detalhe** para poder trabalhar com a coisa. A palavra vem do latim *abstrahere*, "arrastar para fora, separar": separamos o que importa do que não importa **para o objetivo do momento**. Abstrair **não é inventar nada**, é recortar. Três exemplos do dia a dia:

- **O mapa do metrô** ignora as ruas, as curvas e as distâncias reais. Mostra só as estações e as ligações, porque é só isso que quem viaja precisa;
- **Dirigir** usa o volante, os pedais e o câmbio. Quem dirige ignora a combustão, a injeção e o sistema de arrefecimento;
- **O Explorador de Arquivos** mostra pastas e arquivos. Ninguém vê setores de disco, blocos ou ponteiros.

O que sobra depois do recorte é a **interface** (o que eu uso). O que foi ignorado é a **implementação** (como funciona por dentro). Em todos os casos o ganho é o mesmo: **poder usar sem precisar entender tudo**. Guarde essa frase, porque ela reaparece em cada pilar.

5 - Os três pilares da orientação a objetos

5.1 - Encapsulamento

**Encapsulamento** é agrupar os dados e os métodos que trabalham com eles e **controlar o acesso** a ambos. É exatamente o que acabamos de fazer na seção 3: privado, `property`, `__slots__` e métodos de comportamento. A analogia é a cápsula de remédio: o conteúdo está protegido por dentro, e você toma a cápsula inteira, sem lidar com o pó. Outra é o caixa eletrônico: você usa `sacar()` e `depositar()`, sem saber como o dinheiro é contado por dentro e sem poder mexer no saldo diretamente.

Na árvore de arquivos, o contraste é este. **Sem encapsulamento** (o `Item` da Aula 08), quem usa a classe precisa conhecer a estrutura interna e faz o serviço sozinho, sem nenhuma regra:

```python
# Mover tf para outra pasta, no braço: quem chama conhece a lista, o pai
# e a ordem certa das operações. Basta esquecer um passo para a árvore ficar torta.
tf.pai.filhos.remove(tf)
desktop.filhos.append(tf)
tf.pai = desktop
```

**Com encapsulamento**, os dados ficam privados e a classe oferece só o serviço pronto:

```python
class Item:
    __slots__ = ("__nome", "__pai", "__filhos")      # nada de atributo novo

    def __init__(self, nome, pai=None):
        self.__nome = nome                           # privado
        self.__pai = None                            # privado
        self.__filhos = []                           # privado

    @property
    def pai(self):                                   # de fora, só leitura
        return self.__pai

    def mover_para(self, destino):                   # o serviço, com as regras dentro
        if self.__pai is not None:
            self.__pai.__filhos.remove(self)
        destino.__filhos.append(self)
        self.__pai = destino


tf.mover_para(desktop)    # o único caminho: um passo, sem como errar a ordem
tf.pai = desktop          # AttributeError: a cerca está fechada
```

Repare que, no segundo caso, **quem chama sabe menos**: nada sobre listas, nada sobre a ordem das operações. Se amanhã o `Item` trocar a lista por outra estrutura, ninguém de fora precisa ser alterado. Esse é o ganho do encapsulamento: **a classe pode mudar por dentro sem quebrar quem a usa**. A versão completa, com as validações, está na seção 3.5 e em `encapsulamento.py`.

**Onde está a abstração:** o encapsulamento separa a **interface** (`nome`, `mover_para()`, `caminho()`) da **implementação** (`__filhos`, a lista, a validação). O mundo de fora só enxerga o recorte.

5.2 - Herança

**Herança** é reaproveitar e especializar. Uma classe **filha** recebe tudo o que a classe **mãe** tem e acrescenta o que é só dela. A relação é **"é um"**: uma `Pasta` é um `Item`, um `Arquivo` é um `Item`.

No `Item` da Aula 08 havia um booleano, `eh_pasta`, e a classe inteira vivia perguntando "você é pasta?". Com herança, ele se divide: `Item` guarda o que todo mundo tem em comum (nome, pai, caminho, profundidade), `Pasta` acrescenta os filhos e `Arquivo` acrescenta o tamanho.

```python
class Item:
    __slots__ = ("__nome", "__pai")
    # nome, pai, mover_para, caminho, profundidade: o que é comum


class Arquivo(Item):
    __slots__ = ("__bytes",)

    def __init__(self, nome, tamanho_bytes, pai=None):
        self.__bytes = tamanho_bytes
        super().__init__(nome, pai)    # reaproveita o construtor da mãe


class Pasta(Item):
    __slots__ = ("__filhos",)

    def __init__(self, nome, pai=None):
        self.__filhos = []
        super().__init__(nome, pai)
```

Repare que o `__slots__` de cada filha lista **só o que ela acrescenta**. É aqui que o **protegido** ganha sentido: ele é o que a filha enxerga da mãe. No código, `_receber(item)` é o método protegido que o `Item` chama no destino de um `mover_para`: o `Item` recusa por padrão ("sou um arquivo, não contenho nada") e a `Pasta` aceita.

**Aviso:** herança cria **acoplamento forte**, porque mudar a mãe muda todas as filhas. Só use quando a relação "é um" existir de verdade. Quando a relação é "**tem um**", o certo é a **composição**, que a turma já usa: a `Pasta` **tem** filhos, não é filha deles.

**Onde está a abstração:** a herança separa o **geral** (`Item`) do **específico** (`Pasta`, `Arquivo`).

5.3 - Polimorfismo

**Polimorfismo** (muitas formas) é a mesma chamada produzindo comportamentos diferentes, conforme o objeto que responde. Na árvore, todo item sabe dizer o seu `tamanho()`, mas cada tipo calcula de um jeito: o arquivo devolve os seus bytes, a pasta soma o tamanho de tudo que tem dentro.

```python
class Arquivo(Item):
    def tamanho(self):
        return self.__bytes


class Pasta(Item):
    def tamanho(self):
        total = 0
        for filho in self.__filhos:
            total = total + filho.tamanho()   # cada filho responde do seu jeito
        return total
```

Observe o laço da `Pasta`: ele **não pergunta** se o filho é pasta ou arquivo. Chama `filho.tamanho()` e pronto. Não há `if eh_pasta` em lugar nenhum, e se amanhã existir um `Atalho`, a `Pasta` continua funcionando sem mudar uma linha. Isso é **sobrescrita** (*override*): a filha redefine o método da mãe, e o Python escolhe qual executar **em tempo de execução**, olhando o objeto real.

Duas observações sobre o nome. Em Java existe também a **sobrecarga** (*overload*), em que vários métodos com o mesmo nome e parâmetros diferentes convivem e o compilador escolhe. **O Python não tem sobrecarga**: se duas funções têm o mesmo nome, a última substitui a primeira (para variar os argumentos, usa-se valor padrão, como na Aula 08). E o Python faz polimorfismo também sem herança, pelo **duck typing** ("se anda como pato e grasna como pato, é um pato"): qualquer objeto que tenha o método `tamanho()` serve, e essa observação é a ponte para a interface.

**Onde está a abstração:** o polimorfismo separa **o que se pede** (`tamanho()`) de **como é executado** (cada classe do seu jeito).

5.4 - A abstração atravessa os três

Cada pilar, olhado de perto, é a mesma operação de recorte, aplicada em lugares diferentes:

| Pilar | A abstração embutida | No código |
|---|---|---|
| Encapsulamento | Separa a **interface** da **implementação** | `mover_para()` por fora, `__filhos` por dentro |
| Herança | Separa o **geral** do **específico** | `Item` (geral), `Pasta` e `Arquivo` (específicos) |
| Polimorfismo | Separa **o que se pede** de **como é feito** | `tamanho()` pedido, cada classe calcula |

Nos três, o movimento é o mesmo: **ignorar o detalhe para trabalhar com o essencial**. A abstração não é um quarto assunto ao lado dos outros: ela está **misturada dentro** de cada um.

6 - Interface: a abstração sem disfarce

6.1 - A analogia da tomada

Imagine a tomada da parede. Ela tem um formato definido (os furos, a voltagem) e **não sabe** o que vai ser ligado nela: pode ser um abajur, um carregador de celular ou um liquidificador. Do outro lado, o aparelho **não sabe** de onde vem a energia: de uma usina hidrelétrica, de um painel solar ou de um gerador. Os dois se entendem porque seguem o **mesmo contrato**: o formato do plugue.

Uma **interface** é esse contrato. Ela diz **o que** precisa ser oferecido (o formato do plugue) e não diz **como** (o que acontece dentro do aparelho). Em linguagem de programação, no conceito clássico, uma interface é **só uma lista de métodos, sem estado e sem implementação**. Quem "assina" o contrato promete oferecer todos eles.

6.2 - A interface na árvore de arquivos

O `tamanho()` pode virar um contrato à parte, e **qualquer coisa** que saiba medir o próprio tamanho pode assiná-lo, mesmo que não tenha nada a ver com pastas e arquivos. O Python escreve interfaces com a biblioteca `abc` (classes abstratas): uma classe só com métodos marcados como `@abstractmethod`, que o Python se recusa a instanciar.

```python
from abc import ABC, abstractmethod


class Medivel(ABC):            # o "formato do plugue"
    __slots__ = ()

    @abstractmethod
    def tamanho(self):
        pass


class Item(Medivel):           # Pasta e Arquivo continuam herdando de Item
    ...


class Lixeira(Medivel):        # não é da árvore, mas assina o contrato
    def __init__(self):
        self.__descartados = []

    def descartar(self, arquivo):
        self.__descartados.append(arquivo)

    def tamanho(self):
        total = 0
        for arquivo in self.__descartados:
            total = total + arquivo.tamanho()
        return total


def espaco_total(coisas):      # a "tomada": aceita qualquer Medivel
    total = 0
    for coisa in coisas:
        total = total + coisa.tamanho()
    return total
```

A função `espaco_total` é a tomada: ela não sabe se vai receber um arquivo, uma pasta ou uma lixeira, e **não precisa saber**. Só exige que cada um saiba responder `tamanho()`.

```python
print(espaco_total([notas, trabalhos, lixeira]))   # 120 + 5800 + 40 = 5960
Medivel()                                           # TypeError: classe abstrata
```

Em Java, o mesmo contrato se escreve com a palavra `interface`, e quem assina usa `implements`:

```java
interface Medivel { long tamanho(); }
class Arquivo extends Item implements Medivel { ... }
class Lixeira implements Medivel { ... }
```

O Python também tem o `typing.Protocol`, que dispensa a assinatura explícita: vale o duck typing, e quem tiver o método `tamanho()` já cumpre o contrato.

6.3 - A abstração nua

Compare com o que vimos na seção 5. No encapsulamento, a abstração vem **misturada** com esconder dados; na herança, vem misturada com reaproveitar código; no polimorfismo, vem misturada com a escolha do comportamento. Na interface **não há nada disso**: nenhum dado escondido, nenhum código reaproveitado, nenhum comportamento herdado. Sobra **apenas o recorte**: "o que se pede", sem "como se faz". E o polimorfismo da `espaco_total` só existe **por causa** dela.

Nos três pilares, a abstração aparece misturada. **Na interface, ela aparece nua.** É por isso que há quem a trate como o quarto pilar.

6.4 - Três pilares ou quatro?

A literatura aceita as duas contagens, e a aula deixa a pergunta aberta:

- **A abstração é um pilar** (com manifestação própria na interface) **ou o chão** onde os outros três se apoiam?
- **O encapsulamento é um recurso da linguagem ou uma ideia de projeto?** O Python mostra que a ideia existe mesmo sem o recurso, e que dá para ir apertando a cerca com `_`, `__`, `property` e `__slots__`.

Ensinar a abstração isolada ajuda a **nomear** o raciocínio; o caminho desta aula mostra que ele aparece em tudo. A conclusão é de cada aluno.

7 - Conclusão

A aula partiu de um defeito: o `Item` da Aula 08 aceitava `objeto.propriedade = valor` de qualquer lugar. Os **modificadores de acesso** (público, protegido, privado) existem para separar o que a classe oferece do que ela esconde; em Java o compilador impõe, em Python a convenção pede, e esse é o ponto em que o Python deixa a disciplina por conta do programador. As ferramentas para compensar são o sublinhado duplo (renomeação), a `property` (getter, setter com validação ou só leitura), o `__slots__` (nenhum atributo novo) e, acima de tudo, **métodos de comportamento** no lugar de dados crus. E nunca devolver a lista de dentro. Nada disso é um cofre, mas torna o caminho certo óbvio.

**Abstrair** é recortar o essencial e ignorar o detalhe. Os três pilares fazem isso de formas diferentes: o **encapsulamento** separa interface de implementação, a **herança** separa o geral do específico e o **polimorfismo** separa o que se pede de como é feito. A **interface** é a abstração sem disfarce: um contrato puro, como a tomada da parede. Se ela é o quarto pilar ou o chão dos outros três, a conclusão é de quem estudou.

8 - Referências

Python Software Foundation — Tutorial de Python: Variáveis privadas (https://docs.python.org/pt-br/3/tutorial/classes.html#private-variables)
Python Software Foundation — Biblioteca padrão: `property` (https://docs.python.org/pt-br/3/library/functions.html#property)
Python Software Foundation — Modelo de dados: `__slots__` (https://docs.python.org/pt-br/3/reference/datamodel.html#slots)
Python Software Foundation — Biblioteca padrão: `abc`, classes base abstratas (https://docs.python.org/pt-br/3/library/abc.html)
Python Software Foundation — Biblioteca padrão: `typing.Protocol` (https://docs.python.org/pt-br/3/library/typing.html#typing.Protocol)
Python Software Foundation — Biblioteca padrão: `dataclasses` (https://docs.python.org/pt-br/3/library/dataclasses.html)
Material de aulas anteriores: Aula 07 (Introdução ao Python) e Aula 08 (Paradigma Orientado a Objetos).




Questões do TA:



QUESTÃO 1
Considere a classe abaixo e o código que a usa:

```python
class Conta:
    def __init__(self):
        self.__saldo = 100


c = Conta()
print(c.__saldo)
```

O que acontece ao executar o código?

A) Imprime 100, porque em Python tudo é público.

B) Levanta AttributeError, porque o Python renomeou o atributo privado para `_Conta__saldo`, e o nome `__saldo` não existe de fora da classe.

C) Imprime None, porque o atributo privado devolve um valor vazio quando lido de fora.

D) Levanta SyntaxError, porque o compilador do Python proíbe nomes com dois sublinhados.

E) Imprime 0, porque o valor de um atributo privado é zerado fora da classe.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 2
Segundo o texto, qual é a diferença entre o controle de acesso em Java e em Python?

A) Em Java o compilador proíbe o acesso a membros privados; em Python a proteção é uma convenção, e o programador é quem a respeita.

B) Em Python o compilador proíbe o acesso a membros privados; em Java a proteção é só uma convenção.

C) Java não tem modificadores de acesso, e Python tem os três níveis, com palavras reservadas.

D) Nas duas linguagens o acesso privado é impossível de burlar.

E) Nas duas linguagens tudo é público, e a diferença está apenas no nome dos métodos.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 3
Considere a classe abaixo:

```python
class Item:
    __slots__ = ("__nome",)

    def __init__(self, nome):
        self.__nome = nome

    @property
    def nome(self):
        return self.__nome


tf = Item("tf.py")
tf.nome = "novo.py"
tf.cor = "azul"
```

O que acontece com as duas últimas linhas?

A) As duas funcionam: o Python cria o atributo `cor` e troca o nome.

B) Só a primeira falha, porque a segunda cria o atributo `cor` normalmente.

C) Só a segunda falha, porque a `property` permite escrever por padrão.

D) As duas levantam AttributeError: a primeira porque a `property` não tem setter, e a segunda porque o `__slots__` não lista `cor`.

E) As duas levantam SyntaxError, porque atributos privados não podem ser alterados.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 4
Considere as classes `Pasta` e `Arquivo` do texto, e o código abaixo:

```python
docs = Pasta("Docs")
Arquivo("a.txt", 10, docs)
Arquivo("b.txt", 30, docs)

sub = Pasta("Sub", docs)
Arquivo("c.txt", 5, sub)

print(docs.tamanho(), sub.tamanho())
```

O que será impresso?

A) 40 5

B) 45 5

C) 45 45

D) 45 0

E) Um erro, porque a pasta não pode somar objetos de tipos diferentes.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 5
No texto, a função `espaco_total([notas, trabalhos, lixeira])` aceita um arquivo, uma pasta e uma lixeira, que não faz parte da árvore. Por que isso funciona?

A) Porque a `Lixeira` herda de `Item` e, portanto, é uma pasta.

B) Porque o Python converte automaticamente qualquer objeto para um arquivo antes de somar.

C) Porque todos assinam o contrato `Medivel` e, por isso, sabem responder `tamanho()`; a função só depende desse contrato, e não de quem está do outro lado.

D) Porque `espaco_total` verifica com `if` o tipo de cada objeto antes de somar.

E) Porque a interface `Medivel` guarda o tamanho de todos os objetos num dicionário interno.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não
