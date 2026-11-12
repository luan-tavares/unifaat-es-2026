# Branches, Fork e Pull Request

**TF da Aula 12 · Engenharia de Software · UNIFAAT 2026.2 · Prof. Luan Lourenço**

Este arquivo é a descrição do TF. Link deste TF (por extenso):
https://github.com/luan-tavares/unifaat-es-2026/tree/main/aula-12-branches-fork-pr

---

## Contexto

Na Aula 12 vimos **branch**, **merge**, **fork**, **sync** e **Pull Request**. Este TF é a
primeira vez que vocês fazem o caminho completo: **a própria entrega é um Pull Request**.
Não há formulário: o seu TF só existe se o seu PR aparecer no repositório do professor.

Passo a passo animado, comandos e erros comuns (como o `403` no `push`):
`git-fluxo/index.html`, na raiz do repositório.

## O que fazer

Criar, no **seu fork**, uma branch com o seu RA, com um arquivo seu dentro de um
diretório com o seu RA, e abrir um Pull Request para o repositório do professor.

### 1. Preparação (se ainda não fez)

1. Chave SSH cadastrada na sua conta do GitHub (Aula 05), testada com `ssh -T git@github.com`.
2. **Fork** do repositório do professor: no navegador, abra
   https://github.com/luan-tavares/unifaat-es-2026 e clique em **Fork**.
3. **Clone do seu fork** (não o do professor) e o `upstream`:

   ```bash
   # troque SEU-USUARIO pelo seu usuario do GitHub
   git clone git@github.com:SEU-USUARIO/unifaat-es-2026.git
   cd unifaat-es-2026

   # cadastra o repositorio do professor com o apelido upstream (so para ler)
   git remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git

   # confere: origin = seu fork, upstream = professor
   git remote -v
   ```

### 2. Trazer a aula e criar a sua branch

```bash
# vai para o main (a copia do professor)
git switch main

# traz as aulas novas do professor (so avanco limpo)
git pull --ff-only upstream main

# cria a branch do TF, com o seu RA, e entra nela
git switch -c 6325000-tf-12
```

O nome da branch é **`RA-tf-12`** (o seu RA, `-tf-` e o número da aula).

### 3. Criar o diretório, o subdiretório e o arquivo

Na **raiz** do repositório, crie um diretório com o **seu RA**, dentro dele o subdiretório
**`tf-12`**, e dentro dele um arquivo de texto com o **nome do seu RA** (`RA.txt`):

```bash
# cria o diretorio do RA com o subdiretorio tf-12
mkdir -p 6325000/tf-12

# cria o arquivo 6325000.txt com nome, RA e usuario do GitHub
cat > 6325000/tf-12/6325000.txt <<EOF
Nome: Maria da Silva
RA: 6325000
GitHub: https://github.com/maria-silva
EOF
```

A estrutura final fica assim (troque `6325000` pelo seu RA):

```text
unifaat-es-2026/
└── 6325000/
    └── tf-12/
        └── 6325000.txt
```

O arquivo `6325000.txt` tem **três linhas**: o seu nome completo, o seu RA e o seu usuário
do GitHub (o link do seu perfil).

### 4. Commitar e enviar para o seu fork

```bash
# confira que voce esta na sua branch (o * marca a atual), e nao no main
git branch

# marca tudo e grava o commit
git add -A
git commit -m "TF-12"

# envia a branch para o SEU fork (origin), nunca para o upstream
git push -u origin 6325000-tf-12
```

### 5. Abrir o Pull Request (no site do GitHub)

O PR **não é um comando do Git**: ele é aberto no **site do GitHub**, pela interface web.

1. Abra o **seu fork** no navegador. Aparece o aviso **Compare & pull request**: clique nele.
   Se não aparecer, abra o link (troque `SEU-USUARIO` e o RA):
   `https://github.com/luan-tavares/unifaat-es-2026/compare/main...SEU-USUARIO:6325000-tf-12?expand=1`
2. Confira os dois lados:
   - **base repository:** `luan-tavares/unifaat-es-2026`, branch `main` (o repositório do professor);
   - **head repository:** o seu fork, branch `RA-tf-12`.
3. **Título:** `TF-12 · RA · Nome` (ex.: `TF-12 · 6325000 · Maria da Silva`).
4. Clique em **Create pull request**.

## Entrega

- **Prazo:** quarta-feira, **18/11**.
- **O TF só é válido se o Pull Request aparecer** na lista de Pull requests do repositório
  do professor: https://github.com/luan-tavares/unifaat-es-2026/pulls
  Fazer o `push` sem abrir o PR **não é entrega**. Depois de abrir, confira que o seu PR
  aparece nessa lista.
- **Nunca commitar no `main`:** ele é cópia do professor e só recebe `pull`.
- O PR **não é mesclado**: o professor lê, corrige e fecha.
- Esqueceu algo depois de abrir o PR? Faça outro commit **na mesma branch** e dê `git push`:
  o PR se atualiza sozinho. Não abra outro.
