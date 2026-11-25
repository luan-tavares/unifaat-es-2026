# TF 14 · Linux Básico

Nome: (seu nome completo)
RA: (seu RA)
GitHub: (link do seu perfil, ex.: https://github.com/maria-silva)

> Rode tudo no **terminal do WSL (Ubuntu)**, no seu computador. Em cada item, cole o **comando** e a
> **saída** num bloco de código e escreva a explicação em texto corrido, com as suas palavras. Apague
> as linhas entre parênteses ao responder. Não cole conteúdo de chaves SSH nem senhas.

---

## Parte 1 · Diário de terminal

Rode cada comando, cole a saída e explique o que ela mostra.

### 1.1 · `uname -a`

```text
(cole a saída aqui)
```

**Explicação:** (qual é o kernel em uso e qual é o nome da máquina?)

### 1.2 · `id`

```text
(cole a saída aqui)
```

**Explicação:** (qual é o seu usuário e em quais grupos você está? O que o grupo `sudo` permite?)

### 1.3 · `which git curl unzip`

```text
(cole a saída aqui)
```

**Explicação:** (em que diretório está cada binário? Se algum não apareceu, o que isso significa e como instalar?)

### 1.4 · `echo $PATH`

```text
(cole a saída aqui)
```

**Explicação:** (quantos diretórios há no PATH? Qual vem primeiro e por que a ordem importa?)

### 1.5 · `ls -la ~`

```text
(cole a saída aqui; não precisa copiar o conteúdo de nenhum arquivo)
```

**Explicação:** (escolha **dois** dot files ou dot folders da lista e diga para que servem. Escolha **um** item e leia as suas permissões letra por letra: dono, grupo e outros.)

### 1.6 · `apt-cache depends git`

```text
(cole a saída aqui)
```

**Explicação:** (cite **três** dependências do git e diga para que serve cada uma. Por que o gerenciador de pacotes traz todas de uma vez?)

---

## Parte 2 · Permissões na prática

Rode os comandos na ordem e cole a saída de cada `ls -l` e de cada execução.

```bash
mkdir -p ~/tf14 && cd ~/tf14
echo 'echo "deploy ok"' > deploy.sh
ls -l deploy.sh
./deploy.sh
chmod u+x deploy.sh
ls -l deploy.sh
./deploy.sh
chmod 644 deploy.sh
ls -l deploy.sh
chmod 755 deploy.sh
ls -l deploy.sh
chmod 600 deploy.sh
ls -l deploy.sh
```

**Saídas:**

```text
(cole aqui a saída de TODOS os comandos acima, na ordem)
```

**Explicação:** (1) por que o primeiro `./deploy.sh` deu `Permission denied`? (2) o que o `chmod u+x`
mudou, em letras, no `ls -l`? (3) leia as permissões de `644`, `755` e `600` (dono, grupo e outros) e
diga **quando** se usa cada uma. (4) por que a chave SSH privada exige `600`?)

---

## Parte 3 · Gerenciador de pacotes (apt)

Rode os comandos na ordem e cole a saída de cada um (se a saída for muito longa, cole só as
**10 primeiras linhas** e escreva `(...)`).

```bash
sudo apt update && sudo apt upgrade -y
apt show tree
apt-cache depends tree
sudo apt install tree -y
which tree
tree --version
sudo apt remove tree -y
which tree
```

**Saídas:**

```text
(cole aqui a saída dos comandos acima, na ordem)
```

**Explicação:** (1) qual é a diferença entre `apt update` e `apt upgrade`, e por que a ordem importa?
(2) do que o `tree` depende, segundo o `apt-cache depends`? (3) em que diretório o binário foi
instalado? (4) o que mudou no segundo `which tree`, depois do `remove`?)
