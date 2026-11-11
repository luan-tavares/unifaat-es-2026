1 - O mapa: quem é quem

Antes dos comandos, o mapa. Existem **três lugares** e **dois nomes de remote** que você precisa distinguir; quase todo erro do fluxo vem de confundir um com o outro.

| Lugar | Onde fica | Quem escreve | Nome no seu computador |
|-------|-----------|--------------|------------------------|
| Repositório do professor | `github.com/luan-tavares/unifaat-es-2026` | **só o professor** | `upstream` |
| O seu fork | `github.com/SEU-USUARIO/unifaat-es-2026` | **você** | `origin` |
| Seu computador | a pasta `unifaat-es-2026` clonada | **você** | (é onde você digita) |

O caminho do TF é sempre o mesmo, em uma direção só:

```text
upstream (professor)
   |  pull
   v
seu computador
   |  push
   v
origin (seu fork)
   |  PR (pedido feito no site do GitHub)
   v
upstream (professor)
```

- **Pull** traz as aulas novas do professor para o seu computador.
- **Push** leva o seu trabalho para o **seu fork** (nunca para o do professor: você não tem permissão).
- **Pull Request** é o **pedido**, feito no site do GitHub, para o professor puxar a sua branch do seu fork. **O PR não é um comando do Git.**

Duas regras que valem para tudo o que vem a seguir:

1. **Nunca commite no `main`.** O `main` só recebe pull do professor. O seu trabalho vive em uma branch própria, `RA-tf-12`.
2. **Uma branch por TF.** O TF seguinte nasce de um `main` atualizado, não da branch do TF anterior.

2 - Preparação (uma vez só)

Isto é feito **uma única vez** na disciplina. Depois, só o ciclo da seção 3 se repete a cada TF.

2.1 - Criar o fork (no site do GitHub)

1. Abra `github.com/luan-tavares/unifaat-es-2026` logado na sua conta.
2. Clique em **Fork** (canto superior direito) e depois em **Create fork**.
3. O GitHub leva você para `github.com/SEU-USUARIO/unifaat-es-2026`. **Esse é o seu fork:** uma cópia do repositório do professor, na sua conta, onde você tem permissão de escrita.

O fork vem **antes do clone** por quatro motivos: só no fork você escreve; ele mantém o vínculo com o original (é isso que permite o botão **Sync fork** e o PR); ele isola os seus erros do repositório da turma; e a cópia em que você trabalha fica na sua conta.

2.2 - Chave SSH

O clone e o push usam **SSH**, não HTTPS (veja a Aula 05). Se a sua chave pública ainda não está na conta, cadastre em **GitHub → Settings → SSH and GPG keys → New SSH key**. Para testar:

```bash
# deve responder: "Hi SEU-USUARIO! You've successfully authenticated"
ssh -T git@github.com
```

2.3 - Clonar o seu fork

Atenção ao endereço: é o do **seu fork**, com o seu usuário, não o do professor.

```bash
# clona o SEU fork (git@github.com:SEU-USUARIO/...), não o do professor
git clone git@github.com:SEU-USUARIO/unifaat-es-2026.git
cd unifaat-es-2026
```

2.4 - Apontar o `upstream` para o repositório do professor

O clone já criou o `origin` (o seu fork). Falta um segundo endereço, o do professor, com o nome `upstream`:

```bash
# cadastra o repositório do professor com o nome upstream
git remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git
```

2.5 - Conferir

```bash
# lista os remotes: precisam aparecer os dois
git remote -v
```

O resultado certo:

```text
origin    git@github.com:SEU-USUARIO/unifaat-es-2026.git (fetch)
origin    git@github.com:SEU-USUARIO/unifaat-es-2026.git (push)
upstream  git@github.com:luan-tavares/unifaat-es-2026.git (fetch)
upstream  git@github.com:luan-tavares/unifaat-es-2026.git (push)
```

Se o `origin` mostrar `luan-tavares`, você clonou o repositório do professor em vez do seu fork: veja a variação 4.2.

3 - O ciclo de cada TF, passo a passo

Os exemplos usam o **TF-12**, o RA `6325000` e o nome `Maria Silva`. Troque pelos seus dados e pelo número do TF da vez.

