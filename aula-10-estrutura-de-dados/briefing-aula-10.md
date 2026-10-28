Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☐ 10☒ 11☐ 12☐ 13☐ 14☐ 15☐ 16☐


Título da aula:

Estrutura de Dados


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Nas aulas anteriores, o Python ganhou funções, classes e objetos, e a árvore de arquivos mostrou que um objeto pode guardar outros. Faltava dar nome ao que estávamos fazendo o tempo todo: **organizar dados**. Esta aula é sobre isso. Um programa quase nunca trabalha com um valor solto; ele trabalha com **conjuntos** de valores (as notas de uma turma, os arquivos de uma pasta, os pedidos de uma loja), e a forma como esse conjunto é organizado decide o que o programa consegue fazer com ele, e com que facilidade.

O caminho da aula tem seis passos. Primeiro, o que é **dado**, **tipo de dado** e **estrutura**, lembrando que por baixo de tudo existe o binário, e os **tipos primitivos**. Segundo, os **tipos de referência**, com a diferença para os primitivos e as três estruturas que o Python entrega prontas: **lista (array), tupla e dicionário**. Terceiro, o **relacionamento entre objetos**, que é o que permite montar estruturas maiores. Quarto, as estruturas clássicas que **não são nativas** e que construímos com classes: **pilha, fila e árvore**. Quinto, o **grafo**, o caso geral da árvore. Sexto, uma conclusão que junta tudo.

Os arquivos completos estão em `src/10/`, um por assunto e um por estrutura de dados: `binario_e_estrutura.py`, `tipos.py`, `leitura_escrita.py`, `lista.py`, `tupla.py`, `dicionario.py`, `relacionamentos.py`, `pilha.py`, `fila.py`, `arvore.py`, `grafo.py` e `grafo_git.py`.

2 - Dado, tipo e estrutura

2.1 - Dado é valor bruto

**Dado** é o valor bruto, sem contexto: `1234`, `"Ana"`, `8.5`. Sozinho ele não diz nada; `1234` pode ser um RA, um preço ou um ano. Quando o dado ganha contexto, passa a ser **informação**: "o RA da Ana é 1234". A estrutura de dados é justamente a ferramenta que dá esse contexto, agrupando os valores brutos de um jeito que faça sentido.

2.2 - Tipo de dado

Um mesmo valor pode significar coisas diferentes, e é o **tipo de dado** que diz qual. O tipo define duas coisas: **o que o valor é** (um número inteiro, um número com casas decimais, um texto, verdadeiro ou falso) e **o que se pode fazer com ele** (somar números, juntar textos). Somar `2 + 3` dá `5`, mas somar `"2" + "3"` dá `"23"`: os caracteres são os mesmos, e o tipo muda o resultado. O tipo é a lente da Aula 07.

2.3 - Tudo em computação é binário

Por baixo de qualquer dado, de qualquer linguagem e de qualquer tipo, existe só uma coisa: **bits**, ou seja, zeros e uns. O computador não tem "número", "texto" ou "lista"; tem sequências de bits, e o tipo diz como interpretá-las. Já vimos dois casos:

- **Inteiro** (Aula 03): o número é escrito na base 2. O 65 vira `1000001`.
- **String** (Aulas 03 e 07): cada caractere é um número da tabela ASCII/Unicode, e esse número vira binário. O "A" é o 65, que vira `1000001`.

```python
print(bin(65))                      # 0b1000001

for letra in "Ola":
    print(letra, ord(letra), bin(ord(letra)))
# O 79 0b1001111
# l 108 0b1101100
# a 97 0b1100001
```

O número 65 e a letra "A" são **os mesmos bits**. O que muda é o tipo que o programa usa para ler.

2.4 - Tipos primitivos

Os **tipos primitivos** são os tijolos mais simples da linguagem: um valor único, que não se divide em partes. Os de sempre são o **inteiro** (`int`), o **número com casas decimais** (`float`), o **booleano** (`bool`, que por baixo é 1 ou 0) e o **caractere ou texto** (`str`). Quatro características definem o primitivo:

- **Guarda o valor em si.** A variável `idade = 19` carrega o 19, não o endereço dele. Copiar a variável é copiar o valor, e as duas passam a ser independentes.
- **Tamanho pequeno e conhecido.** Cabe em poucos bytes (o inteiro, o decimal e o booleano são os binários da Aula 03).
- **Imutável.** O valor 19 não muda; trocar a idade é pôr **outro** valor na variável.
- **É a base de tudo.** Qualquer estrutura maior é feita de primitivos.

Uma observação de honestidade: em Python **tudo é objeto**, e não existem primitivos "puros" como em Java (`int`, `double`, `boolean`, `char`). O que o Python tem são tipos que **se comportam** como primitivos, porque são imutáveis: `int`, `float`, `bool` e `str`.

2.5 - Estrutura: como os binários se organizam

