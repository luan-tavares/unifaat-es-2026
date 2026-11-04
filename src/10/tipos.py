# Tipo primitivo x tipo de referência.
# Rodar no terminal: python3 tipos.py

# Primitivo: a variável guarda o VALOR. Copiar é copiar o valor.
a = 10
b = a
b = b + 1
print(a, b)             # 10 11 -> mexer em b não afeta a

# Referência: a variável guarda o ENDEREÇO do objeto. Copiar é copiar o endereço.
x = [1, 2]
y = x
y.append(3)
print(x, y)             # [1, 2, 3] [1, 2, 3] -> o mesmo objeto, dois nomes
print(x is y)           # True

# Para ter outro objeto de verdade, é preciso copiar.
z = x.copy()
z.append(4)
print(x, z)             # [1, 2, 3] [1, 2, 3, 4]
print(x is z)           # False
