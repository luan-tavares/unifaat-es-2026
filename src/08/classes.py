# Classe e objeto: propriedades, métodos e o self.
# Rodar no terminal: python3 classes.py
#
# A CLASSE é o molde: descreve quais propriedades e métodos o dado terá.
# O OBJETO é o dado criado a partir do molde.
#
# Em C, a struct só agrupa propriedades. Na classe, o mesmo bloco agrupa
# também as funções que trabalham com essas propriedades: os MÉTODOS.


class Aluno:
    # Método: uma função declarada dentro da classe.
    # O primeiro parâmetro é sempre o self: o próprio objeto que está
    # chamando o método. É por ele que o método sabe de QUEM é a nota.
    def adicionar_nota(self, nota):
        self.notas.append(nota)

    def calcular_media(self):
        soma = 0
        for nota in self.notas:
            soma = soma + nota
        return soma / len(self.notas)

    def situacao(self):
        media = self.calcular_media()
        if media >= 7:
            return "Aprovado"
        if media >= 5:
            return "Recuperação"
        return "Reprovado"


# --- Criando objetos a partir do molde ---------------------------------------
# Aluno() cria um objeto novo, vazio. Cada chamada cria um objeto diferente.
ana = Aluno()
bruno = Aluno()

# Propriedade: um dado que pertence ao objeto. Pode ser de qualquer tipo.
# Aqui criamos as propriedades uma a uma, depois que o objeto já existe.
ana.nome = "Ana"            # str
ana.ra = 1234               # int
ana.notas = []              # list

bruno.nome = "Bruno"
bruno.ra = 5678
bruno.notas = []

# --- Chamando métodos --------------------------------------------------------
# Em ana.adicionar_nota(8), o Python passa a ana como self automaticamente.
# Dentro do método, self.notas é a lista da ana, e não a do bruno.
ana.adicionar_nota(8)
ana.adicionar_nota(9)
bruno.adicionar_nota(4)
bruno.adicionar_nota(6)

print(ana.nome, ana.calcular_media(), ana.situacao())       # Ana 8.5 Aprovado
print(bruno.nome, bruno.calcular_media(), bruno.situacao()) # Bruno 5.0 Recuperação

# --- Mesmo molde, objetos independentes --------------------------------------
# Mudar um objeto não mexe no outro: cada um guarda os seus próprios dados.
print(ana.notas)    # [8, 9]
print(bruno.notas)  # [4, 6]
print(ana is bruno) # False: são dois objetos diferentes

# Problema deste jeito: se esquecermos de criar a propriedade notas,
# o adicionar_nota quebra com AttributeError. O molde deveria garantir que
# todo objeto já nasça com as propriedades certas. Isso é o construtor.
