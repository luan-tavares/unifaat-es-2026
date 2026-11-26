c

ccccc


































































# TF-14 — Linux Básico

**Aluna:** Jenifer Bianca Pinto Dias  
**RA:** 6326158  
**Curso:** UNIFAAT — Engenharia de Software

## Parte 1 — Informações do sistema

### 1. Identificação do sistema

Comando: `uname -a`

Resultado:
`Linux D06-033 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux`

O sistema utiliza o kernel Linux 5.15.167.4, em ambiente WSL2, com arquitetura x86_64 de 64 bits.

### 2. Identificação do usuário

Comando: `id`

Resultado:
`uid=1000(userunifaat) gid=1000(userunifaat) groups=1000(userunifaat),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),100(users)`

O usuário atual é `userunifaat`, com UID e GID 1000. Ele pertence a grupos como adm, sudo e plugdev.

### 3. Localização de comandos

Comando: `which git curl unzip`

Resultado:
- Git: `/usr/bin/git`
- Curl: `/usr/bin/curl`
- Unzip: não foi localizado.

### 4. Variável PATH

Comando: `echo "$PATH" | tr ':' '\n' | wc -l`

Resultado: `40`

A variável PATH contém 40 diretórios. Ela informa ao sistema onde procurar os programas executáveis.

### 5. Diretório pessoal

Comando: `ls -la ~`

O comando exibiu os arquivos e diretórios do usuário, incluindo arquivos de configuração como `.bashrc`, `.gitconfig` e o diretório `.ssh`. O parâmetro `-a` também mostra arquivos ocultos.

### 6. Dependências do Git

Comando: `apt-cache depends git`

Foram identificadas dependências como `libc6`, `libcurl3t64-gnutls`, `libexpat1`, `zlib1g` e `perl`.

As dependências são bibliotecas e programas necessários para o funcionamento do Git.

## Parte 2 — Permissões de arquivos

Foi criado o arquivo `deploy.sh` no diretório pessoal, com o conteúdo `echo "deploy ok"`.

Inicialmente, o arquivo tinha permissão:

`-rw-r--r--`

Ao tentar executar `./deploy.sh`, o sistema retornou `Permission denied`, pois o arquivo não tinha permissão de execução.

Foi utilizado o comando `chmod u+x deploy.sh`, que adicionou permissão de execução para o proprietário.

Depois da alteração, o arquivo apresentou:

`-rwxr--r--`

A execução apresentou o resultado:

`deploy ok`

### Comparação das permissões

- **644:** proprietário pode ler e escrever; grupo e outros podem ler.
- **755:** proprietário pode ler, escrever e executar; grupo e outros podem ler e executar.
- **600:** somente o proprietário pode ler e escrever.

As permissões ajudam a controlar o acesso e a execução dos arquivos no Linux.

## Parte 3 — Gerenciamento de pacotes

### 1. Consulta do pacote tree

Comando: `apt show tree`

O pacote consultado foi `tree`, versão `2.1.1-2ubuntu3.24.04.2`. Sua descrição informa que ele exibe diretórios em formato de árvore.

### 2. Dependências

Comando: `apt-cache depends tree`

Resultado: `tree` depende de `libc6`.

### 3. Verificação da instalação

Comando: `which tree`

O comando não retornou um caminho, indicando que o programa não estava disponível no PATH.

### 4. Tentativa de instalação

Foi tentada a instalação com:

`sudo -n apt install tree -y`

O sistema retornou:

`sudo: a password is required`

A instalação não pôde ser concluída porque o ambiente utilizado é um computador público e não havia autorização administrativa disponível.

### 5. Atualização do sistema

Não foi possível realizar atualizações ou alterações de pacotes que exigissem senha administrativa. Nenhuma instalação ou remoção foi concluída.

## Conclusão

A atividade permitiu praticar comandos básicos do Linux, identificar informações do sistema, consultar dependências, compreender a variável PATH e trabalhar com permissões de arquivos. Também foi possível consultar informações de pacotes com APT e identificar a limitação de permissões administrativas no ambiente utilizado.
