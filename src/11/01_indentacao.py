# Regra 1: um único nível de indentação por método.
# Rodar no terminal: python3 01_indentacao.py

turma = {
    "Ana": [8, 9, 7],
    "Bruno": [4, 5, 6],
    "Carla": [],
    "Diego": [10, 9, 10],
}


# ANTES: três níveis (for -> if -> for) na mesma função.
def aprovados_antes(turma):
    aprovados = []
    for nome in turma:
        if len(turma[nome]) > 0:
            soma = 0
            for nota in turma[nome]:
                soma += nota
            if soma / len(turma[nome]) >= 6:
                aprovados.append(nome)
    return aprovados


# DEPOIS: cada função faz uma coisa e tem no máximo um nível.
def media(notas):
    return sum(notas) / len(notas)


def foi_aprovado(notas):
    if len(notas) == 0:
        return False
    return media(notas) >= 6


def aprovados(turma):
    return [nome for nome in turma if foi_aprovado(turma[nome])]


print(aprovados_antes(turma))   # ['Ana', 'Diego']
print(aprovados(turma))         # ['Ana', 'Diego']


# ANTES (código hadouken): os if se empilham e a indentação vira uma seta >>>.
def certificado_antes(existe, matriculado, frequencia, nota):
    if existe:
        if matriculado:
            if frequencia >= 75:
                if nota >= 6:
                    return "certificado emitido"
    return "certificado negado"


# DEPOIS (fail first): testa o que está errado e sai cedo; tudo no nível 1 e cada saída diz o motivo.
def certificado(existe, matriculado, frequencia, nota):
    if not existe:
        return "negado: aluno não existe"
    if not matriculado:
        return "negado: sem matrícula"
    if frequencia < 75:
        return "negado: frequência abaixo de 75%"
    if nota < 6:
        return "negado: nota abaixo de 6"
    return "certificado emitido"


print(certificado_antes(True, True, 80, 7))    # certificado emitido
print(certificado(True, True, 60, 7))          # negado: frequência abaixo de 75%
