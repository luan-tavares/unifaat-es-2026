Briefing para produção audiovisual e de conteúdo
Aula Completa
2026.2



Professor: Luan Tavares Lourenço
Disciplina: Engenharia de Software


Aula:
1☐ 2☐ 3☐ 4☐ 5☐ 6☐ 7☐ 8☐ 9☐ 10☐ 11☐ 12☐ 13☒ 14☐ 15☐ 16☐


Título da aula:

Arquitetura de Software


Opção do TA:  Vídeo ☐Texto ☒

1 - Introdução

Nas aulas anteriores o curso construiu a **base**: terminal e Linux, Git e GitHub, Python, orientação a objetos, estruturas de dados, código limpo (Object Calisthenics) e o trabalho em equipe com branches, fork e Pull Request. Esta aula responde à pergunta que vem logo depois: **com essa base, o que um profissional de software realmente faz o dia inteiro?**

A resposta surpreende quem está começando: **no mercado, escreve-se menos código do que se imagina**. Cada vez mais, o tempo vai para **entender o problema do cliente, decidir como o sistema se organiza, combinar escopo e prazo, ler e revisar o que outras pessoas (e a IA) escreveram, e manter tudo funcionando em equipe**. Digitar código é uma parte da profissão, e é a parte que mais se automatiza.

O caminho da aula tem seis passos. Primeiro, **por que não existe uma matéria de Arquitetura de Software, como existe a de Engenharia**: uma base única, e uma arquitetura que começa em cada assunto e depois se junta às outras. Segundo, **código x IA**: o que muda quando gerar código fica barato, com uma **opinião polêmica do professor** sobre a IA nivelar (ou não) o conhecimento. Terceiro, **o que é arquitetura de software** e **como ela se diferencia da engenharia de software**, e por que as duas precisam andar juntas. Quarto, **Tech Lead x PO**: os dois chapéus de quem cuida do produto. Quinto, o **chapéu do PO**: o domínio e o DDD, a spec, o MVP e a estimativa de prazo. Sexto, o **chapéu do Tech Lead**: o repertório de arquitetura (EDA, DDD, SDD), a escalabilidade, a equipe (código limpo e Git), o poder do terminal e dos servidores, e a automação, que é uma ideia anterior à IA e que a sustenta.

2 - Por que não existe uma matéria de "Arquitetura de Software", como existe a de Engenharia?

2.1 - A pergunta

Antes de falar de arquitetura, vale responder uma pergunta que a turma pode estar se fazendo: **se arquitetura é tão importante, por que a disciplina se chama Engenharia de Software e não existe uma matéria chamada Arquitetura de Software?**

A resposta está em como o curso é organizado: existe **uma base que é única**, e existem **arquiteturas que começam em cada assunto** e, mais tarde, se juntam.

2.2 - A base é única (e é extensa)

Apesar de extensa, a base é **a mesma para todos os assuntos de ADS**: terminal e Linux, Git e GitHub, lógica e algoritmos, estruturas de dados, orientação a objetos, código limpo e trabalho em equipe. Seja qual for o caminho (web, banco de dados, infraestrutura, dados, mobile), todo mundo passa por ela, e ela precisa vir **antes**, uma vez só. É essa base que a disciplina de Engenharia de Software cobre.

2.3 - A arquitetura começa em cada assunto

Já a arquitetura **não é uma só**: ela **começa em cada assunto**, e cada área tem a sua, com decisões e trade-offs próprios:

| Área | Perguntas típicas de arquitetura |
| --- | --- |
| **Banco de dados** | Como modelar os dados? Que índices? Qual a consistência necessária? |
| **Web** | Como dividir front e back? Que camadas? Como expor a API? |
| **Infraestrutura** | Onde o sistema roda? Como escala? E se um servidor cair? |

Por isso a arquitetura **nasce dentro de cada matéria** que vem depois: ano que vem, em disciplinas como **Infraestrutura, Banco de Dados e Desenvolvimento Web**, cada uma vai ensinar a arquitetura do seu assunto. Cada uma também tem a **sua engenharia** (a base específica daquele assunto), mas todas se apoiam na **base em comum**, que precisa ser vista antes.

2.4 - Depois elas se juntam e se agregam

Só depois de cada área ter a sua arquitetura é que elas podem **se juntar** na arquitetura do sistema como um todo: como o banco, a web e a infraestrutura conversam entre si, e quais decisões de cada parte pesam nas outras. Nessa junção, a arquitetura do sistema **agrega a arquitetura das outras áreas** e também **a engenharia de cada uma**: quem projeta o sistema inteiro precisa entender o que cada parte exige e o que ela entrega.

```text
                    ARQUITETURA DO SISTEMA
     (agrega a arquitetura E a engenharia de cada parte, com criterio)
                              ^
        +---------------------+---------------------+
        |                     |                     |
  arq. de banco          arq. de web          arq. de infra
  + eng. de banco        + eng. de web        + eng. de infra
        ^                     ^                     ^
        +---------------------+---------------------+
                              |
                BASE EM COMUM (Engenharia de Software)
   terminal, Git, algoritmos, estruturas de dados, OO, codigo limpo
```

Esta aula é, portanto, uma **prévia**: apresenta o **conceito geral** de arquitetura e como ela se relaciona com a engenharia, para que, quando cada disciplina ensinar a arquitetura do seu assunto, você já saiba **o que está procurando** e **como as partes se encaixam depois**.

3 - Código x IA: o que se faz no mercado

3.1 - Escrever código ficou barato

Sintaxe, código repetitivo e o framework da moda estão virando **commodity**: uma ferramenta de IA gera em segundos o que levava horas. Isso não torna o programador inútil; muda **onde está o valor**. O que continua escasso é:

- **Entender o problema** que o cliente realmente tem (que quase nunca é o que ele disse na primeira conversa).
- **Decidir a estrutura** do sistema: onde ficam as fronteiras, quem fala com quem, o que é fácil e o que é caro de mudar depois.
- **Julgar** o que foi gerado: o código está certo, é seguro, cabe no sistema, a equipe consegue manter?