A memória do computador pode ser imaginada como uma fila enorme de **bytes numerados**, e cada número é um **endereço**. Uma **estrutura de dados** é uma regra de como organizar os valores nessa memória e de como encontrá-los depois. A mais simples é colocar os valores **lado a lado**: sabendo onde o primeiro está e quanto cada um ocupa, o computador calcula o endereço de qualquer posição com uma conta (início + posição × tamanho). É por isso que acessar `notas[2]` é rápido, não importa o tamanho da lista.

```python
dados = bytes([79, 108, 97])        # três bytes, lado a lado
print(dados)                        # b'Ola'
print(dados[0], dados[2])           # 79 97: acesso pela posição
```

Cada estrutura escolhe uma organização diferente, e cada organização é boa para uma coisa e ruim para outra. Escolher a estrutura certa é metade de um bom programa.

2.6 - Leitura x escrita: a regra de toda estrutura

Toda estrutura de dados faz duas coisas: **leitura** (consultar um valor sem mudar nada) e **escrita** (incluir, alterar ou remover). E o que importa é o **custo** de cada uma, medido em **passos**. Usamos a notação **O(...)** para falar desse custo: **O(1)** quer dizer "1 passo, não importa o tamanho dos dados", e **O(n)** quer dizer "os passos crescem junto com a quantidade de dados" (com 1 milhão de itens, até 1 milhão de passos).

O ponto central da aula: **leitura e escrita são antagônicas**. Ganhar em uma costuma significar perder na outra. Organizar os dados para **ler rápido** (em ordem, com índice, com hash) dá trabalho na hora de **escrever**, porque a organização precisa ser mantida. E deixar a escrita fácil (largar tudo solto) obriga a **varrer** os dados na hora de ler. Um exemplo com a mesma lista de 8 números, de duas formas:

| Organização | Escrever (incluir um valor) | Ler (achar o 93) |
|---|---|---|
| **Solta** (sem ordem) | **1 passo**: coloca no fim | **8 passos**: olha um por um |
| **Ordenada** | **9 passos**: abre espaço no lugar certo | **4 passos**: busca binária, olha o meio e descarta metade |

Nenhuma ganha nas duas. Por isso, em cada estrutura a seguir fazemos sempre a mesma pergunta: **o que ela lê rápido, o que ela escreve rápido, e qual é o preço?**

3 - Tipos de referência

3.1 - Primitivo x referência

Um valor pequeno cabe numa "caixinha" só. Um conjunto de valores (as notas de uma turma, os dados de um aluno) não cabe: ele fica guardado em outro lugar da memória, e a variável guarda só **o endereço** desse lugar. Essa é a diferença:

| | **Primitivo** | **Referência** |
|---|---|---|
| **A variável guarda** | O valor em si | O endereço do objeto |
| **Copiar (`b = a`)** | Copia o valor: dois valores independentes | Copia o endereço: dois nomes para o mesmo objeto |
| **Exemplos** | `int`, `float`, `bool`, `str` | `list`, `dict`, `tuple` e qualquer objeto de classe |
| **Tamanho** | Pequeno e fixo | Varia: pode crescer |

```python
# Primitivo: copiar é copiar o valor.
a = 10
b = a
b = b + 1
print(a, b)             # 10 11 -> mexer em b não afeta a

# Referência: copiar é copiar o endereço.
x = [1, 2]
y = x
y.append(3)
print(x, y)             # [1, 2, 3] [1, 2, 3] -> o mesmo objeto, dois nomes
print(x is y)           # True

z = x.copy()            # para ter outro objeto de verdade, é preciso copiar
z.append(4)
print(x, z)             # [1, 2, 3] [1, 2, 3, 4]
```

É a armadilha do `b = a` com listas, avisada na Aula 07, agora com nome: a lista é um **tipo de referência**. A mesma ideia explica o `self` da Aula 08 e o `pai` da árvore de arquivos: tudo isso é guardar endereços. O `is` pergunta "é o mesmo objeto?", e o `==` pergunta "têm o mesmo valor?".

Os tipos de referência são justamente as **estruturas de dados**: agrupam valores (primitivos ou outras referências) num objeto só. O Python traz três prontas.

3.2 - O que é ser nativo

Uma estrutura **nativa** (*built-in*) já vem dentro da linguagem: não precisa de `import`, de biblioteca nem de classe escrita por você. O Python traz três que usamos todos os dias: a **lista**, a **tupla** e o **dicionário**. As outras linguagens fazem escolhas diferentes:

| Linguagem | O que traz pronto |
|---|---|
| **C** | Só o array de tamanho fixo e a `struct`; não há dicionário nem lista que cresce |
| **Java** | `int[]` (array de tamanho fixo) na linguagem; `ArrayList` e `HashMap` vêm da biblioteca (`java.util`); não há tupla |
| **JavaScript** | `Array` e `Object` (e `Map`); não há tupla |
| **PHP** | O `array` faz papel de lista e de dicionário ao mesmo tempo |
| **Python** | `list`, `tuple` e `dict` direto na sintaxe |

