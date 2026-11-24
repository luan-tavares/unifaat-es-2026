# TF 13 · Arquitetura de Software

Nome: Nicolas Damasceno
RA: 6326314
GitHub: https://github.com/damascenonicolas

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões estruturais fundamentais de um sistema,
definindo componentes, fronteiras, responsabilidades e formas de interação para sustentar
atributos de qualidade como desempenho, segurança e manutenibilidade. A engenharia de
software tem escopo mais amplo e abrange todo o ciclo de vida do desenvolvimento, incluindo
processos, levantamento de requisitos, testes, qualidade, gestão e evolução contínua. Elas
precisam andar juntas porque decisões arquiteturais sem práticas de engenharia de software
dificultam a validação, a entrega e a manutenção disciplinada do código, enquanto processos
de engenharia sem base arquitetural clara levam a sistemas frágeis, acoplados e difíceis de
escalar quando o produto cresce.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A ausência de uma disciplina isolada de Arquitetura de Software ocorre porque tomar decisões
arquiteturais exige base prévia em fundamentos da computação, como programação, estruturas de
dados, bancos de dados, redes, sistemas operacionais e análise de requisitos. Sem entender
como os componentes se comportam e se comunicam em baixo nível, escolhas arquiteturais tendem
a ser abstratas demais ou desconectadas da realidade técnica. Por isso, a arquitetura é
estudada de forma transversal ao longo do curso em disciplinas como Engenharia de Software,
Modelagem/Análise de Sistemas, Banco de Dados e Sistemas Distribuídos, amadurecendo à medida
que o aluno conecta esses conteúdos a cenários práticos mais complexos.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão é o esforço técnico, o tempo e o impacto operacional necessários para
desfazer uma escolha após ela ter sido adotada ou colocada em produção. Decisões arquiteturais
são difíceis de reverter porque atravessam vários módulos, contratos, esquemas de dados ou
rotinas da equipe ao mesmo tempo. Um exemplo fácil de reverter é alterar uma regra de formatação
visual ou trocar uma biblioteca utilitária isolada, pois a mudança fica encapsulada em poucos
pontos. Já trocar o banco de dados principal após grande volume de dados em produção ou quebrar
um monólito acoplado em vários serviços é difícil de reverter por exigir migração de dados,
adaptação de integrações e alto risco de indisponibilidade.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Quando a IA acelera a geração de código, ganham mais peso competências como leitura crítica de
código, depuração, modelagem de problemas, segurança, testes e visão arquitetural, porque é
preciso julgar se a solução gerada atende aos requisitos e não introduz falhas ocultas. A
afirmação de que a IA vai nivelar o conhecimento entre os profissionais é limitada porque a
ferramenta amplifica quem já tem repertório técnico e clareza do problema, enquanto quem não
domina fundamentos pode aceitar respostas incorretas ou estruturalmente ruins sem perceber.
Assim, em vez de igualar o nível técnico, a IA aumenta a diferença entre quem sabe avaliar e
integrar soluções com critério e quem apenas copia o que a ferramenta sugere.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O PO foca no valor de negócio, na priorização do backlog e nas necessidades do cliente,
enquanto o Tech Lead responde pela viabilidade técnica, qualidade do código, arquitetura e
capacidade de entrega do time. O conflito surge quando o PO pressiona por prazos curtos ou novas
funcionalidades que exigem atalhos arriscados na visão do Tech Lead, ou quando o Tech Lead
quer priorizar refatorações estruturais que não parecem urgentes para o negócio. Para quem usa
IA, entender o domínio do cliente (DDD) evita que o modelo gere regras genéricas desconectadas
da realidade do negócio, e escrever uma especificação clara reduz ambiguidades, delimita o
escopo e dá critérios objetivos para validar o resultado produzido.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP é a versão mínima viável para validar uma hipótese de negócio com o menor esforço útil;
estimativa de prazo é a previsão realista do tempo necessário para entregar com qualidade; e
escalabilidade é a capacidade do sistema de absorver crescimento de carga, dados ou usuários sem
degradação severa. No MVP, a arquitetura deve evitar complexidade prematura; o prazo restringe
o escopo e o nível de abstração; e a escalabilidade orienta onde desacoplar ou preparar pontos
de crescimento futuro. Escolhendo DDD, eu o aplicaria em sistemas com regras de negócio
complexas e em constante mudança, como plataformas financeiras ou de gestão operacional, onde
alinhar a linguagem do domínio ao modelo do software evita mal-entendidos custosos.