**Quem tem base consegue avaliar, corrigir e direcionar o que a IA produz; quem não tem apenas aceita ou rejeita no escuro.** Por isso a disciplina faz terminal, Git e binário na mão: o modelo mental se forma **fazendo**, e a automação entra depois, sobre algo que o aluno entende.

3.2 - Ler e revisar mais do que escrever

Um código é **escrito uma vez e lido muitas vezes**, quase sempre por outra pessoa. Com a IA, essa conta piora a favor da leitura: uma pessoa passa a **revisar** muito mais código do que escreve. Quem não sabe ler código com critério (acoplamento, nomes, responsabilidades, riscos) vira o gargalo ou, pior, deixa passar o erro.

| | Antes | Cada vez mais |
| --- | --- | --- |
| Tempo gasto | Digitando | Entendendo, decidindo, revisando |
| Gargalo | Escrever | Saber o que pedir e o que aceitar |
| Habilidade valorizada | Sintaxe | Julgamento e domínio do negócio |
| Tempo com o cliente | Pouco: o código come a agenda | Mais: construir relacionamento e entender o domínio dele |
| Erro típico | Bug de digitação | Estrutura errada que "funciona" |

3.3 - A ironia da automação

Existe uma armadilha conhecida desde 1983 (Lisanne Bainbridge, *Ironies of Automation*): **quanto mais um processo é automatizado, menos as pessoas sabem sobre ele**. O projetista automatiza o que consegue e deixa para a pessoa o **resíduo**: as exceções e os casos difíceis. A pessoa perde a prática, e quando o sistema falha quem assume precisa ser **melhor do que antes**, justamente quando está menos treinada.

Para a carreira, a lição é direta: a base **é perecível**. Forma-se fazendo e perde-se deixando de fazer. Usar a IA não dispensa saber o que ela está fazendo; é o contrário, é isso que permite usá-la com segurança.

3.4 - Opinião polêmica do professor: a IA não vai nivelar o conhecimento

Ouve-se muito que a IA vai **nivelar** o conhecimento: se todo mundo tem acesso à mesma ferramenta, todo mundo passa a saber o mesmo, e a diferença entre quem estudou e quem não estudou desaparece. **Eu discordo**, e essa é uma opinião, não um consenso: vale discutir, e não apenas aceitar.

O primeiro sinal de que a tese é fraca é a história. **Essa promessa já foi feita antes, e não se cumpriu.** Com o buscador, qualquer pessoa passou a ter toda a informação do mundo a um clique. Com a computação, a calculadora, a planilha e os fóruns de programação também. Se acesso à informação nivelasse o conhecimento, ele já estaria nivelado há décadas. Não está: a diferença entre as pessoas continuou grande. **Acesso não é conhecimento.** A IA é a ferramenta mais poderosa dessa linhagem, mas é da mesma linhagem.

Há dois motivos para achar que ela tende a **ampliar** a diferença, e não a reduzi-la:

- **1) A pessoa vira um "proxy" de informação.** Quando a IA responde tudo, é fácil virar apenas o intermediário entre a pergunta e a resposta: o conteúdo passa por você, mas **não fica** com você. A tendência é a **acomodação**: não se faz o esforço de entender, não se erra, não se repete, e é justamente isso que forma conhecimento. Resultado: muita gente com respostas na mão e pouco conhecimento **acumulado**. É a ironia da automação (seção 3.3) aplicada ao estudo, e lembra o que já se observa com os buscadores, quando as pessoas passam a lembrar **onde achar** a informação em vez da informação (Sparrow, Liu e Wegner, 2011, *Google Effects on Memory*).
- **2) A IA devolve o que você pede, e o que você pede depende do que você sabe.** A IA é o seu **prompt**. Fazer algo bem feito com IA é **direcionar**, e direcionar exige repertório: vocabulário técnico, noção de arquitetura, critério para reconhecer o que é bom. A ferramenta é a mesma, o resultado não é. Compare dois pedidos para o mesmo sistema:

```prompt
# pedido vago: a IA devolve um sistema de loja qualquer
faz um sistema de loja

# pedido dirigido: quem sabia o que pedir recebe outra coisa
separe a regra de frete no domínio, sem acoplar à tela, com nomes do negócio
```

```text
mesma ferramenta, mesma IA

  pouca base  -->  pedido vago     -->  resposta generica    -->  "funciona... ate nao funcionar"
  muita base  -->  pedido dirigido -->  resposta util        -->  revisa, corrige, decide
```

A IA recombina o que já existe e **não é criativa**. Nas palavras de Fabio Akita: **“Se você der todo o conhecimento de física clássica para a IA, ela não é capaz de derivar a física moderna.”** A decisão e a criação continuam com a pessoa.

A IA funciona como um **multiplicador**: ela multiplica o que você já tem. Quem tem base ganha **alavanca**; quem não tem ganha, no máximo, a **ilusão de competência**, que é pior, porque não avisa quando está errada.

Para ser justo: a IA reduz barreiras de verdade. Ela tira dúvidas a qualquer hora e explica de dez jeitos até um funcionar. Quem a usa **para aprender** (pedindo explicação, tentando antes, conferindo a resposta) sai na frente. O que separa os dois lados não é ter ou não ter a ferramenta, é **usá-la como professor ou como proxy**. E isso nos traz de volta à tese da aula: o que não vira commodity é a **base** e o **julgamento**.

Pergunta para a turma: **"se todo mundo tem a mesma ferramenta, o que faz o resultado ser diferente?"**

4 - O que é arquitetura de software

4.1 - Uma definição prática

Existem muitas definições. A mais útil para o dia a dia vem de **Martin Fowler** e **Ralph Johnson**: **arquitetura é o conjunto de decisões que são difíceis de mudar depois**.

Não é o desenho bonito num slide, nem a escolha de uma ferramenta isolada. É a resposta para perguntas como:

- Como o sistema se **divide em partes**?
- Onde ficam as **fronteiras** e **quem se comunica com quem**?
- Qual **banco de dados** usar? A comunicação é **síncrona ou assíncrona**?
- **Monólito** (uma peça só) ou **serviços** (várias peças independentes)?
- Onde mora a **regra de negócio**: espalhada pelas telas ou concentrada em um lugar?

