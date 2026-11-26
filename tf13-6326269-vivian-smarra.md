# TF 13 · Arquitetura de Software

Nome: (Vivian Vitória Smarra Martins Da Silva)
RA: (6326269)
GitHub: (https://github.com/Viviansmarra)

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

(Arquitetura de software é a maneira como um sistema é organizado, pensando em sua estrutura e em como suas partes vão funcionar juntas. A engenharia de software está mais relacionada ao desenvolvimento e à implementação do sistema no dia a dia. A principal diferença é que a arquitetura envolve decisões maiores, que podem ser difíceis de mudar depois, enquanto a engenharia trabalha mais com as decisões de como fazer cada parte funcionar. As duas precisam andar juntas porque não adianta ter uma boa arquitetura se o código não seguir o que foi planejado. Também não adianta ter um código bem feito se a estrutura do sistema não foi pensada corretamente.)

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

(Isso acontece porque a arquitetura não é aprendida em apenas uma matéria, ela aparece em diferentes assuntos durante o curso. Primeiro aprendemos a base da engenharia de software, como programação, Git, estruturas de dados e código limpo. Depois, conforme estudamos outras áreas, como banco de dados e desenvolvimento de sistemas, também aprendemos a organizar cada uma dessas partes. A arquitetura vai sendo construída com esses conhecimentos e com as decisões que tomamos durante o desenvolvimento. Por isso, não é algo que aprendemos de uma vez só, mas que vamos entendendo melhor ao longo do curso)

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

(Custo de reversão é o esforço necessário para desfazer uma decisão que já foi tomada. Algumas mudanças são simples, mas outras podem levar muito tempo porque afetam várias partes do sistema. Por exemplo, mudar o nome de uma variável é algo fácil de corrigir, pois não costuma afetar a estrutura do projeto. Já mudar o banco de dados de produção pode ser bem mais complicado, porque envolve informações armazenadas e partes do sistema que dependem dele. Por isso, as decisões de arquitetura precisam ser pensadas com cuidado, já que podem ser muito mais difíceis e caras de mudar depois.)

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

(Com a IA escrevendo parte do código, o profissional precisa saber entender o problema, fazer boas perguntas e conferir se o resultado está correto. Também é importante ter conhecimento técnico e entender o que o cliente realmente precisa, porque não podemos simplesmente confiar em tudo que a IA produz. Na minha opinião, a IA ajuda bastante e facilita o trabalho de quem está aprendendo, mas não significa que todos terão o mesmo conhecimento. Quem já tem uma boa base consegue perceber melhor os erros e orientar a ferramenta de uma forma mais eficiente. Por isso, acredito que a IA ajuda a desenvolver o trabalho, mas não substitui o conhecimento de cada profissional)

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

(O PO é responsável por entender o que o cliente precisa, definir prioridades e decidir o que deve ser feito primeiro. Já o Tech Lead cuida da parte técnica, escolhendo como o sistema será desenvolvido e buscando manter sua qualidade. Pode acontecer de o PO querer entregar uma funcionalidade mais rápido, enquanto o Tech Lead percebe que é necessário mais tempo para fazer isso da maneira correta. O conhecimento do negócio é importante porque cada cliente tem suas próprias regras e necessidades, e precisamos entender isso antes de desenvolver o sistema. A spec também ajuda porque deixa explicado o que precisa ser feito, facilitando o trabalho da equipe e da IA, que consegue gerar algo mais próximo do esperado.)

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

(MVP é a primeira versão de um produto, com as funcionalidades mais importantes para que ele possa ser usado e testado pelos clientes. A estimativa de prazo ajuda a organizar o desenvolvimento, considerando o tempo necessário para cada etapa, incluindo testes e revisões. Já a escalabilidade é a capacidade de um sistema crescer e atender mais usuários sem deixar de funcionar corretamente. Esses pontos influenciam a arquitetura porque precisamos pensar no que é necessário entregar agora, mas sem dificultar o crescimento do sistema no futuro. Eu escolheria DDD para um sistema de uma empresa que possui várias regras de negócio, pois ajuda a organizar o software de acordo com as necessidades e o funcionamento daquela empresa.)
