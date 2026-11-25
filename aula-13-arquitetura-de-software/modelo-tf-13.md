# TF 13 · Arquitetura de Software

Nome: (seu nome completo)
RA: (seu RA)
GitHub: (link do seu perfil, ex.: https://github.com/maria-silva)

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é a organização estrutural de um sistema, envolvendo decisões importantes sobre sua divisão, seus componentes, módulos e a maneira como eles se relacionam. Essas decisões geralmente são difíceis e custosas de modificar depois que o sistema está desenvolvido.

A engenharia de software está relacionada à implementação, à qualidade do código e às atividades do dia a dia do desenvolvimento. Enquanto a arquitetura define como o sistema será organizado, a engenharia trabalha para construir essa estrutura de maneira eficiente e correta.

As duas precisam andar juntas porque não adianta ter uma arquitetura bem planejada se o código não respeitar essa organização. Da mesma forma, não adianta desenvolver um código de qualidade se o sistema não possuir uma estrutura adequada. Portanto, a arquitetura orienta o projeto e a engenharia transforma essas decisões em um sistema funcional.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Isso acontece porque a arquitetura de software não é um conhecimento isolado, mas reúne decisões sobre a estrutura e o funcionamento de diferentes partes de um sistema. A engenharia de software fornece uma base comum de conhecimentos, como terminal, Git, algoritmos, estruturas de dados, orientação a objetos e código limpo.

Ao longo do curso, a arquitetura passa a ser estudada dentro das diferentes áreas de conhecimento. Por exemplo, na área de banco de dados, aprendemos sua arquitetura e engenharia; na área web, estudamos a arquitetura e a engenharia de aplicações web; e na infraestrutura, aprendemos como organizar e estruturar os recursos.

Dessa forma, cada disciplina ensina a arquitetura de seu próprio assunto, e esses conhecimentos se juntam para formar a arquitetura completa de um sistema.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão representa o esforço, o tempo e os recursos necessários para desfazer uma decisão que já foi tomada em um projeto. Quanto maior o custo para voltar atrás, mais importante e arquitetural é considerada essa decisão.

As decisões arquiteturais são mais difíceis de desfazer porque podem afetar toda a estrutura do sistema, envolvendo diferentes módulos, componentes e até a infraestrutura.

Um exemplo de decisão fácil de reverter é a escolha do nome de uma variável, pois sua alteração normalmente exige apenas uma pequena modificação no código. Já um exemplo de decisão difícil de reverter é a escolha do banco de dados utilizado em um sistema que já está em produção, pois sua substituição pode exigir migração de dados, alterações no código e testes em diversas partes da aplicação.

A diferença está no impacto e no trabalho necessário para modificar cada decisão.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com o uso da inteligência artificial no desenvolvimento de software, o profissional passa a dedicar menos tempo à escrita de códigos repetitivos e mais tempo a atividades como entender problemas, tomar decisões, revisar resultados e conhecer as necessidades do cliente.

Nesse cenário, competências como pensamento crítico, capacidade de análise, conhecimento técnico, julgamento e domínio do negócio ganham importância, pois o profissional precisa saber orientar a inteligência artificial e avaliar se o resultado produzido está correto.

A afirmação de que a IA vai nivelar o conhecimento entre os profissionais não é totalmente verdadeira. Segundo o conteúdo apresentado na aula, a mesma ferramenta pode gerar resultados diferentes dependendo do conhecimento de quem a utiliza. Um profissional que possui uma boa base técnica consegue elaborar instruções mais claras, identificar erros e avaliar melhor as respostas. Portanto, a IA pode aumentar a produtividade, mas não substitui o conhecimento e a capacidade de decisão humana.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O PO (Product Owner) é responsável por entender as necessidades do cliente e do negócio, definir prioridades, estabelecer o que fará parte do produto mínimo viável (MVP) e determinar os critérios de aceitação.

Já o Tech Lead é responsável pelas decisões técnicas, pela arquitetura e pela engenharia do sistema, além de cuidar da qualidade do código, revisar o trabalho e ajudar a equipe a resolver dificuldades técnicas.

Essas responsabilidades podem entrar em conflito quando as necessidades do produto e as decisões técnicas não estão alinhadas. Por exemplo, o PO pode desejar uma entrega mais rápida, enquanto o Tech Lead identifica que determinada solução pode comprometer a qualidade ou dificultar futuras mudanças no sistema.

O conhecimento do domínio do cliente, relacionado ao DDD (Domain-Driven Design), é importante porque permite compreender as regras de negócio e utilizar a linguagem do próprio cliente no desenvolvimento do software. Já a spec (especificação) descreve claramente as regras, os exemplos e os critérios de aceitação que devem ser atendidos.

Esses conhecimentos são fundamentais para trabalhar com IA porque permitem fornecer instruções mais precisas, orientar a geração do código e verificar se o resultado realmente atende às necessidades do negócio.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP (Produto Mínimo Viável) é a menor versão de um produto que possui funcionalidades suficientes para funcionar e permitir que o cliente utilize e avalie a solução. Ele influencia as decisões de arquitetura porque ajuda a definir quais funcionalidades são realmente necessárias no início do projeto e quais podem ser desenvolvidas posteriormente.

A estimativa de prazo representa uma previsão do tempo necessário para desenvolver o projeto. Essa estimativa deve ser apresentada como uma faixa de tempo, considerando as incertezas, as atividades de desenvolvimento, os testes, as revisões e a implantação. Ela influencia a arquitetura porque ajuda a definir prioridades e organizar o desenvolvimento de acordo com o tempo disponível.

A escalabilidade é a capacidade de um sistema de suportar o aumento da demanda. Ela pode acontecer de forma vertical, aumentando os recursos de um servidor, ou horizontal, adicionando mais servidores para distribuir o processamento. Essa característica influencia a arquitetura porque o sistema precisa ser organizado de maneira que permita seu crescimento sem exigir mudanças muito difíceis.

Entre as abordagens estudadas, escolheria o SDD (Spec-Driven Development), que é o desenvolvimento orientado por especificações. Aplicaria essa abordagem em um projeto que utiliza inteligência artificial para desenvolver um sistema de pedidos de uma loja virtual. A especificação descreveria as regras de negócio, os exemplos de funcionamento e os critérios de aceitação, permitindo que a IA desenvolvesse o código de acordo com as necessidades definidas. Depois, os testes verificariam se os resultados estão corretos.
