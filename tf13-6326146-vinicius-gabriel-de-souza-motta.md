# TF 13 · Arquitetura de Software

Nome: Vinicius Gabriel De Souza Motta
RA: 6326146
GitHub: https://github.com/ViniciusGMotta

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

A arquitetura de software diz respeito às decisões estruturais e globais de um sistema, funcionando como a planta de uma construção que define as fronteiras entre módulos, a divisão de serviços e como os dados serão organizados. Seu principal critério é o custo de reversão: são escolhas difíceis e caras de desfazer depois que o projeto avança, pois olham para o futuro e para a evolução do produto. Já a engenharia de software atua no dia a dia da implementação, cuidando das decisões locais, da escrita de código limpo, dos testes e da correção de falhas no código-fonte, onde eventuais erros são corrigidos em poucos dias. As duas precisam caminhar juntas porque se complementam diretamente: engenharia sem arquitetura resulta em um código bem escrito dentro de uma estrutura desorganizada que ninguém planejou, enquanto arquitetura sem engenharia torna-se apenas um diagrama bonito que não se sustenta na prática.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Não existe uma disciplina isolada de Arquitetura de Software porque a Engenharia de Software vem primeiro para construir a base única que todo o curso precisa, como terminal, Git, algoritmos, orientação a objetos e código limpo. Depois que essa base está formada, a arquitetura passa a ser estudada dividida dentro de cada matéria específica do curso, caminhando junto com a engenharia de cada área. Em banco de dados, aprendemos a modelar tabelas e índices; no desenvolvimento web, vemos como separar front-end, back-end, camadas e APIs; e em infraestrutura, estudamos onde o sistema roda e como os serviços se conversam e escalam. No fim, projetar a arquitetura geral é justamente saber juntar todas essas partes entendendo o que cada uma exige e entrega.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão pode levar como base o pilar do código: se uma escolha mais fácil de reverter der problema, o tempo para corrigir e o custo são menores, já se algo maior der problema, o custo e o tempo para reverter são muito maiores, gerando mais dor de cabeça e trabalho. As decisões arquiteturais são as mais difíceis de desfazer justamente porque definem a estrutura global do projeto, onde vários módulos dependem delas. Um exemplo fácil de reverter é o nome de uma variável, pois se precisar mudar, é algo local e simples de trocar sem muita dificuldade. Já trocar um banco de dados ou a linguagem de programação em produção vai gerar uma bola de neve de problemas, porque é o alicerce da infraestrutura, exigindo meses para migrar tudo — como se o primeiro fosse a tinta pintada na parede e o outro fossem as vigas que sustentam essa parede.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Hoje em dia, com o programador não precisando mais ficar tão travado na sintaxe do código, ele tem mais tempo para analisar, entender o problema do negócio, decidir a arquitetura e revisar o que foi feito, pensando mais na estrutura do que apenas digitando. Por isso, a afirmação de que a IA vai nivelar o conhecimento entre os profissionais é falsa: na prática, ela aumenta ainda mais a diferença entre quem tem base e quem não tem. Quem sabe arquitetura e domina os fundamentos consegue direcionar os pedidos para onde quer e validar o resultado, sem precisar viver de vibecode ou ficar refém da máquina. Já quem não tem repertório acaba apenas repassando código pronto sem entender o que acontece por baixo, usando a IA como muleta em vez de ferramenta.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

Enquanto o PO fica mais na parte de produto, ouvindo o cliente e entendendo a ideia e o motivo, o Tech Lead fica na parte técnica de cuidar de como vai fazer e garantir a qualidade da arquitetura. O conflito acontece quando o PO quer acelerar demais as entregas para o mercado e pressiona o ritmo do Tech Lead, o que pode gerar atalhos e problemas sérios de estrutura no futuro. Já no trabalho com IA, conhecer bem o domínio do cliente (DDD) é essencial porque a IA sabe programar, mas não conhece as regras reais do negócio. Somado a isso, escrever uma boa especificação (spec) com regras claras e critérios de aceite evita que a IA "adivinhe" o que fazer, permitindo que os testes peguem qualquer erro antes que o sistema chegue no cliente.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP é o menor recorte funcional do produto que já resolve o problema essencial do cliente e ensina algo com o uso, influenciando a arquitetura ao evitar gastos de tempo com estruturas complexas para recursos ainda não validados. Já a estimativa de prazo deve ser feita como uma faixa de tempo com margem de erro e não como uma data exata, o que guia a arquitetura na quebra do sistema em partes menores para cumprir o prazo sem sacrificar a qualidade. A escalabilidade é a capacidade do sistema aguardar o aumento de uso — seja na escala horizontal (como chamar outro food truck quando um está lotado) ou vertical (como construir um segundo andar na casa) —, exigindo uma arquitetura que não otimize cedo demais, mas deixe portas abertas para crescer. Do repertório visto em aula, eu aplicaria a arquitetura orientada a eventos (EDA) em um sistema de loja online, pois ao aprovar um pedido, o sistema dispara eventos independentes para baixar estoque, cobrar e enviar e-mail sem travar o usuário.
