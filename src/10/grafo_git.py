# O Git é um grafo: cada commit é um nó e aponta para o(s) seu(s) pai(s).
# Rodar no terminal: python3 grafo_git.py
#
# As setas só apontam para trás e nunca fecham um ciclo: é um grafo dirigido
# acíclico (DAG). Branch é só um ponteiro para um commit. Merge é um commit
# com DOIS pais, e é isso que impede o histórico de ser uma lista.

pais = {}           # commit -> lista dos seus pais (as arestas)
branches = {}       # branch -> commit para onde ela aponta


def commitar(nome, lista_de_pais):
    # Escrever é barato: um nó novo e uma aresta para cada pai (O(1)).
    pais[nome] = list(lista_de_pais)


commitar("A", [])
commitar("B", ["A"])
branches["main"] = "B"

commitar("C", [branches["main"]])        # git commit na main
branches["main"] = "C"

branches["feature"] = "B"                # git switch -c feature (só um ponteiro)
commitar("D", [branches["feature"]])     # git commit na feature
branches["feature"] = "D"

commitar("E", [branches["main"], branches["feature"]])   # git merge feature
branches["main"] = "E"


def historico(commit):
    # Ler o histórico é seguir os pais, um commit por passo (git log).
    visitados = []
    fila = [commit]
    while len(fila) > 0:
        atual = fila.pop(0)
        if atual in visitados:
            continue
        visitados.append(atual)
        fila.extend(pais[atual])
    return visitados


print(pais)
# {'A': [], 'B': ['A'], 'C': ['B'], 'D': ['B'], 'E': ['C', 'D']}
print(branches)                          # {'main': 'E', 'feature': 'D'}
print(historico(branches["main"]))   # ['E', 'C', 'D', 'B', 'A']

merges = [c for c in pais if len(pais[c]) > 1]
print(merges)                            # ['E']: o commit com dois pais