A ideia é a mesma em todas; o que muda é o nome e o quanto vem de graça. Aprender a estrutura como conceito permite reconhecê-la em qualquer linguagem.

3.3 - Lista: o array do Python

Uma sequência de valores guardados em ordem e acessados por posição é um **array**, e **vetor** é só outro nome para array. No Python, o equivalente é a **lista** (`list`), escrita entre colchetes: ordenada, indexada a partir do zero e **mutável**. Por baixo, a lista é um array que cresce sozinho (um *array dinâmico*), e por isso aceita valores de tipos diferentes.

```python
notas = [7, 3, 9]

notas.append(5)             # inclui no final
notas.insert(0, 10)         # inclui numa posição
notas.remove(3)             # remove pelo valor
ultima = notas.pop()        # remove e devolve o último
notas.sort()                # ordena a própria lista

print(notas, ultima)        # [7, 9, 10] 5
print(len(notas), 9 in notas, notas[0], notas[-1], notas[0:2])
```

Os comandos principais:

| Comando | O que faz |
|---|---|
| `lista[i]` | Lê ou troca o elemento da posição `i` (`-1` é o último) |
| `lista[a:b]` | Fatia: do `a` até antes do `b` |
| `append(x)` / `insert(i, x)` | Inclui no final / numa posição |
| `remove(x)` / `pop()` | Remove pelo valor / remove e devolve o último |
| `len(lista)` / `x in lista` | Tamanho / pertence ou não |
| `sort()` / `reverse()` | Ordena / inverte a própria lista |

**Leitura x escrita.** A lista **lê** por posição em **O(1)**: sabendo onde ela começa e quanto cada item ocupa, o endereço é uma conta. A **escrita** no fim (`append`) também é **O(1)** em média (de vez em quando a lista cresce e copia tudo, mas na média é 1 passo). O preço aparece ao **escrever no início ou no meio** (`insert(0, x)`): todos os itens à direita precisam ser empurrados uma casa, **O(n)**. Também é **O(n)** ler **por valor** (`x in notas`): sem ordem, só dá para olhar um por um. O código completo está em `src/10/lista.py`.

3.4 - Tupla: valores que não mudam

A **tupla** (`tuple`) é parecida com a lista, mas **imutável**: depois de criada, não dá para trocar, incluir nem remover elementos. Escreve-se entre parênteses e serve para valores que pertencem um ao outro, como um ponto `(x, y)` ou uma data `(dia, mês, ano)`.

```python
ponto = (10, 20)
x, y = ponto                # desempacotamento
print(x, y, ponto.count(10), ponto.index(20))

ponto[0] = 99               # TypeError: 'tuple' object does not support item assignment

novo = (99,) + ponto[1:]    # "alterar" é criar outra tupla
print(ponto, novo)          # (10, 20) (99, 20)
```

**Imutável** significa que o objeto nunca muda depois de criado: qualquer "alteração" produz um objeto novo e deixa o original intacto. Isso traz segurança (ninguém estraga o valor por engano, o mesmo raciocínio do encapsulamento da Aula 09) e uma vantagem técnica: só valores imutáveis podem ser **chave de dicionário**. A string, que já vimos ser imutável, funciona do mesmo jeito. Um detalhe: a tupla trava os **elementos que ela guarda**; se um deles for uma lista, essa lista continua mutável por dentro.

Comandos: `t[i]`, `len(t)`, `x in t`, `count(x)`, `index(x)` e o desempacotamento. Não existe `append` nem `remove`, justamente porque ela não muda.

**Leitura x escrita.** A **leitura** por posição é **O(1)**, igual à lista. Para a **escrita**, a tupla simplesmente **não tem**: `t[0] = 99` dá `TypeError`. "Alterar" é **criar outra tupla**, copiando todos os itens, **O(n)**. O que se ganha com esse preço é a **segurança** (ninguém muda o valor por engano) e o fato de a tupla poder ser **chave de dicionário**. O código completo está em `src/10/tupla.py`.

3.5 - Dicionário: busca por chave

O **dicionário** (`dict`) é o famoso **HashMap**: o nome que o Python dá a uma estrutura que existe em quase toda linguagem. Ele guarda pares de **chave e valor**, entre chaves `{}`. Em vez da posição, busca-se pela **chave**, e a busca é rápida mesmo com milhões de itens, porque por baixo ele usa uma **tabela de espalhamento** (*hash table*): a chave passa por uma função de *hash* que calcula onde o valor está guardado, sem precisar percorrer os itens um a um. As chaves são únicas e precisam ser imutáveis (para o *hash* não mudar); os valores podem ser qualquer coisa, inclusive outro dicionário ou uma lista. Em outras linguagens o mesmo conceito tem outros nomes: `HashMap` no Java, `Map` ou `Object` no JavaScript, *hash* no Ruby, array associativo no PHP.

