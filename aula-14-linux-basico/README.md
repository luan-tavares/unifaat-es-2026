# Linux Básico

**TF da Aula 14 · Engenharia de Software · UNIFAAT 2026.2 · Prof. Luan Lourenço**

Este arquivo é a descrição do TF. Link deste TF (por extenso):
https://github.com/luan-tavares/unifaat-es-2026/tree/main/aula-14-linux-basico

---

## Contexto

Este TF é **prático**: você vai rodar comandos no **terminal do WSL (Ubuntu)** e **colar a saída de
cada um** num arquivo Markdown (`.md`), explicando com as suas palavras o que ela mostra. São
**3 partes**, sobre o que vimos na Aula 14: o terminal e os binários, as permissões e o gerenciador de
pacotes. A entrega é a mesma das Aulas 12 e 13: o **Pull Request**. Não há formulário: o seu TF só
existe se o seu PR aparecer no repositório do professor.

As saídas dos comandos trazem o **seu usuário, a sua máquina e os seus arquivos**, e é isso que
mostra que o trabalho foi feito por você. **Rode no seu computador**; saída copiada de colega não
bate com o seu usuário e o professor percebe.

Se ainda está inseguro com fork, branch e PR, siga o passo a passo abaixo com calma. Os erros
comuns (como o `403` no `push`) estão em `git-fluxo/index.html`, na raiz do repositório.

## Padronização dos nomes (decore, é isso que o professor procura)

Troque `6325000` pelo **seu RA** em todos os lugares:

| O quê                | Padrão                    | Exemplo                      |
| -------------------- | ------------------------- | ---------------------------- |
| Branch               | `RA-tf-14`                | `6325000-tf-14`              |
| Arquivo de resposta  | `tf14-RA-nome.md`         | `tf14-6325000-maria-da-silva.md` |
| Mensagem do commit   | `TF-14`                   | `TF-14`                      |
| Título do PR         | `TF-14 · RA · Nome`       | `TF-14 · 6325000 · Maria da Silva` |

**Não crie diretório**: o arquivo fica direto na raiz do repositório. No nome do arquivo: tudo minúsculo, sem espaço e sem acento, com hífen entre as palavras (`tf14`, o RA e o seu nome).

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

### 2. Dar `pull` para trazer a aula 14 e criar a sua branch

O `modelo-tf-14.md` foi publicado depois da aula: **ele só chega na sua máquina com o `pull`**.

```bash
# vai para o main (a copia do professor)
git switch main

# PULL: traz as aulas novas do professor, incluindo o modelo do TF 14
git pull --ff-only upstream main

# cria a branch do TF, com o seu RA, e entra nela
git switch -c 6325000-tf-14
```

Se o `git switch` reclamar de alterações, você esqueceu algo na branch anterior: faça o
commit lá, volte ao `main` e tente de novo. Se o `pull` reclamar, avise o professor: não
force nada.

### 3. Criar o arquivo de resposta a partir do modelo

O modelo com as **3 partes** está em `aula-14-linux-basico/modelo-tf-14.md`.
Copie-o para a **raiz** do repositório, já com o nome no padrão `tf14-RA-nome.md`:

```bash
# copia o modelo (as perguntas) para a raiz, com o nome do seu arquivo de resposta
cp aula-14-linux-basico/modelo-tf-14.md tf14-6325000-maria-da-silva.md
```

A estrutura final fica assim:

```text
unifaat-es-2026/
├── aula-14-linux-basico/
└── tf14-6325000-maria-da-silva.md
```

Abra o arquivo no VS Code (`code tf14-6325000-maria-da-silva.md`), preencha **Nome, RA e GitHub**
no topo e cole as saídas nos blocos de código e escreva a explicação em cada **Explicação:**. Não altere os
comandos nem o enunciado.

### 4. Commitar e enviar para o seu fork

