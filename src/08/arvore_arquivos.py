# Árvore de arquivos: cada item conhece o seu pai.
# Rodar no terminal: python3 arvore_arquivos.py
#
# Uma pasta contém arquivos e outras pastas; cada item (menos a raiz) tem
# exatamente uma pasta pai. Esse encadeamento forma uma árvore, a mesma
# estrutura que o Explorador de Arquivos do Windows mostra na tela.


class Item:
    # pai é um OBJETO Item (a pasta onde este item está) ou None (a raiz).
    def __init__(self, nome, eh_pasta, pai=None):
        # Só pasta pode conter itens: recusa já na criação.
        if pai is not None and not pai.eh_pasta:
            raise ValueError(pai.nome + " é um arquivo, não pode conter itens")

        self.nome = nome
        self.eh_pasta = eh_pasta
        self.pai = pai
        self.filhos = []    # um item só tem filhos se for pasta

        # O item novo se cadastra na lista de filhos do pai.
        if pai is not None:
            pai.filhos.append(self)

    # Sobe de pai em pai até a raiz, montando o caminho, como na barra de
    # endereço do Explorador (usamos / como separador, o Windows aceita).
    def caminho(self):
        if self.pai is None:
            return self.nome
        return self.pai.caminho() + "/" + self.nome

    # Quantos pais existem acima deste item. A raiz tem profundidade 0.
    def profundidade(self):
        if self.pai is None:
            return 0
        return self.pai.profundidade() + 1

    # Mostra o item e, recursivamente, todos os filhos, recuando 4 espaços
    # por nível de profundidade.
    def mostrar(self):
        recuo = "    " * self.profundidade()
        sufixo = ""
        if self.eh_pasta:
            sufixo = "/"
        print(recuo + self.nome + sufixo)

        for filho in self.filhos:
            filho.mostrar()


# --- Montando a árvore -------------------------------------------------------
# Primeiro o pai, depois os filhos: o pai precisa existir para ser injetado.
disco = Item("C:", True)
usuarios = Item("Users", True, disco)
desktop = Item("Desktop", True, usuarios)
trabalhos = Item("Trabalhos", True, desktop)
notas = Item("notas.txt", False, desktop)
tf = Item("tf-08.py", False, trabalhos)
slide = Item("slide.pdf", False, trabalhos)

disco.mostrar()
# C:/
#     Users/
#         Desktop/
#             Trabalhos/
#                 tf-08.py
#                 slide.pdf
#             notas.txt

print(tf.caminho())             # C:/Users/Desktop/Trabalhos/tf-08.py
print(tf.profundidade())        # 4
print(len(trabalhos.filhos))    # 2

# Arquivo não aceita filhos: o construtor recusa com ValueError.
try:
    Item("intruso", False, tf)
except ValueError as erro:
    print(erro)     # tf-08.py é um arquivo, não pode conter itens
