# Pilar 1: encapsulamento. Versão mínima: um Arquivo com o tamanho protegido.
# Rodar no terminal: python3 encapsulamento.py


class Arquivo:
    # Só estes atributos existem: não nasce "arquivo.altura = 1.70".
    __slots__ = ("__nome", "__tamanho")

    def __init__(self, nome, tamanho):
        self.__nome = nome
        self.__tamanho = tamanho

    # Só leitura: tem getter e não tem setter.
    @property
    def tamanho(self):
        return self.__tamanho

    # Para mudar o tamanho, um método que valida (em vez de "arquivo.tamanho = -5").
    def gravar(self, novo_tamanho):
        if novo_tamanho < 0:
            raise ValueError("tamanho não pode ser negativo")
        self.__tamanho = novo_tamanho


notas = Arquivo("notas.txt", 120)
print(notas.tamanho)        # 120

notas.gravar(300)
print(notas.tamanho)        # 300

try:
    notas.tamanho = 1
except AttributeError as erro:
    print("ler pode, atribuir não:", erro)

try:
    notas.gravar(-5)
except ValueError as erro:
    print("gravar valida:", erro)
