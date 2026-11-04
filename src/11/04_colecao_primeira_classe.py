# Regra 4: coleção de primeira classe. Quem tem uma lista não tem mais nada.
# Rodar no terminal: python3 04_colecao_primeira_classe.py


class Aluno:
    def __init__(self, nome, nota):
        self._nome = nome
        self._nota = nota

    def aprovado(self):
        return self._nota >= 6

    def descrever(self):
        return self._nome + ": " + str(self._nota)


class Turma:
    def __init__(self, alunos=()):
        self._alunos = list(alunos)

    def matricular(self, aluno):
        self._alunos.append(aluno)

    def aprovados(self):
        return Turma([aluno for aluno in self._alunos if aluno.aprovado()])

    def quantidade(self):
        return len(self._alunos)

    def descrever(self):
        return "\n".join(aluno.descrever() for aluno in self._alunos)


turma = Turma()
turma.matricular(Aluno("Ana", 8.5))
turma.matricular(Aluno("Bruno", 4))
turma.matricular(Aluno("Diego", 10))

print(turma.aprovados().descrever())
# Ana: 8.5
# Diego: 10
print(turma.aprovados().quantidade(), "de", turma.quantidade())   # 2 de 3
