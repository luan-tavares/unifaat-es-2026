# TF 13 · Arquitetura de Software

Nome: Joao Pedro Duarte da Silva
RA: 6326327
GitHub: https://github.com/k1llJao

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões estruturais de um sistema que são difíceis de mudar depois de tomadas. Não se trata de um diagrama bonito ou da escolha de uma ferramenta isolada, mas sim de responder perguntas como: como o sistema se divide em partes, onde ficam as fronteiras entre elas, qual banco de dados usar e onde a regra de negócio mora. A engenharia de software, por sua vez, é o corpo de princípios que sustenta a construção com qualidade — algoritmos, estruturas de dados, orientação a objetos, controle de versão, boas práticas. Em resumo, engenharia é a base sólida e arquitetura é saber juntar as peças com critério. As duas precisam andar juntas porque engenharia sem visão arquitetural produz código bem escrito dentro de uma estrutura ruim, e arquitetura sem engenharia gera diagramas que o código nunca respeita. Quando o diagrama diz uma coisa e o sistema faz outra, o sistema ganha — e aí o projeto vira um problema difícil de resolver.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

A disciplina se chama Engenharia de Software porque ela cobre a base que é comum a todas as áreas do curso: terminal, Git, algoritmos, estruturas de dados, orientação a objetos e código limpo. Essa base precisa vir antes de tudo, uma única vez, independentemente do caminho que o aluno vai seguir depois. A arquitetura, por outro lado, não é uma só — ela começa dentro de cada assunto, e cada área tem as suas próprias perguntas e decisões. O banco de dados tem a sua arquitetura (como modelar, que índices usar, qual consistência é necessária), a web tem a sua (como dividir front e back, como expor a API) e a infraestrutura tem a sua (onde o sistema roda, como ele escala). Por isso a arquitetura não aparece como uma matéria separada: ela surge dentro de disciplinas como Banco de Dados, Desenvolvimento Web e Infraestrutura, quando o aluno já tem a base para entender o que está decidindo. Só depois que cada área construiu a sua arquitetura é que elas se juntam na arquitetura do sistema como um todo, que agrega tudo e exige entender o que cada parte exige e entrega.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

Custo de reversão é quanto custa voltar atrás em uma decisão tomada. Esse critério é justamente o que separa uma decisão de arquitetura de uma decisão qualquer: quanto maior o custo de desfazer, mais arquitetural ela é. Decisões arquiteturais são as mais difíceis de reverter porque afetam múltiplas partes do sistema ao mesmo tempo — elas definem fronteiras, contratos entre componentes e onde a regra de negócio mora. Mudar isso depois que o sistema está em produção significa reescrever, migrar dados e realinhar a equipe, o que pode custar meses. Um exemplo fácil de reverter é o nome de uma variável: trocar `x` por `totalPedido` leva segundos e não quebra nada além do próprio arquivo. Já trocar o banco de dados depois de um ano em produção é uma decisão difícil de reverter: o esquema de dados, as consultas, os índices, os backups e possivelmente a estrutura de módulos inteiros precisam mudar juntos. A diferença está no impacto no sistema: o nome da variável é local e isolado; o banco de dados é estrutural e permeia tudo. Por isso uma das tarefas mais valiosas da arquitetura é transformar decisões irreversíveis em reversíveis, ou pelo menos adiá-las até que se saiba mais sobre o problema.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Quando escrever código vira commodity, o que passa a valer é o que a IA não consegue fazer sozinha: entender o problema real do cliente (que quase nunca é o que ele descreveu na primeira conversa), decidir a estrutura do sistema, e julgar o que foi gerado — se o código está certo, é seguro e a equipe consegue mantê-lo. Ler e revisar código com critério também ganha peso, porque com a IA uma pessoa passa a revisar muito mais do que escreve. Sem base sólida, revisar vira apenas opinião; com base, é conferência. Sobre a afirmação de que a IA vai nivelar o conhecimento: ela é otimista demais e a história já mostrou que não se sustenta. O buscador deu a todo mundo acesso à informação do mundo inteiro, e o conhecimento não se nivelou. A IA é a ferramenta mais poderosa dessa mesma linhagem. O resultado que ela entrega depende diretamente do que você pede, e o que você pede depende do que você sabe. Quem tem base dirige a ferramenta; quem não tem aceita o que vier. Além disso, usar a IA como atalho para não pensar leva à acomodação: o conteúdo passa pela pessoa mas não fica nela. A IA funciona como um multiplicador — amplifica quem já tem base e dá, na melhor das hipóteses, ilusão de competência para quem não tem.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O PO (Product Owner) responde pelo "o quê" e o "por quê": ouve o cliente, decide o que entra no MVP, define prioridades e cuida do valor entregue. O Tech Lead responde pelo "como": cuida da arquitetura, da qualidade do código, do que é difícil de mudar e do ritmo da equipe. O conflito aparece quando o PO quer entregar mais funcionalidades rapidamente e o Tech Lead defende que a estrutura precisa de tempo para ser feita do jeito certo — um empurra o escopo para cima, o outro alerta para o custo que isso vai cobrar lá na frente. O conhecimento do domínio (o que o DDD formaliza) é o que permite ao profissional entender o que o cliente realmente precisa, usar as mesmas palavras que ele e perceber quando uma regra não faz sentido. Isso não está em nenhum framework e não pode ser gerado por IA, porque mora na cabeça das pessoas do negócio. A spec, por sua vez, é o texto que descreve o que o software deve fazer — e quando a IA escreve o código, a spec passa a ser o trabalho mais importante que sobra para a pessoa. Uma spec vaga não some: ela vira código plausível e errado, que parece funcionar e só falha na regra que ninguém escreveu. Quem domina o domínio e escreve bem a spec dirige a IA com precisão; quem não domina recebe um resultado genérico que custa caro para corrigir.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

MVP (Minimum Viable Product) é a menor versão do produto que entrega valor real e permite aprender com o uso. Ele influencia a arquitetura porque força a definir fronteiras claras entre o que entra agora e o que fica de fora — e essa fronteira precisa estar no código, não só na conversa. Estimativa de prazo é a previsão do tempo necessário para entregar, e ela sempre deve ser uma faixa, não um ponto, porque a incerteza diminui conforme o projeto avança. Uma estimativa honesta muda a arquitetura porque impõe limites: se o prazo aperta, o escopo cede (o MVP de novo), e não a qualidade escondida. Escalabilidade é a capacidade do sistema de continuar funcionando bem quando a carga cresce. Ela não exige otimização prematura, mas exige que a arquitetura não feche portas: fronteiras claras entre as partes permitem escalar um componente sem arrastar os outros. Dos três repertórios vistos em aula, aplicaria o SDD (Spec-Driven Development) em projetos onde a IA é usada para gerar boa parte do código. Nesse cenário, a spec é o contrato entre o que o cliente precisa e o que a máquina vai produzir: os exemplos concretos da spec viram testes que conferem automaticamente se o código gerado está correto. Sem spec, o código gerado pode parecer certo e estar errado; com spec, o teste falha antes do cliente reclamar.
