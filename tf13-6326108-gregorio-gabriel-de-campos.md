# TF 13 · Arquitetura de Software

Nome: Gregório Gabriel de Campos
RA: 6326108
GitHub: https://github.com/Camposz1

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões estruturais de um sistema que são difíceis de mudar depois que foram tomadas. Não se trata do desenho de telas ou da escolha de uma ferramenta isolada, mas de respostas para perguntas como: como o sistema se divide em partes? Onde ficam as fronteiras entre módulos? A comunicação será síncrona ou assíncrona? A regra de negócio estará espalhada pelas telas ou concentrada em um lugar? Já a engenharia de software é a base de princípios que sustenta essas decisões: algoritmos, estruturas de dados, orientação a objetos, acoplamento, coesão, boas práticas de código e controle de versão. Em uma frase: engenharia é a base sólida; arquitetura é saber juntar as peças com critério. As duas precisam andar juntas porque, sem visão arquitetural, a engenharia produz código bom dentro de uma estrutura ruim, que "funciona, mas não dá para mudar". E sem engenharia, a arquitetura gera diagramas bonitos que o código ignora — e quando diagrama e sistema divergem, o sistema ganha. Além disso, a arquitetura emerge das micro-decisões de engenharia acumuladas, queiramos ou não: quem não decide a estrutura acaba tendo uma, só que por acidente.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A razão pela qual a disciplina se chama Engenharia de Software, e não Arquitetura de Software, está na forma como o curso é organizado: existe uma base que é única e extensa, compartilhada por todos os caminhos do curso — terminal, Git, algoritmos, estruturas de dados, orientação a objetos e código limpo —, e essa base precisa vir antes de qualquer especialização. A Engenharia de Software cobre exatamente essa base. A arquitetura, por outro lado, não é uma só: cada área tem a sua. Banco de dados tem perguntas de arquitetura próprias (como modelar os dados? que índices usar?), assim como web (como dividir front e back? como expor a API?) e infraestrutura (onde o sistema roda? como escala?). Por isso a arquitetura nasce dentro de cada disciplina específica que vem depois: em Banco de Dados, em Desenvolvimento Web e em Infraestrutura. Só depois que cada área tem a sua arquitetura é que elas se juntam na arquitetura do sistema como um todo. A aula 13 funciona como uma prévia: apresenta o conceito geral de arquitetura e sua relação com a engenharia, para que, quando cada disciplina ensinar a arquitetura do seu assunto, o aluno já saiba o que está procurando e como as partes se encaixam depois.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Custo de reversão é o quanto custa, em tempo, esforço e dinheiro, voltar atrás em uma decisão tomada no desenvolvimento de um sistema. É exatamente esse custo que separa uma decisão de arquitetura de uma decisão qualquer: quanto maior o custo de reversão, mais arquitetural é a decisão. As decisões arquiteturais são as mais difíceis de desfazer porque afetam a estrutura global do sistema — as fronteiras entre módulos, a forma como os dados são armazenados, a comunicação entre serviços —, e alterar essas bases depois que o sistema está em produção exige reescrever partes inteiras, migrar dados, treinar equipes e muitas vezes parar o sistema. Um exemplo de decisão fácil de reverter é o nome de uma variável ou de uma função: a mudança custa segundos, não quebra nada fora do arquivo e qualquer membro da equipe consegue revisar em minutos. Já trocar o banco de dados depois de um ano em produção é um exemplo de decisão difícil de reverter: os dados estão armazenados em um formato específico, as consultas foram escritas para aquela tecnologia, o time foi treinado nela, e migrar tudo pode levar meses. A diferença é de escopo e de impacto: o nome da variável é local, o banco de dados é uma decisão que atravessa camadas inteiras do sistema.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Quando escrever código vira commodity — porque a IA gera em segundos o que levava horas —, o valor do profissional migra para aquilo que a IA não faz sozinha: entender o problema real do cliente (que quase nunca é o que ele disse na primeira conversa), decidir como o sistema se organiza e julgar se o que foi gerado está certo, é seguro e a equipe consegue manter. Ganham importância, portanto, o domínio do negócio, a leitura crítica de código (identificar acoplamento, nomes ruins, riscos), a capacidade de escrever uma boa especificação e o repertório de arquitetura — saber que opções existem e quando cada uma cabe. A afirmação de que "a IA vai nivelar o conhecimento" não se sustenta quando examinada com cuidado. A história mostra que o mesmo argumento foi feito com o buscador, a calculadora e os fóruns de programação, e a diferença entre profissionais não desapareceu. Acesso à ferramenta não é conhecimento. Há dois motivos para a IA ampliar a diferença, e não reduzi-la: primeiro, quem não tem base vira proxy de informação — a resposta passa pela pessoa, mas não fica com ela. Segundo, a qualidade do que a IA entrega depende diretamente da qualidade do que se pede, e saber o que pedir exige exatamente o que a base dá: vocabulário técnico, noção de arquitetura e critério para reconhecer o que é bom. A IA funciona como multiplicador: ela multiplica o que a pessoa já sabe.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Product Owner (PO) é o responsável pelo "o quê" e pelo "por quê": ele ouve o cliente e o negócio, decide o que entra no MVP e em qual prioridade, e cuida do critério de aceite e do valor entregue. O Tech Lead cuida do "como": ouve o time e o código, decide a arquitetura e a engenharia, revisa o que foi feito e destrava impedimentos técnicos. O conflito surge quando o PO, pressionado pelo cliente, quer entregar mais funcionalidades mais rápido, sem considerar o custo técnico de certas decisões; e o Tech Lead, que enxerga o custo de reversão dessas decisões, precisa resistir sem perder o foco no produto. Sem alinhamento, o PO acaba prometendo o que a arquitetura não suporta, e o Tech Lead acaba construindo algo que ninguém pediu da forma que pediu. Já o domínio do cliente e a spec ganham importância ainda maior no cenário com IA porque a IA executa o que está escrito, não o que estava na cabeça de alguém. Se a spec é vaga, a ambiguidade não desaparece: ela vira código plausível e errado. O DDD garante que o código fale a linguagem do negócio — o que o cliente chama de "carrinho abandonado" não pode aparecer como `TempOrderFlag2` no sistema — e que as regras do negócio morem em um lugar só, em vez de estar espalhadas em telas, controladores e consultas. A spec, por sua vez, é o contrato entre o que o cliente quer, o que a IA vai gerar e o que o teste vai conferir.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP (Minimum Viable Product) é a menor versão do produto que já entrega valor real e permite aprender com o uso. Ele influencia a arquitetura porque força decisões de recorte: o que fica de fora do MVP não precisa de fronteiras prontas nem de módulos completos, mas a arquitetura deve permitir que essas partes sejam acrescentadas depois sem reescrever tudo. Estimativa de prazo é a previsão do tempo necessário para entregar, e ela também é uma decisão arquitetural: se o prazo aperta, o escopo cede (voltamos ao MVP), não a qualidade escondida; e uma arquitetura que depende de um banco de dados difícil de migrar pode travar o prazo de formas que não aparecem no início. Escalabilidade é a capacidade do sistema de continuar funcionando bem quando a carga cresce. Ela influencia as decisões de arquitetura porque construir para um milhão de usuários antes de ter cem desperdiça prazo e dinheiro — mas a arquitetura deve permitir crescer: fronteiras claras, regra de negócio isolada, nada que prenda o sistema a uma única máquina por acidente. Das abordagens vistas em aula, eu aplicaria o DDD em um sistema de saúde, como um prontuário eletrônico. O motivo é que nesse domínio a mesma palavra muda de sentido conforme o contexto: "paciente" para o setor de agendamento (quem marca consulta) não é o "paciente" do faturamento (quem paga ou tem convênio). O DDD obriga a mapear esses contextos com fronteiras explícitas e a usar a linguagem do negócio no código, o que reduz o risco de regras clínicas críticas ficarem espalhadas em vários lugares e serem alteradas de forma inconsistente.
