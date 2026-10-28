# Pilha (stack): o último a entrar é o primeiro a sair (LIFO).
# Rodar no terminal: python3 pilha.py
#
# Não é nativa: é uma classe que usa uma lista por dentro e só expõe os
# comandos que definem a pilha. A lista fica privada (encapsulamento, Aula 09).


class Pilha:
    def __init__(self):
        self.__itens = []

    def empilhar(self, valor):
        self.__itens.append(valor)      # O(1): só pelo topo

    def desempilhar(self):
        if self.vazia():
            raise IndexError("pilha vazia")
        return self.__itens.pop()       # O(1): o último a entrar sai primeiro

    def topo(self):
        return self.__itens[-1]         # O(1)

    def vazia(self):
        return len(self.__itens) == 0


# --- Desfazer (Ctrl+Z) -------------------------------------------------------
historico = Pilha()
historico.empilhar("digitou A")
historico.empilhar("digitou B")
historico.empilhar("apagou B")
print(historico.desempilhar())          # apagou B
print(historico.desempilhar())          # digitou B

# --- Leitura x escrita -------------------------------------------------------
# Escrever e ler o topo: 1 passo. Ler o fundo: precisa tirar todos de cima.
def ler_fundo(pilha):
    passos = 0
    while True:
        passos = passos + 1
        item = pilha.desempilhar()
        if pilha.vazia():
            return item, passos


letras = Pilha()
for letra in "ABCD":
    letras.empilhar(letra)
print(letras.topo())                    # D: 1 passo
print(ler_fundo(letras))                # ('A', 4): 4 passos só para ler o fundo


# --- A pilha de chamadas: a pilha que o próprio Python usa -------------------
def fatorial(n):
    print("entrou  fatorial(", n, ")")
    if n == 1:
        print("saiu    fatorial( 1 ) = 1")
        return 1
    resultado = n * fatorial(n - 1)
    print("saiu    fatorial(", n, ") =", resultado)
    return resultado


fatorial(3)
# Entram 3, 2, 1 e saem 1, 2, 3: a última chamada é a primeira a terminar.
# Recursão sem condição de parada enche a pilha: RecursionError.
