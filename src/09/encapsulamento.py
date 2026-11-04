# Encapsulamento: o Item da Aula 08, agora com a cerca fechada.
# Rodar no terminal: python3 encapsulamento.py
#
# Privado (__), property para ler, setter só onde faz sentido, __slots__ para
# não nascer atributo novo e um MÉTODO (mover_para) no lugar de "pai = ...".


class Item:
    # __slots__ lista os únicos atributos permitidos (e elimina o __dict__).
    __slots__ = ("__nome", "__eh_pasta", "__pai", "__filhos")

    def __init__(self, nome, eh_pasta, pai=None):
        self.__validar_nome(nome)
        self.__nome = nome
        self.__eh_pasta = eh_pasta
        self.__pai = None
        self.__filhos = []

        if pai is not None:
            self.mover_para(pai)

    # Método privado: detalhe interno, ninguém de fora precisa chamar.
    def __validar_nome(self, nome):
        if nome == "" or "/" in nome:
            raise ValueError("nome inválido: " + repr(nome))

    # Leitura e escrita com validação.
    @property
    def nome(self):
        return self.__nome

    @nome.setter
    def nome(self, novo_nome):
        self.__validar_nome(novo_nome)
        self.__nome = novo_nome

    # Só leitura: getter sem setter.
    @property
    def eh_pasta(self):
        return self.__eh_pasta

    @property
    def pai(self):
        return self.__pai

    # Devolve uma CÓPIA imutável: pasta.filhos.append(...) não funciona.
    @property
    def filhos(self):
        return tuple(self.__filhos)

    # Comportamento em vez de dado cru: no lugar de "item.pai = destino".
    def mover_para(self, destino):
        if not destino.eh_pasta:
            raise ValueError(destino.nome + " é um arquivo, não pode conter itens")

        ancestral = destino
        while ancestral is not None:
            if ancestral is self:
                raise ValueError("não dá para mover " + self.nome + " para dentro dela mesma")
            ancestral = ancestral.pai

        if self.__pai is not None:
            self.__pai.__filhos.remove(self)

        # privado é da CLASSE, não do objeto: aqui mexemos no __filhos de outro Item
        destino.__filhos.append(self)
        self.__pai = destino

    def caminho(self):
        if self.__pai is None:
            return self.__nome
        return self.__pai.caminho() + "/" + self.__nome

    def profundidade(self):
        if self.__pai is None:
            return 0
        return self.__pai.profundidade() + 1


def tentar(rotulo, acao):
    try:
        acao()
        print(rotulo, "-> passou (!)")
    except Exception as erro:
        print(rotulo, "->", type(erro).__name__ + ":", erro)


disco = Item("C:", True)
usuarios = Item("Users", True, disco)
desktop = Item("Desktop", True, usuarios)
trabalhos = Item("Trabalhos", True, desktop)
tf = Item("tf-09.py", False, trabalhos)

print(tf.caminho())                        # C:/Users/Desktop/Trabalhos/tf-09.py
print(tf.profundidade())                   # 4
print([filho.nome for filho in trabalhos.filhos])

tf.nome = "tf-09-final.py"                 # setter com validação: passa
print(tf.nome)

tentar("tf.nome = ''", lambda: setattr(tf, "nome", ""))
tentar("tf.pai = None", lambda: setattr(tf, "pai", None))
tentar("tf.eh_pasta = True", lambda: setattr(tf, "eh_pasta", True))
tentar("tf.altura = 1.70", lambda: setattr(tf, "altura", 1.70))
tentar("trabalhos.filhos.append(...)", lambda: trabalhos.filhos.append(tf))
tentar("tf.__filhos", lambda: tf.__filhos)
tentar("mover pasta p/ dentro de si", lambda: usuarios.mover_para(trabalhos))
tentar("mover p/ dentro de arquivo", lambda: trabalhos.mover_para(tf))

tf.mover_para(desktop)                     # o caminho certo, por comportamento
print(tf.caminho())                        # C:/Users/Desktop/tf-09-final.py
print(len(trabalhos.filhos), len(desktop.filhos))

print(tf._Item__nome)                      # nada é cofre: o contrato é o que protege