4.2 - O critério: custo de reversão

A pergunta que separa uma decisão de arquitetura de uma decisão qualquer é: **quanto custa voltar atrás?** Trocar o nome de uma variável custa segundos. Trocar o banco de dados depois de um ano em produção custa meses. **Quanto maior o custo de reversão, mais arquitetural é a decisão.**

```text
custo de
reversão
   ^
   |                                  * banco de dados
   |                          * divisão em serviços
   |                  * fronteiras entre módulos
   |          * estrutura de pastas
   |  * nome de variável
   +--------------------------------------------------> impacto no sistema
```

A linha entre arquitetura e "só engenharia" é **móvel**: uma decisão que parecia arquitetural vira apenas engenharia quando você consegue torná-la **barata de mudar**. Boa parte do trabalho de arquitetura é isto: **transformar decisões irreversíveis em reversíveis**, ou **adiar** as irreversíveis até saber mais.

4.3 - Arquitetura não é APENAS "juntar tecnologias"

Dois alunos podem juntar exatamente as mesmas tecnologias, e só um estar fazendo arquitetura: **aquele que sabe por que escolheu e quanto custaria desfazer**. Quem apenas monta faz **integração**; quem projeta faz **arquitetura**. Cada escolha tem um preço em cinco frentes:

| Critério | Pergunta |
| --- | --- |
| **Custo** | Quanto custa construir e quanto custa operar? |
| **Reversibilidade** | Quanto custa voltar atrás? |
| **Escalabilidade** | O que acontece quando o uso crescer? |
| **Segurança** | O que um atacante (ou um erro) consegue alcançar? |
| **Manutenção** | A equipe consegue entender e mudar isso daqui a um ano? |

5 - Engenharia de software x arquitetura de software

5.1 - Dois pontos do mesmo espectro

Engenharia e arquitetura **não são disciplinas separadas**. São dois pontos de um mesmo espectro de decisões.

- **Engenharia** é o corpo de princípios que permite projetar e construir software com qualidade: algoritmos e complexidade, estruturas de dados, orientação a objetos, acoplamento e coesão, abstração, boas práticas, controle de versão, testes, ambiente de trabalho.
- **Arquitetura** é a **aplicação desses princípios às decisões estruturais**, aquelas com trade-offs reais e difíceis de desfazer.

Em uma frase: **engenharia é a base sólida; arquitetura é saber juntar as peças com critério.**

5.2 - Comparando

| | Engenharia | Arquitetura |
| --- | --- | --- |
| Tipo de decisão | Local, do dia a dia | Estrutural, global |
| Se errar... | Conserto em dias | Conserto em meses |
| Horizonte | Otimiza o presente | Otimiza o futuro |
| Pergunta típica | "Como implemento isso bem?" | "Como organizo isso para poder mudar depois?" |
| Exemplo | Escolher a estrutura de dados de uma função | Decidir se o pedido e o estoque são módulos separados |
| Onde aparece nas aulas | Python, OO, estruturas de dados, Object Calisthenics | Fronteiras, módulos, dependências, domínio |

**Analogia:** o engenheiro mecânico não aprende "a montar um motor". Aprende termodinâmica, resistência dos materiais e cálculo, e a partir disso projeta coisas que ainda nem existem. Em software, o framework da vez é o "modelo do motor"; os princípios são a física por trás dele.

5.3 - Por que os dois devem andar juntos

- A arquitetura **emerge** das micro-decisões de engenharia acumuladas, **querendo ou não**. Quem não decide a estrutura acaba tendo uma, só que por acidente.
- **Engenharia sem visão arquitetural** gera muito código bom dentro de uma estrutura ruim.
- **Arquitetura sem engenharia** gera diagramas bonitos que o código não respeita. E quando o diagrama diz uma coisa e o sistema faz outra, **o sistema ganha**.
- O julgamento de arquitetura se forma **depois da base**: quem nunca sentiu o problema de um acoplamento ruim num projeto pequeno não percebe o perigo dele num sistema grande.

```text
engenharia sem arquitetura          arquitetura sem engenharia
-------------------------          -------------------------
codigo limpo em cada arquivo       diagrama impecavel na parede
         |                                   |
         v                                   v
estrutura que ninguem decidiu      codigo que ninguem seguiu
         |                                   |
         v                                   v
"funciona, mas nao da pra mudar"   "o sistema faz outra coisa"
```

**Dá para aprender sem base? Dá, mas custa caro, e o preço é o tempo.** Base e critério não são pré-requisito para **fazer funcionar**; são o que **reduz o custo de chegar lá**. No caso do professor, aprender por tentativa e erro, sem esse caminho organizado, custou **mais de 20 anos**. Quem começa com a base e o critério, como esta turma, pode chegar ao mesmo ponto em **4 a 5 vezes menos tempo**. Isso não elimina o contato com sistemas reais, que o julgamento fino de arquitetura ainda exige, mas encurta muito a estrada.

5.4 - Mentalidade de engenharia clássica

Na engenharia tradicional ninguém projeta uma ponte sem pensar em carga, fadiga e fator de segurança. Em software essa cultura é mais fraca. Perguntas que um bom profissional faz desde cedo:

- O que acontece quando isso quebra?
- Quanta carga isso aguenta?
- O que eu estou travando com essa escolha?
- Quanto custaria desfazer?

6 - Tech Lead x PO: os dois chapéus

6.1 - Metodologias: só os termos

Metodologias ágeis, como o Scrum, organizam o trabalho em equipe, e esta aula **não vai explicar nenhuma**. Usamos apenas alguns **termos do Scrum**, como **PO** (*Product Owner*), porque ajudam a nomear o que um profissional de software faz além de programar. O **Tech Lead** não é um papel do Scrum: é um papel comum nas equipes, e vale olhar os dois lado a lado.

6.2 - Dois chapéus

