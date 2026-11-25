# TF 13 · Arquitetura de Software

Nome: Marcus Vinícius Teophilo Ottoni
RA: 6326127
GitHub: https://github.com/MarcusTOttoni/unifaat-es-2026

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

A arquitetura de software define a estrutura fundamental de um sistema, seus componentes e como eles se relacionam para garantir atributos de qualidade. Já a engenharia de software engloba todo o ciclo de vida do desenvolvimento, focando em processos, requisitos, testes e manutenção para entregar valor. Elas precisam andar juntas porque uma boa arquitetura sem processos de engenharia gera um projeto caótico, enquanto ótimos processos aplicados sobre uma estrutura frágil criam sistemas que não escalam nem evoluem.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A Engenharia de Software é uma disciplina própria porque trata de processos universais, enquanto a arquitetura exige maturidade técnica prévia sobre programação, bancos de dados e redes. Como não é viável ensinar decisões estruturais complexas sem essa base inicial, a arquitetura é estudada de forma progressiva ao longo do curso. Ela aparece primeiro como um tópico dentro de Engenharia de Software e ganha profundidade em matérias avançadas como Sistemas Distribuídos e projetos integradores, quando o aluno já consegue avaliar trade-offs.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão é o esforço financeiro e de tempo necessário para desfazer uma escolha técnica após sua implementação. Decisões arquiteturais são as mais difíceis de reverter porque sustentam todo o sistema, exigindo reescrever grande parte do código caso sejam alteradas. Trocar a biblioteca de datas é fácil de reverter por ter impacto isolado, enquanto migrar um banco de dados relacional para não relacional em produção tem custo altíssimo por exigir reestruturação da persistência e das regras de negócio acopladas.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com a IA gerando código, ganham destaque o pensamento crítico, a visão arquitetural, a revisão de código e a engenharia de requisitos. Como a ferramenta não compreende o contexto completo do negócio nem assume riscos, o profissional precisa validar a segurança e a coerência das entregas. Por isso, a ideia de que a IA nivela o conhecimento é falsa: ela multiplica a capacidade existente, fazendo com que iniciantes gerem dívidas técnicas mais rápido e profissionais experientes entreguem soluções robustas com maior agilidade.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Tech Lead lidera as decisões técnicas, a arquitetura e a qualidade do código, enquanto o PO foca no valor de negócio e na priorização do backlog. O conflito surge na tensão entre prazo e qualidade, como quando o PO exige entregas rápidas e o Tech Lead alerta para a necessidade de corrigir dívidas técnicas. Com o uso da IA, dominar o negócio (DDD) e escrever especificações claras (spec) torna-se essencial, pois os modelos dependem de contexto preciso e sem ambiguidades para gerar códigos alinhados às regras reais do cliente.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP valida uma hipótese de negócio com o mínimo de recursos, o prazo estima o tempo de entrega e a escalabilidade garante desempenho sob crescimento de carga. Esses fatores guiam a arquitetura: MVPs com prazos curtos pedem estruturas simples, enquanto alta escalabilidade exige sistemas distribuídos e mais complexos. Eu aplicaria a abordagem EDA (Arquitetura Orientada a Eventos) em sistemas de e-commerce, onde pagamentos, estoque e notificações precisam reagir de forma assíncrona e resiliente durante picos de acesso.
