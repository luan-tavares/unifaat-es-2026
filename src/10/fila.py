# Fila (queue): o primeiro a entrar é o primeiro a sair (FIFO).
# Rodar no terminal: python3 fila.py
#
# Não é nativa: é uma classe em cima do deque (collections), feito para
# mexer nas duas pontas.
from collections import deque


class Fila:
    def __init__(self):
        self.__itens = deque()

    def enfileirar(self, valor):
        self.__itens.append(valor)      # O(1): entra pelo fim

    def desenfileirar(self):
        if self.vazia():
            raise IndexError("fila vazia")
        return self.__itens.popleft()   # O(1): sai pela frente

    def vazia(self):
        return len(self.__itens) == 0


# --- Fila de impressão -------------------------------------------------------
impressora = Fila()
impressora.enfileirar("relatorio.pdf")
impressora.enfileirar("foto.png")
impressora.enfileirar("slide.pdf")
print(impressora.desenfileirar())       # relatorio.pdf
print(impressora.desenfileirar())       # foto.png

# --- Leitura x escrita: o antagonismo da lista comum -------------------------
# Com lista, tirar o primeiro item (pop(0)) obriga a puxar todos os outros
# uma casa para fechar o buraco: O(n). O deque só move o marcador da frente.
def passos_pop_zero(lista):
    passos = 1                          # retirar o primeiro
    lista.pop(0)
    for _ in lista:                     # cada item restante é puxado
        passos = passos + 1
    return passos


print(passos_pop_zero(["A", "B", "C", "D", "E"]))    # 5

# Ler o meio (fila[2]) também é O(n): o deque caminha desde uma ponta.