```python
aluno = {"nome": "Ana", "ra": 1234}

aluno["nota"] = 8.5                     # inclui ou altera
print(aluno["nome"], aluno.get("email", "sem e-mail"))
print("ra" in aluno)                    # True: o in olha as chaves
aluno.pop("ra")                         # remove a chave
aluno.update({"curso": "ADS"})          # mistura outro dicionário

for chave, valor in aluno.items():
    print(chave, "->", valor)
```

| Comando | O que faz |
|---|---|
| `d[chave]` | Lê o valor (`KeyError` se a chave não existe) |
| `d.get(chave, padrão)` | Lê sem dar erro, com valor padrão |
| `d[chave] = valor` | Inclui ou altera |
| `pop(chave)` / `del d[chave]` | Remove a chave |
| `chave in d` | A chave existe? |
| `keys()` / `values()` / `items()` | Chaves / valores / pares, para percorrer com `for` |

**Leitura x escrita.** Aqui a conta é diferente: ler **por chave** é **O(1)** e escrever **por chave** também é **O(1)**, porque o *hash* diz direto em qual slot o valor mora, sem procurar. O preço está em dois lugares. Primeiro, **memória**: a tabela reserva **slots vazios** para espalhar bem as chaves, e quando enche ela precisa crescer e reorganizar tudo. Segundo, a busca **por valor** (`x in d.values()`) é **O(n)**, porque o *hash* só ajuda com a chave. O código completo está em `src/10/dicionario.py`.

3.6 - Qual usar

| Preciso de... | Estrutura |
|---|---|
| Uma sequência que cresce e muda | **Lista** |
| Valores fixos que andam juntos | **Tupla** |
| Achar um valor pelo nome ou código | **Dicionário** |

4 - Relacionamento entre objetos

4.1 - Um objeto que conhece outro

Um **relacionamento** acontece quando um objeto guarda, numa propriedade, **outro objeto**. É o que a Aula 08 chamou de "injetar" o objeto: a `Turma` recebe o `Professor` e o guarda. O Python não copia o professor; guarda um **ponteiro**, uma **referência** para o objeto que já existe. Por isso se diz que um objeto "aponta" para o outro.

```python
class Professor:
    def __init__(self, nome):
        self.nome = nome


class Turma:
    def __init__(self, nome, professor):
        self.nome = nome
        self.professor = professor      # aponta para o objeto, não copia
        self.alunos = []


luan = Professor("Luan")
ads = Turma("ADS 2º semestre", luan)
es = Turma("Engenharia de Software", luan)

print(ads.professor is es.professor)    # True: os dois apontam para o mesmo
luan.nome = "Luan Lourenço"
print(ads.professor.nome)               # Luan Lourenço
```

As duas turmas enxergam a mudança porque existe **um só** professor na memória, e as duas guardam o endereço dele. O `is` pergunta justamente isso: "é o mesmo objeto?".

4.2 - Tipos de relacionamento

Dois relacionamentos aparecem o tempo todo:

- **"É um"**: a **herança** da Aula 09. O `Arquivo` *é um* `Item`.
- **"Tem um"**: a **composição** ou **associação**, desta aula. A `Turma` *tem um* `Professor`; a pasta *tem* filhos.

Quanto aos números, o relacionamento pode ser **um para um** (a turma tem um professor) ou **um para muitos** (a turma tem vários alunos, e a pasta tem vários filhos, guardados numa lista). Já a lista de alunos mostra a primeira ligação entre as duas partes da aula: **uma lista de objetos é uma estrutura de dados**.

4.3 - A árvore de arquivos, de novo

A árvore da Aula 08 é um relacionamento de **mão dupla**: o filho aponta para o pai, e o pai aponta para os filhos. Com isso, dá para subir e descer pela estrutura só seguindo as referências.

```python
class Item:
    def __init__(self, nome, pai=None):
        self.nome = nome
        self.pai = pai                  # aponta para cima
        self.filhos = []                # aponta para baixo
        if pai is None:
            return
        pai.filhos.append(self)


disco = Item("C:")
users = Item("Users", disco)
desktop = Item("Desktop", users)

print(desktop.pai.pai.nome)             # C:
print(disco.filhos[0].filhos[0].nome)   # Desktop
```

Nenhuma estrutura nova foi preciso: a lista (`filhos`) e a referência (`pai`) já bastaram. É assim que se constroem as estruturas da próxima parte.

5 - Estruturas clássicas, não nativas

5.1 - Construídas em cima das nativas

O Python não traz **pilha**, **fila** nem **árvore** prontas na sintaxe, mas elas aparecem em qualquer programa. A receita é a que acabamos de ver: uma **classe** que usa uma estrutura nativa por dentro (uma lista, um `deque`) e só **expõe os comandos que definem a estrutura**. É o encapsulamento da Aula 09 a serviço dos dados: quem usa a `Pilha` não consegue furar a regra, porque a lista fica privada.

