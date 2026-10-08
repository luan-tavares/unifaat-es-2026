Gabarito da prova
Prova do 1º bimestre
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aplicação: 30/09/2026
Conteúdo: Aulas 01 a 05


Título:

Gabarito da Prova do 1º bimestre


1 - Sobre a prova

A prova do 1º bimestre cobriu as Aulas 01 a 05 e valeu **10,0 pontos**: 6 questões objetivas (1,0 cada, total 6,0) e 2 questões dissertativas (2,0 cada, total 4,0).

Nas objetivas, valia apenas uma alternativa. Nas dissertativas, o raciocínio precisava aparecer: nas contas de conversão, resposta sem os passos não pontuava. Era permitido consultar a lista de comandos.

| Questão | Assunto | Resposta |
|---|---|---|
| 1 | Virtualização e máquina virtual | D |
| 2 | Combinações de um byte | C |
| 3 | `git clone`, `git pull` e `git push` | D |
| 4 | Navegação em diretórios no terminal | A |
| 5 | `git init` e a pasta `.git` | C |
| 6 | Chave SSH | E |
| 7 | Conversão decimal e binário | `11010101` |
| 8 | Staging, commit e push | `git add .`, `git commit -m "adiciona estilo"`, `git push` |

2 - Questões objetivas

QUESTÃO 1
Sobre rodar Linux dentro do Windows por meio de virtualização (como faz o WSL 2), é correto afirmar que:

A) O Windows é desinstalado e substituído pelo Linux, que passa a controlar sozinho o processador, a memória e o disco.

B) O Windows simula um processador de arquitetura diferente e traduz cada instrução em tempo real, o que caracteriza a virtualização e a torna mais lenta que o hardware original.

C) O Linux roda como um simples programa do Windows, sem sistema operacional próprio, usando apenas os processos e a memória do Windows.

D) O Windows segue no controle do hardware, e uma máquina virtual isolada roda um Linux completo por cima dele, sem tradução pesada.

E) A virtualização só é possível em videogames antigos, e por isso o WSL depende de um emulador de console.

Gabarito: D)

Comentário: Virtualização roda um SO inteiro dentro de outro; o Windows segue no controle do hardware e a VM é um conjunto isolado de processos e memória. Mesma arquitetura, sem tradução pesada. A alternativa B descreve a emulação, não a virtualização.


QUESTÃO 2
Um byte tem 8 bits, e cada bit pode valer 0 ou 1. Do ponto de vista da análise combinatória, por que um byte consegue assumir 256 combinações diferentes?

A) Porque 8 × 8 × 4 = 256, já que cada bit ocupa uma posição e o byte tem quatro nibbles.

B) Porque 8² = 64 e, somando as quatro combinações possíveis de cada par de bits, chega-se a 256.

C) Porque é um arranjo com repetição: cada uma das 8 posições tem 2 opções independentes (0 ou 1), então o total é 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2⁸ = 256.

D) Porque é uma soma: 8 bits × 32 valores possíveis para cada bit = 256.

E) Porque é uma permutação simples de 8 elementos distintos, ou seja, 8! = 256.

Gabarito: C)

Comentário: Arranjo com repetição: n = 2 valores por posição, p = 8 posições, logo 2⁸ = 256. Com n bits, 2ⁿ combinações. As combinações vão de 0 a 255 (o maior valor é 2ⁿ − 1). A E erra porque 8! = 40320, e permutação não admite repetição. A D inventa que cada bit tem 32 valores possíveis, quando ele só tem 2 (0 ou 1).


QUESTÃO 3
Um projeto já está em um repositório no GitHub. Para começar a trabalhar nele em uma máquina que ainda não tem nenhuma cópia, e depois acompanhar as novidades e enviar as próprias alterações, é correto afirmar sobre os comandos `git clone`, `git pull` e `git push` que:

A) O `git pull` é o comando da primeira vez, que baixa o repositório e cria a pasta local; o `git clone` é o comando do dia a dia.

B) O `git push` traz para a máquina os commits novos que existem no GitHub.

C) O `git clone` e o `git pull` fazem exatamente a mesma coisa, mudando apenas o nome.

