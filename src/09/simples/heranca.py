# Pilar 2: herança. O que pasta e arquivo têm em comum fica num lugar só: Item.
# Rodar no terminal: python3 heranca.py


class Item:
    def __init__(self, nome):
        self.nome = nome

    def apresentar(self):
        print("Eu sou " + self.nome)


class Arquivo(Item):
    def __init__(self, nome, tamanho):
        super().__init__(nome)      # reaproveita o que o Item já faz
        self.tamanho = tamanho


class Pasta(Item):
    def __init__(self, nome):
        super().__init__(nome)
        self.filhos = []


notas = Arquivo("notas.txt", 120)
trabalhos = Pasta("Trabalhos")

notas.apresentar()          # Eu sou notas.txt  (vem do Item)
trabalhos.apresentar()      # Eu sou Trabalhos  (vem do Item)

print(isinstance(notas, Item))      # True: todo Arquivo É UM Item
