# TF 13 · Arquitetura de Software

Nome: Rodrigo Campeoti
RA: 6326012
GitHub: https://github.com/campeoti

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software sao as decisoes de um sistema que ficam caras de mudar depois, como dividir
o sistema em partes, escolher o banco de dados ou decidir onde fica a regra de negocio. A engenharia
e a base de principios que a gente usa no dia a dia pra construir bem: estrutura de dados, orientacao
a objetos, codigo limpo, Git. A diferenca e o tamanho da decisao: a engenharia resolve "como fazer
bem essa parte" e a arquitetura resolve "como organizar o todo pra conseguir mudar depois". As duas
precisam andar juntas porque a arquitetura sem engenharia vira um desenho que o codigo nao segue, e
a engenharia sem arquitetura gera codigo bom dentro de uma estrutura que ninguem pensou. Mesmo
quem nao decide a arquitetura acaba tendo uma, so que sem querer.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Isso acontece porque a base e uma so pra todas as areas de ADS (terminal, Git, logica, estrutura de
dados, orientacao a objetos, codigo limpo) e ela precisa vir primeiro, que e o que a Engenharia de
Software cobre. Ja a arquitetura muda conforme o assunto: banco de dados tem as suas decisoes
(modelagem, indices), a web tem outras (front e back, API) e a infraestrutura tambem (onde roda,
como escala). Entao nao faria sentido uma materia unica de arquitetura antes de conhecer cada area.
Ela vai aparecendo dentro das proximas disciplinas, como Banco de Dados, Desenvolvimento Web e
Infraestrutura, e depois essas partes se juntam na arquitetura do sistema inteiro.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Custo de reversao e quanto custa (tempo, dinheiro, retrabalho) voltar atras numa decisao. As
decisoes de arquitetura sao as mais dificeis de desfazer porque o resto do sistema e construido em
cima delas, entao mudar uma delas mexe em muita coisa ao mesmo tempo. Um exemplo facil de reverter e
o nome de uma variavel ou de um metodo: troca em poucos minutos e quase nao afeta o resto. Um
exemplo dificil e trocar o banco de dados de um sistema que ja esta ha um ano em producao, porque
tem dados pra migrar, consultas pra reescrever e tudo precisa ser testado de novo. A diferenca esta
em quantas partes dependem da decisao.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Ganham importancia entender o problema do cliente, decidir a estrutura do sistema e saber ler e
revisar codigo com criterio, porque gerar codigo ficou facil mas alguem ainda precisa dizer o que
fazer e conferir se o que veio esta certo. Eu concordo com o professor que a IA nao vai nivelar o
conhecimento. Ja aconteceu com o Google: todo mundo tem acesso a informacao e mesmo assim as pessoas
continuam sabendo coisas bem diferentes. A IA devolve o que a gente pede, e quem tem base pede
melhor e percebe quando a resposta esta errada. Quem usa so pra copiar vira um intermediario e nao
aprende. Por outro lado, quem usa a IA pra estudar, pedindo explicacao e testando antes, consegue
aprender mais rapido, entao ela ajuda mais quem ja se esforca.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O PO cuida do que vai ser feito e por que: ouve o cliente, define a prioridade, o que entra no MVP e
o criterio de aceite. O Tech Lead cuida de como fazer: arquitetura, qualidade do codigo, revisao e
ajudar o time a destravar. O conflito aparece quando o PO quer entregar mais coisa em menos tempo e
o Tech Lead ve que isso vai deixar o sistema dificil de manter ou com divida tecnica. Conhecer o
dominio do cliente (a ideia do DDD, de usar as mesmas palavras do negocio no codigo) e importante
porque a regra de negocio nao esta em lugar nenhum pra IA copiar, esta na cabeca do cliente. E a
spec importa porque a IA faz o que esta escrito e nao o que a gente imaginou: se a spec e vaga, sai
um codigo que parece certo mas erra justamente a regra que ninguem escreveu.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP e a menor versao do produto que ja funciona e entrega valor, pra aprender com o uso; ele faz a
arquitetura comecar simples e so com o necessario. Estimativa de prazo e a previsao de quanto tempo
vai levar, melhor dada em faixa (ex.: 4 a 6 semanas); com prazo curto e melhor cortar escopo do que
escolher uma arquitetura complicada. Escalabilidade e o sistema continuar funcionando bem quando o
uso cresce; nao precisa construir pra um milhao de usuarios no comeco, mas a arquitetura nao pode
fechar essa porta. Eu escolheria a EDA (arquitetura orientada a eventos) num sistema de loja virtual:
quando um pedido e criado, o estoque, o e-mail e a cobranca reagem ao evento sem um depender
diretamente do outro, e da pra adicionar uma parte nova sem mexer nas que ja existem.