D) Deve-se começar com `git clone`, que baixa o repositório remoto inteiro e cria a pasta local; depois, no dia a dia, usa `git pull` para trazer os commits novos do remote e `git push` para enviar os seus.

E) O `git remote add` já envia todo o histórico para o GitHub, então o `git push` só é necessário na segunda vez.

Gabarito: D)

Comentário: `clone` é o comando de "primeira vez": baixa o repositório remoto inteiro **e cria a pasta local**. `pull` é o comando do dia a dia, num repositório que já existe na máquina, e traz os commits novos do remote. `push` faz o caminho contrário, enviando os commits locais. A está invertida; B descreve o `pull`, não o `push`; C ignora a diferença entre criar e atualizar; E erra porque `git remote add` só escreve no `.git/config`, sem enviar nada pela rede.


QUESTÃO 4
No terminal do Linux, o prompt mostra que o diretório atual é `/home/maria`, que contém um diretório chamado `Desktop`. O objetivo é entrar no `Desktop` e criar ali uma pasta chamada `trabalhos`. Qual sequência de comandos faz isso corretamente?

**Colinha de comandos**

| Comando | O que faz |
|---|---|
| `pwd` | mostra o caminho completo do diretório atual |
| `ls` | lista os arquivos e diretórios do diretório atual |
| `cd nome` | entra no diretório `nome` |
| `cd ..` | sobe um nível, para o diretório "pai" |
| `mkdir nome` | cria um diretório chamado `nome` no diretório atual |
| `touch nome` | cria um arquivo vazio chamado `nome` |

A) `cd Desktop`, depois `mkdir trabalhos`, e por fim `ls` para conferir que a pasta apareceu.

B) `mkdir Desktop`, depois `cd trabalhos`.

C) `cd ..`, depois `mkdir trabalhos`, já que o `Desktop` fica um nível acima.

D) `pwd Desktop`, depois `mkdir trabalhos`, porque o `pwd` é o comando que entra em diretórios.

E) `cd Desktop`, depois `touch trabalhos`, que cria a pasta dentro do `Desktop`.

Gabarito: A)

Comentário: O `Desktop` é subdiretório do diretório atual, então `cd Desktop` entra nele; `mkdir` cria o diretório no local onde o aluno está, e `ls` confirma. B inverte a lógica (cria um `Desktop` e tenta entrar em algo que não existe). C sobe para `/home` em vez de descer, e criaria a pasta no lugar errado. D confunde `pwd` (só mostra onde está) com `cd`. E usa `touch`, que cria arquivo e não diretório.


QUESTÃO 5
Dentro de uma pasta `meu-projeto`, que contém alguns arquivos, é executado o comando `git init`. O que acontece?

A) O Git baixa para a máquina uma cópia de um repositório que está no GitHub.

B) O Git cria o primeiro commit automaticamente, com todos os arquivos da pasta.

C) O Git cria a pasta oculta `.git`, que passa a guardar o histórico do projeto, e os arquivos continuam onde estavam.

D) O Git envia os arquivos da pasta para o GitHub e cadastra o remote `origin`.

E) O Git move os arquivos para dentro da pasta `.git`, onde ficam protegidos.

Gabarito: C)

Comentário: O `git init` só cria a pasta oculta `.git`, que é o repositório em si (o histórico completo); os arquivos do projeto ficam onde estavam. Roda uma única vez. Não baixa nada (A), não cria commit (B), não envia nada pela rede nem cadastra remote (D) e não mexe de lugar nos arquivos (E).


QUESTÃO 6
Sobre a autenticação por chave SSH com o GitHub, é correto afirmar que:

A) A chave privada é colada no GitHub em Settings → SSH and GPG keys, e a pública fica guardada na máquina de quem gerou o par.

B) As duas chaves devem ser enviadas ao GitHub para que ele consiga validar a autenticação.

C) A chave privada pode ser compartilhada com colegas de equipe, desde que a pública permaneça secreta.

D) O comando `ssh -T git@github.com` envia o histórico de commits para o remote e confirma o push.

