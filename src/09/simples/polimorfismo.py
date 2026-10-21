# Pilar 3: polimorfismo. Mesma chamada, cada classe responde do seu jeito.
# Rodar no terminal: python3 polimorfismo.py


class Arquivo:
    def __init__(self, nome, tamanho):
        self.nome = nome
        self.__tamanho = tamanho

    def tamanho(self):
        return self.__tamanho


class Pasta:
    def __init__(self, nome):
        self.nome = nome
        self.filhos = []

    def tamanho(self):
        total = 0
        for filho in self.filhos:
            total = total + filho.tamanho()     # não pergunta "é pasta ou arquivo?"
        return total


trabalhos = Pasta("Trabalhos")
trabalhos.filhos.append(Arquivo("tf.py", 800))
trabalhos.filhos.append(Arquivo("slide.pdf", 5000))

coisas = [Arquivo("notas.txt", 120), trabalhos]

for coisa in coisas:
    print(coisa.nome, coisa.tamanho())      # 120 e 5800: mesma chamada, respostas diferentes