5.2 - Pilha (stack): o último a entrar é o primeiro a sair

Pense numa pilha de pratos: coloca-se um por cima do outro, e só se tira o de cima. Esse comportamento chama-se **LIFO** (*last in, first out*). Os dois comandos que definem a pilha são **empilhar** (*push*) e **desempilhar** (*pop*), e só o **topo** é acessível.

```python
class Pilha:
    def __init__(self):
        self.__itens = []

    def empilhar(self, valor):
        self.__itens.append(valor)

    def desempilhar(self):
        if self.vazia():
            raise IndexError("pilha vazia")
        return self.__itens.pop()       # o último a entrar é o primeiro a sair

    def topo(self):
        return self.__itens[-1]

    def vazia(self):
        return len(self.__itens) == 0


historico = Pilha()
historico.empilhar("digitou A")
historico.empilhar("digitou B")
historico.empilhar("apagou B")
print(historico.desempilhar())          # apagou B
print(historico.desempilhar())          # digitou B
```

Exemplos do dia a dia: o **desfazer** (Ctrl+Z) de qualquer editor e o botão **voltar** do navegador. E o exemplo mais importante para quem programa: a **pilha de chamadas** (*call stack*), que o próprio programa usa. Quando uma função chama outra, a nova chamada vai para o topo; a última que entrou é a primeira que termina, e só então a anterior continua. É exatamente a recursão da Aula 08:

```python
def fatorial(n):
    print("entrou  fatorial(", n, ")")
    if n == 1:
        print("saiu    fatorial( 1 ) = 1")
        return 1
    resultado = n * fatorial(n - 1)
    print("saiu    fatorial(", n, ") =", resultado)
    return resultado


fatorial(3)
# entrou  fatorial( 3 )
# entrou  fatorial( 2 )
# entrou  fatorial( 1 )
# saiu    fatorial( 1 ) = 1
# saiu    fatorial( 2 ) = 2
# saiu    fatorial( 3 ) = 6
```

A ordem em que as funções **entram** é 3, 2, 1, e a ordem em que **saem** é 1, 2, 3: o inverso, como numa pilha. Essa pilha tem tamanho limitado, e uma recursão sem condição de parada a enche até o Python reclamar com um `RecursionError`. O nome do famoso site *Stack Overflow* vem desse erro: *estouro de pilha*.

**Leitura x escrita.** Empilhar e desempilhar são **O(1)**, e ler o topo também: tudo acontece numa ponta só. O preço é o **acesso ao meio ou ao fundo**: para ler o item do fundo é preciso desempilhar todos os de cima, **O(n)**. A pilha **ganha simplicidade** e **perde acesso livre**. O código completo está em `src/10/pilha.py`.

5.3 - Fila (queue): o primeiro a entrar é o primeiro a sair

A fila é a do banco ou do caixa: quem chegou primeiro é atendido primeiro. Chama-se **FIFO** (*first in, first out*). Os comandos são **enfileirar** (*enqueue*), no final, e **desenfileirar** (*dequeue*), no começo. Aqui o encapsulamento esconde uma decisão técnica: tirar o primeiro item de uma `list` com `pop(0)` obriga o Python a deslocar todos os outros, então a fila usa o `deque`, da biblioteca `collections`, feito para mexer nas duas pontas.

```python
from collections import deque


class Fila:
    def __init__(self):
        self.__itens = deque()

    def enfileirar(self, valor):
        self.__itens.append(valor)

    def desenfileirar(self):
        if self.vazia():
            raise IndexError("fila vazia")
        return self.__itens.popleft()   # o primeiro a entrar é o primeiro a sair

    def vazia(self):
        return len(self.__itens) == 0


impressora = Fila()
impressora.enfileirar("relatorio.pdf")
impressora.enfileirar("foto.png")
impressora.enfileirar("slide.pdf")
print(impressora.desenfileirar())       # relatorio.pdf
print(impressora.desenfileirar())       # foto.png
```

Exemplos: a **fila de impressão**, a **fila de requisições** de um servidor web (cada pedido espera a sua vez) e as **filas de mensagens** que ligam sistemas diferentes.

**Leitura x escrita.** Enfileirar (no fim) e desenfileirar (na frente) são **O(1)** com o `deque`. Já ler o **meio** (`fila[2]`) é **O(n)**, porque não há posição direta e o `deque` caminha desde uma ponta. E o contraste com a lista comum é o exemplo perfeito de antagonismo: `lista.pop(0)` é **O(n)**, porque todos os itens precisam ser puxados uma casa para fechar o buraco, enquanto o `popleft()` do `deque` só move o marcador da frente. O código completo está em `src/10/fila.py`.

5.4 - Árvore (tree)

