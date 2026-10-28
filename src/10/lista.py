# Lista (array / vetor): a primeira estrutura nativa do Python.
# Rodar no terminal: python3 lista.py
#
# Vetor é só outro nome para array. A lista do Python é um array dinâmico:
# os itens ficam lado a lado e ela cresce sozinha.

notas = [7, 3, 9, 5, 8]

# --- Leitura -----------------------------------------------------------------
# Por posição: O(1). O endereço é uma conta (início + posição x tamanho).
print(notas[3])             # 5
print(notas[-1])            # 8: o último
print(notas[1:3])           # [3, 9]: fatia, do 1 até antes do 3
print(len(notas))           # 5

# Por valor: O(n). Sem ordem, só dá para olhar um por um.
print(9 in notas)           # True
print(notas.index(9))       # 2

# --- Escrita -----------------------------------------------------------------
# No fim: O(1) em média. Cabe no próximo espaço livre.
notas.append(6)

# No início ou no meio: O(n). Todos os itens à direita andam uma casa.
notas.insert(0, 1)
print(notas)                # [1, 7, 3, 9, 5, 8, 6]

notas.remove(3)             # remove pelo valor (também varre: O(n))
ultima = notas.pop()        # remove e devolve o último: O(1)
notas.sort()                # ordena a própria lista
print(notas, ultima)        # [1, 5, 7, 8, 9] 6

# --- Referência --------------------------------------------------------------
# A lista é um tipo de referência: "outra = notas" só dá outro nome.
outra = notas
outra.append(99)
print(notas)                # [1, 5, 7, 8, 9, 99]
copia = notas.copy()        # copiar de verdade cria outro objeto
copia.append(100)
print(notas == copia, notas is copia)   # False False
