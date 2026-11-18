# Arquitetura de Software

**TF da Aula 13 · Engenharia de Software · UNIFAAT 2026.2 · Prof. Luan Lourenço**

Este arquivo é a descrição do TF. Link deste TF (por extenso):
https://github.com/luan-tavares/unifaat-es-2026/tree/main/aula-13-arquitetura-de-software

---

## Contexto

Este TF tem **6 questões dissertativas** sobre a Aula 13. A entrega é a mesma da Aula 12: o
**Pull Request**. Não há formulário: o seu TF só existe se o seu PR aparecer no repositório do
professor. As respostas vão em **um arquivo Markdown (`.md`) seu**, dentro do PR.

Se ainda está inseguro com fork, branch e PR, siga este passo a passo com calma: ele repete
tudo o que a Aula 12 ensinou. Os erros comuns (como o `403` no `push`) estão em
`git-fluxo/index.html`, na raiz do repositório.

## Padronização dos nomes (decore, é isso que o professor procura)

Troque `6325000` pelo **seu RA** em todos os lugares:

| O quê                | Padrão                    | Exemplo                      |
| -------------------- | ------------------------- | ---------------------------- |
| Branch               | `RA-tf-13`                | `6325000-tf-13`              |
| Arquivo de resposta  | `tf13-RA-nome.md`         | `tf13-6325000-maria-da-silva.md` |
| Mensagem do commit   | `TF-13`                   | `TF-13`                      |
| Título do PR         | `TF-13 · RA · Nome`       | `TF-13 · 6325000 · Maria da Silva` |

**Não crie diretório**: o arquivo fica direto na raiz do repositório. No nome do arquivo: tudo minúsculo, sem espaço e sem acento, com hífen entre as palavras (`tf13`, o RA e o seu nome).

## Passo a passo

### 1. Você já tem o repositório na sua máquina? Então é só `pull`

Todos trabalham no **mesmo repositório**. Quem fez o TF 12 **já tem o clone e o `upstream`**:
não clone de novo, **atualize** com `pull`. Entre na pasta do repositório e confira:

```bash
cd unifaat-es-2026

# confere: origin = seu fork, upstream = professor
git remote -v
```

Se aparecerem `origin` (o seu fork) e `upstream` (o do professor), pule para o passo 2.

**Só se você ainda não tem o repositório localmente** (não fez o TF 12), faça uma vez só:

1. Chave SSH cadastrada no GitHub (Aula 05), testada com `ssh -T git@github.com`.
2. **Fork**: abra https://github.com/luan-tavares/unifaat-es-2026 e clique em **Fork**.
3. **Clone do seu fork** (não o do professor) e cadastro do `upstream`:

   ```bash
   # troque SEU-USUARIO pelo seu usuario do GitHub
   git clone git@github.com:SEU-USUARIO/unifaat-es-2026.git
   cd unifaat-es-2026

   # cadastra o repositorio do professor com o apelido upstream (so para ler)
   git remote add upstream git@github.com:luan-tavares/unifaat-es-2026.git

   # confere: origin = seu fork, upstream = professor
   git remote -v
   ```

### 2. Dar `pull` para trazer a aula 13 e criar a sua branch

O `modelo-tf-13.md` foi publicado depois da aula: **ele só chega na sua máquina com o `pull`**.

```bash
# vai para o main (a copia do professor)
git switch main

# PULL: traz as aulas novas do professor, incluindo o modelo do TF 13
git pull --ff-only upstream main

# cria a branch do TF, com o seu RA, e entra nela
git switch -c 6325000-tf-13
```

Se o `git switch` reclamar de alterações, você esqueceu algo na branch anterior: faça o
commit lá, volte ao `main` e tente de novo. Se o `pull` reclamar, avise o professor: não
force nada.

### 3. Criar o arquivo de resposta a partir do modelo