| | PO (Product Owner) | Tech Lead |
| --- | --- | --- |
| Pergunta | O **quê** e **por quê**? | **Como**? |
| Ouve | O cliente e o negócio | O time e o código |
| Decide | O que entra no MVP e a prioridade | A arquitetura e a engenharia |
| Cuida de | Critério de aceite e valor entregue | Qualidade e do que é difícil de mudar |
| Com o time | Prioriza e recorta | Revisa e destrava |

No caso do professor, as **duas coisas** acontecem ao mesmo tempo: é preciso decidir o que o produto deve ser e como ele deve ser construído.

6.3 - Com a IA: o cão de guarda do produto

Com a IA escrevendo mais código, **sobra tempo para o produto**. A pessoa passa a ser o **cão de guarda do produto**:

- **Ouvir o cliente e melhorar o produto**, em vez de passar o dia digitando.
- **Escolher a melhor arquitetura e engenharia** para implementá-lo.
- **Cobrar terceiros e dependências externas** (uma biblioteca, uma API, um fornecedor) até entregarem, **sem prejudicar o produto**: quem depende de outro precisa acompanhar e cobrar a entrega.

A aula segue os dois chapéus: primeiro o do **PO** (domínio, spec, MVP e prazo) e depois o do **Tech Lead** (repertório de arquitetura, escala, equipe, terminal e automação).

7 - PO: o domínio, o diferencial é a regra de negócio

7.1 - O que é o domínio

**Domínio** é a área de conhecimento do negócio para o qual o software existe: logística, saúde, varejo, educação, finanças. O código de uma loja virtual não é sobre `if` e `for`; é sobre **pedido, frete, estoque, desconto, devolução**. Linguagem e framework se aprendem em semanas; **a regra de negócio do cliente é o que leva meses e o que ninguém consegue gerar por você**, porque não está em lugar nenhum além da cabeça das pessoas do negócio.

Por isso o profissional que **entende o domínio** costuma valer mais do que o que apenas domina uma tecnologia: ele sabe **o que perguntar**, **o que o cliente esqueceu de dizer** e **quando uma regra não faz sentido**.

7.2 - DDD: Domain-Driven Design

**DDD** (projeto orientado ao domínio) é uma abordagem apresentada por **Eric Evans** em 2003: o **modelo do software deve refletir o modelo do negócio**, construído em conversa constante com quem conhece o negócio. Três ideias para levar:

- **Linguagem ubíqua:** desenvolvedores e especialistas do negócio usam **as mesmas palavras**, e essas palavras são os nomes das classes e métodos. Se o cliente diz "carrinho abandonado", o código não deve dizer `TempOrderFlag2`.
- **Contexto delimitado (bounded context):** a mesma palavra muda de sentido conforme a área. "Cliente" para o **financeiro** (quem paga e tem limite de crédito) não é o "Cliente" do **suporte** (quem abre chamados). Em vez de um modelo gigante que serve a todos, cada contexto tem o seu modelo, com **fronteiras explícitas**.
- **Regra de negócio no domínio:** a regra mora em **um lugar**, nas classes do domínio, e não espalhada em telas, controladores e consultas.

```text
contexto VENDAS            contexto ENTREGA          contexto FINANCEIRO
+----------------+         +----------------+        +----------------+
| Cliente        |         | Destinatario   |        | Pagador        |
|  nome, carrinho|         |  endereco      |        |  limite, divida|
| Pedido, Item   |         | Entrega, Rota  |        | Fatura         |
+----------------+         +----------------+        +----------------+
        |  "pedido confirmado"      |   "entrega concluida"    |
        +-------------------------->+------------------------->+
              (fronteiras claras, conversa por eventos/contratos)
```

7.3 - Exemplo: a regra num lugar só

Imagine a regra do cliente: **frete grátis para pedidos a partir de R$ 200; abaixo disso, frete de R$ 25**. Se essa regra for copiada em três telas, qualquer mudança vira caça ao tesouro. No domínio, ela existe **uma vez**, com o nome que o negócio usa:

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class Item:
    nome: str
    preco: float
    quantidade: int


class Pedido:
    LIMITE_FRETE_GRATIS = 200
    VALOR_FRETE = 25

    def __init__(self, itens):
        self.itens = itens

    def subtotal(self):
        return sum(item.preco * item.quantidade for item in self.itens)

    def frete(self):
        # regra de negocio do cliente, escrita uma unica vez
        if self.subtotal() >= self.LIMITE_FRETE_GRATIS:
            return 0
        return self.VALOR_FRETE

    def total(self):
        return self.subtotal() + self.frete()


pedido = Pedido([Item("Livro", 80.0, 2), Item("Caneta", 5.0, 4)])
print(pedido.subtotal())  # 180.0
print(pedido.frete())     # 25
print(pedido.total())     # 205.0
```

Quando o cliente disser "agora o frete grátis começa em R$ 150", **a mudança é de uma linha**, em um lugar que tem o nome da regra. Isso é arquitetura e engenharia juntas: a **decisão** (a regra mora no domínio) e a **execução** (classe pequena, sem `else`, com nomes do negócio).

8 - PO: spec, o que vira importante quando se coda menos

8.1 - O que é uma spec

**Spec** (especificação) é o texto que descreve **o que o software deve fazer**, sem depender de como será escrito: as regras, os exemplos, os limites e o critério para dizer "está pronto". Ela já existia (requisitos, histórias de usuário, documentos de regras), mas muda de papel: quando a máquina escreve a maior parte do código, **a spec passa a ser o trabalho mais importante que sobra para a pessoa**.

A razão é simples: uma IA, assim como uma equipe nova, **executa o que está escrito, e não o que você tinha na cabeça**. Se a spec é vaga, a ambiguidade não desaparece: ela vira **código plausível e errado**, que parece funcionar e só falha na regra que ninguém escreveu. É o mesmo princípio do prompt da seção 3.4, só que mais sério: quem direciona bem, especifica bem.

8.2 - O que uma boa spec tem

- **A regra, em linguagem do negócio:** as mesmas palavras do cliente (a linguagem ubíqua da seção 7.2).
- **Exemplos concretos de entrada e saída:** "subtotal 180 dá frete 25; subtotal 200 dá frete 0". Exemplo vale mais do que adjetivo.
- **O que está fora do escopo:** o que **não** será feito agora, para ninguém assumir por conta própria.
- **Critério de aceite:** como saberemos que está pronto, de preferência algo que se possa conferir.
- **Restrições:** prazo, segurança, volume esperado, o que não pode quebrar.

Veja a regra do frete (seção 7.3) escrita como spec, e a diferença que ela faz no pedido à IA:

```markdown
## Frete

