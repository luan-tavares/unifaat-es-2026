# TF 13 · Arquitetura de Software

Nome: (Ryan Tavares de Lima)
RA: (6326226)
GitHub: https://github.com/RyanDevLima

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

A arquitetura de software é a espinha dorsal de um sistema, definindo suas grandes estruturas e as regras de convivência entre as partes. A engenharia de software, por sua vez, cuida de todo o ecossistema de construção — processos, testes, gestão e qualidade. Elas caminham juntas porque a engenharia garante que o produto seja construído com eficiência metodológica, enquanto a arquitetura assegura que a fundação técnica suporte o peso, a longevidade e as mudanças futuras do sistema.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A gente tem uma matéria de Engenharia de Software porque ela ensina o "como fazer" de forma geral — métodos, prazos e organização que servem para qualquer projeto. Já a arquitetura é algo que exige mais bagagem e maturidade, porque você só consegue pensar no sistema como um todo depois que já sabe programar e entende como as peças funcionam por dentro. Por isso, ela acaba sendo estudada mais para frente no curso, quando o foco deixa de ser só fazer o código rodar e passa a ser pensar em sistemas maiores e mais complexos.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão é basicamente o tempo e o trabalho que a gente gasta quando precisa refazer alguma coisa que já estava pronta no código porque deu errado ou mudou de ideia. As decisões de arquitetura são as piores para voltar atrás porque elas ficam na base do projeto, meio que travando o resto do código e dificultando a compilação e as mudanças depois. Um exemplo fácil de reverter é trocar a cor de um botão ou mudar uma tela de lugar no front-end, já que você mexe só ali e não quebra o resto. Já uma decisão difícil é trocar o banco de dados principal depois que o sistema já está rodando, porque todos os dados e a forma como o código puxa as informações vão ter que ser refeitos do zero.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Os porfissionais vão fazer menos codigo proque a IA ja faz esse processo de forma mais rapida, ela ja da o codigo pronto do jeito que seu prompt ofereceu, além de a IA ela tambem pode ensinar o profissional sobre o que ele procura das diversas formas que ele preferir. Os profissionais eles tem vantagem com o a IA como aprendizado "Mas não como muleta", ele pode obter conhecimento com a IA com certas coisas tecnicas e simples que  o profissional nem sabia, mas a IA ela deu esse conhecimento na hora.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Tech Lead cuida da parte técnica e garante que o sistema tenha qualidade e não vire uma bagunça no futuro, enquanto o PO olha para o negócio, decidindo o que traz mais valor e precisa sair logo para o cliente. O atrito acontece quando o PO aperta o prazo para entregar rápido e o Tech Lead precisa segurar a onda para não criar uma dívida técnica que vai quebrar o sistema depois. Quando entra IA no meio, conhecer bem o negócio do cliente (DDD) e escrever especificações claras (specs) vira obrigação, porque sem esse contexto a IA acaba criando coisas genéricas que não resolvem o problema real.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP é o mínimo necessário para testar uma ideia no mercado, o prazo é o tempo que a gente tem para entregar e a escalabilidade é a capacidade do sistema aguentar mais usuários sem travar. Tudo isso molda a arquitetura: para um MVP com prazo curto, a gente escolhe caminhos mais simples e diretos; já se o foco é escalabilidade, precisamos preparar o terreno desde cedo para o sistema crescer. Entre as abordagens da aula, eu usaria o DDD (Domain-Driven Design) em projetos com regras de negócio muito complexas, porque ele ajuda a organizar o código falando a mesma língua do cliente, evitando confusão conforme o sistema cresce.
