Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☐ 10☐ 11☐ 12☒ 13☐ 14☐ 15☐ 16☐


Título da aula:

Branches, Fork e Pull Request


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Na Aula 05 o Git saiu de dentro de uma única máquina: o histórico ganhou um **remote** (`origin`), uma **chave SSH** e os comandos `push` e `pull`. Naquela aula, porém, a linha do tempo era **uma só**: um `main`, um autor, commits em sequência. Esta aula volta ao Git e ao GitHub para responder à pergunta que o trabalho em equipe faz: **como várias pessoas mexem no mesmo projeto, ao mesmo tempo, sem pisar umas nas outras?**

A resposta tem quatro peças, e a aula as apresenta nesta ordem. Primeiro, uma **revisão rápida do commit**, porque tudo o que vem depois é construído em cima dele. Segundo, as **branches**: a linha do tempo deixa de ser uma e vira um **multiverso**. Terceiro, o **merge**, que junta universos, e os cuidados que ele exige. Quarto, o **fork** e o **Pull Request**: o jeito de contribuir com um repositório **que não é seu**, e que é exatamente o jeito pelo qual os **TFs** desta disciplina passam a ser entregues.

No caminho entra um ponto de infraestrutura que a Aula 05 só abriu: **onde a chave SSH é cadastrada** (na conta inteira ou em um único repositório, somente leitura) e **por que usamos SSH e não HTTPS**.

2 - Revisão rápida: o commit

Antes de ramificar, vale rever o que está sendo ramificado. O **commit** é a unidade do Git: uma **fotografia completa** do projeto naquele momento, mais uma mensagem, o autor, a data e um **ponteiro para o commit anterior** (o pai). Encadeados pelos ponteiros, os commits formam a **linha do tempo** que o `git log` mostra, e que na Aula 10 vimos ser, na verdade, um **grafo**: cada commit é um nó e a aresta aponta para o pai.

```bash
# cria o repositorio (a pasta oculta .git) nesta pasta
git init

# manda o arquivo para a area de preparacao (staging)
git add anotacoes.txt

# grava a fotografia permanente, com uma mensagem
git commit -m "Cria anotacoes.txt"

# mostra a linha do tempo, um commit por linha
git log --oneline
```

O fluxo de todo commit é sempre o mesmo, em três tempos: **editar** os arquivos, **`git add`** (escolher o que entra na foto) e **`git commit`** (tirar a foto). E o `HEAD`, visto na Aula 05, é o ponteiro que diz "estou aqui". Guarde essa imagem, porque a próxima seção só muda **uma** coisa nela: passa a existir mais de um lugar para o `HEAD` estar.

3 - Branches: o multiverso

3.1 - Uma linha do tempo, vários universos

Até agora a linha do tempo era reta: cada commit tem um pai e um filho. Uma **branch** (ramo, galho) é um **universo paralelo** dessa linha do tempo: a partir de um commit qualquer, o histórico se **bifurca** e cada lado passa a evoluir sozinho, sem afetar o outro. No universo A o arquivo tem uma função nova; no universo B ele continua como estava; os dois existem ao mesmo tempo e nenhum "estraga" o outro.

Isso resolve o problema central do trabalho em equipe: cada pessoa (ou cada tarefa) trabalha no seu galho, e só depois, **por decisão**, o galho é juntado ao resto.

O que torna isso viável é que uma branch **não é uma cópia dos arquivos**. Da Aula 05: `HEAD` aponta para um arquivo, e esse arquivo aponta para um commit. Uma branch é **exatamente esse arquivo**: um texto de uma linha, com o hash de um commit dentro.

```bash
# a branch "main" e so um arquivo de texto com o hash do commit
cat .git/refs/heads/main
```

Criar uma branch é, portanto, **criar um arquivo de poucos bytes**: instantâneo e barato. Por isso o Git incentiva criar branches à vontade. O nome `main` não tem nada de especial: é só o nome que, por convenção, a branch inicial recebe (antigamente era `master`). Ela é o **tronco** do projeto; as demais são os **galhos** que saem dele.

