# Conversão decimal -> binário e binário -> decimal.
# Rodar no terminal: python3 binario.py

# --- Decimal -> binário ------------------------------------------------------
# É a divisão sucessiva por 2 feita no quadro:
#   1. divide por 2 e anota o resto (só pode ser 0 ou 1)
#   2. o número vira o quociente
#   3. repete até o número chegar a zero
#   4. lê os restos de baixo para cima
numero = 45
binario = ""

while numero > 0:
    resto = numero % 2
    # O resto novo entra NA FRENTE do que já foi montado: é o "ler de baixo
    # para cima". Se fosse binario + str(resto), o número sairia invertido.
    binario = str(resto) + binario
    numero = numero // 2

print(binario)      # 101101

# Detalhe: se numero começasse em 0, o while nem rodaria e binario ficaria
# vazio. No quadro ninguém converte o zero, mas no código esse caso existe.

# --- Binário -> decimal ------------------------------------------------------
# Cada bit é multiplicado pelo valor da sua posição (uma potência de 2),
# começando pela direita, e tudo é somado: 101101 = 32 + 8 + 4 + 1 = 45.
binario = "101101"
decimal = 0
posicao = 0                     # posição do bit: vale 2 elevado a posicao
indice = len(binario) - 1       # começa pelo último caractere (o bit da direita)

while indice >= 0:
    digito = int(binario[indice])           # "1" vira 1, "0" vira 0
    decimal = decimal + digito * 2 ** posicao
    posicao = posicao + 1
    indice = indice - 1                     # anda um caractere para a esquerda

print(decimal)      # 45

# --- O Python já faz isso pronto ----------------------------------------------
# bin() e int(texto, 2) fazem as mesmas conversões. Usamos o nosso código pra
# entender o que acontece por dentro antes de usar a versão pronta.
print(bin(45), int("101101", 2))    # 0b101101 45
