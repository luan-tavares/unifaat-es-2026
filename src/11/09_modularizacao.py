# Modularização: o guarda-chuva das sete regras. Separar as unidades de execução.
# Rodar no terminal: python3 09_modularizacao.py

turma = {
    "Ana": [8, 9, 7],
    "Bruno": [4, 5, 6],
    "Carla": [],
    "Diego": [10, 9, 10],
}


# ANTES: uma unidade só faz tudo (percorre, soma, calcula a média, decide e imprime).
def relatorio_antes(turma):
    for nome in turma:
        if len(turma[nome]) > 0:
            soma = 0
            for nota in turma[nome]:
                soma += nota
            media = soma / len(turma[nome])
            if media >= 6:
                print(nome, "aprovado")


# DEPOIS: cada função é uma unidade com uma responsabilidade, e a pilha de chamadas
# vira uma história: relatorio -> foi_aprovado -> media.
def media(notas):
    return sum(notas) / len(notas)


def foi_aprovado(notas):
    return len(notas) > 0 and media(notas) >= 6


def relatorio(turma):
    for nome in turma:
        if foi_aprovado(turma[nome]):
            print(nome, "aprovado")


relatorio_antes(turma)    # Ana aprovado / Diego aprovado
relatorio(turma)          # Ana aprovado / Diego aprovado