| Termo | O que é |
|-------|---------|
| **Tronco** (branch principal, `main`) | A linha oficial do projeto: o que está pronto e aceito. Em equipes, só entra nela o que foi revisado. |
| **Galho** (branch de trabalho, *feature branch*) | Uma linha criada a partir do tronco para uma tarefa específica (uma funcionalidade, uma correção, um TF). |
| **`HEAD`** | O ponteiro "estou aqui": aponta para a branch em que você está trabalhando agora. |

3.2 - Criar e trocar de branch: `checkout` e `switch`

Dois comandos fazem a viagem entre os universos. Os dois **trocam a branch atual**, ou seja, movem o `HEAD` para outra branch e fazem os arquivos da pasta passarem a refletir o estado dela.

```bash
# lista as branches locais; o * marca a atual
git branch

# cria a branch "login" mas NAO entra nela
git branch login

# entra na branch (jeito classico)
git checkout login

# cria e entra de uma vez (jeito classico)
git checkout -b login

# entra na branch (jeito moderno)
git switch login

# cria e entra de uma vez (jeito moderno)
git switch -c login
```

A diferença entre os dois é de **história e de foco**. O `git checkout` é o comando antigo e é um "canivete suíço": troca de branch, mas também restaura arquivos e vai para um commit solto. Como o mesmo comando fazia coisas demais, o Git 2.23 (2019) o dividiu: o **`git switch`** cuida **só de trocar de branch** e o **`git restore`** cuida só de restaurar arquivos. Os dois jeitos funcionam e você vai encontrar os dois em tutoriais e em empresas. A regra prática: **`switch` para trocar de branch** (diz o que faz), e saiba ler `checkout` quando aparecer.

A prova de que é só um ponteiro mudando está no `HEAD`:

```bash
git switch -c login
cat .git/HEAD
```

```text
ref: refs/heads/login
```

Veja o efeito nos arquivos: o que se commita em um galho **não existe** nos outros.

```bash
# estamos em "login": cria um arquivo e commita
git switch -c login
echo "tela de login" > login.txt
git add login.txt
git commit -m "Adiciona login.txt"
ls

# voltamos ao tronco: o login.txt DESAPARECE da pasta
git switch main
ls

# voltamos ao galho: ele REAPARECE
git switch login
ls
```

Não é mágica: ao trocar de branch o Git reescreve os arquivos da pasta para espelhar a fotografia daquele commit. Por isso o **cuidado** da seção: com alterações **não commitadas**, o Git pode recusar a troca, para não perder trabalho. **Commite antes de trocar**.

3.3 - Branch e `push`: escolhemos o remote e a branch

Na Aula 05, `git push -u origin main` foi apresentado como uma frase pronta. Agora ele pode ser lido em partes: `origin` é o **remote** (para onde vai) e `main` é a **branch** (o que vai). **Os dois são escolhas**, e `origin` e `main` são apenas os valores mais comuns.

```bash
# envia a branch "login" para o remote "origin"
git push origin login

# na primeira vez, -u guarda o destino: depois basta "git push"
git push -u origin login

# lista tambem as branches que existem nos remotes
git branch -a
```

Pontos que decorrem disso:

- **Uma branch local não existe no GitHub até o primeiro `push` dela.** Criar o galho na sua máquina não o publica.
- **`git push` envia a branch em que você está**, não "o projeto". Estar na branch errada é o erro mais comum.
- Um repositório pode ter **vários remotes** (por exemplo, `origin` e `upstream`, que aparecem na seção 6). Escolher o remote é escolher **para quem** você está enviando.
- No Git local, a branch do GitHub aparece com o prefixo do remote: `origin/main` é a cópia local da `main` que está no `origin`.

4 - SSH: a chave pública e o lugar onde ela vive

4.1 - Revisão: o par de chaves

Na Aula 05 geramos o par com `ssh-keygen -t ed25519`: a **chave privada** fica na máquina e nunca sai dela; a **chave pública** (`id_ed25519.pub`) é entregue ao GitHub, que a usa para confirmar que o `git push` vem de quem diz ser. A dúvida que fica é **onde, no GitHub, essa chave pública é cadastrada**, porque existem dois lugares, com alcances muito diferentes.

