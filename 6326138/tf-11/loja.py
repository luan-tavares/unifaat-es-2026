# Passo 7 e 8: Demeter, Diga nao pergunte, Sem else e um nivel por metodo


class Cpf:
    """Responsabilidade: encapsular e validar os 11 digitos do CPF."""
    __slots__ = ("__valor",)

    def __init__(self, valor):
        if len(valor) != 11:
            raise ValueError("cpf invalido")
        self.__valor = valor


class Email:
    """Responsabilidade: encapsular e validar formato de e-mail."""
    __slots__ = ("__valor",)

    def __init__(self, valor):
        if len(valor) == 0:
            raise ValueError("email vazio")
        if "@" not in valor:
            raise ValueError("email invalido")
        self.__valor = valor


class Cep:
    """Responsabilidade: encapsular e validar os 8 digitos do CEP."""
    __slots__ = ("__valor",)

    def __init__(self, valor):
        if len(valor) != 8:
            raise ValueError("cep invalido")
        self.__valor = valor


class Dinheiro:
    """Responsabilidade: representar valores monetarios em centavos inteiros com operacoes aritimeticas seguras."""
    __slots__ = ("__centavos",)

    def __init__(self, centavos):
        self.__centavos = int(centavos)

    @classmethod
    def de_reais(cls, reais):
        return cls(round(reais * 100))

    def somar(self, outro):
        return Dinheiro(self.__centavos + outro.__centavos)

    def subtrair(self, outro):
        return Dinheiro(self.__centavos - outro.__centavos)

    def multiplicar(self, quantidade):
        return Dinheiro(round(self.__centavos * quantidade))

    def percentual(self, porcentagem):
        return Dinheiro(round(self.__centavos * porcentagem))

    def __str__(self):
        return "R$ %.2f" % (self.__centavos / 100)


class Status:
    """Responsabilidade: controlar e transitar os estados do pedido (aberto, pago, cancelado)."""
    __slots__ = ("__codigo",)

    def __init__(self, codigo="A"):
        self.__codigo = codigo

    def e_aberto(self):
        return self.__codigo == "A"

    def e_pago(self):
        return self.__codigo == "P"

    def pagar(self):
        self.__codigo = "P"

    def cancelar(self):
        self.__codigo = "C"

    def descricao(self):
        mapa = {"A": "aberto", "P": "pago", "C": "cancelado"}
        return mapa.get(self.__codigo, "desconhecido")


class TipoNormal:
    """Responsabilidade: calcular a aliquota de desconto do cliente normal (0%)."""
    __slots__ = ()

    def desconto_sobre(self, valor):
        return Dinheiro(0)


class TipoVip:
    """Responsabilidade: calcular a aliquota de desconto do cliente VIP (10%)."""
    __slots__ = ()

    def desconto_sobre(self, valor):
        return valor.percentual(0.10)


class TipoFuncionario:
    """Responsabilidade: calcular a aliquota de desconto do funcionario (20%)."""
    __slots__ = ()

    def desconto_sobre(self, valor):
        return valor.percentual(0.20)


class Pessoa:
    """Responsabilidade: agrupar os dados de identificacao pessoal (nome, cpf e email)."""
    __slots__ = ("__nome", "__cpf", "__email")

    def __init__(self, nome, cpf, email):
        self.__nome = nome
        self.__cpf = cpf
        self.__email = email

    def nome(self):
        return self.__nome


class Endereco:
    """Responsabilidade: agrupar os dados geograficos de localizacao (rua, cidade e cep)."""
    __slots__ = ("__rua", "__cidade", "__cep")

    def __init__(self, rua, cidade, cep):
        self.__rua = rua
        self.__cidade = cidade
        self.__cep = cep

    def cidade(self):
        return self.__cidade


class Cliente:
    """Responsabilidade: associar a pessoa, seu endereco e a politica de desconto do seu tipo."""
    __slots__ = ("__pessoa", "__endereco", "__tipo")

    def __init__(self, pessoa, endereco, tipo):
        self.__pessoa = pessoa
        self.__endereco = endereco
        self.__tipo = tipo

    def nome(self):
        return self.__pessoa.nome()

    def cidade(self):
        return self.__endereco.cidade()

    def calcular_desconto(self, total):
        return self.__tipo.desconto_sobre(total)


