# Regra 3: embrulhar primitivos e strings em classes pequenas.
# Rodar no terminal: python3 03_embrulhar_primitivos.py


# ANTES: o int aceita qualquer coisa, e o erro viaja pelo sistema.
def registrar_antes(ra, nota):
    return "RA " + str(ra) + " tirou " + str(nota)


print(registrar_antes(8.5, 1234))       # RA 8.5 tirou 1234 (trocou e ninguém reclamou)
print(registrar_antes(1234, 15))        # RA 1234 tirou 15 (nota 15 numa prova de 0 a 10)


# DEPOIS: o tipo carrega a regra e o erro aparece na criação.
class Nota:
    def __init__(self, valor):
        if valor < 0 or valor > 10:
            raise ValueError("nota deve estar entre 0 e 10")
        self._valor = valor

    def aprovada(self):
        return self._valor >= 6

    def __str__(self):
        return str(self._valor)


class Ra:
    def __init__(self, numero):
        if not isinstance(numero, int) or numero <= 0:
            raise ValueError("RA deve ser um inteiro positivo")
        self._numero = numero

    def __str__(self):
        return str(self._numero)


def registrar(ra: Ra, nota: Nota):
    return "RA " + str(ra) + " tirou " + str(nota)


print(registrar(Ra(1234), Nota(8.5)))   # RA 1234 tirou 8.5

try:
    Nota(15)
except ValueError as erro:
    print("Recusou na entrada:", erro)   # Recusou na entrada: nota deve estar entre 0 e 10