4.2 - Na conta inteira ou em um repositório só

| | Chave da conta | Chave de repositório (*deploy key*) |
|---|---|---|
| **Onde cadastrar** | Foto de perfil → Settings → SSH and GPG keys | No repositório → Settings → Deploy keys |
| **Alcance** | **Tudo** que a sua conta acessa: seus repositórios, seus forks e os de terceiros em que você é colaborador | **Só aquele repositório** |
| **Permissão** | A mesma que a sua conta tem | **Somente leitura** por padrão; escrita só se marcar "Allow write access" |
| **Quem usa** | Uma pessoa, no seu computador | Máquina que só precisa baixar o código: servidor de produção, CI |
| **Se vazar** | Quem tem a chave privada age **como você** em tudo | O estrago fica limitado a um repositório (e, sem escrita, a leitura) |

A lógica é o **princípio do menor privilégio**: dar a cada chave só o acesso de que ela precisa. Um servidor que apenas faz `git pull` do projeto não deveria carregar a chave da conta de quem o configurou; ele recebe uma *deploy key* somente leitura daquele repositório.

Para o aluno, a **chave da conta** é a certa: ele vai trabalhar em vários repositórios (o próprio, o fork do professor, os projetos das outras matérias), e a chave é de uma pessoa, no computador dela. É a que foi cadastrada na Aula 05.

4.3 - Por que SSH e não HTTPS

O mesmo repositório tem dois endereços de clone, e **a escolha do endereço é a escolha do protocolo**:

```text
git@github.com:luan-tavares/unifaat-es-2026.git        # SSH
https://github.com/luan-tavares/unifaat-es-2026.git    # HTTPS
```

- **SSH:** configura uma vez (a chave) e depois `push` e `pull` **não pedem nada**. A autenticação é a posse da chave privada, que não trafega pela rede.
- **HTTPS:** pede credencial a cada operação. Desde 2021 o GitHub **não aceita mais a senha da conta** no Git; é preciso um **token de acesso pessoal**, que é um segredo a mais para criar, guardar, renovar e que, se copiado para um script ou um print, vaza.

HTTPS não é "errado" (existem redes que bloqueiam a porta do SSH), mas **nesta disciplina usamos sempre SSH**: menos fricção e menos segredos soltos. Se o `clone` já foi feito por HTTPS, não precisa clonar de novo, basta trocar o endereço do remote:

```bash
# mostra os remotes e as URLs; se aparecer https://, esta no protocolo errado
git remote -v

# troca a URL do origin para a versao SSH
git remote set-url origin git@github.com:SEU-USUARIO/unifaat-es-2026.git

# testa a autenticacao
ssh -T git@github.com
```

5 - Merge e os cuidados

5.1 - O que é o merge

Os galhos nascem para voltar ao tronco. O **merge** (mesclar) pega os commits de um galho e **os traz para a branch em que você está**. A frase que importa está no final: o merge não "envia o galho para o main"; ele **traz o galho para onde o `HEAD` está**. Quem decide o destino é a branch atual.

```bash
# 1. vai para a branch que vai RECEBER (o destino)
git switch main

# 2. traz o galho "login" para dentro da main
git merge login
```

Há dois resultados possíveis:

- **Fast-forward:** se o `main` não andou desde que o galho nasceu, o Git só **avança o ponteiro** do `main` até o fim do galho. Nenhum commit novo, a linha continua reta.
- **Commit de merge:** se os dois lados andaram, o Git cria um commit novo com **dois pais**, um de cada lado. É o caso do grafo visto na Aula 10: o merge é o único commit com duas arestas de saída.

5.2 - Conflito

Se os dois universos mudaram **a mesma linha do mesmo arquivo**, o Git não sabe qual vale e **para**, pedindo que um humano decida. O arquivo recebe marcadores:

```text
<<<<<<< HEAD
titulo = "Entrar"
=======
titulo = "Login"
>>>>>>> login
```

Entre `<<<<<<<` e `=======` está a versão da branch atual; entre `=======` e `>>>>>>>`, a do galho que está entrando. Resolver é **editar o arquivo** até ficar do jeito certo, apagar os três marcadores e concluir:

