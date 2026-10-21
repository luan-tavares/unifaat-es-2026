# Interface: o contrato puro. Quem assina promete ter tamanho(); como, é problema dele.
# Rodar no terminal: python3 interface.py
from abc import ABC, abstractmethod


class Medivel(ABC):
    @abstractmethod
    def tamanho(self):
        pass


class Arquivo(Medivel):
    def __init__(self, tamanho):
        self.__tamanho = tamanho

    def tamanho(self):
        return self.__tamanho


class Lixeira(Medivel):                 # nem é da árvore, mas assina o mesmo contrato
    def __init__(self):
        self.__descartados = [Arquivo(40), Arquivo(60)]

    def tamanho(self):
        total = 0
        for arquivo in self.__descartados:
            total = total + arquivo.tamanho()
        return total


# Quem usa só conhece o contrato (como a tomada não sabe quem vai ligar).
def espaco_total(coisas):
    total = 0
    for coisa in coisas:
        total = total + coisa.tamanho()
    return total


print(espaco_total([Arquivo(120), Lixeira()]))      # 120 + 100 = 220

try:
    Medivel()
except TypeError as erro:
    print("contrato não se instancia:", erro)