- Regra: pedido com subtotal a partir de R$ 200 tem frete grátis; abaixo disso, frete de R$ 25.
- Exemplos: subtotal 180 -> frete 25; subtotal 200 -> frete 0; subtotal 350 -> frete 0.
- Fora do escopo: cálculo por CEP e escolha de transportadora.
- Aceite: os três exemplos acima passam como teste.
```

```prompt
# sem spec: a IA inventa as regras que faltam
faz o calculo de frete do pedido

# com spec: a IA tem o que seguir e voce tem como conferir
implemente o frete conforme docs/frete.md e escreva um teste para cada exemplo
```

8.3 - Spec como parte do código

- **Versionada no Git:** a spec vive no repositório, ao lado do código, e muda por **branch e Pull Request**, como tudo (Aula 12). Mudou a regra do cliente, muda a spec **primeiro**, e a revisão da spec é a revisão mais barata do projeto.
- **Teste é spec executável:** os exemplos da spec viram testes que a máquina roda sozinha. Se a IA gerar código que não respeita a spec, **o teste falha**, e não o cliente.
- **Quem revisa precisa da spec:** sem ela, revisar código gerado é só opinião ("parece certo"). Com ela, é conferência ("atende ao exemplo 2?").

```text
cliente --> conversa --> SPEC --> codigo (voce ou IA) --> teste confere a SPEC
                          ^                                        |
                          +---------- ajusta a spec <--------------+
