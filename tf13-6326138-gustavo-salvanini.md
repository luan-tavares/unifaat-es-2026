# TF 13 · Arquitetura de Software

Nome: Gustavo Salvanini
RA: 6326138
GitHub: https://github.com/gustavosalvanini-ux

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

A arquitetura de software representa o conjunto de decisões estruturais fundamentais de um sistema: a definição de seus componentes principais, as responsabilidades de cada um, os padrões de comunicação e as restrições que guiam a sua evolução. Enquanto a Engenharia de Software abrange todo o ciclo de vida, os processos, métodos de gestão, testes, métricas de qualidade e requisitos para entregar uma solução, a Arquitetura foca no desenho estrutural e nas diretrizes técnicas de mais alto nível. Ambas precisam caminhar estritamente juntas porque um processo de engenharia bem estruturado falhará se apoiado em uma arquitetura frágil e incapaz de escalar. Do mesmo modo, uma excelente arquitetura conceitual não sobrevive sem práticas rigorosas de engenharia, como integração contínua, testes automatizados e gestão consistente de mudanças.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Isso ocorre porque a arquitetura de software não é uma etapa isolada ou uma técnica fechada, mas sim uma competência acumulativa e transversal que depende da maturação de múltiplos conhecimentos da computação. Projetar uma arquitetura exige bagagem sólida em estruturas de dados, banco de dados, redes, sistemas operacionais, segurança e paradigmas de programação. Por esse motivo, os conceitos arquiteturais começam a ser introduzidos e aplicados de forma gradual ao longo do curso, especialmente nas disciplinas de projetos práticos, sistemas distribuídos, engenharia de software avançada e no desenvolvimento de projetos integradores ou TCC. Nesses momentos, o aluno deixa de resolver apenas algoritmos pontuais e passa a tomar decisões abrangentes sobre integração de módulos, persistência, tolerância a falhas e escalabilidade.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão refere-se à quantidade de tempo, esforço técnico, impacto financeiro e risco de regressão necessários para desfazer ou alterar uma escolha técnica após o sistema estar em produção. As decisões arquiteturais são as mais difíceis e caras de reverter porque elas servem como fundação para todo o ecossistema; mudar a base costuma exigir a reescrita de dezenas de módulos dependentes e migrações complexas de dados. Um exemplo de decisão de baixo custo de reversão é a escolha de uma biblioteca auxiliar de formatação de datas ou de validação de formulários, pois o impacto fica contido em poucas linhas ou em uma camada isolada. Em contrapartida, uma decisão de altíssimo custo de reversão é definir o modelo do banco de dados (ex: relacional SQL transacional versus NoSQL orientado a documentos) ou a transição prematura entre um monolito e microsserviços distribuídos, o que demanda redesenho completo de fluxos, transações distribuídas e semanas de refatoração crítica.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com ferramentas generativas gerando a sintaxe básica do código rapidamente, as competências humanas mais valorizadas passam a ser o pensamento crítico, a visão sistêmica, o design arquitetural, a capacidade de auditoria/revisão de segurança e o domínio profundo das regras de negócio. O desenvolvedor atua cada vez mais como revisor, especificador e curador da solução. A afirmação de que "a IA vai nivelar o conhecimento" é equivocada e superficial: embora ela reduza a barreira de entrada para tarefas triviais e ajude iniciantes a produzir scripts funcionais, ela na verdade amplia a distância entre o profissional júnior e o sênior. Sem repertório teórico robusto, um desenvolvedor não consegue julgar se o código gerado pela IA introduz gargalos de concorrência, brechas de segurança ou débitos arquiteturais ocultos, enquanto o sênior utiliza a IA como alavanca de produtividade para orquestrar sistemas complexos com precisão.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Product Owner (PO) é o guardião do valor do negócio, sendo responsável por definir o backlog, priorizar entregas e maximizar o retorno para os usuários dentro dos prazos de mercado. O Tech Lead é o responsável técnico pela saúde, qualidade, viabilidade, sustentabilidade e arquitetura do software. O atrito surge comumente quando a pressão do PO por novas funcionalidades imediatas colide com a necessidade do Tech Lead de refatorar débitos técnicos, aprimorar a infraestrutura ou investir em segurança. Nesse ecossistema impulsionado por IA, o Domain-Driven Design (DDD) e a escrita clara de especificações (specs) tornam-se indispensáveis porque a IA não possui bom senso corporativo: ela replica estritamente o contexto fornecido. Se a especificação for ambígua ou ignorar a linguagem ubíqua e os limites de contexto do negócio (bounded contexts), a IA gerará código sintaticamente perfeito, porém completamente desconectado da real necessidade da empresa.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP (Mínimo Produto Viável) busca validar uma hipótese de negócio com o menor esforço viável, demandando uma arquitetura simples, modular e rápida de construir, evitando superengenharia inicial. A estimativa de prazo impõe restrições temporais que orientam pragmatismo na escolha de tecnologias maduras e padrões conhecidos para evitar atrasos. A escalabilidade prevê a capacidade do software de absorver volumes crescentes de carga, dados e acessos sem perda inaceitável de desempenho, exigindo desacoplamento e estratégia de concorrência. Dentre os padrões vistos, eu escolheria a Arquitetura Orientada a Eventos (EDA - Event-Driven Architecture) para resolver o problema de um sistema de processamento de pedidos de e-commerce e pagamentos em dias de alta demanda (como Black Friday). O EDA desacopla o checkout síncrono da emissão de notas fiscais, atualização de estoque e envio de e-mails via filas assíncronas (como RabbitMQ ou Kafka), garantindo que picos pontuais em um serviço downstream não derrubem a experiência de compra do cliente.