3.1 - Passo 1: atualizar o `main` com o que o professor publicou

```bash
# volta para o main (o TF novo sempre sai dele)
git switch main

# traz do professor tudo que é novo; --ff-only só aceita avanço limpo
# (se o seu main tiver algo diferente, o Git para em vez de fazer um merge sem você pedir)
git pull --ff-only upstream main
```

O `--ff-only` é uma trava de segurança: o `main` do seu computador deve ser **idêntico** ao do professor, só mais atrasado. Se o comando falhar, leia a seção 5 antes de qualquer outra coisa.

Opcional, mas recomendado: atualizar também o `main` do seu fork no GitHub, para o fork não ficar atrasado.

```bash
# envia o main atualizado para o seu fork
git push origin main
```

3.2 - Passo 2: criar a branch do TF e entrar nela

```bash
# cria a branch RA-tf-12 e já entra nela (switch -c = criar + entrar)
git switch -c 6325000-tf-12

# confere: a branch atual aparece com *
git branch
```

O nome da branch segue o padrão `RA-tf-NN`: `6325000-tf-12`. O professor reconhece o TF pela branch e pelo título do PR.

3.3 - Passo 3: criar a pasta e o arquivo do TF

A estrutura é **`RA/tf-NN/RA.txt`**: uma pasta com o seu RA, dentro dela a pasta do TF, e dentro dela o arquivo.

```bash
# cria a pasta com o RA e a subpasta do TF de uma vez (-p cria o caminho inteiro)
mkdir -p 6325000/tf-12

# cria o arquivo com 3 linhas: nome, RA e GitHub
cat > 6325000/tf-12/6325000.txt <<'EOF'
Nome: Maria Silva
RA: 6325000
GitHub: https://github.com/maria-silva
EOF
```

O arquivo tem o nome do **seu RA** com a extensão `.txt` e três linhas: **nome completo**, **RA** e o **link do seu GitHub**.

```text
6325000/
└── tf-12/
    └── 6325000.txt
```

3.4 - Passo 4: marcar e registrar (add + commit)

```bash
# marca a pasta nova para entrar no commit
git add 6325000/

# confere o que vai entrar: só o seu arquivo deve aparecer
git status

# registra, com mensagem curta
git commit -m "TF-12 - 6325000 - Maria Silva"
```

3.5 - Passo 5: enviar a branch para o seu fork

```bash
# envia a branch para o origin (o seu fork); -u grava o vínculo para os próximos pushes
git push -u origin 6325000-tf-12
```

O push vai para o **`origin`**, o seu fork. Para o `upstream` (professor) ele seria recusado, porque você não tem permissão lá. É por isso que existe o Pull Request.

Na primeira vez, o GitHub imprime no terminal um aviso do tipo `Create a pull request for '6325000-tf-12' on GitHub by visiting: ...`. É o mesmo pedido do passo seguinte.

3.6 - Passo 6: abrir o Pull Request (no site do GitHub)

O PR **não se abre pelo terminal** na nossa disciplina: é feito na interface web.

1. Abra o **seu fork**: `github.com/SEU-USUARIO/unifaat-es-2026`.
2. O GitHub mostra uma faixa amarela: **"6325000-tf-12 had recent pushes"** com o botão verde **Compare & pull request**. Clique nele.
3. Confira os **quatro campos de cima**, que decidem para onde o pedido vai:

| Campo | Valor certo |
|-------|-------------|
| base repository | `luan-tavares/unifaat-es-2026` (o do **professor**) |
| base | `main` |
| head repository | `SEU-USUARIO/unifaat-es-2026` (o seu fork) |
| compare | `6325000-tf-12` |

4. No **título**, escreva `TF-12 · 6325000 · Maria Silva`.
5. Clique em **Create pull request**.

Se a faixa amarela não apareceu (ela some depois de algum tempo): no seu fork, abra **Contribute → Open pull request**, ou a aba **Pull requests → New pull request** e escolha as branches nos quatro campos acima.

3.7 - Passo 7: conferir se o PR existe

O TF **só vale se o PR aparecer** na lista do professor. Confira você mesmo:

1. Abra `github.com/luan-tavares/unifaat-es-2026/pulls`.
2. Procure o seu título (`TF-12 · 6325000 · Maria Silva`) com o estado **Open**.

Se o PR não está nessa lista, o TF **não foi entregue**, mesmo que o push tenha dado certo.

O PR **não precisa ser aceito** nem mesclado: ele fica aberto como o registro da entrega. Para corrigir algo depois de aberto, basta fazer um novo commit na mesma branch e dar `git push`: o PR se atualiza sozinho.

4 - Variações

4.1 - Atualizar pelo botão Sync fork, em vez do `pull upstream`

Tem dois caminhos para ter o `main` em dia, e eles não se misturam:

| Caminho | O que faz | Quando usar |
|---------|-----------|-------------|
| `git pull --ff-only upstream main` | traz o `main` do professor **direto** para o seu computador | o caminho padrão do ciclo (passo 1) |
| **Sync fork** (botão no GitHub) | atualiza o `main` do **seu fork**, no site | quando você quer o fork em dia sem abrir o terminal |

Se usar o botão, depois é preciso trazer o resultado para o computador:

```bash
# depois do Sync fork no site: baixa o main atualizado do seu fork
git switch main
git pull --ff-only origin main
```

Os dois chegam ao mesmo lugar. O que não se faz é commitar no `main`: com `--ff-only`, o Git avisa se isso aconteceu.

4.2 - Eu clonei o repositório do professor (não o meu fork)

Sintoma: `git remote -v` mostra `luan-tavares` no `origin`, e o push dá `permission denied`. Não precisa clonar de novo: troque os nomes dos remotes.

```bash
# o que era origin (professor) passa a se chamar upstream
git remote rename origin upstream

# cadastra o seu fork como origin
git remote add origin git@github.com:SEU-USUARIO/unifaat-es-2026.git

# confere: origin = seu fork, upstream = professor
git remote -v
```

Se você ainda não fez o fork, faça pelo passo 2.1 antes.

4.3 - Eu commitei no `main` sem querer

Sintoma: o `git pull --ff-only upstream main` falha com `Not possible to fast-forward`. Salve o seu trabalho em uma branch nova e devolva o `main` ao estado do professor:

```bash
# cria a branch do TF a partir de onde você está (o commit vai junto)
git branch 6325000-tf-12

# traz o estado atual do professor, sem mexer em nada ainda
git fetch upstream

# faz o main ficar idêntico ao do professor (descarta só o commit que estava nele)
git reset --hard upstream/main

# entra na branch que guardou o seu commit
git switch 6325000-tf-12
```

O seu commit **não se perde**: ele já está na `6325000-tf-12`. O `reset --hard` só afeta o `main`. Depois siga do passo 5 (push).

4.4 - Esqueci de criar a branch e ainda não commitei

É o caso mais fácil: crie a branch agora, e os arquivos modificados vão junto.

```bash
# cria a branch e entra nela; os arquivos não commitados vêm junto
git switch -c 6325000-tf-12
```

4.5 - Segundo TF, terceiro TF...

Cada TF tem **a sua própria branch**, nascida do `main` atualizado. Não continue na branch do TF anterior.

```bash
# volta ao main e atualiza
git switch main
git pull --ff-only upstream main

# branch nova do TF seguinte
git switch -c 6325000-tf-13

# pasta do TF novo, dentro da pasta que você já tem
mkdir -p 6325000/tf-13
```

A estrutura vai acumulando: `6325000/tf-12/` e `6325000/tf-13/`, cada TF em um PR separado.

4.6 - Preciso corrigir um PR que já abri

Não abra outro: corrija na mesma branch e envie de novo.

```bash
# estando na branch do TF: ajuste os arquivos, depois
git add 6325000/
git commit -m "TF-12 - corrige o RA.txt"

# o -u já foi dado na primeira vez, então basta
git push
```

O PR aberto mostra o commit novo automaticamente.

4.7 - Trabalhar em outro computador

Faça de novo a preparação (seção 2), clonando o **seu fork**: a branch do TF vem junto, porque ela já está no seu fork.

```bash
# depois do clone e do remote add upstream: baixa a branch que você já enviou
git switch 6325000-tf-12
```

4.8 - Abrir o PR pela linha de comando (opcional)