class Produto:
    """Responsabilidade: representar o produto com seu nome e preco unitario."""
    __slots__ = ("__nome", "__preco")

    def __init__(self, nome, preco):
        self.__nome = nome
        self.__preco = preco

    def calcular_subtotal(self, quantidade):
        return self.__preco.multiplicar(quantidade)

    def imprimir_linha(self, quantidade):
        print("  ", quantidade, "x", self.__nome, "=", self.calcular_subtotal(quantidade))


class ItemDoPedido:
    """Responsabilidade: manter a quantidade comprada de um produto especifico e calcular seu subtotal."""
    __slots__ = ("__produto", "__quantidade")

    def __init__(self, produto, quantidade):
        self.__produto = produto
        self.__quantidade = quantidade

    def subtotal(self):
        return self.__produto.calcular_subtotal(self.__quantidade)

    def imprimir(self):
        self.__produto.imprimir_linha(self.__quantidade)


class ItensDoPedido:
    """Responsabilidade: colecao de primeira classe que encapsula a lista de itens de um pedido."""
    __slots__ = ("__itens",)

    def __init__(self):
        self.__itens = []

    def adicionar(self, produto, quantidade):
        self.__itens.append(ItemDoPedido(produto, quantidade))

    def esta_vazia(self):
        return len(self.__itens) == 0

    def calcular_total(self):
        total = Dinheiro(0)
        for item in self.__itens:
            total = total.somar(item.subtotal())
        return total

    def imprimir_itens(self):
        for item in self.__itens:
            item.imprimir()


class Pedido:
    """Responsabilidade: gerenciar o ciclo de vida, totalizacao e regras de pagamento de uma compra."""
    __slots__ = ("__cliente", "__itens", "__status")

    def __init__(self, cliente):
        self.__cliente = cliente
        self.__itens = ItensDoPedido()
        self.__status = Status("A")

    def adicionar_item(self, produto, quantidade):
        self.__itens.adicionar(produto, quantidade)

    def calcular_total(self):
        return self.__itens.calcular_total()

    def calcular_desconto(self):
        total = self.calcular_total()
        return self.__cliente.calcular_desconto(total)

    def calcular_valor_a_pagar(self):
        return self.calcular_total().subtrair(self.calcular_desconto())

    def pagar(self):
        if not self.__status.e_aberto():
            return False
        if self.__itens.esta_vazia():
            return False
        self.__status.pagar()
        return True

    def cancelar(self):
        if not self.__status.e_aberto():
            return False
        self.__status.cancelar()
        return True

    def somar_se_pago(self, acumulado):
        if not self.__status.e_pago():
            return acumulado
        return acumulado.somar(self.calcular_valor_a_pagar())

    def contar_se_aberto(self, contador):
        if not self.__status.e_aberto():
            return contador
        return contador + 1

    def imprimir(self, numero):
        print("Pedido", numero, "-", self.__cliente.nome(), "-", self.__cliente.cidade())
        print("  status:", self.__status.descricao())
        self.__itens.imprimir_itens()
        self.__imprimir_fechamento()

    def __imprimir_fechamento(self):
        if self.__itens.esta_vazia():
            return
        print("  total: %s | desconto: %s | a pagar: %s" % (
            self.calcular_total(), self.calcular_desconto(), self.calcular_valor_a_pagar()
        ))


