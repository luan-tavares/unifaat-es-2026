# TF 13 · Arquitetura de Software

Nome: Paulo Henrique de Sousa Barbosa
RA: 6326092
GitHub: https://github.com/PaulHSB

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura é toda decisão que é difícil de desfazer, decisões de engenharia não são tão complicadas, pelo menos comparadas às de arquitetura, de se desfazer. Mas mesmo assim, ambas são extremamente importantes, pois juntas elas modelam toda a base de um software, em todos os pontos, tornando a aplicação tolerante a falhas, resiliente, desacoplada, modular, etc.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Isso acontece por que a engenharia é uma matéria base, que está presente em todas as arquitetuas. Git, linux, estrutura de dados, todos esses assuntos permeiam todas as áreas de da tecnologia do desenvolvimento a dados. A arquitetura por sua vez não é algo único, há várias "formas" de arquitetura, orientada a objetos, à eventos. Ela passa a ser estudada quando começamos a desenvolver as aplicações em si, é ai que começamos a vê-las na prática.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Reversão é voltar atrás em uma decisão. Pensando em arquitetura, voltar atrás na escolha de uma arquitetura, por exemplo, POO, é extremamente custoso, pois todo o software foi "desenhado" para funcionar com base nessa arquitetura, todas as escolhas lógicas dentro do código se baseiam nela, por isso é tão difícil reverter. Uma reversão simples seria, voltar atrás em uma branch, um commit, isso é fácil de desfazer e as consequências não costumam ser tão significativas.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Os conhecimentos mais cobrados daqui pra frente serão os fundamentos, a teoria que permeia todo o desenvolvimento de uma aplicação, do negócio ao código. A IA, na realidade, vai aumentar ainda mais diferença de conhecimento entre as pessoas, pois, muito provavelmente, grande parte das pessoas vai usá-la como muleta.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O tech lead é responsável pelo time de desenvolvimento, é ele quem toma as decisões técnicas da aplicação como arquitetura, tecnologias, requisitos, etc. O PO, pode-se dizer, que está mais pro lado do negócio, ele é quem fala diretamente com cliente, define o MVP e, muitas vezes, comunica o cliente a respeito do prazo. A respeito do DDD e a Spec, para ser enxuto, ambos definem *qual* é o problema e *qual* é a solução, mas de pontos de vista diferentes. O DDD, mostra o problema passado pelo cliente, sem termos técnicos de desenvolvimento, sem falar sobre arquitetura, tecnologia, linguagem, nada disso. E através disso, a spec é montada. Tendo em mente, claramente, quais são os problemas a ser resolvidos, é possível começar a definir, tecnicamente, *como* serão resolvidos com tecnologia.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP é o mínimo produto viável, em outras palavras, o mínimo que o cliente precisa para operar, e resolver o/os principais problemas. Estimativa de prazo, quanto tempo, aproximadamente, a aplicação levará para ser finalizada. Escalabilidade, qual é a capacidade de crescimento dessa aplicação, caso o número de usuários aumente, o número de requisições, e outros fatores.

SDD: Em resposta ao vibe-coding, surgiu o SDD, onde você orienta a IA e revisa tudo que ela está gerando, garantindo um resultado aceitavel. O uso mais comum, e onde eu à usaria, seria durante o desenvolvimento de uma aplicação, seja ela qual for. Passando as orientações, decisãos e corrigindo possíveis erros por parte do agente. 