```bash
# marca o arquivo como resolvido
git add arquivo.py

# conclui o merge (cria o commit de merge)
git commit

# desiste do merge e volta ao estado de antes
git merge --abort
```

Conflito não é erro: é o Git dizendo que **duas pessoas tomaram decisões diferentes** e que só uma pessoa pode escolher.

5.3 - Os cuidados

1. **Confira o destino antes de mesclar.** `git branch` (o `*` marca a atual). Mesclar estando na branch errada é o erro clássico.
2. **Commite antes.** Merge com arquivos modificados e não commitados mistura trabalho pronto com trabalho pela metade.
3. **Atualize o tronco antes.** `git pull` no `main` antes de mesclar; senão o merge é feito sobre um `main` velho.
4. **Mesclar no tronco é publicar.** Em equipe, ninguém comita direto no `main`: o galho vai para revisão (o Pull Request, seção 6) e só depois é mesclado.
5. **`git pull` é um `fetch` mais um `merge`.** Por isso ele também pode criar commit de merge e dar conflito. O `git pull --ff-only` só aceita o avanço limpo e **recusa** em vez de criar um merge surpresa.
6. **Merge não apaga o galho.** Depois de mesclado, o galho continua existindo; apagar é uma decisão separada (`git branch -d login`).
7. **Não reescreva histórico já publicado** (`git push --force`): quem já baixou aquele histórico fica com uma linha do tempo diferente da sua.

5.4 - Galhos que nunca são mesclados

Na prática de equipe, o galho **vira** parte do tronco quando é mesclado. Mas nem todo galho nasce para ser mesclado: um experimento, uma prova de conceito, um trabalho que só será **avaliado**. **Na nossa disciplina, os galhos dos alunos nunca são mesclados**: cada TF vive no seu galho, é lido, comentado e avaliado, e o `main` do repositório do professor **não recebe** nenhum deles. Guarde isso, porque explica o desenho da seção seguinte.

6 - Fork, sync e Pull Request

6.1 - O problema: o repositório não é seu

O repositório da disciplina (`https://github.com/luan-tavares/unifaat-es-2026`) pertence à conta do professor. Qualquer pessoa pode **ler** e **clonar** (é público), mas **só o dono e os colaboradores convidados podem escrever** nele. Se você clona direto e tenta `git push`, o GitHub **recusa** (erro 403). E isso é o desejado: **ninguém, a não ser o professor, tem acesso de escrita ao `main` da conta do professor**. Se todos pudessem, bastava um engano para bagunçar o material de toda a turma.

Como contribuir, então, com um projeto que não é seu? É o problema que o **fork** e o **Pull Request** resolvem.

6.2 - Fork: a sua cópia, na sua conta

O **fork** é um botão do GitHub (não um comando do Git) que **cria uma cópia do repositório do professor dentro da sua conta**: `github.com/SEU-USUARIO/unifaat-es-2026`. Essa cópia é um repositório de verdade, com todo o histórico, e **é seu**: nele você tem permissão de escrita.

Duas ideias para não confundir:

- **Fork não é clone.** O fork acontece **no GitHub** (de uma conta para outra); o clone acontece **entre o GitHub e a sua máquina**. O caminho completo é: fork (professor → você, no GitHub), depois clone (seu fork → seu computador).
- **O fork lembra de onde veio**, mas **não se atualiza sozinho**: quando o professor publicar a aula nova, o seu fork continua na aula antiga até você pedir a atualização.

Com o fork, a sua máquina passa a ter **dois remotes**, cada um com um papel:

| Remote | Aponta para | Para quê |
|--------|-------------|----------|
| `origin` | O **seu fork** | **Escrever** (`push`): é onde você tem permissão |
| `upstream` | O repositório do **professor** | **Ler** (`pull`): receber as aulas novas |

```bash
# 1. no navegador: botao Fork no repositorio do professor

# 2. clona o SEU fork (troque SEU-USUARIO)
git clone git@github.com:SEU-USUARIO/unifaat-es-2026.git
cd unifaat-es-2026

# 3. cadastra o repositorio do professor como upstream (so para ler)
git remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git

# 4. confere: origin = seu fork, upstream = professor
git remote -v
```

