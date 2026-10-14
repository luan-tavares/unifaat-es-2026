# Tipos básicos e estruturas de dados nativas do Python.
# Rodar no terminal: python3 estruturas.py

# --- Tipos básicos -----------------------------------------------------------
# Em Python não se declara o tipo: ele pertence ao VALOR, não à variável.
idade = 19          # int: número inteiro, sem limite de tamanho
media = 7.5         # float: número com casas decimais
aprovado = True     # bool: True ou False (por baixo, valem 1 e 0)
nome = "Ana"        # str: texto, uma sequência de caracteres

print(type(idade), type(media), type(aprovado), type(nome))

# O float carrega a imprecisão da representação binária (Aula 03).
print(0.1 + 0.2)        # 0.30000000000000004

# // é a divisão inteira (só o quociente) e % é o resto da divisão.
print(45 // 2, 45 % 2)  # 22 1

# --- str ---------------------------------------------------------------------
# Cada caractere, por baixo, é um número da tabela ASCII / Unicode.
print(ord("A"), chr(65))    # 65 A
print(nome[0], len(nome))   # A 3  -> o primeiro caractere fica no índice 0

# --- list --------------------------------------------------------------------
# Ordenada e mutável: é o "array" do Python.
notas = [7, 3, 9]
notas.append(5)     # inclui no final
notas[0] = 8        # troca o valor da posição 0
print(notas)        # [8, 3, 9, 5]

# Cuidado: "outra = notas" NÃO copia a lista, só dá outro nome pra ela.
# Para copiar de verdade, use .copy().
copia = notas.copy()

# --- tuple -------------------------------------------------------------------
# Parecida com a lista, mas imutável: valores que andam juntos.
ponto = (10, 20)
x = ponto[0]        # o acesso é por índice, como na lista
y = ponto[1]
print(x, y)         # 10 20

# --- dict --------------------------------------------------------------------
# Pares chave -> valor: a busca é pelo nome da chave, não pela posição.
aluno = {"nome": "Ana", "ra": 1234, "nota": 8.5}
aluno["nota"] = 9.0
print(aluno["nome"], aluno["nota"])     # Ana 9.0

# --- set ---------------------------------------------------------------------
# Guarda só valores únicos, sem ordem.
print(set([1, 1, 2, 3, 3]))     # {1, 2, 3}