class Pedidos:
    """Responsabilidade: colecao de primeira classe para gerenciar o dicionario de todos os pedidos da loja."""
    __slots__ = ("__pedidos",)

    def __init__(self):
        self.__pedidos = {}

    def criar_pedido(self, numero, criador_cliente):
        try:
            cliente = criador_cliente()
            pedido = Pedido(cliente)
            self.__pedidos[numero] = pedido
            return pedido
        except ValueError as erro:
            print("pedido", numero, "recusado:", erro)
            return None

    def relatorio(self):
        for numero, pedido in self.__pedidos.items():
            pedido.imprimir(numero)

    def total_arrecadado(self):
        total = Dinheiro(0)
        for pedido in self.__pedidos.values():
            total = pedido.somar_se_pago(total)
        return total

    def quantidade_abertos(self):
        quantidade = 0
        for pedido in self.__pedidos.values():
            quantidade = pedido.contar_se_aberto(quantidade)
        return quantidade


# Tipos polimorficos
tipo_normal = TipoNormal()
tipo_vip = TipoVip()
tipo_funcionario = TipoFuncionario()

# Produtos com Dinheiro
caderno = Produto("Caderno", Dinheiro.de_reais(15.5))
caneta = Produto("Caneta", Dinheiro.de_reais(2.5))
livro = Produto("Livro", Dinheiro.de_reais(89.5))
fone = Produto("Fone", Dinheiro.de_reais(60.0))

# Clientes com Pessoa e Endereco
cliente_ana = Cliente(Pessoa("Ana Souza", Cpf("12345678901"), Email("ana@mail.com")), Endereco("Rua das Flores, 10", "Sorocaba", Cep("18010000")), tipo_vip)
cliente_diego = Cliente(Pessoa("Diego Rocha", Cpf("11122233344"), Email("diego@mail.com")), Endereco("Rua Nova, 7", "Itu", Cep("13300000")), tipo_normal)
cliente_eva = Cliente(Pessoa("Eva Nunes", Cpf("55566677788"), Email("eva@mail.com")), Endereco("Alameda Azul, 1", "Itu", Cep("13300001")), tipo_funcionario)
cliente_gil = Cliente(Pessoa("Gil Alves", Cpf("44455566677"), Email("gil@mail.com")), Endereco("Rua do Meio, 9", "Sorocaba", Cep("18030000")), tipo_normal)

pedidos = Pedidos()

# --- o roteiro da loja (o TF mantem esta saida identica) -----------------------
pedido_da_ana_1 = pedidos.criar_pedido(1, lambda: cliente_ana)
pedido_da_ana_1.adicionar_item(caderno, 2)
pedido_da_ana_1.adicionar_item(caneta, 5)

pedidos.criar_pedido(2, lambda: Cliente(Pessoa("Bruno Lima", Cpf("123"), Email("bruno@mail.com")), Endereco("Av. Central, 200", "Votorantim", Cep("18110000")), tipo_normal))

pedido_da_ana_2 = pedidos.criar_pedido(3, lambda: cliente_ana)
pedido_da_ana_2.adicionar_item(livro, 1)

pedidos.criar_pedido(4, lambda: Cliente(Pessoa("Carla Dias", Cpf("98765432100"), Email("carla.mail.com")), Endereco("Rua do Sol, 55", "Sorocaba", Cep("18020000")), tipo_funcionario))

pedido_do_diego = pedidos.criar_pedido(5, lambda: cliente_diego)

pedido_da_eva = pedidos.criar_pedido(6, lambda: cliente_eva)
pedido_da_eva.adicionar_item(fone, 1)

pedidos.criar_pedido(7, lambda: Cliente(Pessoa("Fabio Costa", Cpf("99988877766"), Email("fabio@mail.com")), Endereco("Rua Velha, 3", "Itu", Cep("123")), tipo_normal))

pedido_do_gil = pedidos.criar_pedido(8, lambda: cliente_gil)
pedido_do_gil.adicionar_item(fone, 2)

print("pagar 1:", pedido_da_ana_1.pagar())
print("pagar 3:", pedido_da_ana_2.pagar())
print("pagar 5:", pedido_do_diego.pagar())
print("pagar 6:", pedido_da_eva.pagar())
print("cancelar 5:", pedido_do_diego.cancelar())
print("cancelar 1:", pedido_da_ana_1.cancelar())

pedidos.relatorio()
print("arrecadado:", pedidos.total_arrecadado())
print("abertos:", pedidos.quantidade_abertos())
