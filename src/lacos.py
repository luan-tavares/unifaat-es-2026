# Laços de repetição: for, while, continue e break.
# Rodar no terminal: python3 lacos.py

# --- for ---------------------------------------------------------------------
# O for percorre qualquer sequência, um item por volta.
# range(5) gera 0, 1, 2, 3, 4 (o 5 não entra).
for i in range(5):
    print(i)

# Uma string também é uma sequência: o for anda letra por letra.
for letra in "Python":
    print(letra)

# Num dicionário, o for anda pelas chaves; o valor é buscado pela chave.
notas = {"Ana": 8.5, "Bruno": 6.0}
for nome in notas:
    nota = notas[nome]
    print(nome, nota)

# --- while -------------------------------------------------------------------
# O while repete enquanto a condição for verdadeira.
# Quantas divisões inteiras por 2 até o 1000 zerar?
numero = 1000
divisoes = 0
while numero > 0:
    numero = numero // 2
    divisoes = divisoes + 1
print(divisoes)     # 10 -> a mesma quantidade de dígitos de 1000 em binário

# --- continue ----------------------------------------------------------------
# continue pula direto para a próxima volta.
# É o que usamos no lugar do else: se o item não interessa, pula logo no começo.
for numero in range(1, 11):
    if numero % 2 != 0:
        continue
    print(numero)   # só os pares chegam aqui

# --- break -------------------------------------------------------------------
# break interrompe o laço na hora: achou, para de procurar.
for nome in ["Ana", "Bruno", "Carla", "Diego"]:
    if nome == "Carla":
        print("Achei a Carla")
        break