A **árvore** já é velha conhecida: é o sistema de arquivos da Aula 08. Cada elemento é um **nó**; o primeiro é a **raiz**; cada nó pode ter **filhos**, e o nó sem filhos é uma **folha**. Todo nó, exceto a raiz, tem **um único pai**. Diferente da lista, a árvore **não é uma sequência**: é uma hierarquia, e por isso é percorrida com **recursão**, cada nó pedindo o mesmo aos seus filhos.

```python
class No:
    def __init__(self, valor):
        self.valor = valor
        self.filhos = []

    def adicionar(self, filho):
        self.filhos.append(filho)
        return filho

    def imprimir(self, nivel=0):
        print("    " * nivel + str(self.valor))
        for filho in self.filhos:
            filho.imprimir(nivel + 1)


raiz = No("C:")
users = raiz.adicionar(No("Users"))
users.adicionar(No("Desktop"))
users.adicionar(No("Downloads"))
raiz.adicionar(No("Windows"))
raiz.imprimir()
# C:
#     Users
#         Desktop
#         Downloads
#     Windows
```

Exemplos: o **sistema de arquivos**, o **HTML** de uma página (a tag `html` é a raiz, e `head` e `body` são seus filhos) e o **organograma** de uma empresa.

**Leitura x escrita.** Com o pai na mão, **adicionar um filho** é **O(1)**. **Mover uma pasta** inteira (`mover_para`) também: só um ponteiro muda, o `pai`, **não importa quantos arquivos** haja dentro. **Ler por caminho** custa um passo por nível (a **profundidade**). O preço aparece na **busca por nome sem o caminho**: é preciso visitar pasta por pasta, **O(n)**. A árvore **ganha hierarquia e escrita local barata** e **perde a busca global**. O código completo está em `src/10/arvore.py`.

5.5 - Comparando

| Estrutura | Regra | Comandos | Exemplo |
|---|---|---|---|
| **Pilha** | Último a entrar, primeiro a sair | empilhar, desempilhar | Desfazer, chamadas de função |
| **Fila** | Primeiro a entrar, primeiro a sair | enfileirar, desenfileirar | Impressão, requisições |
| **Árvore** | Hierarquia: um pai, vários filhos | adicionar, percorrer | Arquivos, HTML |

6 - Grafo: o básico

6.1 - Nós e ligações

A árvore tem regras rígidas: um pai por nó, sempre descendo. Quando essas regras caem, sobra o **grafo**: um conjunto de **nós** (também chamados de vértices) e de **arestas**, que são as ligações entre eles. Qualquer nó pode se ligar a qualquer outro, e é permitido fechar um **ciclo**, voltando ao ponto de partida. Em termos de estrutura, **a árvore é um grafo com regras a mais**: sem ciclos e com um único pai por nó.

Exemplos: uma **rede social** (cada pessoa é um nó, cada amizade é uma aresta), um **mapa** (cidades e estradas), a **internet** (computadores e cabos) e o **Git**, que veremos a seguir.

6.2 - Um grafo em poucas linhas

A forma mais simples de guardar um grafo usa as estruturas nativas: um **dicionário** em que a chave é o nó e o valor é a **lista dos seus vizinhos**.

```python
class Grafo:
    def __init__(self):
        self.__ligacoes = {}

    def adicionar_no(self, no):
        self.__ligacoes.setdefault(no, [])

    def ligar(self, a, b):
        self.adicionar_no(a)
        self.adicionar_no(b)
        self.__ligacoes[a].append(b)
        self.__ligacoes[b].append(a)

    def vizinhos(self, no):
        return self.__ligacoes[no]

    def ligados(self, a, b):
        return b in self.__ligacoes[a]


amigos = Grafo()
amigos.ligar("Ana", "Bia")
amigos.ligar("Ana", "Caio")
amigos.ligar("Bia", "Caio")      # fecha um ciclo: Ana, Bia, Caio
amigos.ligar("Caio", "Duda")

print(amigos.vizinhos("Caio"))           # ['Ana', 'Bia', 'Duda']
print(amigos.ligados("Ana", "Duda"))     # False
```

O ciclo Ana, Bia e Caio é o que impede esse grafo de ser uma árvore.

**Leitura x escrita.** Com `ligar(a, b)`, **escrever** é **O(1)**: um item em cada uma das duas listas de vizinhos. **Listar os vizinhos** de um nó também é **O(1)**, porque a lista já está pronta no dicionário. O preço está em **perguntar se dois nós estão ligados** (`ligados(a, b)`) e em **remover** uma ligação: ambos varrem a lista de vizinhos, **O(grau)**, onde o grau é o número de vizinhos do nó. O código completo está em `src/10/grafo.py`.

6.3 - O Git é um grafo