```

A cadeia vale para a profissão inteira: **domínio** (o que o cliente precisa) vira **spec** (o que combinamos) vira **código** (o que a máquina escreve) vira **teste** (a prova de que bate). Quem domina as duas primeiras pontas é quem dirige as outras.

9 - PO: combinado com o cliente, MVP e prazo

9.1 - MVP: o menor produto que ensina algo

**MVP** (*Minimum Viable Product*, produto mínimo viável) é a menor versão do produto que já **entrega valor real** e permite **aprender com o uso**. Termo popularizado por **Eric Ries** (*A Startup Enxuta*). Dois equívocos comuns:

- MVP **não é** "a versão ruim e quebrada": é pequena, mas funciona e resolve um problema de verdade.
- MVP **não é** "tudo o que o cliente pediu, só que mais rápido": é um **recorte**, e recortar exige conversar.

Como acordar um MVP com o cliente:

- Listar o que o cliente quer e perguntar, de cada item: **"se isso ficar de fora na primeira entrega, o negócio para?"**
- Combinar **o que entra** e, com a mesma clareza, **o que fica de fora** (e por quê).
- Definir o **critério de aceite**: como saberemos que está pronto? ("o cliente consegue fazer um pedido e pagar por Pix.")
- Combinar **quando haverá nova conversa**, porque o MVP existe para ser ajustado.

9.2 - Estimar prazos sem prometer o impossível

Estimar é prever o que ainda não se conhece, e isso é difícil por natureza. Algumas ideias práticas:

- **Estimativa é faixa, não ponto.** "De 4 a 6 semanas" é mais honesto (e mais útil) do que "5 semanas". A incerteza é maior no início e **diminui conforme o projeto avança** (o chamado **cone da incerteza**, descrito por Steve McConnell).
- **Quebre em pedaços pequenos.** É muito mais fácil estimar "tela de login" do que "o sistema".
- **Inclua o que não é código:** conversa com o cliente, revisão, testes, correções, implantação.
- **Dado real vale mais que palpite.** Quanto tempo tarefas parecidas levaram antes?
- **Mais gente não acelera automaticamente um projeto atrasado.** É a **Lei de Brooks** (Fred Brooks, *O Mítico Homem-Mês*): colocar pessoas num projeto atrasado costuma atrasá-lo mais, porque o custo de comunicação cresce.
- **Prazo, escopo e qualidade formam um triângulo:** se o prazo aperta, **o escopo** é o que deve ceder (o MVP de novo), e não a qualidade escondida.

10 - Tech Lead: repertório de arquitetura

10.1 - Repertório: saber que a opção existe

A IA só entrega o que você sabe pedir (seção 3.4). Quem não conhece uma arquitetura não vai pedi-la, nem reconhecer que ela cabe no problema. **Repertório de arquitetura** é conhecer as opções, o que cada uma resolve e o que ela cobra de você. A lista abaixo não é completa: são três exemplos.

10.2 - EDA, DDD e SDD

| | Tipo | Ideia | Pede de você |
| --- | --- | --- | --- |
| **EDA** (*Event-Driven Architecture*) | Estilo de arquitetura | Serviços se falam por **eventos**: quem publica "pedido criado" não sabe quem reage (estoque, e-mail, cobrança) | Assincronia, fila, consistência eventual |
| **DDD** (*Domain-Driven Design*) | Abordagem de projeto | O modelo do software **reflete o negócio**: linguagem ubíqua e contextos delimitados (seção 7.2) | Conversar com quem conhece o negócio |
| **SDD** (*Spec-Driven Development*) | Abordagem de desenvolvimento | A **spec dirige** o código (e a IA), e o teste confere (seção 8) | Escrever bem a spec |

Repare na palavra "arquitetura": a **EDA** é um estilo de arquitetura, enquanto **DDD** e **SDD** são formas de projetar e de desenvolver, que se combinam com um estilo.

10.3 - Nenhuma é melhor sempre

Cada uma **troca custos**. A EDA, por exemplo, ganha desacoplamento entre as partes, mas deixa o fluxo mais difícil de acompanhar e traz consistência eventual. Ter repertório não é escolher a opção da moda, é saber que ela existe e **quando usar**.

11 - Tech Lead: escalabilidade

**Escalabilidade** é a capacidade do sistema de **continuar funcionando bem quando a carga cresce** (mais usuários, mais dados, mais pedidos por segundo).

| | Escala vertical | Escala horizontal |
| --- | --- | --- |
| Ideia | Um servidor **maior** | **Mais** servidores |
| Vantagem | Simples, não muda o código | Passa do limite de uma máquina |
| Limite | O maior servidor que existe | Complexidade de coordenar as partes |
| Exige | Pouca mudança | Sistema que não guarde estado em uma máquina só |

Duas verdades que parecem contraditórias e não são:

- **Não otimize cedo demais.** *"A otimização prematura é a raiz de todo o mal"* (Donald Knuth). Construir para um milhão de usuários antes de ter cem é gastar prazo e dinheiro em um problema que talvez nunca exista.
- **Mas não feche portas sem saber.** A arquitetura deve **permitir** crescer: fronteiras claras entre as partes, regra de negócio isolada, nada que prenda o sistema a uma única máquina por acidente. Decidir quando escalar é adiar uma decisão cara até ter dados.

12 - Tech Lead: trabalhar em equipe, código limpo e Git

12.1 - Código limpo é um acordo coletivo

Em equipe, o código é a **forma de comunicação** entre pessoas. O **Object Calisthenics** (Aula 11) e as boas práticas treinam exatamente isso: classes pequenas, nomes que revelam intenção, um nível de indentação, regras no lugar certo. Código limpo **não é gosto pessoal ou vaidade**; é o que permite que a pessoa que entrou na equipe ontem consiga mudar o sistema hoje **sem quebrar o que a outra pessoa fez**.

Dois conceitos que ligam código limpo à arquitetura, e que valem em qualquer escala:

- **Coesão:** o que está junto deve **mudar junto** (a regra do frete mora na classe do pedido).
- **Acoplamento:** o que está separado deve **mudar separado** (mudar o frete não deve exigir mexer na tela, no banco e no e-mail).

**Alta coesão e baixo acoplamento** é a mesma ideia em duas escalas: numa classe de dez linhas e numa divisão de módulos.

12.2 - Como o Git sustenta a equipe

Tudo o que foi aprendido em Git nas Aulas 04, 05 e 12 é a **infraestrutura do trabalho coletivo**:

| O que aprendemos | Para que serve numa equipe |
| --- | --- |
| **Commit** (Aula 04) | Histórico com autor e motivo: "quem mudou o quê, e por quê" |
| **Remote**, `push`, `pull` e SSH (Aula 05) | Todos trabalham sobre a mesma fonte da verdade |
| **Branch** (Aula 12) | Cada pessoa trabalha numa tarefa sem pisar na outra |
| **Merge** e conflito (Aula 12) | Juntar o trabalho e resolver divergências com critério |
| **Fork e Pull Request** (Aula 12) | Propor uma mudança e **abrir para revisão** antes de entrar |
| **Git como grafo** (Aula 10) | Entender o histórico como estrutura, não como lista |

O **Pull Request** merece destaque: ele é o ponto onde a equipe **revisa**. É a mesma habilidade de ler código com critério (seção 3.2), agora como ritual de equipe, e é o lugar natural para a arquitetura se proteger: "isso respeita as fronteiras que combinamos?".

13 - Tech Lead: o poder do terminal e dos servidores

13.1 - Onde o software roda de verdade

Sem entrar nos detalhes do que é um servidor: o software que as pessoas usam **roda em servidores**, e esses servidores quase nunca têm tela, mouse ou janelas. Para entrar neles, olhar o que está acontecendo, consertar algo ou publicar uma versão nova, a porta de entrada é o **terminal**, normalmente por **SSH** (a mesma chave da Aula 05). Quem só sabe usar interface gráfica fica **do lado de fora** da parte onde o sistema realmente vive.

13.2 - Por que saber terminal importa

| Motivo | O que significa na prática |
| --- | --- |
| **Servidores não têm interface** | Para operar um sistema em produção, o terminal é o caminho e muitas vezes o único |
| **Repetível e automatizável** | Um comando se repete, vira script e roda sozinho; um clique não vira nada |
| **Rápido e combinável** | Pequenos comandos se ligam entre si, um alimentando o outro (o *pipe*) e resolvem em uma linha o que levaria minutos de cliques |
| **É a língua das ferramentas** | Git, Python, Docker, testes, CI e deploy: tudo isso é comando |
| **Mostra o que está por baixo** | Entender o que a ferramenta faz permite consertar quando ela quebra |

Um exemplo do dia a dia: entrar no servidor, ver o final do log da aplicação e contar quantos erros apareceram.

```bash
# entra no servidor remoto (usa a chave SSH da Aula 05)
ssh usuario@servidor

# mostra as ultimas 50 linhas do log da aplicacao
tail -n 50 /var/log/app.log

# procura as linhas com erro e conta quantas sao
grep ERROR /var/log/app.log | wc -l
```

13.3 - Terminal, IA e responsabilidade

Os assistentes de IA que **agem** (que editam arquivos e executam comandos) trabalham **no terminal**. Isso torna o terminal mais importante, e não menos: quem não entende o que um comando faz **não consegue supervisionar** o que a IA executa em seu nome, e um comando errado no servidor errado tem consequências reais. É a ironia da automação (seção 3.3) de novo: a máquina faz, mas **a responsabilidade continua sendo da pessoa**. Por isso a disciplina começou pelo terminal, pelo Linux e pelo Git, e não pela IA.

14 - Tech Lead: automação, uma ideia que vem antes da IA

14.1 - Automatizar é anterior à inteligência artificial

A IA é a automação mais recente, **não a primeira**. Desde sempre, quem programa **automatiza o que se repete**: um script que prepara o ambiente, um comando que roda os testes, um processo que publica o sistema. A pergunta de fundo não é "qual ferramenta", é **"isso é repetitivo, previsível e sujeito a erro humano? Então a máquina faz."**

A ordem que funciona, e que a disciplina seguiu desde o começo:

```text
1. ENTENDER      -> saber o que o processo faz (terminal, Git, binario "na mao")
2. FAZER A MAO   -> executar o passo a passo ate dominar
3. AUTOMATIZAR   -> transformar o passo a passo em script/pipeline
4. DELEGAR A IA  -> usar IA sobre o que voce ja entende e consegue conferir
```

**Pular direto para o passo 4** é cair na ironia da automação (seção 3.3): quando algo falhar, ninguém sabe o que o sistema fazia por baixo.

14.2 - Exemplos de automação no dia a dia

- Um **script** que roda tudo o que precisa ser conferido antes de enviar o código:

```bash
#!/usr/bin/env bash
# para o script no primeiro erro
set -e

