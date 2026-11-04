# Dicionário (o famoso HashMap): pares de chave e valor.
# Rodar no terminal: python3 dicionario.py
#
# Por baixo é uma tabela de espalhamento: o hash da chave diz em qual slot o
# valor mora, sem procurar.

aluno = {"nome": "Ana", "ra": 1234}

# --- Leitura por chave: O(1) -------------------------------------------------
print(aluno["nome"])                        # Ana
print(aluno.get("email", "sem e-mail"))     # sem e-mail: consulta sem erro
print("ra" in aluno)                        # True: o in olha as chaves

# --- Escrita por chave: O(1) -------------------------------------------------
aluno["nota"] = 8.5                         # inclui
aluno["nota"] = 9.0                         # altera
aluno.update({"curso": "ADS"})              # mistura outro dicionário
aluno.pop("ra")                             # remove a chave

# --- Percorrer ---------------------------------------------------------------
for chave, valor in aluno.items():
    print(chave, "->", valor)
print(list(aluno.keys()))                   # ['nome', 'nota', 'curso']
print(list(aluno.values()))                 # ['Ana', 9.0, 'ADS']

# --- O preço -----------------------------------------------------------------
# Leitura por VALOR: O(n). O hash só ajuda com a chave.
print("ADS" in aluno.values())              # True, olhando slot por slot

# A chave precisa ser imutável (o hash não pode mudar).
try:
    aluno[[1, 2]] = "lista não pode ser chave"
except TypeError as erro:
    print("erro:", erro)                    # unhashable type: 'list'