```bash
# confira que voce esta na sua branch (o * marca a atual), e nao no main
git branch

# marca tudo e grava o commit
git add -A
git commit -m "TF-14"

# envia a branch para o SEU fork (origin), nunca para o upstream
git push -u origin 6325000-tf-14
```

### 5. Abrir o Pull Request (no site do GitHub)

O PR **não é um comando do Git**: ele é aberto no **site do GitHub**.

1. Abra o **seu fork** no navegador. Aparece o aviso **Compare & pull request**: clique nele.
   Se não aparecer, abra o link (troque `SEU-USUARIO` e o RA):
   `https://github.com/luan-tavares/unifaat-es-2026/compare/main...SEU-USUARIO:6325000-tf-14?expand=1`
2. Confira os dois lados:
   - **base repository:** `luan-tavares/unifaat-es-2026`, branch `main` (o do professor);
   - **head repository:** o seu fork, branch `RA-tf-14`.
3. **Título:** `TF-14 · RA · Nome` (ex.: `TF-14 · 6325000 · Maria da Silva`).
4. **Descrição:** cole o modelo abaixo e preencha.
5. Clique em **Create pull request**.

#### Modelo da descrição do PR

```text
TF 14 · Linux Básico

Nome: Maria da Silva
RA: 6325000
GitHub: https://github.com/maria-silva

Arquivo: tf14-6325000-maria-da-silva.md
Partes feitas: 3 de 3
```

## As 3 partes (resumo)

O enunciado completo, com os comandos de cada parte, está no `modelo-tf-14.md`. Em todas, cole o
**comando** e a **saída** num bloco de código e escreva a explicação em **texto corrido, com as
suas palavras**.

### Parte 1 · Diário de terminal

Rode estes 6 comandos e cole a saída de cada um: `uname -a`, `id`, `which git curl unzip`,
`echo $PATH`, `ls -la ~` e `apt-cache depends git`. Para cada saída, 1 a 3 frases dizendo **o que
ela mostra** (qual kernel, em quais grupos você está, em que diretório está cada binário, qual
diretório do `PATH` vem primeiro, quais dot files existem e para que servem dois deles, três
dependências do `git`).

### Parte 2 · Permissões na prática

Crie um script `deploy.sh`, tente executar e veja o `Permission denied`. Corrija com `chmod`, execute
de novo e deixe o arquivo em `644`, `755` e `600`, colando o `ls -l` de cada estado. Explique por
que deu `Permission denied`, o que cada letra de `rwx` mudou e quando se usa `644`, `755` e `600`.

### Parte 3 · Gerenciador de pacotes (`apt`)

Atualize o catálogo e os programas (`update` e `upgrade`), veja os dados do pacote `tree`
(`apt show` e `apt-cache depends`), **instale**, confira onde o binário foi parar (`which`),
**remova** e confira de novo. Explique a diferença entre `update` e `upgrade`, a dependência do
`tree` e o que mudou depois do `remove`.

## Entrega

- **Prazo:** a definir (o professor informa em aula).
- **O TF só é válido se o Pull Request aparecer** na lista de Pull requests do repositório do
  professor: https://github.com/luan-tavares/unifaat-es-2026/pulls
  Fazer o `push` sem abrir o PR **não é entrega**. Depois de abrir, confira que o seu PR
  aparece nessa lista.
- **Nunca commitar no `main`:** ele é cópia do professor e só recebe `pull`.
- O PR **não é mesclado**: o professor lê, corrige e fecha.
- Esqueceu algo depois de abrir o PR? Faça outro commit **na mesma branch** e dê `git push`:
  o PR se atualiza sozinho. Não abra outro.
- **Não cole o conteúdo de chaves SSH nem senhas.** No `ls -la ~` aparece só o nome do `.ssh`,
  e é só o nome que deve ir para o arquivo.
- Saídas copiadas de colega ou inventadas (e explicações de IA sem revisão) valem zero: a aula
  foi sobre **usar** o terminal.
