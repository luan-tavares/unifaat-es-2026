# TF 13 · Arquitetura de Software

Nome: Gabriel Hamzeh Rubião
RA: 6126070
GitHub: https://github.com/gabrielrubiao

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

• Arquitetura de Software refere-se às decisões estruturais fundamentais e de alto nível de um sistema — como a organização dos módulos, escolha de tecnologias, padrões de comunicação e requisitos não funcionais (desempenho, segurança, escalabilidade). É o "esqueleto" ou a planta do sistema.
• Engenharia de Software é uma disciplina mais ampla que abrange todo o ciclo de vida do desenvolvimento: levantamento de requisitos, metodologias ágeis, processos de trabalho em equipe, testes, implantação (CI/CD) e manutenção.
Por que precisam andar juntas:
Uma boa arquitetura sem processos de engenharia resulta em um projeto desorganizado, sem prazos e difícil de manter. Por outro lado, excelentes processos de engenharia aplicados sobre uma arquitetura ruim geram um código limpo que não escala, trava ou precisa ser refeito do zero no futuro. Ambas se complementam para entregar valor sustentável.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A arquitetura não costuma ser ensinada de forma isolada na graduação porque exige maturidade técnica prévia. Para tomar boas decisões arquiteturais, o estudante precisa primeiro dominar programação, banco de dados, redes e fundamentos de engenharia. Além disso, a arquitetura permeia várias áreas do desenvolvimento, em vez de ser uma etapa única.
Quando ela passa a ser estudada:
Ela surge de forma transversal e progressiva ao longo do curso:
• Inicialmente, nos conceitos de design de código (Orientação a Objetos, padrões de projeto/Design Patterns) e modelagem de dados.
• Depois, dentro da própria disciplina de Engenharia de Software (na fase de projeto/design do sistema) e em matérias avançadas como Sistemas Distribuídos, Desenvolvimento Web/Mobile e Projetos Integradores (TCC).

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

É o esforço financeiro, operacional e de tempo necessário para desfazer ou alterar uma decisão tomada anteriormente no projeto. Decisões arquiteturais são as mais difíceis de desfazer porque formam a base sobre a qual todo o resto do código e da infraestrutura é construído; mudá-las exige reescrever grande parte do sistema e migrar dados em produção.
Exemplos:
• Decisão fácil de reverter: Alterar a cor de um botão, trocar uma biblioteca de formatação de datas ou ajustar a validação de um campo de formulário. Justificativa: O impacto é isolado em poucos arquivos (baixo acoplamento) e pode ser alterado e testado em minutos.
• Decisão difícil de reverter: Trocar um banco de dados relacional (ex: PostgreSQL) por um banco não relacional (ex: MongoDB), ou migrar um sistema monolítico para microsserviços no meio do projeto. Justificativa: Afeta toda a camada de persistência, regras de negócio, infraestrutura e comunicação entre módulos, gerando alto risco de perda de dados e meses de retrabalho.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com a IA acelerando a escrita de código (sintaxe), ganham destaque as habilidades de pensamento crítico, análise de requisitos, arquitetura de sistemas, revisão de código (code review), segurança e comunicação com o negócio. O foco deixa de ser "como escrever o código" e passa a ser "o que construir, por que construir e se o código gerado é seguro e escalável".
Avaliação crítica da afirmação ("a IA vai nivelar o conhecimento"):
A afirmação é falsa na prática. A IA funciona como um amplificador:
• Para um profissional sênior com boa base teórica, a IA multiplica a produtividade, pois ele sabe exatamente o que pedir, identifica falhas de segurança e corrige alucinações do modelo.
• Para um profissional júnior ou sem fundamentos, a IA pode gerar uma falsa sensação de competência, fazendo-o aceitar códigos cheios de falhas arquiteturais e bugs ocultos que ele não sabe diagnosticar ou manter. Portanto, a IA tende a aumentar a distância entre quem domina os fundamentos e quem apenas copia código.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

• Product Owner (PO): Foca no valor de negócio, no cliente, na priorização do backlog e na entrega rápida de funcionalidades.
• Tech Lead (TL): Foca na qualidade técnica, na sustentabilidade da arquitetura, na mitigação de débitos técnicos e na orientação da equipe de desenvolvimento.
• Onde entram em conflito: O conflito clássico ocorre entre velocidade vs. qualidade. O PO frequentemente pressiona para lançar uma funcionalidade rapidamente para atender ao mercado, enquanto o Tech Lead precisa frear atalhos ("gambiarras") e reservar tempo para refatoração, testes e segurança para que o sistema não quebre no futuro.
Importância do DDD e da Especificação (Spec) com IA:
A IA não adivinha o contexto real da empresa nem as regras implícitas do negócio. O DDD (Domain-Driven Design) garante que o desenvolvedor compreenda profundamente o domínio do cliente e use a mesma linguagem do negócio (Linguagem Ubíqua). Quando isso é traduzido em uma especificação clara (Spec), o prompt fornecido à IA torna-se preciso, evitando ambiguidades e garantindo que o código gerado resolva o problema real da empresa, e não uma solução genérica.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

• MVP (Minimum Viable Product): Versão mais simples de um produto com apenas as funcionalidades essenciais para validar uma ideia com usuários reais. Influência: Exige uma arquitetura enxuta e rápida de construir (ex: um monólito modular), evitando complexidade desnecessária no início.
• Estimativa de prazo: Previsão de tempo necessário para entregar o sistema ou funcionalidade. Influência: Prazos curtos limitam a adoção de tecnologias novas ou arquiteturas complexas, favorecendo ferramentas que a equipe já domina.
• Escalabilidade: Capacidade do sistema suportar o crescimento de usuários, dados e requisições sem perder desempenho. Influência: Exige pensar desde cedo em processamento assíncrono, cache, balanceamento de carga e desacoplamento de serviços.
Abordagem escolhida (Exemplo: DDD - Domain-Driven Design):
• Aplicação: Eu aplicaria o DDD em problemas de regras de negócio complexas e sistemas corporativos críticos — como uma plataforma financeira, um sistema hospitalar ou um ERP de logística. Nesses cenários, o maior desafio não é a tecnologia em si, mas entender os fluxos da operação, dividir o sistema em contextos bem delimitados (Bounded Contexts) e garantir que o software reflita fielmente as regras da empresa.