6.3 - Sync: trazer as aulas novas

O **sync** é manter o seu `main` igual ao do professor. É possível fazer isso pelo botão **Sync fork** do GitHub (atualiza o fork na nuvem) ou, pelo terminal, direto da fonte:

```bash
# vai para o main
git switch main

# traz as aulas novas do professor; so aceita avanco limpo
git pull --ff-only upstream main
```

O `pull` aqui tem um destino escolhido, igual ao `push` da seção 3.3: `upstream` (o remote) e `main` (a branch). O `--ff-only` é a proteção: se o seu `main` tiver sido alterado, o comando **recusa** em vez de misturar. É uma boa notícia: significa que o seu `main` deve ser **só uma cópia do professor**, onde ninguém commita.

6.4 - Push só em outra branch, e o Pull Request

Com o fork e o sync, o `pull` do professor funciona. O `push`, não: **não se envia nada ao `main` do professor**, porque você não tem permissão. O que se faz é:

1. Criar um **galho** a partir do `main` atualizado (`git switch -c RA-tf-NN`).
2. Commitar o trabalho **nesse galho**.
3. Enviar o galho para o **seu fork** (`git push -u origin RA-tf-NN`). Aqui há permissão, porque o `origin` é seu.
4. No GitHub, abrir um **Pull Request**.

O **Pull Request (PR)** é, literalmente, um **pedido**: "professor, **puxe** este galho do meu fork para o seu repositório". Ele não altera nada sozinho; abre uma página onde o professor vê as diferenças, comenta linha a linha e decide. Por isso o PR é a ponte entre o seu repositório (onde você manda) e o do professor (onde só o professor manda).

**O PR não é um comando do Git.** Nenhum `git ...` abre um Pull Request, porque o PR não existe dentro do `.git`: é um recurso do **GitHub** (a página, os comentários, a revisão). O `git push` só leva os commits para o fork; abrir o pedido é uma **segunda etapa, feita no site do GitHub**. É a mesma divisão da Aula 05: o Git é a ferramenta de versionamento, e o GitHub é o serviço que fica em cima dela. **Na nossa disciplina, o PR é aberto pela interface web do GitHub**: pelo banner **Compare & pull request**, que aparece no seu fork depois do `push`, ou pelo link de comparação. (Existem outras portas para o mesmo pedido, como o GitHub CLI, a API e extensões de editor, mas todas conversam com o GitHub; o `git` sozinho não cria PR.)

Na tela de criação do PR, duas escolhas definem tudo: a **base** (para onde: `luan-tavares/unifaat-es-2026`, branch `main`) e a **head** (de onde: o seu fork, o seu galho). Depois de aberto, novos commits enviados ao mesmo galho **entram no mesmo PR** automaticamente.

Na disciplina, lembre da seção 5.4: o PR **nunca é mesclado**. Ele funciona como **a entrega**: é o registro de que o trabalho existe, o lugar onde o professor lê e comenta.

7 - Como os TFs serão entregues

A partir desta aula, a entrega do TF muda: em vez de colar o link de um repositório num formulário, você abre um **Pull Request** com o seu galho. Em engenharia de software, é assim que o trabalho de equipe de verdade é entregue e revisado, e o professor já usa o mesmo fluxo em outras matérias do curso.

7.1 - Preparação (uma vez só)

1. Ter a **chave SSH** cadastrada na conta (Aula 05) e testada com `ssh -T git@github.com`.
2. Fazer o **fork** do repositório do professor.
3. **Clonar o seu fork** (nunca o do professor).
4. Cadastrar o **`upstream`** e conferir com `git remote -v`.

7.2 - O ciclo de cada TF

| Etapa | O que fazer | Comando |
|-------|-------------|---------|
| 1 | Ir para o `main` e **trazer a aula nova** | `git switch main` e `git pull --ff-only upstream main` |
| 2 | **Criar o galho do TF**, antes de editar qualquer arquivo | `git switch -c RA-tf-NN` |
| 3 | **Fazer o TF** e commitar nesse galho | `git add -A` e `git commit -m "TF-NN"` |
| 4 | **Enviar ao seu fork** (Git) e **abrir o Pull Request no site do GitHub** (interface web) | `git push -u origin RA-tf-NN` e, no navegador, o botão **Compare & pull request** |