E) A chave pública é o "cadeado" entregue ao GitHub, e a privada é a única que abre esse cadeado, ficando só na máquina de quem a gerou e nunca saindo dela.

Gabarito: E)

Comentário: Pública vai para o GitHub, privada nunca sai da máquina. `ssh -T` só testa a autenticação, não envia nada.


3 - Questões dissertativas

3.1 - Questão 7: conversão decimal e binário (2,0)

Considere o número decimal `213`.

**Colinha: potências de 2**

| Potência | 2⁰ | 2¹ | 2² | 2³ | 2⁴ | 2⁵ | 2⁶ | 2⁷ | 2⁸ |
|---|---|---|---|---|---|---|---|---|---|
| Valor | 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 |

**a)** Converta 213 para binário usando o método das divisões sucessivas por 2, mostrando cada divisão, cada resto e a ordem correta de leitura dos restos. (1,0)

**b)** Confira o resultado fazendo o caminho de volta: usando a colinha, monte a tabela de posições de um byte (de 2⁷ até 2⁰), alinhe os dígitos do binário embaixo e some as posições em que o dígito vale 1. (1,0)

3.1.1 - Resposta do item a (1,0)

| Divisão | Quociente | Resto |
|---|---|---|
| 213 ÷ 2 | 106 | 1 |
| 106 ÷ 2 | 53 | 0 |
| 53 ÷ 2 | 26 | 1 |
| 26 ÷ 2 | 13 | 0 |
| 13 ÷ 2 | 6 | 1 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 |

Restos lidos **de baixo para cima**: `11010101`. A leitura de cima para baixo (`10101011`) é o erro mais comum, e vale no máximo metade da nota do item.

3.1.2 - Resposta do item b (1,0)

| Valor | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---|---|---|---|---|---|---|---|
| Dígito | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 1 |

Somando só as posições com 1: 128 + 64 + 16 + 4 + 1 = **213**, o número de partida.

Critério: a tabela precisa estar alinhada pela direita, e a soma só pode usar as posições em que o dígito vale 1.

3.2 - Questão 8: do staging ao repositório remoto (2,0)

A pasta `meu-projeto` é um repositório Git na branch `main`, já conectado ao remote `origin` (`git@github.com:usuario/meu-projeto.git`). Hoje o arquivo `index.html` foi editado e um arquivo novo, `style.css`, foi criado. Esse trabalho precisa ser colocado no staging, registrado em um commit e enviado ao repositório remoto. Use a colinha abaixo.

**Colinha de comandos Git**

| Comando | O que faz |
|---|---|
| `git status` | mostra o que mudou e o que é novo; nunca altera nada |
| `git add .` | coloca no staging todos os arquivos novos ou modificados |
| `git commit -m "mensagem"` | cria o commit com tudo o que está no staging |
| `git push` | envia os commits da branch atual para o remote |
| `git pull` | traz para a máquina os commits novos do remote |
| `git log` | mostra o histórico de commits |

**a)** Escreva, na ordem, os três comandos da colinha que devem ser usados para: (1) colocar os arquivos no staging, (2) criar o commit com a mensagem `"adiciona estilo"`, (3) enviar o commit para o repositório remoto. (0,4 cada, total 1,2)

**b)** Em uma frase: o que significa o `.` em `git add .`? (0,8)

3.2.1 - Resposta do item a (1,2)

Valia 0,4 por comando, na ordem:

```bash
git add .                         # 1. coloca os arquivos no staging
git commit -m "adiciona estilo"   # 2. cria o commit com o que está no staging
git push                          # 3. envia o commit para o remote (origin, branch main)
```

O item 2 sem `-m` ou sem a mensagem vale metade. `git push origin main` também foi aceito no item 3. Trocar a ordem (por exemplo, `push` antes do `commit`) zera o item trocado; `pull` no lugar do `push` também.

3.2.2 - Resposta do item b (0,8)

O `.` representa a pasta atual, então `git add .` coloca no staging tudo o que é novo ou foi modificado a partir da pasta onde se está (incluindo subpastas). É o mesmo `.` de `code .` e do diretório atual na navegação.
