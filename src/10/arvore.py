# Árvore (tree): hierarquia em que cada nó tem um único pai.
# Rodar no terminal: python3 arvore.py
#
# Raiz: o nó sem pai. Folha: o nó sem filhos. É a árvore de arquivos da Aula 08.


class No:
    def __init__(self, nome, pai=None):
        self.nome = nome
        self.pai = pai                  # aponta para cima
        self.filhos = []                # aponta para baixo
        if pai is None:
            return
        pai.filhos.append(self)

    def adicionar(self, nome):
        # Com o pai na mão, um filho novo custa 1 passo: O(1).
        return No(nome, self)

    def mover_para(self, novo_pai):
        # Trocar o pai muda um único ponteiro: O(1), seja qual for o tamanho
        # do que está dentro da pasta.
        self.pai.filhos.remove(self)
        self.pai = novo_pai
        novo_pai.filhos.append(self)

    def caminho(self):
        # Subir pelos pais: um passo por nível (a profundidade).
        if self.pai is None:
            return self.nome
        return self.pai.caminho() + "/" + self.nome

    def buscar(self, nome):
        # Sem o caminho, precisa visitar nó por nó: O(n).
        # Devolve o nó achado e quantos nós foram visitados.
        visitas = 1
        if self.nome == nome:
            return self, visitas
        for filho in self.filhos:
            achado, extras = filho.buscar(nome)
            visitas = visitas + extras
            if achado is not None:
                return achado, visitas
        return None, visitas

    def imprimir(self, nivel=0):
        print("    " * nivel + self.nome)
        for filho in self.filhos:
            filho.imprimir(nivel + 1)


disco = No("C:")
users = disco.adicionar("Users")
windows = disco.adicionar("Windows")
desktop = users.adicionar("Desktop")
downloads = users.adicionar("Downloads")
sistema = windows.adicionar("Sistema")
disco.imprimir()

# --- Leitura -----------------------------------------------------------------
print(desktop.caminho())                    # C:/Users/Desktop (3 níveis)
achado, visitas = disco.buscar("Downloads")
print(achado.caminho(), visitas)            # C:/Users/Downloads 4

# --- Escrita -----------------------------------------------------------------
desktop.adicionar("Fotos")                  # 1 passo
downloads.mover_para(windows)               # 1 ponteiro troca de pai
print(downloads.caminho())                  # C:/Windows/Downloads
