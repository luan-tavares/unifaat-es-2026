# Engenharia de Software — UNIFAAT 2026.2

Repositório base da disciplina de Engenharia de Software (ADS, Prof. Luan Tavares).
Aqui ficam os slides, os briefings e o código visto em aula, na pasta `src/`.

Linha do tempo das aulas: abra o arquivo `index.html` no navegador.

## Como baixar o repositório (git clone)

Tudo pelo terminal do **WSL (Ubuntu)**.

1. Vá até a pasta onde você quer guardar o projeto (por exemplo, a sua home):

   ```bash
   cd ~
   ```

2. Baixe o repositório com o `git clone`:

   ```bash
   git clone https://github.com/luan-tavares/unifaat-es-2026.git
   ```

3. Entre no diretório que o `git clone` criou:

   ```bash
   cd unifaat-es-2026
   ```

4. Para receber as atualizações das próximas aulas, rode dentro desse diretório:

   ```bash
   git pull
   ```

## Como instalar o Python no WSL

O Python precisa estar instalado **dentro do WSL**: o Python do Windows não vale
aqui, porque são dois ambientes isolados, cada um com o seu binário (Aulas 02 e 07).

1. Confira se ele já existe (o Ubuntu costuma trazer):

   ```bash
   python3 --version
   ```

   Se aparecer algo como `Python 3.12.3`, pode pular para o passo 3.

2. Se não existir, atualize a lista de pacotes e instale:

   ```bash
   sudo apt update
   sudo apt install python3 python3-pip python3-venv
   ```

3. Confira onde ficou o binário:

   ```bash
   which python3
   ```

   O esperado é `/usr/bin/python3`.

## Como executar os arquivos Python

1. Dentro do diretório do repositório (`cd unifaat-es-2026`), entre na pasta `src/`:

   ```bash
   cd src
   ```

2. Rode o arquivo passando o nome dele para o `python3`:

   ```bash
   python3 binario.py
   ```

   O resultado aparece direto no terminal. Para rodar outro arquivo, troque só o nome:

   ```bash
   python3 estruturas.py
   python3 lacos.py
   python3 merge_sort.py
   ```

Para ler e alterar o código, abra o projeto no VS Code de dentro do WSL:

```bash
code .
```

## O que tem em `src/`

| Arquivo | Assunto |
|---|---|
| `estruturas.py` | Tipos básicos e estruturas nativas: int, float, bool, str, list, tuple, dict e set |
| `lacos.py` | Laços de repetição: for, while, continue e break |
| `binario.py` | Conversão decimal → binário (divisão por 2) e binário → decimal |
| `merge_sort.py` | Ordenação por dividir para conquistar |

O `src/` cresce a cada aula: novos arquivos entram aqui ao longo do semestre.