As regras da entrega:

- **Um galho por TF**, com o nome `RA-tf-NN` (o seu RA, `-tf-`, o número do TF com dois dígitos). Exemplo: `6325000-tf-12`.
- **Uma estrutura de diretórios com o seu RA**, na raiz do repositório: o diretório `RA/`, o subdiretório `tf-NN/` e, dentro dele, um arquivo de texto com o nome do seu RA (`RA.txt`), com o seu **nome, RA e usuário do GitHub**. Exemplo: `6325000/tf-12/6325000.txt`.
- **Nunca commitar no `main`.** Ele é cópia do professor e só recebe `pull`. Antes de commitar, confira com `git branch`.
- **Um PR por TF**, do galho do seu fork para o `main` do professor, **aberto pela interface web do GitHub** (o `git push` não abre o PR). O PR **não é mesclado**.
- **O PR precisa aparecer** na lista de Pull requests do repositório do professor: sem ele, o TF **não é válido** (veja a seção 7.4).

7.3 - O Pull Request do TF, por dentro

Detalhes do PR que vale combinar desde já:

- **Título do PR:** `TF-NN · RA · Nome` (ex.: `TF-12 · 6325000 · Maria da Silva`). Na **descrição**, um texto curto dizendo o que foi feito.
- **Conferir antes de enviar:** o link de comparação mostra a **base** (`luan-tavares/unifaat-es-2026`, branch `main`) e o seu galho. Troque `SEU-USUARIO` e o nome do galho: `https://github.com/luan-tavares/unifaat-es-2026/compare/main...SEU-USUARIO:6325000-tf-12?expand=1`.
- **A estrutura do TF** (diretório com o RA, subdiretório `tf-NN` e o arquivo `RA.txt`) é criada **dentro do galho**, antes do commit:

```bash
# cria a branch do TF e ja entra nela (troque o RA)
git switch -c 6325000-tf-12

# cria o diretorio com o seu RA e o subdiretorio tf-12
mkdir -p 6325000/tf-12

# cria o arquivo 6325000.txt com nome, RA e usuario do GitHub
cat > 6325000/tf-12/6325000.txt <<EOF
Nome: Maria da Silva
RA: 6325000
GitHub: https://github.com/maria-silva
EOF
```

O resultado, na raiz do repositório, é esta árvore:

```text
unifaat-es-2026/
└── 6325000/
    └── tf-12/
        └── 6325000.txt
```

- **Depois da entrega:** o professor lê e corrige **abrindo o PR de cada aluno**. O PR não é mesclado: ele é fechado depois da correção. O seu galho continua intacto no seu fork.
- **O próximo TF:** nasce do `main` atualizado (`git switch main` e `git pull --ff-only upstream main`), sem arrastar o TF anterior. O galho do TF novo é outro galho, saindo do tronco.

