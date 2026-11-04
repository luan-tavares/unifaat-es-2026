# Regra 7 (e 8): entidades pequenas, no máximo duas variáveis de instância.
# Rodar no terminal: python3 07_entidades_pequenas.py


# ANTES: uma classe só guarda cinco dados e mistura assuntos.
class ClienteGrande:
    def __init__(self, nome, sobrenome, rua, numero, cidade):
        self._nome = nome
        self._sobrenome = sobrenome
        self._rua = rua
        self._numero = numero
        self._cidade = cidade


# DEPOIS: cada assunto vira uma classe pequena e o cliente só junta duas.
class Nome:
    def __init__(self, primeiro, sobrenome):
        self._primeiro = primeiro
        self._sobrenome = sobrenome

    def completo(self):
        return self._primeiro + " " + self._sobrenome


class Endereco:
    def __init__(self, rua, cidade):
        self._rua = rua
        self._cidade = cidade

    def completo(self):
        return self._rua + ", " + self._cidade


class Cliente:
    def __init__(self, nome, endereco):
        self._nome = nome
        self._endereco = endereco

    def etiqueta(self):
        return self._nome.completo() + " - " + self._endereco.completo()


cliente = Cliente(Nome("Ana", "Souza"), Endereco("Rua das Flores, 10", "Sorocaba"))
print(cliente.etiqueta())   # Ana Souza - Rua das Flores, 10, Sorocaba
