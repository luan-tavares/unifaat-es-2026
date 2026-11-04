# Regra 2: não usar else. Três saídas no lugar dele.
# Rodar no terminal: python3 02_sem_else.py


# 1) Retorno antecipado (fail first / cláusula de guarda): cada caso resolve e sai.
def conceito(nota):
    if nota >= 9:
        return "A"
    if nota >= 7:
        return "B"
    if nota >= 5:
        return "C"
    return "D"


# 2) Valor padrão antes do if: o if só sobrescreve quando precisa.
def situacao(media):
    resultado = "reprovado"
    if media >= 6:
        resultado = "aprovado"
    return resultado


# 3) Polimorfismo (Aula 09): cada classe sabe o seu desconto, ninguém pergunta o tipo.
class Aluno:
    def desconto(self):
        return 0.5


class Professor:
    def desconto(self):
        return 0.3


class Visitante:
    def desconto(self):
        return 0.0


def preco_final(preco, cliente):
    return preco * (1 - cliente.desconto())


print(conceito(9.5), conceito(7), conceito(3))            # A B D
print(situacao(8), situacao(4))                           # aprovado reprovado
print(preco_final(100, Aluno()), preco_final(100, Visitante()))   # 50.0 100.0