O repositório tem uma página que mostra esse fluxo **animado**, com a aba de **comandos** (o que cada comando e cada parte dele faz) e a aba de **troubleshooting** (os erros mais comuns, como o `403` do `push`): `git-fluxo/index.html`, na raiz do repositório da disciplina (https://github.com/luan-tavares/unifaat-es-2026).

7.4 - Quando o TF é válido, e onde está a descrição

**O TF só é válido se o Pull Request aparecer** na lista de Pull requests do repositório do professor (https://github.com/luan-tavares/unifaat-es-2026/pulls). O `push` do galho para o seu fork **não é entrega**: ele só leva o código para a sua própria conta. O que o professor enxerga, corrige e registra é o **PR**. Por isso, depois de abrir o PR, **confira que ele aparece nessa lista**. Sem PR, não há TF, mesmo que o galho exista e esteja perfeito no seu fork.

Não há formulário. A **descrição do TF** fica num `README.md` dentro da pasta da aula, no GitHub: https://github.com/luan-tavares/unifaat-es-2026/tree/main/aula-12-branches-fork-pr (o mesmo link está no último slide e no botão **tf 12** da linha do tempo). O **prazo** do TF 12 é a **quarta-feira, 18/11**.

7.5 - O contexto: o que vocês já têm do 1º bimestre

Nada neste fluxo é ferramenta nova. Tudo foi construído nas primeiras aulas:

| Peça do fluxo | De onde vem |
|---------------|-------------|
| Terminal do **WSL** (`cd`, `ls`, `cat`) | Aulas 01 a 03 |
| `init`, `add`, `commit`, `log`, `HEAD` | Aula 04 |
| **Remote**, `push`, `pull`, `clone` e a **chave SSH** | Aula 05 |
| `.gitignore`, para o ambiente virtual não ser commitado | TFs 05 a 11 |
| O Git como **grafo** (commit é nó, branch é ponteiro, merge tem dois pais) | Aula 10 |

O que esta aula acrescenta é só a **camada de colaboração**: branch, merge, fork e Pull Request. Em todos os TFs até aqui o repositório era seu, e por isso o `push` sempre funcionou; agora o destino da entrega é o repositório do professor, e é isso que obriga a passar por fork e PR.

8 - Conclusão

A linha do tempo do Git deixou de ser uma só. A **branch** é um ponteiro barato que cria um universo paralelo; `checkout` e `switch` movem o `HEAD` entre eles; e o `push` é a escolha de um **remote** e de uma **branch**. O **merge** traz um galho para a branch em que você está, e por isso o primeiro cuidado é **conferir o destino**. O **fork** cria a sua cópia do repositório do professor, onde você tem permissão de escrita; o **sync** (`git pull --ff-only upstream main`) traz as aulas novas; e como ninguém além do professor escreve no `main` dele, a contribuição sai por um **galho**, em um **Pull Request**. Tudo isso autenticado por **SSH**: a chave da conta, sem senha e sem token.

Daqui em diante, **cada TF é um galho com o seu RA, e cada entrega é um Pull Request**.

9 - Referências

Scott Chacon e Ben Straub — Pro Git, capítulo 3: Git Branching (https://git-scm.com/book/pt-br/v2)
Git — documentação dos comandos `git switch`, `git checkout`, `git merge` e `git push` (https://git-scm.com/docs)
GitHub Docs — Fork a repo (https://docs.github.com/pt/get-started/quickstart/fork-a-repo)
GitHub Docs — Sobre pull requests (https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
GitHub Docs — Conectando-se ao GitHub com SSH (https://docs.github.com/pt/authentication/connecting-to-github-with-ssh)
GitHub Docs — Gerenciando chaves de implantação (https://docs.github.com/pt/authentication/connecting-to-github-with-ssh/managing-deploy-keys)
Material de aulas anteriores: Aula 04 (Versionamento e Git), Aula 05 (Git e GitHub) e Aula 10 (Estrutura de Dados: o Git como grafo).




Questões do TA:



QUESTÃO 1
Segundo o texto, o que é uma branch no Git?

A) Uma cópia completa de todos os arquivos do projeto, guardada em uma pasta separada.

B) Um ponteiro: um arquivo de texto com o hash de um commit, o que torna criar uma branch instantâneo e barato.

C) Um repositório novo, criado no GitHub a cada tarefa.

D) Uma chave SSH exclusiva de cada tarefa.

E) O nome do remote para onde o `push` envia os commits.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 2
Qual é a diferença entre `git checkout` e `git switch`, segundo o texto?

A) O `switch` só funciona no GitHub, e o `checkout` só funciona na máquina local.

B) Os dois são completamente diferentes: o `checkout` cria commits e o `switch` apaga branches.

C) O `checkout` é o comando antigo e faz várias coisas (troca de branch, restaura arquivos); o `switch` foi criado para cuidar só de trocar de branch.

D) O `switch` é o comando antigo e foi substituído pelo `checkout`.

E) O `checkout` só aceita o nome `main`.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 3
Em `git push -u origin login`, o que representam `origin` e `login`?

A) `origin` é a branch e `login` é o remote.

B) `origin` é o remote (para onde vai) e `login` é a branch (o que vai); os dois são escolhas, e `origin` e `main` são só os valores mais comuns.