O modelo com as **6 perguntas** está em `aula-13-arquitetura-de-software/modelo-tf-13.md`.
Copie-o para a **raiz** do repositório, já com o nome no padrão `tf13-RA-nome.md`:

```bash
# copia o modelo (as perguntas) para a raiz, com o nome do seu arquivo de resposta
cp aula-13-arquitetura-de-software/modelo-tf-13.md tf13-6325000-maria-da-silva.md
```

A estrutura final fica assim:

```text
unifaat-es-2026/
├── aula-13-arquitetura-de-software/
└── tf13-6325000-maria-da-silva.md
```

Abra o arquivo no VS Code (`code tf13-6325000-maria-da-silva.md`), preencha **Nome, RA e GitHub**
no topo e escreva a sua resposta embaixo de cada **Resposta:**. Não altere o enunciado das
perguntas.

### 4. Commitar e enviar para o seu fork

```bash
# confira que voce esta na sua branch (o * marca a atual), e nao no main
git branch

# marca tudo e grava o commit
git add -A
git commit -m "TF-13"

# envia a branch para o SEU fork (origin), nunca para o upstream
git push -u origin 6325000-tf-13
```

### 5. Abrir o Pull Request (no site do GitHub)

O PR **não é um comando do Git**: ele é aberto no **site do GitHub**.

1. Abra o **seu fork** no navegador. Aparece o aviso **Compare & pull request**: clique nele.
   Se não aparecer, abra o link (troque `SEU-USUARIO` e o RA):
   `https://github.com/luan-tavares/unifaat-es-2026/compare/main...SEU-USUARIO:6325000-tf-13?expand=1`
2. Confira os dois lados:
   - **base repository:** `luan-tavares/unifaat-es-2026`, branch `main` (o do professor);
   - **head repository:** o seu fork, branch `RA-tf-13`.
3. **Título:** `TF-13 · RA · Nome` (ex.: `TF-13 · 6325000 · Maria da Silva`).
4. **Descrição:** cole o modelo abaixo e preencha.
5. Clique em **Create pull request**.

#### Modelo da descrição do PR

```text
TF 13 · Arquitetura de Software

Nome: Maria da Silva
RA: 6325000
GitHub: https://github.com/maria-silva

Arquivo: tf13-6325000-maria-da-silva.md
Questões respondidas: 6 de 6
```

## As 6 questões (resumo)

O enunciado completo está no `modelo-tf-13.md`. Resposta em texto corrido, de 5 a 10 linhas
cada, **com as suas palavras**.

1. Por que existe Engenharia de Software e não existe Arquitetura de Software como matéria?
2. Arquitetura como decisão cara de desfazer: exemplo fácil e difícil de reverter.
3. Código x IA: o que passa a valer mais e a opinião "a IA não vai nivelar o conhecimento".
4. Os dois chapéus (Tech Lead e PO) e o cão de guarda do produto.
5. Domínio (DDD), regra de negócio do cliente e o papel da spec.
6. Caso da pizzaria: MVP, prazo, escalabilidade e repertório (EDA, DDD ou SDD).

## Entrega

- **Prazo:** quarta-feira, **25/11**.
- **O TF só é válido se o Pull Request aparecer** na lista de Pull requests do repositório do
  professor: https://github.com/luan-tavares/unifaat-es-2026/pulls
  Fazer o `push` sem abrir o PR **não é entrega**. Depois de abrir, confira que o seu PR
  aparece nessa lista.
- **Nunca commitar no `main`:** ele é cópia do professor e só recebe `pull`.
- O PR **não é mesclado**: o professor lê, corrige e fecha.
- Esqueceu algo depois de abrir o PR? Faça outro commit **na mesma branch** e dê `git push`:
  o PR se atualiza sozinho. Não abra outro.
- Respostas copiadas do slide, do briefing ou de colegas (ou de IA sem revisão) valem zero:
  a Aula 13 inteira foi sobre pensar.