O exemplo mais próximo de quem programa é o **Git**, que usamos desde as Aulas 04 e 05. O histórico de um repositório é um grafo: cada **commit é um nó**, e a **aresta é o ponteiro para o commit pai**. Um commit novo é só um nó com uma aresta para o commit em que você estava. Uma **branch** não guarda commits: é apenas **um ponteiro para um commit**, e criar uma branch é criar um ponteiro (por isso é instantâneo). E o **merge** é um commit com **dois pais**, um de cada linha de trabalho que se juntou. É esse segundo pai que faz do histórico um grafo, e não uma lista.

As setas só apontam para trás (do commit para o pai) e nunca voltam a um commit anterior, então não existe ciclo. Esse tipo de grafo tem nome: **grafo dirigido acíclico**, o **DAG** (*directed acyclic graph*). É o que o `git log --graph` desenha no terminal.

```python
pais = {}           # commit -> lista dos seus pais (as arestas)
branches = {}       # branch -> commit para onde ela aponta


def commitar(nome, lista_de_pais):
    pais[nome] = list(lista_de_pais)     # um nó novo e uma aresta por pai: O(1)


commitar("A", [])
commitar("B", ["A"])
branches["main"] = "B"

commitar("C", [branches["main"]])        # git commit na main
branches["main"] = "C"

branches["feature"] = "B"                # git switch -c feature: só um ponteiro
commitar("D", [branches["feature"]])     # git commit na feature
branches["feature"] = "D"

commitar("E", [branches["main"], branches["feature"]])   # git merge feature
branches["main"] = "E"


def historico(commit):
    visitados = []
    fila = [commit]
    while len(fila) > 0:
        atual = fila.pop(0)
        if atual in visitados:
            continue
        visitados.append(atual)
        fila.extend(pais[atual])
    return visitados


print(pais)                       # {'A': [], 'B': ['A'], 'C': ['B'], 'D': ['B'], 'E': ['C', 'D']}
print(historico("E"))             # ['E', 'C', 'D', 'B', 'A']
print([c for c in pais if len(pais[c]) > 1])   # ['E']: o commit com dois pais
```

**Leitura x escrita no Git.** **Escrever** (`git commit`) é barato: um nó e uma aresta, **O(1)**. **Ler** o histórico (`git log`) é seguir os pais, um commit por passo, **O(n)**. E há um ganho extra do modelo: o commit **nunca é alterado** depois de criado, porque o identificador dele depende do conteúdo e dos pais. O código completo está em `src/10/grafo_git.py`.

7 - Conclusão

Todo dado é binário, o **tipo** diz como lê-lo, e a **estrutura** é a regra de como os valores se organizam e se acessam. Os tipos **primitivos** guardam o valor em si; os tipos de **referência** guardam o endereço de um objeto, e é por isso que `b = a` com uma lista não copia nada. O Python entrega três referências prontas: a **lista** (o array, ou vetor), a **tupla** (imutável) e o **dicionário** (busca por chave). Com classes e **relacionamentos** (um objeto apontando para outro), construímos as que não são nativas: a **pilha** (LIFO, a mesma regra da pilha de chamadas das funções), a **fila** (FIFO) e a **árvore**. Soltando as regras da árvore (um pai, sem ciclos), chega-se ao **grafo**, que o dicionário e a lista já bastam para guardar, e que está no **Git**: cada commit é um nó, e o merge é um nó com dois pais. A pergunta que guia a escolha é sempre a mesma: **como vou precisar acessar esses dados?**

Resumo da leitura x escrita de cada estrutura:

| Estrutura | Lê rápido | Escreve rápido | O preço |
|---|---|---|---|
| **Lista** | Por posição | No fim | Início e meio empurram todos os itens |
| **Tupla** | Por posição | Não escreve | "Alterar" é copiar tudo |
| **Dicionário** | Por chave | Por chave | Memória extra; buscar pelo valor varre tudo |
| **Pilha** | O topo | O topo | Fundo e meio custam n passos |
| **Fila** | A frente | O fim | O meio custa n passos |
| **Árvore** | Por caminho | Adicionar filho, mover galho | Buscar por nome varre tudo |
| **Grafo** | Os vizinhos | Ligar | "A liga B?" e remover varrem a lista |

Não existe estrutura que ganhe em tudo: a pergunta é sempre **o que vou mais ler, o que vou mais escrever, e o que estou disposto a pagar**.

8 - Referências