O GitHub oferece uma ferramenta própria, a `gh`, que abre o PR pelo terminal. É **da plataforma GitHub, não do Git**, e não é o caminho que usamos na disciplina. Se você já a tem instalada e logada:

```bash
# abre o PR da branch atual para o repositório do professor
gh pr create --repo luan-tavares/unifaat-es-2026 --base main --title "TF-12 · 6325000 · Maria Silva" --body ""
```

Se `gh` for um termo novo para você, ignore: o site do GitHub faz exatamente a mesma coisa.

5 - Troubleshooting

Cada caso tem o **sintoma** (o que aparece), a **causa** (por que acontece) e a **correção**.

5.1 - Resumo

| Sintoma | Causa provável | Vá para |
|---------|----------------|---------|
| `Permission denied (publickey)` | chave SSH não cadastrada na sua conta | 5.2 |
| `remote rejected ... permission denied` no push | você tentou enviar para o repositório do professor | 5.3 |
| `fatal: The current branch ... has no upstream branch` | primeiro push de uma branch, sem `-u` | 5.4 |
| `Not possible to fast-forward, aborting` | o seu `main` tem commit que o do professor não tem | 4.3 |
| `Your local changes ... would be overwritten` | arquivos modificados sem commit ao trocar de branch | 5.5 |
| Faixa amarela "Compare & pull request" não aparece | o aviso expira | 3.6 (último parágrafo) |
| "There isn't anything to compare" | base e compare iguais, ou branch errada | 5.6 |
| PR aberto para o repositório errado | `base repository` apontando para o seu fork | 5.7 |
| "This branch has conflicts that must be resolved" | o `main` do professor mudou nos mesmos arquivos | 5.8 |
| `Repository not found` | usuário errado no endereço, ou fork inexistente | 5.9 |
| `fatal: not a git repository` | você não está dentro da pasta do projeto | 5.10 |
| Pasta com RA ou nome errado já commitada | erro de digitação | 5.11 |
| Aparecem arquivos que não eram seus no commit | `git add .` na pasta errada | 5.12 |
| O professor não vê o meu PR | o PR não foi criado ou está no repositório errado | 3.7 e 5.7 |

5.2 - `Permission denied (publickey)`

**Causa:** a chave SSH não está cadastrada na sua conta do GitHub (ou foi colada a chave privada em vez da pública).

```bash
# mostra a chave PÚBLICA para copiar (termina em .pub; a que não tem .pub é a privada e nunca se compartilha)
cat ~/.ssh/id_ed25519.pub
```

Cole o resultado em **GitHub → Settings → SSH and GPG keys → New SSH key** e teste de novo com `ssh -T git@github.com`.

5.3 - `remote: Permission to luan-tavares/... denied` no push

**Causa:** o `origin` está apontando para o repositório do professor (clone errado), ou você rodou `git push upstream ...`.

```bash
# confere para onde o origin aponta
git remote -v
```

Se o `origin` mostrar `luan-tavares`, siga a variação 4.2. Se o `origin` está certo, o erro foi digitar `upstream` no push: o comando certo é `git push -u origin 6325000-tf-12`.

5.4 - `The current branch ... has no upstream branch`

**Causa:** primeiro push de uma branch nova, sem dizer para onde ela vai.

```bash
# diz para onde enviar e grava o vínculo (o git até imprime este comando para você)
git push -u origin 6325000-tf-12
```

5.5 - `Your local changes would be overwritten by checkout`

**Causa:** você tem arquivos modificados sem commit e tentou trocar de branch.

```bash
# opção 1: registrar o trabalho antes de trocar
git add 6325000/
git commit -m "TF-12 - andamento"

# opção 2: guardar de lado, sem commit, e recuperar depois
git stash
git switch main
git switch 6325000-tf-12
git stash pop
```

5.6 - "There isn't anything to compare"

**Causa:** o GitHub não encontrou diferença entre as duas pontas. Três origens comuns: você abriu o PR **antes** de enviar a branch com `git push`; escolheu `compare` igual a `base`; ou fez o commit na branch errada.

```bash
# a branch está no seu fork? (precisa listar origin/6325000-tf-12)
git branch -r

# o commit do TF está nela? (a mensagem do TF deve aparecer no topo)
git log --oneline -3
```

