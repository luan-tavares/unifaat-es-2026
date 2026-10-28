# Dado, binário e estrutura: tudo vira 0 e 1 (Aulas 03 e 07).
# Rodar no terminal: python3 binario_e_estrutura.py

# Inteiro: o valor 65 em binário.
print(bin(65))                      # 0b1000001

# String: cada caractere é um número da tabela, e o número vira binário.
for letra in "Ola":
    print(letra, ord(letra), bin(ord(letra)))

# Estrutura: os bytes de uma sequência ficam um ao lado do outro.
dados = bytes([79, 108, 97])        # os mesmos números de "Ola"
print(dados)                        # b'Ola'
print(dados[0], dados[2])           # 79 97 -> acesso pela posição
