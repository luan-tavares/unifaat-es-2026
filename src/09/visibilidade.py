# Visibilidade: quem pode ver o quê (e por que o Python precisa de ajuda).
# Rodar no terminal: python3 visibilidade.py
#
# Em Java, private/protected/public são palavras da linguagem e o compilador
# proíbe o acesso. Em Python não existe palavra nenhuma: só convenção.


class ItemAberto:
    # O Item da Aula 08: tudo público, qualquer um mexe em tudo.
    def __init__(self, nome, pai=None):
        self.nome = nome
        self.pai = pai
        self.filhos = []


class ItemConvencao:
    def __init__(self, nome):
        self.nome = nome       # público: qualquer um
        self._pai = None       # protegido: convenção ("mexa só se for da família")
        self.__filhos = []     # privado: o Python renomeia (name mangling)

    def quantos_filhos(self):
        return len(self.__filhos)

    def _anexar(self, filho):          # método protegido (convenção)
        self.__filhos.append(filho)

    def __conferir(self):              # método privado (mangling)
        return len(self.__filhos) >= 0


def tentar(rotulo, acao):
    try:
        print(rotulo, "->", acao())
    except Exception as erro:
        print(rotulo, "->", type(erro).__name__ + ":", erro)


pasta = ItemAberto("Desktop")
pasta.nome = 1                      # ninguém reclama
pasta.filhos = "qualquer coisa"     # a árvore inteira se perdeu
pasta.altura = 1.70                 # atributo novo, sem aviso
print(pasta.nome, pasta.filhos, pasta.altura)
print(pasta.__dict__)

item = ItemConvencao("Users")
item._pai = "lixo"                  # a convenção pede para não, mas nada impede
print(item._pai)
tentar("item.__filhos", lambda: item.__filhos)
tentar("item.__conferir()", lambda: item.__conferir())
print([nome for nome in dir(item) if "filhos" in nome or "conferir" in nome])
print(item._ItemConvencao__filhos)  # o nome mangleado: nada é cofre
