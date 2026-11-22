# TF 13 · Arquitetura de Software

Nome: Nicoly Thomaz de Oliveira
RA: 6326018
GitHub: https://github.com/NicolyThomaz

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

A arquitetura de software é o planejamento de como será um sistema, definindo como suas partes serão organizadas e como se ralacionam. Podemos comparar com a construção de uma casa, a arquitetura seria a planta, mostrando como os cômodos serão distribuídos e como a casa será organizada, enquanto a engenharia seria a construção em si, transformando o planejamento em algo real.

As duas se complementam, pois, assim como na construção de uma casa, se o planejamento ou a execução não forem bem feitos, o projeto poderá precisar de reajustes, gerando prejuízos financeiros, atrasos e problemas no funcionamento do sistema.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A arquitetura de um sistema envolve diferentes áreas, como banco de dados, desenvolvimento web e infraestrutura, cada uma possui sua própria arquitetura. Por isso, não existe uma única disciplina que ensina toda a arquitetura de software.

Ela é estudada ao longo do curso, depois de aprender a base de engenharia de software, enquanto estudamos assuntos de diferentes áreas, aprendendo a arquitetura aos poucos.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Custo de reversão é o esforço, o tempo e os recursos necessários para desfazer uma decisão que já foi tomada. Decisões arquiteturais são difíceis de desfazer porque envolvem a estrutura do sistema e podem afetar várias partes ao mesmo tempo.

Uma decisão fácil de reverter seria mudar o nome de uma variável. Já uma decisão difícil seria trocar o bando de dados utilizado pelo sistema, pois isso pode exigir mudanças no código e em outras partes que dependem dele. A primeira alteração afeta uma pequena parte do código, enquanto a segunda pode comprometer toda a estrutura do sistema.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

A capacidade de analisar, revisar e tomar decisões ganha ainda mais importância, assim comon o conhecimento técnico e o entendimento das necessidades do sistema.

A IA não nivela o conhecimento entre profissionais, pois os resultados dependem do conhecimento de quem utiliza a ferramenta. Embora ela seja a mesma para todos, é mais eficaz nas mãos de quem possui conhecimento para elaborar boas instruções, identificar erros e avaliar as soluções geradas, escolhendo aquelas que melhor atendem às necessidades do sistema.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Tech Lead é responsável por definir como o sistema será desenvolvido, escolhendo a arquitetura e a engenharia, cuidando da qualidade do código, revisando o trabalho e ajudando a resolver os problemas técnicos. O PO define o que deve ser feito e por quê, ouvindo o cliente e entendendo as necessidades do negócio.

O conflito pode acontecer quando as necessidades do produton entram em choque com as decisões técnicas. Por exemplo, o PO pode querer lançar uma funcionalidade rapidamente, enquanto o Tech Lead entende que é necessário mais tempo para garantir qualidade e evitar problemas futuros.

O DDD permite entender as regras de negócio e as necessidades específicas do projeto, algo que a IA não consegue definir sozinha. A spec é importante porque descreve de forma clara o que deve ser desenvolvido, orientando a IA e permitindo verificar se o resultado está correto por meio dos critérios de aceite e dos testes.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP (Produto Mínimo Viável) é a primeira versão de um produto, desenvolvida apenas com as funcionalidades essenciais para atender às principais necessidades principais do cliente. Ele influencia a arquitetura porque permite começar com uma estrutura simples, testar o produto, receber feedback dos usuários e realizar melhorias com base no que realmente precisam.

A estimativa de prazo é a previsão do tempo necessário para desenvolver e entregar um projeto. Ela influencia as decisões de arquitetura porque é preciso considerar o tempo disponível para escolher soluções viáveis, equilibrando a rapidez da entrega com a qualidade do sistema.
A escalabilidade é a capacidade de um sistema de crescer e suportar o aumento de usuários, dados e acessos sem perder desempenho. Ela influencia a arquitetura porque é preciso pensar em uma estrutura que consiga acompanhar esse crescimento, seja aumentando os recursos de uma só máquina (escalabilidade vertical) ou adicionando mais servidores (escalabilidade horizontal)

Aplicaria o DDD em um sistema que possui muitas regras de negócio, como um sistema de vendas, no qual existem regras relacionadas a pedidos, pagamentos e entregas. O DDD ajuda a organizar essas regras de acordo com o funcionamento do negócio, facilitando a manutenção e a evolução do sistema.