Se a branch não aparece no `-r`, falta o push do passo 3.5. Se o commit não está nela, veja 4.3.

5.7 - O PR foi aberto para o lugar errado

**Causa:** em **base repository**, o GitHub trouxe o **seu fork** em vez do repositório do professor. Nesse caso o PR "existe", mas **o professor não o vê**: ele é um pedido do seu fork para o seu próprio fork.

Correção: feche esse PR (botão **Close pull request**), volte para **New pull request** e, no primeiro campo, troque **base repository** para `luan-tavares/unifaat-es-2026`. Confira a lista `github.com/luan-tavares/unifaat-es-2026/pulls`: o seu PR precisa estar lá.

5.8 - "This branch has conflicts that must be resolved"

**Causa:** o `main` do professor mudou nos mesmos arquivos que a sua branch. No TF isso é raro, porque cada aluno mexe numa pasta com o próprio RA. Se acontecer, traga o `main` novo para a sua branch e resolva.

```bash
# atualiza o main
git switch main
git pull --ff-only upstream main

# volta para a branch do TF e traz o main para dentro dela
git switch 6325000-tf-12
git merge main
```

O Git marca os pontos em conflito dentro dos arquivos (`<<<<<<<`, `=======`, `>>>>>>>`). Edite deixando a versão final, remova as marcas e feche:

```bash
# marca os arquivos resolvidos e conclui o merge
git add 6325000/
git commit -m "Resolve conflito com o main"

# atualiza o PR
git push
```

5.9 - `Repository not found`

**Causa:** o endereço está com o usuário errado, ou o fork ainda não existe (você pulou o passo 2.1), ou você não está logado na conta certa.

```bash
# mostra os endereços atuais; confira o seu usuário e o nome do repositório
git remote -v

# corrige o endereço do origin, se estiver errado
git remote set-url origin git@github.com:SEU-USUARIO/unifaat-es-2026.git
```

5.10 - `fatal: not a git repository`

**Causa:** o terminal está em outra pasta.

```bash
# mostra onde você está
pwd

# entra na pasta do projeto (ajuste o caminho para onde você clonou)
cd ~/unifaat-es-2026
```

5.11 - Errei o RA ou o nome da pasta e já commitei

**Causa:** erro de digitação. Renomeie com o `git mv` (e não pelo explorador de arquivos, para o Git acompanhar), registre e envie de novo; o PR aberto se atualiza.

```bash
# renomeia a pasta errada para a certa
git mv 6325001 6325000

# registra e envia
git commit -m "TF-12 - corrige a pasta do RA"
git push
```

5.12 - Entraram arquivos que não eram meus no commit

**Causa:** `git add .` marca **tudo** que mudou na pasta. Veja o que está marcado antes de commitar:

```bash
# o que vai entrar no commit
git status

# tira um arquivo da marcação (o arquivo continua na pasta)
git restore --staged caminho/do/arquivo
```

Se o commit já foi feito, mas ainda não houve push:

```bash
# desfaz o commit e mantém os arquivos para você refazer a marcação
git reset --soft HEAD~1
```

5.13 - Nada funcionou: como pedir ajuda

Mande ao professor, no lugar de uma descrição, a **saída** destes três comandos (copie e cole do terminal):

```bash
# em que branch você está e o que mudou
git status

# para onde os remotes apontam
git remote -v

# os últimos commits
git log --oneline -5
```

6 - Checklist final

Antes de dizer que entregou, confirme cada item:

- Você trabalhou em uma branch `RA-tf-NN`, não no `main`.
- A estrutura está certa: `RA/tf-NN/RA.txt`, com nome, RA e GitHub.
- O push foi para o **`origin`** (o seu fork).
- O PR foi aberto **para o repositório do professor** (`base repository` = `luan-tavares/unifaat-es-2026`).
- O título é `TF-NN · RA · Nome`.
- O seu PR aparece, com estado **Open**, na lista `github.com/luan-tavares/unifaat-es-2026/pulls`.

Se os seis itens estão certos, o TF está entregue. **Se o PR não aparece na lista do professor, o TF não vale**, mesmo que o resto esteja perfeito.
