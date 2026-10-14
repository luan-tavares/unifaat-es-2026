# Funções: entrada (parâmetros), processamento e saída (return).
# Rodar no terminal: python3 funcoes.py
#
#   entrada (parâmetros) -> [ corpo da função ] -> saída (return)

# --- Parâmetro e argumento ---------------------------------------------------
# PARÂMETRO é o nome que a função declara para receber um valor.
# ARGUMENTO é o valor de verdade, passado na hora de chamar.
def calcular_media(primeira_nota, segunda_nota):
    soma = primeira_nota + segunda_nota
    media = soma / 2
    return media    # a SAÍDA: devolve o valor para quem chamou


# 8 e 6 são os argumentos: entram em primeira_nota e segunda_nota.
resultado = calcular_media(8, 6)
print(resultado)    # 7.0

# Os argumentos também podem ser variáveis, e a ordem importa.
nota_a = 9
nota_b = 5
print(calcular_media(nota_a, nota_b))   # 7.0

# --- return x print ----------------------------------------------------------
# print só MOSTRA na tela; quem chamou não recebe nada.
# return DEVOLVE o valor: dá para guardar numa variável e usar depois.
def media_que_so_mostra(primeira_nota, segunda_nota):
    print((primeira_nota + segunda_nota) / 2)


valor = media_que_so_mostra(8, 6)   # mostra 7.0 na tela
print(valor)                        # None: a função não devolveu nada

# --- Sem return: o "void" (procedure) ----------------------------------------
# Em C, uma função que não devolve nada é void. Em Python, uma função sem
# return devolve None, o valor que representa "nada".
# Uma função que só FAZ alguma coisa (mostrar, gravar, enviar) e não devolve
# resultado é chamada de procedimento (procedure).
def mostrar_boletim(nome, media):
    print("Aluno:", nome, "| Média:", media)


mostrar_boletim("Ana", 7.0)

# --- Sem parâmetros ----------------------------------------------------------
# A entrada é opcional: a função pode não receber nada.
def mostrar_cabecalho():
    print("=== UNIFAAT 2026.2 ===")


mostrar_cabecalho()

# --- Valor padrão ------------------------------------------------------------
# Se o argumento não for passado, o parâmetro assume o valor padrão.
def aprovado(media, media_minima=7):
    return media >= media_minima


print(aprovado(8))      # True  (usou a média mínima 7)
print(aprovado(6))      # False
print(aprovado(6, 5))   # True  (a média mínima passou a ser 5)

# --- Mais de um retorno ------------------------------------------------------
# Python devolve uma tupla (Aula 07), e dá para desempacotar na chamada.
def menor_e_maior(valores):
    menor = valores[0]
    maior = valores[0]
    for valor in valores:
        if valor < menor:
            menor = valor
        if valor > maior:
            maior = valor
    return menor, maior


minimo, maximo = menor_e_maior([7, 3, 9, 1, 5])
print(minimo, maximo)   # 1 9

# --- Retorno antecipado ------------------------------------------------------
# O return encerra a função na hora: cada condição resolve o seu caso e sai.
def situacao(media):
    if media >= 7:
        return "Aprovado"
    if media >= 5:
        return "Recuperação"
    return "Reprovado"


print(situacao(calcular_media(8, 6)))   # Aprovado
