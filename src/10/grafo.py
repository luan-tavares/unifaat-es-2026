# Grafo: nós ligados por arestas, sem hierarquia (pode ter ciclo).
# Rodar no terminal: python3 grafo.py
#
# Não é nativo: é uma classe que guarda um dicionário de listas de vizinhos.
# A árvore é um grafo sem ciclos e com um único pai por nó.


class Grafo:
    def __init__(self):
        self.__ligacoes = {}

    def adicionar_no(self, no):
        self.__ligacoes.setdefault(no, [])

    def ligar(self, a, b):
        # Um item em cada lista: O(1).
        self.adicionar_no(a)
        self.adicionar_no(b)
        self.__ligacoes[a].append(b)
        self.__ligacoes[b].append(a)

    def vizinhos(self, no):
        # A lista já está pronta no dicionário: O(1).
        return self.__ligacoes[no]

    def ligados(self, a, b):
        # Varre a lista de vizinhos de a: O(grau).
        return b in self.__ligacoes[a]

    def remover(self, a, b):
        # Acha b na lista de a e a na lista de b: O(grau).
        self.__ligacoes[a].remove(b)
        self.__ligacoes[b].remove(a)


amigos = Grafo()
amigos.ligar("Ana", "Bia")
amigos.ligar("Ana", "Caio")
amigos.ligar("Bia", "Caio")      # fecha um ciclo: Ana, Bia, Caio
amigos.ligar("Caio", "Duda")

# --- Leitura -----------------------------------------------------------------
print(amigos.vizinhos("Caio"))           # ['Ana', 'Bia', 'Duda']
print(amigos.ligados("Ana", "Duda"))     # False

# --- Escrita -----------------------------------------------------------------
amigos.ligar("Ana", "Duda")
print(amigos.ligados("Ana", "Duda"))     # True
amigos.remover("Ana", "Caio")
print(amigos.vizinhos("Ana"))            # ['Bia', 'Duda']