C) `origin` é a chave SSH e `login` é o usuário do GitHub.

D) `origin` é o professor e `login` é o aluno.

E) Os dois são palavras reservadas do Git e não podem ser trocadas.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 4
Sobre onde a chave pública SSH pode ser cadastrada no GitHub, é correto afirmar que:

A) Só pode ser cadastrada na conta inteira; não existe cadastro por repositório.

B) A chave cadastrada na conta vale para tudo o que a conta acessa; a *deploy key* vale só para um repositório e é somente leitura por padrão.

C) A *deploy key* vale para todos os repositórios da conta e sempre permite escrita.

D) A chave privada é que deve ser cadastrada no GitHub, e a pública fica na máquina.

E) O cadastro da chave é opcional, pois o HTTPS dispensa qualquer credencial.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 5
Segundo o texto, qual é a principal vantagem do SSH sobre o HTTPS no dia a dia com o GitHub?

A) O SSH torna o `git push` mais rápido, porque compacta os arquivos.

B) O HTTPS é proibido pelo GitHub.

C) O SSH dispensa o remote, pois o endereço fica na chave.

D) Com o SSH a chave é configurada uma vez e o `push` e o `pull` não pedem credencial; no HTTPS é preciso um token de acesso pessoal, um segredo a mais para guardar.

E) O SSH permite escrever no repositório de qualquer pessoa, sem permissão.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 6
Ao rodar `git merge login`, o que acontece?

A) Os commits da branch `login` são trazidos para a branch em que o `HEAD` está; por isso é preciso conferir a branch atual antes.

B) A branch `main` é enviada para o GitHub.

C) A branch `login` é apagada automaticamente.

D) O Git sempre cria uma branch nova chamada `login-merge`.

E) O `main` é trazido para dentro da `login`, independentemente de onde o `HEAD` está.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 7
Por que a contribuição a um repositório que não é seu passa por fork e Pull Request?

A) Porque o Git não permite criar branches em repositórios públicos.

B) Porque só o dono e os colaboradores têm permissão de escrita no repositório; o fork cria uma cópia sua, onde você escreve, e o Pull Request pede ao dono que puxe o seu galho.

C) Porque o Pull Request mescla automaticamente o seu galho no `main` do professor.

D) Porque o fork é a mesma coisa que o clone e baixa o repositório para a máquina.

E) Porque o GitHub não aceita `push` por SSH em repositórios de terceiros.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 8
No fluxo de entrega dos TFs, qual é a ordem correta das etapas de cada TF?

A) Criar o galho `RA-tf-NN` no `main` desatualizado, fazer o TF direto no `main` e dar `push` no `upstream`.

B) Fazer o TF no `main`, abrir o Pull Request e só depois criar o galho.

C) Dar `push` no `upstream main` e depois fazer o fork.

D) Atualizar o `main` com `git pull --ff-only upstream main`, criar o galho `RA-tf-NN`, fazer e commitar o TF nele, e enviar com `git push -u origin RA-tf-NN` para abrir o Pull Request.

E) Clonar o repositório do professor de novo a cada TF e enviar um `.zip`.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 9
Segundo o texto, como o Pull Request é aberto na disciplina?

A) Com o comando `git pull-request`, depois do `git push`.

B) Automaticamente, no momento do `git commit`.

C) Pela interface web do GitHub, depois do `git push` do galho para o fork: o PR é um recurso do GitHub, e nenhum comando do Git o cria.

D) Pelo `git merge`, que envia o galho para o `main` do professor.

E) Com o `git clone` do repositório do professor.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 10
Segundo o texto, quando o TF 12 é considerado válido?

A) Quando o galho `RA-tf-12` é enviado ao seu fork com `git push`, mesmo sem abrir o Pull Request.

B) Quando o professor recebe o link do repositório por um formulário.

C) Quando o Pull Request aparece na lista de Pull requests do repositório do professor; o `push` para o fork sozinho não é entrega.

D) Quando o galho é mesclado (`git merge`) no `main` do professor.

E) Quando o arquivo é commitado diretamente no `main` do seu fork.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não
