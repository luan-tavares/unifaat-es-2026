# TF 13 · Arquitetura de Software

Nome: Raphael Apparecido Da Cunha
RA: 6326072
GitHub: https://github.com/RaphaelDaCunha

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões que definem como um sistema será organizado, dividido e como suas partes vão se comunicar. Ela se diferencia da engenharia de software porque a engenharia fornece os princípios e as técnicas para desenvolver um programa com qualidade, enquanto a arquitetura utiliza esses conhecimentos para tomar decisões mais estruturais. Por exemplo, a engenharia está relacionada à organização do código e à escolha de estruturas de dados, enquanto a arquitetura decide como os módulos serão separados. As duas precisam trabalhar juntas porque não adianta ter um planejamento bem elaborado se o código não seguir aquilo que foi definido. Da mesma forma, não adianta ter um código bem escrito se a estrutura geral do sistema for ruim.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Acredito que isso acontece porque a arquitetura não é algo único, já que cada área da tecnologia possui necessidades e decisões diferentes. A Engenharia de Software ensina uma base comum para todos, como lógica, programação, estruturas de dados, orientação a objetos e Git. Já a arquitetura começa a ser estudada dentro das matérias específicas do curso. Por exemplo, em banco de dados são estudadas decisões sobre organização e armazenamento das informações, enquanto em desenvolvimento web são estudadas as divisões entre frontend e backend. Na infraestrutura, aparecem questões relacionadas a servidores e escalabilidade. Depois, todos esses conhecimentos podem ser reunidos para formar a arquitetura de um sistema completo.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão representa o esforço, o tempo e os recursos necessários para desfazer uma decisão que já foi tomada em um projeto. As decisões arquiteturais costumam ser mais difíceis de reverter porque podem afetar várias partes do sistema e exigir muitas alterações. Um exemplo de decisão fácil de mudar seria o nome de uma variável, pois normalmente basta alterar o nome no código. Já uma decisão difícil seria trocar o banco de dados de um sistema que já está funcionando há bastante tempo, pois seria necessário adaptar consultas, estruturas e possivelmente migrar informações. A diferença está no impacto que cada decisão causa no projeto. Por isso, é importante pensar bem nas escolhas que podem gerar grandes dificuldades no futuro.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com o avanço da inteligência artificial, escrever código está ficando mais rápido, então outras habilidades passam a ser mais importantes para o profissional. Saber entender o problema do cliente, planejar a estrutura do sistema, ler códigos e identificar erros se torna essencial. Também é importante ter conhecimento técnico para avaliar se aquilo que a IA produziu realmente está correto e atende às necessidades do projeto. Na minha opinião, a IA não vai nivelar completamente o conhecimento entre os profissionais, porque todos podem ter acesso à ferramenta, mas nem todos sabem utilizá-la da mesma maneira. Quem possui uma boa base consegue fazer perguntas melhores, identificar problemas e aproveitar melhor as respostas. Já quem depende totalmente da IA pode acabar aceitando respostas sem entender o que está fazendo.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Tech Lead é responsável pela parte técnica do projeto, cuidando da arquitetura, da qualidade do código e ajudando a equipe a resolver problemas. Já o PO é responsável por entender as necessidades do cliente, definir prioridades e decidir quais funcionalidades são mais importantes para o produto. Pode acontecer um conflito quando o PO deseja entregar muitas funcionalidades rapidamente, enquanto o Tech Lead percebe que isso pode prejudicar a qualidade ou a estrutura do sistema. O DDD é importante porque ajuda os desenvolvedores a entenderem melhor o negócio do cliente e utilizar os conceitos dele na organização do software. A spec também é essencial, principalmente com o uso da IA, pois descreve claramente o que precisa ser desenvolvido, quais são as regras e como verificar se o resultado está correto.



---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP é a primeira versão de um produto que possui apenas as funcionalidades mais importantes, mas que já consegue entregar valor ao usuário. A estimativa de prazo é uma previsão do tempo necessário para desenvolver o projeto, considerando as tarefas, dificuldades e possíveis imprevistos. Já a escalabilidade é a capacidade de um sistema continuar funcionando bem mesmo quando aumenta a quantidade de usuários ou informações. Esses três conceitos influenciam a arquitetura porque é necessário planejar uma estrutura que atenda às necessidades atuais sem gastar recursos desnecessários ou impedir melhorias futuras. Uma abordagem que eu utilizaria seria o DDD, principalmente em sistemas que possuem regras de negócio mais complexas. Ele ajuda a organizar o código de acordo com as necessidades do negócio, facilitando a manutenção e as futuras alterações.
