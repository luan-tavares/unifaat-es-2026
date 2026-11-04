# Regra 5: um ponto por linha (Lei de Demeter: fale só com os seus amigos).
# Rodar no terminal: python3 05_um_ponto_por_linha.py


# ANTES: quem chama conhece a estrutura inteira da árvore da Aula 08.
class ItemAberto:
    def __init__(self, nome, pai=None):
        self.nome = nome
        self.pai = pai


disco = ItemAberto("C:")
usuarios = ItemAberto("Users", disco)
desktop = ItemAberto("Desktop", usuarios)
trabalhos = ItemAberto("Trabalhos", desktop)
tf = ItemAberto("tf-08.py", trabalhos)

print(tf.pai.pai.pai.pai.nome)      # C: (quatro pontos: se a árvore mudar, quebra aqui)


# DEPOIS: o item só fala com o pai direto e o pai responde pelo resto.
class Item:
    def __init__(self, nome, pai=None):
        self._nome = nome
        self._pai = pai

    def disco(self):
        if self._pai is None:
            return self._nome
        return self._pai.disco()


raiz = Item("C:")
pasta = Item("Users", raiz)
arquivo = Item("tf-08.py", pasta)

print(arquivo.disco())              # C: (um ponto)

# Exceção: encadear métodos que devolvem o mesmo tipo (fluente) não é navegar.
print("  Ola  ".strip().lower())    # ola
