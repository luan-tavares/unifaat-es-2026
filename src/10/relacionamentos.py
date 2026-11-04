# Relacionamento entre objetos: um objeto guarda a referência de outro.
# Rodar no terminal: python3 relacionamentos.py


class Professor:
    def __init__(self, nome):
        self.nome = nome


class Turma:
    def __init__(self, nome, professor):
        self.nome = nome
        self.professor = professor      # aponta para o objeto, não copia
        self.alunos = []


luan = Professor("Luan")
ads = Turma("ADS 2º semestre", luan)
es = Turma("Engenharia de Software", luan)

print(ads.professor is es.professor)    # True: os dois apontam para o mesmo
luan.nome = "Luan Lourenço"
print(ads.professor.nome)               # Luan Lourenço


# Relacionamento de mão dupla: a árvore de arquivos da Aula 08.
class Item:
    def __init__(self, nome, pai=None):
        self.nome = nome
        self.pai = pai                  # aponta para cima
        self.filhos = []                # aponta para baixo
        if pai is None:
            return
        pai.filhos.append(self)


disco = Item("C:")
users = Item("Users", disco)
desktop = Item("Desktop", users)

print(desktop.pai.pai.nome)             # C:
print(disco.filhos[0].filhos[0].nome)   # Desktop
