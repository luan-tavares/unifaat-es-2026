# TF 13 · Arquitetura de Software

Nome: Rafael Cadoni Ceschielli Huben
RA: 6326179
GitHub: https://github.com/Cadoni-hue

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**
Arquitetura de software é o conjunto das decisões estruturais mais importantes de um sistema: como ele se divide em partes, como essas partes se comunicam, onde ficam os dados e quais tecnologias sustentam tudo isso


---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Isso acontece porque a arquitetura depende de experiência. Para tomar boas decisões estruturais, é preciso já ter visto sistemas crescerem, falharem e serem mantidos por anos, o que um aluno no começo do curso ainda não viveu. A Engenharia de Software, ao contrário, tem conteúdo mais delimitado e ensinável de forma sequencial, como ciclo de vida, requisitos, testes e metodologias ágeis.
---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Custo de reversão é o esforço, em tempo, dinheiro e retrabalho, necessário para desfazer uma decisão depois que ela foi tomada e o sistema passou a depender dela. As decisões arquiteturais são as mais difíceis de desfazer porque estão na base: muito código, muitos dados e muitas equipes se apoiam nelas, e mudar uma delas obriga a mudar tudo o que está em cima

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Custo de reversão é o esforço, em tempo, dinheiro e retrabalho, necessário para desfazer uma decisão depois que ela foi tomada e o sistema passou a depender dela. As decisões arquiteturais são as mais difíceis de desfazer porque estão na base: muito código, muitos dados e muitas equipes se apoiam nelas, e mudar uma delas obriga a mudar tudo o que está em cima
---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

Tech Lead responde pela qualidade técnica: define a arquitetura, orienta a equipe, revisa decisões e cuida da dívida técnica. O PO (Product Owner) responde pelo valor do produto: prioriza o backlog, representa o cliente e decide o que entrega mais retorno.
---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP (Produto Mínimo Viável) é a menor versão do produto capaz de entregar valor e testar a hipótese de negócio. Ele influencia a arquitetura ao incentivar soluções simples, evitando projetar demais antes de validar a ideia. A estimativa de prazo é a previsão de quanto tempo o trabalho levará. Prazos curtos favorecem arquiteturas conhecidas e de baixo risco, enquanto prazos folgados permitem investir em soluções mais elaboradas. Escalabilidade é a capacidade do sistema de suportar mais carga ou usuários sem perder desempenho, e exige decisões como separar serviços, usar filas e distribuir dados, que têm custo e só valem quando há crescimento esperado. Dentre as abordagens, eu aplicaria a EDA (arquitetura orientada a eventos) em um problema como um e-commerce, em que um pedido dispara estoque, pagamento e envio. Os serviços reagem a eventos sem ficarem acoplados entre si, o que facilita escalar cada parte de forma independente.