Python Software Foundation — Tutorial de Python: Estruturas de dados (https://docs.python.org/pt-br/3/tutorial/datastructures.html)
Python Software Foundation — Biblioteca padrão: Tipos embutidos, sequências e mapeamentos (https://docs.python.org/pt-br/3/library/stdtypes.html)
Python Software Foundation — Biblioteca padrão: `collections.deque` (https://docs.python.org/pt-br/3/library/collections.html#collections.deque)
Python Software Foundation — Modelo de dados: objetos, valores e tipos (https://docs.python.org/pt-br/3/reference/datamodel.html)
Material de aulas anteriores: Aula 03 (Linguagem de Máquina), Aula 07 (Introdução ao Python), Aula 08 (Paradigma Orientado a Objetos) e Aula 09 (Os 3 Pilares da Orientação a Objetos).




Questões do TA:



QUESTÃO 1
Segundo o texto, qual é a relação entre dado, binário e estrutura de dados?

A) O dado é sempre um texto, e a estrutura converte esse texto em números decimais.

B) A estrutura de dados só existe em linguagens que têm tipos primitivos, como o Java.

C) O dado é um valor bruto, que no computador é sempre uma sequência de bits; a estrutura é a regra de como esses valores são organizados e acessados.

D) O número 65 e a letra "A" são bits diferentes, e por isso o Python precisa de duas estruturas para guardá-los.

E) A estrutura de dados é a conversão do dado de binário para decimal.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 2
Considere o código abaixo:

```python
ponto = (10, 20)
ponto[0] = 99
print(ponto)
```

O que acontece ao executá-lo?

A) Imprime `(99, 20)`, porque a tupla aceita troca de elementos.

B) Imprime `(10, 20)`, porque o Python ignora a atribuição.

C) Imprime `(10, 20, 99)`, porque a tupla inclui o novo valor no final.

D) Levanta `TypeError`, porque a tupla é imutável e não aceita atribuição a um elemento.

E) Levanta `KeyError`, porque a posição 0 não é uma chave válida.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 3
Considere o código abaixo:

```python
aluno = {"nome": "Ana", "nota": 8}
print("Ana" in aluno, aluno.get("ra", 0), len(aluno))
```

O que será impresso?

A) `True 0 2`

B) `False 0 2`

C) `False None 2`

D) `True 0 1`

E) Um erro, porque a chave `"ra"` não existe.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 4
Considere o código abaixo:

```python
from collections import deque

pilha = []
fila = deque()

for letra in "ABC":
    pilha.append(letra)
    fila.append(letra)

print(pilha.pop(), fila.popleft())
```

O que será impresso?

A) `A A`

B) `A C`

C) `C C`

D) `B B`

E) `C A`

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 5
Considere as classes abaixo e o código que as usa:

```python
class Professor:
    def __init__(self, nome):
        self.nome = nome


class Turma:
    def __init__(self, professor):
        self.professor = professor


luan = Professor("Luan")
a = Turma(luan)
b = Turma(luan)

luan.nome = "Outro"
print(a.professor.nome, a.professor is b.professor)
```

O que será impresso, e por quê?

A) `Outro True`, porque as duas turmas guardam a referência para o mesmo objeto, e não uma cópia.

B) `Luan True`, porque a turma guarda uma cópia do nome no momento da criação.

C) `Outro False`, porque cada turma cria o seu próprio professor.

D) `Luan False`, porque o `is` compara os nomes e eles são diferentes.

E) Um erro, porque um objeto não pode guardar outro objeto numa propriedade.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 6
Considere o código abaixo:

```python
a = [1, 2]
b = a
b.append(3)

x = 10
y = x
y = y + 1

print(a, x)
```

O que será impresso, e por quê?

A) `[1, 2] 10`, porque `b = a` copia a lista.

B) `[1, 2, 3] 10`, porque a lista é um tipo de referência (`b` e `a` apontam para o mesmo objeto), enquanto o inteiro é copiado por valor.

C) `[1, 2, 3] 11`, porque os dois tipos compartilham o mesmo endereço.

D) `[1, 2] 11`, porque só o inteiro é compartilhado entre as variáveis.

E) Um erro, porque não se pode copiar uma lista com `=`.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 7
Qual característica transforma uma árvore em um grafo mais geral?

A) O grafo exige que cada nó tenha exatamente um pai.

B) O grafo permite que qualquer nó se ligue a qualquer outro e que existam ciclos; a árvore é um grafo sem ciclos e com um único pai por nó.

C) O grafo só pode ser guardado em uma tupla.

D) O grafo não tem nós, apenas ligações.

E) O grafo é uma pilha em que o último nó a entrar é o primeiro a sair.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não


QUESTÃO 8
Considere o código abaixo e as afirmações sobre o custo de cada linha:

```python
notas = [7, 3, 9, 5, 8]
notas.append(6)
notas.insert(0, 1)
```

Qual afirmação descreve corretamente a diferença entre as duas escritas?

A) As duas custam o mesmo: um passo cada, porque a lista é um array.

B) O `insert(0, 1)` é mais rápido, porque a posição 0 é a primeira e não há nada antes dela.

C) O `append(6)` custa um passo, porque cabe no próximo espaço livre; o `insert(0, 1)` custa n passos, porque todos os itens precisam ser empurrados uma casa para a direita.

D) O `append(6)` custa n passos, porque a lista precisa ser reordenada; o `insert(0, 1)` custa um passo.

E) Nenhuma das duas é uma escrita, porque a lista é imutável.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não