# roda os testes
python3 -m pytest

# confere o estilo do codigo
python3 -m flake8 .
```

- Uma **integração contínua (CI)**, que roda esse mesmo script **sozinha** a cada Pull Request, sem depender de alguém lembrar:

```yaml
name: testes
# dispara a cada Pull Request aberto
on: [pull_request]
jobs:
  testes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      # instala as dependencias e roda os testes
      - run: pip install -r requirements.txt
      - run: python -m pytest
```

Testes e CI ainda não foram vistos na disciplina; aparecem aqui só para mostrar **a ideia**: a automação cuida do repetitivo para que as pessoas gastem atenção no que exige julgamento (arquitetura, domínio, revisão).

14.3 - Automatizar também é decisão de arquitetura

Depender de automação é uma **decisão arquitetural**, e o custo de reversão dela **cresce em silêncio**: se o pipeline de implantação quebra e **ninguém sabe fazer o caminho manual**, a decisão virou irreversível sem que alguém tenha decidido isso. Perguntas de arquitetura que decorrem daí:

- O que acontece quando a automação falha? Existe um **modo degradado**?
- Alguém ainda **sabe fazer à mão**?
- O processo automatizado está **documentado como código** (versionado no Git), e não só na cabeça de uma pessoa?

15 - Conclusão

No mercado, **escreve-se menos código e decide-se mais**. Com a IA gerando o repetitivo, o que sobra de valor é **entender o domínio**, **decidir a estrutura** e **julgar o que foi produzido**. **Arquitetura** é o conjunto das decisões difíceis de mudar, e o critério que a define é o **custo de reversão**; **engenharia** é a base de princípios que permite executar bem cada decisão. Uma sem a outra falha: código bom numa estrutura ruim, ou diagrama bonito que o sistema ignora.

O **domínio** (com a ideia do DDD: linguagem ubíqua, contextos delimitados, regra num lugar só) é onde o profissional se diferencia. Acordar um **MVP**, estimar **em faixas** e pensar em **escala sem otimizar cedo** são formas de conduzir o projeto com o cliente. E tudo isso acontece **em equipe**, sustentado por **código limpo**, pelo **Git** (branch, merge, Pull Request) e por **automação**: uma ideia anterior à IA, que só faz sentido quando se entende o que está sendo automatizado.

Por isso a base é única e vem primeiro, na Engenharia de Software, enquanto a **arquitetura começa em cada assunto** (banco, web, infraestrutura) e só depois elas se juntam, agregando a arquitetura e a engenharia umas das outras, na arquitetura do sistema.

A pessoa que cuida do produto usa **dois chapéus**: o de **PO** (o quê e por quê: domínio, spec, MVP, prazo) e o de **Tech Lead** (como: repertório de arquitetura, escala, equipe, terminal e automação). Com a IA codando mais, sobra tempo para ser o **cão de guarda do produto**: ouvir o cliente, escolher bem a arquitetura e a engenharia e cobrar quem pode atrapalhar.

Com menos código para escrever, a **spec** passa a ser o trabalho central: ela é o que se combina com o cliente, o que se entrega à IA e o que o teste confere. E o **terminal** continua sendo a porta de entrada dos servidores, de toda ferramenta que usamos e da própria IA que age.

E, ao contrário do que se diz, a IA **não nivela** o conhecimento: ela multiplica o que a pessoa já sabe, e quem a usa como atalho para não aprender vira apenas um proxy de informação.

Em uma frase: **a engenharia é a base sólida; a arquitetura é saber juntar as peças com critério; e o critério vem de conhecer o problema do cliente.**

16 - Referências

Martin Fowler — Who Needs an Architect? (https://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)
Mark Richards e Neal Ford — Fundamentals of Software Architecture (O'Reilly)
Robert C. Martin — Clean Architecture (Prentice Hall)
Eric Evans — Domain-Driven Design: Tackling Complexity in the Heart of Software (Addison-Wesley, 2003)
Eric Ries — A Startup Enxuta (Lean Startup)
Steve McConnell — Software Estimation: Demystifying the Black Art (Microsoft Press)
Frederick P. Brooks Jr. — O Mítico Homem-Mês (The Mythical Man-Month)
Lisanne Bainbridge — Ironies of Automation (Automatica, 1983)
Betsy Sparrow, Jenny Liu e Daniel M. Wegner — Google Effects on Memory: Cognitive Consequences of Having Information at Our Fingertips (Science, 2011)
Material de aulas anteriores: Aula 04 (Versionamento e Git), Aula 05 (Git e GitHub), Aula 10 (Estrutura de Dados), Aula 11 (Object Calisthenics) e Aula 12 (Branches, Fork e Pull Request).



Questões do TA:



QUESTÃO 1
Segundo o texto, o que acontece com o trabalho do profissional de software no mercado quando a IA passa a gerar código com facilidade?

A) A profissão deixa de exigir base técnica, porque a IA decide a estrutura do sistema.

B) O programador passa a digitar ainda mais código, para compensar a velocidade da IA.

C) Escreve-se menos código e cresce o peso de entender o problema, decidir a estrutura e julgar o que foi gerado.

D) O Git e o trabalho em equipe deixam de ser necessários.

E) O domínio do negócio passa a ser irrelevante, pois o código já vem pronto.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 2
Qual é a definição prática de arquitetura de software apresentada na aula, atribuída a Martin Fowler e Ralph Johnson?

A) O conjunto de decisões que são difíceis de mudar depois.

B) O desenho de telas e diagramas feito antes de qualquer código.

C) A escolha do framework mais moderno do mercado.

D) A tarefa de escrever o código mais rápido possível.

E) O nome dado à estrutura de pastas do projeto.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 3
Segundo o texto, qual critério separa uma decisão de arquitetura de uma decisão qualquer de engenharia?

A) O número de linhas de código envolvidas.

B) A linguagem de programação usada.

C) O fato de ser tomada por uma pessoa sênior.

D) O custo de reversão: quanto custa voltar atrás depois que a decisão foi tomada.

E) A quantidade de pessoas que usam o sistema.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 4
Como o texto descreve a relação entre engenharia de software e arquitetura de software?

A) São áreas independentes e uma pode existir perfeitamente sem a outra.

B) São dois pontos de um mesmo espectro de decisões: a engenharia é a base de princípios e a arquitetura a aplica às decisões estruturais, difíceis de desfazer.

C) A arquitetura substitui a engenharia depois que o sistema cresce.

D) A engenharia cuida só do código e a arquitetura só do hardware.

E) A arquitetura é a parte da engenharia que trata apenas de interface gráfica.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 5
Segundo o texto, o que significa dizer que, quando o diagrama diz uma coisa e o sistema faz outra, "o sistema ganha"?

A) Que o diagrama deve ser sempre apagado do projeto.

B) Que o sistema sempre está correto e o diagrama sempre está errado.

C) Que a documentação é proibida em equipes que usam Git.

D) Que o cliente vai preferir o sistema ao diagrama.

E) Que o que vale é o comportamento real do código: a arquitetura que existe é a que o código implementa, e não a que está desenhada.

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 6
No DDD, o que é a "linguagem ubíqua"?

A) Uma linguagem de programação própria para sistemas distribuídos.

B) O idioma em que o código deve ser traduzido para o inglês.

C) O uso das mesmas palavras do negócio, por desenvolvedores e especialistas, inclusive como nomes de classes e métodos.

D) Um padrão de nomes curtos para economizar espaço no código.

E) O vocabulário técnico que somente a equipe de desenvolvimento entende.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 7
Segundo o texto, por que a regra de negócio (como o limite de frete grátis) deve morar em um único lugar, nas classes do domínio?

A) Porque assim o código roda mais rápido.

B) Porque, quando o cliente mudar a regra, a alteração é pequena e localizada, em vez de exigir caçar a mesma regra copiada em várias partes.

C) Porque o Python proíbe repetir números no código.

D) Porque regras de negócio nunca mudam depois de implementadas.

E) Porque assim a IA deixa de ser necessária.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 8
Segundo o texto, o que é um MVP e como ele deve ser acordado com o cliente?

A) A versão final e completa do produto, entregue no prazo mais curto possível.

B) Uma versão quebrada, feita só para cumprir o prazo e corrigida em segredo depois.

C) Um protótipo desenhado que nunca chega a ser usado por ninguém.

D) A menor versão que já entrega valor real e permite aprender com o uso, combinando com o cliente o que entra, o que fica de fora e o critério de aceite.

E) Uma lista de tudo o que o cliente pediu, em ordem alfabética.

Gabarito: D)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 9
Segundo o texto, qual é a melhor forma de comunicar uma estimativa de prazo ao cliente?

A) Em faixa (por exemplo, "de 4 a 6 semanas"), reconhecendo a incerteza, que diminui conforme o projeto avança.

B) Como um número exato, para transmitir segurança.

C) Sem prazo algum, porque estimar é sempre impossível.

D) Sempre dobrando o prazo mais otimista, sem explicar o motivo.

E) Copiando o prazo de qualquer outro projeto, sem considerar as diferenças.

Gabarito: A)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 10
Segundo o texto, qual é a relação entre automação e inteligência artificial, e qual a ordem recomendada para chegar a elas?

A) A automação só passou a existir com a IA, e deve ser a primeira etapa.

B) A IA deve ser usada antes de entender o processo, para ganhar tempo.

C) Automatizar é desnecessário quando existe IA, porque ela substitui todos os scripts.

D) Entender e fazer à mão deve ser evitado, porque atrasa a automação.

E) A automação é anterior à IA; a ordem recomendada é entender, fazer à mão, automatizar e só então delegar à IA o que já se entende e se consegue conferir.

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 11
Segundo o texto, por que a spec ganha importância quando a IA passa a escrever grande parte do código?

A) Porque a IA só funciona se a spec tiver mais de cem páginas.

B) Porque a IA executa o que está escrito, e não o que estava na cabeça de quem pediu; spec vaga vira código plausível e errado.

C) Porque a spec substitui o teste e o Git.

D) Porque spec é obrigatória por lei em qualquer projeto de software.

E) Porque a spec dispensa conversar com o cliente.

Gabarito: B)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 12
Segundo o texto, por que saber usar o terminal continua importante, inclusive na era da IA?

A) Porque o terminal é o único lugar onde a IA consegue gerar código.

B) Porque servidores são operados com interface gráfica e o terminal é opcional.

C) Porque o terminal permite instalar a IA, e nada mais.

D) Porque, com a IA, o terminal deixou de ser necessário.

E) Porque servidores quase nunca têm interface gráfica, comandos são repetíveis e automatizáveis, e quem não entende o que um comando faz não consegue supervisionar o que a IA executa.

Gabarito: E)

Misturar as alternativas? (x ) Sim (  ) Não



QUESTÃO 13
Segundo o texto, por que existe uma disciplina chamada Engenharia de Software e não uma chamada Arquitetura de Software?

A) Porque a arquitetura é menos importante do que a engenharia e por isso não é ensinada.

B) Porque arquitetura de software só se aprende com a IA, fora do curso.

C) Porque existe uma base única e comum a todos os assuntos de ADS, que vem antes; já a arquitetura começa em cada assunto (banco, web, infraestrutura), dentro de cada disciplina, e depois pode se juntar às outras, agregando também a engenharia delas.

D) Porque a arquitetura é uma só, igual para banco, web e infraestrutura, e dispensa disciplina própria.

E) Porque a engenharia de software ensina apenas arquitetura de banco de dados.

Gabarito: C)

Misturar as alternativas? (x ) Sim (  ) Não
