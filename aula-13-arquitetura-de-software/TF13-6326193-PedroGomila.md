# TF 13 · Arquitetura de Software

Nome: Pedro Miguel Gomila
RA: 6326193
GitHub: <https://github.com/P-M-GOMILA>

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é a definição da estrutura de um sistema, estabelecendo como seus componentes se organizam e se comunicam. Ela trata das decisões mais importantes do projeto, como tecnologias, padrões e integração entre módulos. Já a engenharia de software é uma área mais ampla, que engloba todo o processo de desenvolvimento, incluindo requisitos, testes, manutenção e gestão. Enquanto a arquitetura define o caminho técnico a seguir, a engenharia garante que o sistema seja construído de forma organizada e com qualidade. As duas precisam trabalhar juntas para que as soluções atendam às necessidades do negócio e sejam viáveis de implementar e manter.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A Engenharia de Software é considerada uma disciplina própria porque reúne métodos, processos e práticas que abrangem todo o ciclo de desenvolvimento de sistemas. Já a Arquitetura de Software não costuma aparecer isoladamente, pois é um tema que depende de conhecimentos adquiridos em diversas áreas da computação. Durante o curso, a arquitetura é estudada de forma gradual em disciplinas como programação, banco de dados, análise de sistemas e desenvolvimento de software. Somente após compreender esses conceitos é possível entender as decisões arquiteturais e seus impactos em um projeto. Por isso, ela aparece como um assunto integrador dentro da formação.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão representa o esforço, tempo e dinheiro necessários para desfazer uma decisão tomada durante o desenvolvimento de software. Quanto mais profunda e estrutural for a decisão, maior será esse custo. Um exemplo fácil de reverter seria alterar a cor de um botão ou o texto de uma tela, pois essas mudanças afetam apenas a interface. Já a troca de uma arquitetura monolítica para microsserviços é uma decisão difícil de reverter, pois envolve mudanças em vários componentes do sistema, infraestrutura e processos. Por isso, decisões arquiteturais exigem mais análise, pois seus impactos costumam ser amplos e duradouros.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com o avanço da IA, algumas tarefas de codificação podem ser automatizadas, mas competências como análise de requisitos, resolução de problemas, comunicação e tomada de decisões tornam-se ainda mais importantes. O profissional precisa compreender o contexto do negócio e avaliar se as soluções geradas pela IA realmente fazem sentido. Não concordo totalmente com a afirmação de que a IA vai nivelar o conhecimento entre os profissionais. Embora ela facilite o acesso à informação e acelere o desenvolvimento, quem possui mais experiência consegue formular melhores perguntas, identificar erros e tomar decisões mais adequadas. Dessa forma, a IA funciona como uma ferramenta de apoio, e não como substituta do conhecimento humano.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Tech Lead é responsável pelas decisões técnicas, qualidade do código e direcionamento da equipe de desenvolvimento. Já o Product Owner (PO) representa os interesses do negócio, definindo prioridades e garantindo que o produto gere valor para o cliente. Conflitos podem surgir quando há divergência entre velocidade de entrega e qualidade técnica. O conhecimento do domínio do cliente, abordado pelo DDD, é fundamental porque permite compreender os problemas reais que precisam ser resolvidos. Além disso, uma boa especificação ajuda a documentar requisitos de forma clara. Para quem utiliza IA, entender o domínio e escrever instruções bem definidas é essencial para obter resultados mais precisos e úteis.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP é a versão mínima de um produto que contém apenas as funcionalidades essenciais para validar uma ideia com os usuários. A estimativa de prazo busca prever o tempo necessário para desenvolver cada etapa do projeto. Já a escalabilidade representa a capacidade do sistema de suportar crescimento de usuários e volume de dados sem perda significativa de desempenho. Esses fatores influenciam diretamente as decisões arquiteturais, pois determinam o equilíbrio entre rapidez de entrega e preparação para o futuro. Entre as abordagens estudadas, eu aplicaria o DDD em sistemas com regras de negócio complexas, como plataformas financeiras ou de gestão empresarial, pois ele ajuda a organizar o software de acordo com o domínio do problema e facilita a comunicação entre desenvolvedores e especialistas do negócio.
