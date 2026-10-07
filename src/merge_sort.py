# Merge sort: ordenação por "dividir para conquistar".
# Rodar no terminal: python3 merge_sort.py
#
#   1. DIVIDIR: corta a lista ao meio, e cada metade ao meio de novo,
#      até sobrar 1 item (uma lista de 1 item já está ordenada).
#   2. CONQUISTAR: junta (intercala) as metades de volta, sempre em ordem.
#
# 8 itens viram 1 em 3 divisões por 2 (2³ = 8): a mesma divisão por 2 da
# conversão para binário, agora aplicada a uma lista.


def intercalar(esquerda, direita):
    # As duas listas já chegam ordenadas, então basta comparar o item atual
    # de cada uma e levar o menor para o resultado.
    resultado = []
    i = 0   # posição atual na lista da esquerda
    j = 0   # posição atual na lista da direita

    while i < len(esquerda) and j < len(direita):
        if esquerda[i] <= direita[j]:
            resultado.append(esquerda[i])
            i = i + 1
            continue
        resultado.append(direita[j])
        j = j + 1

    # Quando um lado acaba, o que sobrou do outro já está em ordem:
    # é só copiar item por item para o fim do resultado.
    while i < len(esquerda):
        resultado.append(esquerda[i])
        i = i + 1

    while j < len(direita):
        resultado.append(direita[j])
        j = j + 1

    return resultado


def merge_sort(lista):
    # Caso base: com 0 ou 1 item não há o que ordenar. Sem esse ponto de
    # parada, a função se chamaria para sempre.
    if len(lista) <= 1:
        return lista

    meio = len(lista) // 2      # dividir por 2

    # Monta as duas metades copiando item por item:
    # da posição 0 até antes do meio vai para a esquerda,
    # do meio até o fim vai para a direita.
    esquerda = []
    for posicao in range(0, meio):
        esquerda.append(lista[posicao])

    direita = []
    for posicao in range(meio, len(lista)):
        direita.append(lista[posicao])

    # A função chama a si mesma para cada metade: isso é recursão,
    # o mesmo conceito do rm -r da Aula 03.
    esquerda = merge_sort(esquerda)
    direita = merge_sort(direita)

    return intercalar(esquerda, direita)


print(merge_sort([7, 3, 9, 1, 5, 8, 2, 6]))     # [1, 2, 3, 5, 6, 7, 8, 9]
