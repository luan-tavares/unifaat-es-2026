# TF 13 · Arquitetura de Software

Nome: Kaua David Dantas Mendonça
RA: 6326260
GitHub: https://github.com/kauadantas-dot

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões estruturais e fundamentais que definem a organização global de um sistema, a divisão de suas fronteiras e o modo como seus componentes se comunicam, caracterizando-se por serem decisões caras e difíceis de reverter no futuro. A engenharia de software representa a base ampla de princípios, métodos e técnicas do dia a dia — como estruturas de dados, POO, código limpo, testes e controle de versão — voltada para resolver problemas locais e garantir qualidade imediata na construção do código. Enquanto a engenharia responde a "como implementar isso bem hoje", a arquitetura responde a "como estruturar para permitir manutenção e evolução amanhã". Ambas precisam caminhar juntas porque são dois lados da mesma moeda: uma engenharia impecável sem visão arquitetural gera um aglomerado de códigos limpos presos numa estrutura torta e inviável; por outro lado, uma arquitetura puramente teórica sem rigor de engenharia produz apenas diagramas bonitos que o código real descumpre, prevalecendo sempre o comportamento concreto do sistema.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Essa separação decorre do fato de que a base técnica da computação é única, extensa e transversal a todas as áreas, englobando terminal, Linux, Git, algoritmos, orientação a objetos e boas práticas, sendo esse o papel formador da disciplina de Engenharia de Software no início do curso. Em contrapartida, a arquitetura não é uma entidade isolada ou pré-fabricada: ela nasce de forma descentralizada em cada domínio técnico especializado. Assim, a arquitetura passa a ser estudada no decorrer das disciplinas seguintes, como Banco de Dados (onde se discute modelagem, índices e consistência), Desenvolvimento Web (divisão entre camadas, front-end, back-end e APIs) e Infraestrutura (alta disponibilidade, servidores e resiliência). Somente após consolidar a engenharia e a arquitetura próprias de cada uma dessas áreas é que o aluno desenvolve maturidade para enxergar e projetar a arquitetura integrada do sistema como um todo.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão é a métrica que mensura o impacto, tempo, esforço e risco financeiro necessários para desmanchar uma escolha técnica anterior e adotar outro caminho. As decisões arquiteturais apresentam o maior custo de reversão porque sustentam a espinha dorsal da aplicação, criando acoplamentos, fluxos de rede e persistência compartilhada que contaminam múltiplos módulos simultaneamente. Um exemplo de decisão fácil de reverter é a renomeação de uma variável ou a escolha de um algoritmo em uma função interna isolada: se a alteração for insatisfatória, o ajuste é feito em minutos e validado pelos testes unitários sem reflexos externos. Já um exemplo difícil de reverter é a migração de um banco de dados relacional para NoSQL com partição distribuída após um ano de operação: essa escolha exige reestruturar esquemas legados, reescrever queries complexas, lidar com consistência eventual e migrar dados em produção sem parada, demandando meses de retrabalho com altíssimo risco de quebra.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com a automação da digitação de código pela inteligência artificial, o ato de escrever sintaxe vira uma commodity barata, fazendo emergir como essenciais as competências de entendimento profundo do negócio do cliente, modelagem de fronteiras arquiteturais, escrita de especificações precisas e auditoria crítica de código. O desenvolvedor deixa de ser um mero digitador para atuar como revisor e decisor técnico. A tese de que a IA irá "nivelar o conhecimento" é uma ilusão que ignora a história de ferramentas anteriores, como o Google e calculadoras. Acesso à informação não é sinônimo de absorção de conhecimento: quem não tem base vira um intermediário passivo (proxy), acomoda-se sem reter aprendizado e sofre da ironia da automação, aceitando cegamente saídas com falhas estruturais ocultas. Como a IA apenas reflete e multiplica a qualidade do prompt recebido, profissionais com forte repertório conseguem direcioná-la com cirurgia e alavancar sua produtividade, enquanto os desprovidos de base ganham somente uma falsa sensação de competência. Em vez de nivelar, a IA acentua a distância técnica.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Product Owner (PO) é responsável por definir o produto, focando no "o quê" e no "porquê", priorizando valor para o cliente e gerindo o escopo do MVP e prazos de negócio. Já o Tech Lead foca no "como", zelando pela sustentabilidade técnica, arquitetura, qualidade do código, escalabilidade e redução do débito técnico da equipe. O atrito surge comumente quando a pressão do PO por entregas rápidas de novas funcionalidades colide com a necessidade do Tech Lead de refatorar estruturas e manter padrões defensivos que evitam o colapso futuro da aplicação. Quando entra a IA, dominar o domínio do cliente (DDD) e redigir uma especificação (spec) torna-se mandatório porque modelos de linguagem não adivinham intenções não declaradas. O DDD fornece a linguagem ubíqua e os limites claros de cada contexto, enquanto a spec transforma as regras de negócio em requisitos objetivos com critérios de aceite e exemplos de entrada e saída. Sem uma spec rigorosa, a IA tende a preencher as lacunas conceituais gerando código alucinado ou regras comerciais incorretas que passam despercebidas.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP é a menor versão funcional viável capaz de gerar valor real e aprendizado, influenciando a arquitetura a manter-se simples e focada no essencial, evitando a armadilha da superengenharia prematura. A estimativa de prazo deve ser encarada como uma faixa probabilística sob o cone da incerteza, forçando o arquiteto a priorizar decisões reversíveis e fáceis de adaptar caso o cronograma aperte. A escalabilidade é a aptidão do software em responder com estabilidade ao crescimento de volume (vertical ou horizontalmente), exigindo o isolamento de componentes e a ausência de estados centralizados em nós únicos. Dentre as abordagens abordadas, eu escolheria a Arquitetura Orientada a Eventos (EDA) para aplicar em um sistema de processamento de compras de e-commerce durante grandes promoções. Nesse cenário, o checkout emite um evento "PedidoRealizado" para uma fila assíncrona, permitindo que estoque, antifraude, faturamento e notificações processem suas etapas em paralelo e em seu próprio ritmo, impedindo que a lentidão de uma API de pagamento externa trave a experiência de compra do usuário no carrinho.
