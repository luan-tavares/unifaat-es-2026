# Regra 9: sem getters/setters/properties. Diga ao objeto o que fazer, não pergunte.
# Rodar no terminal: python3 06_diga_nao_pergunte.py


# ANTES: o objeto entrega o saldo e quem chama decide a regra.
class ContaAberta:
    def __init__(self, saldo):
        self._saldo = saldo

    def get_saldo(self):
        return self._saldo

    def set_saldo(self, valor):
        self._saldo = valor


conta = ContaAberta(100)
if conta.get_saldo() >= 30:                      # a regra mora fora da conta
    conta.set_saldo(conta.get_saldo() - 30)      # e cada chamador pode esquecê-la
conta.set_saldo(-999)                            # nada impede isto


# DEPOIS: a regra mora na conta, e só existe o comportamento.
class Conta:
    def __init__(self, saldo):
        self._saldo = saldo

    def sacar(self, valor):
        if valor > self._saldo:
            raise ValueError("saldo insuficiente")
        self._saldo -= valor

    def descrever(self):
        return "saldo: " + str(self._saldo)


conta = Conta(100)
conta.sacar(30)
print(conta.descrever())                         # saldo: 70

try:
    conta.sacar(500)
except ValueError as erro:
    print("Recusou:", erro)                      # Recusou: saldo insuficiente
