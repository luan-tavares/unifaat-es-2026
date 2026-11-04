# Tupla: parecida com a lista, mas imutável.
# Rodar no terminal: python3 tupla.py

ponto = (10, 20)

# --- Leitura: igual à lista --------------------------------------------------
print(ponto[1])                     # 20: por posição, O(1)
x, y = ponto                        # desempacotamento
print(x, y)                         # 10 20
print(ponto.count(10), ponto.index(20))   # 1 1
print(len(ponto), 20 in ponto)      # 2 True

# --- Escrita: não existe -----------------------------------------------------
try:
    ponto[0] = 99
except TypeError as erro:
    print("erro:", erro)            # 'tuple' object does not support item assignment

# "Alterar" é criar outra tupla, copiando todos os itens: O(n).
novo = (99,) + ponto[1:]
print(ponto, novo)                  # (10, 20) (99, 20): a antiga continua intacta

# --- O que se ganha com o preço ---------------------------------------------
# Imutável: o hash nunca muda, então a tupla pode ser chave de dicionário.
mapa = {(10, 20): "casa"}
print(mapa[(10, 20)])               # casa

# A tupla trava os itens que ela guarda: se um item for uma lista, a lista
# continua mutável por dentro.
mista = (1, [2, 3])
mista[1].append(4)
print(mista)                        # (1, [2, 3, 4])
