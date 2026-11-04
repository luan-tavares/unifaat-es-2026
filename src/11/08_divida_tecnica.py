# Dívida técnica: entregar rápido é um empréstimo. Pode, desde que a gente saiba.
# Rodar no terminal: python3 08_divida_tecnica.py


# DÍVIDA TÉCNICA (consciente), sexta 17h:
# preco_professor é cópia de preco_aluno.
# Pagar: unificar em um dicionário de multiplicadores (ticket #42, sprint 3).
def preco_aluno(preco):
    return preco * 0.5


def preco_professor(preco):
    return preco * 0.7


print(preco_aluno(100), preco_professor(100))     # 50.0 70.0


# Pagamento (sprint 3): uma função, um dicionário, nada duplicado.
MULTIPLICADOR = {"aluno": 0.5, "professor": 0.7}


def preco_final(preco, tipo):
    return preco * MULTIPLICADOR[tipo]


print(preco_final(100, "aluno"), preco_final(100, "professor"))   # 50.0 70.0
