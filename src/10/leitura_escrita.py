# Leitura x escrita: a mesma lista de 8 números, organizada de duas formas.
# Rodar no terminal: python3 leitura_escrita.py
#
# O custo é contado em PASSOS. Ganhar na leitura costuma custar na escrita.


# --- Lista solta (sem ordem) -----------------------------------------------
def escrever_solta(lista, valor):
    lista.append(valor)             # larga no fim
    return 1                        # 1 passo


def ler_solta(lista, alvo):
    passos = 0
    for item in lista:              # sem ordem: só dá para olhar um por um
        passos = passos + 1
        if item == alvo:
            return passos
    return passos


# --- Lista ordenada --------------------------------------------------------
def ler_ordenada(lista, alvo):
    # Busca binária: olha o meio e descarta metade.
    inicio = 0
    fim = len(lista) - 1
    passos = 0
    while inicio <= fim:
        meio = (inicio + fim) // 2
        passos = passos + 1
        if lista[meio] == alvo:
            return passos
        if lista[meio] < alvo:
            inicio = meio + 1
            continue
        fim = meio - 1
    return passos


def escrever_ordenada(lista, valor):
    # Inserir na posição 0: todos à direita são empurrados uma casa.
    lista.append(None)
    passos = 0
    for i in range(len(lista) - 1, 0, -1):
        lista[i] = lista[i - 1]
        passos = passos + 1
    lista[0] = valor
    return passos + 1


solta = [41, 7, 18, 66, 2, 75, 30, 93]
ordenada = [2, 7, 18, 30, 41, 66, 75, 93]

print("solta    escrever:", escrever_solta(solta, 50))       # 1
print("solta    ler 93  :", ler_solta(solta, 93))            # 8
print("ordenada ler 93  :", ler_ordenada(ordenada, 93))      # 4
print("ordenada escrever:", escrever_ordenada(ordenada, 1))  # 9
