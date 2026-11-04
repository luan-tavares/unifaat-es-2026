# Construtor: __init__ e objeto dentro de outro objeto.
# Rodar no terminal: python3 construtor.py

# --- __init__: o construtor --------------------------------------------------
# O __init__ é um método especial, chamado automaticamente no instante em que
# o objeto é criado. Os argumentos passados em Aluno(...) chegam nele.
# Serve para o objeto já nascer com as suas propriedades preenchidas.
class Aluno:
    def __init__(self, nome, ra):
        self.nome = nome
        self.ra = ra
        self.notas = []     # toda lista começa vazia, uma para cada objeto

    def adicionar_nota(self, nota):
        self.notas.append(nota)

    def calcular_media(self):
        soma = 0
        for nota in self.notas:
            soma = soma + nota
        return soma / len(self.notas)


# Antes: Aluno() e depois ana.nome = "Ana", ana.ra = 1234, ana.notas = [].
# Agora: uma linha só, e nenhuma propriedade fica faltando.
ana = Aluno("Ana", 1234)
ana.adicionar_nota(8)
ana.adicionar_nota(9)
print(ana.nome, ana.calcular_media())   # Ana 8.5

# --- Um objeto dentro de outro objeto ----------------------------------------
# A propriedade pode ser qualquer tipo de dado, inclusive OUTRO OBJETO.
# O construtor recebe o objeto pronto (injeção) e guarda numa propriedade.
class Turma:
    def __init__(self, nome, professor):
        self.nome = nome
        self.professor = professor      # outro objeto, criado fora
        self.alunos = []

    def matricular(self, aluno):
        self.alunos.append(aluno)


class Professor:
    def __init__(self, nome):
        self.nome = nome


luan = Professor("Luan")
turma = Turma("ADS 2º semestre", luan)
turma.matricular(ana)
print(turma.professor.nome)         # Luan
print(turma.alunos[0].nome)         # Ana
