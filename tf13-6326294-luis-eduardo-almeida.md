# TF 13 · Arquitetura de Software

Nome: Luis Eduardo Almeida
RA: 6326294
GitHub: https://github.com/GitEduardoHub

> Responda cada questão em texto corrido, de 5 a 10 linhas, com as suas palavras e
> fundamentando o que afirmar. Não copie o slide nem o briefing. Apague as linhas entre
> parênteses ao responder.

---

## Questão 1

Defina arquitetura de software e explique a diferença entre arquitetura e engenharia de
software. Por que as duas precisam andar juntas em um projeto?

**Resposta:**

Arquitetura de software é o conjunto de decisões estruturais fundamentais de um sistema que determinam sua organização global, limites entre módulos, mecanismos de comunicação e sustentabilidade a longo prazo, caracterizando-se por terem um custo de reversão elevado. A engenharia de software representa a base de princípios, técnicas e boas práticas aplicadas na construção diária do código, abrangendo lógica, estruturas de dados, orientação a objetos, testes e controle de versão, com foco na qualidade da implementação local e imediata. Enquanto a engenharia resolve como implementar corretamente uma parte específica, a arquitetura define como essas partes se organizam para permitir evolução futura. As duas precisam caminhar juntas porque a arquitetura emerge do acúmulo de decisões diárias de engenharia: uma arquitetura sem engenharia sólida gera diagramas conceituais que o código não sustenta, ao passo que uma engenharia sem visão arquitetural produz código limpo isolado, mas preso em uma estrutura caótica e acidental que inviabiliza mudanças.

---

## Questão 2

Existe uma disciplina chamada Engenharia de Software, mas não existe uma chamada
Arquitetura de Software. Explique por que isso acontece e em que momentos do curso a
arquitetura passa a ser estudada.

**Resposta:**

Essa divisão ocorre porque a Engenharia de Software fornece a fundação conceitual e prática comum e indispensável para qualquer especialidade da computação, abrangendo terminal, Git, lógica, orientação a objetos e boas práticas de código que todo desenvolvedor precisa dominar antes de avançar. Por outro lado, a arquitetura não se apresenta como um bloco isolado e genérico; ela nasce e se desenvolve no interior de cada domínio técnico específico. Durante o curso, a arquitetura começa a ser estudada gradualmente nas disciplinas subsequentes, onde cada área aborda seus próprios trade-offs estruturais, como a modelagem e integridade em Banco de Dados, a separação de camadas e consumo de APIs em Desenvolvimento Web, e a resiliência e balanceamento em Infraestrutura. Mais adiante, nos semestres finais e projetos integradores, essas arquiteturas setoriais convergem e se agregam, capacitando o aluno a compreender como todos os componentes dialogam para compor a arquitetura global de um sistema completo.

---

## Questão 3

Explique o conceito de custo de reversão e por que as decisões arquiteturais são as mais
difíceis de desfazer. Apresente um exemplo de decisão fácil de reverter e um de decisão
difícil de reverter, justificando a diferença.

**Resposta:**

O custo de reversão refere-se à quantidade de tempo, esforço, risco e recursos financeiros exigidos para desfazer ou alterar uma escolha técnica após o sistema já ter sido construído ou colocado em operação. As decisões arquiteturais são as mais difíceis de desfazer porque afetam a estrutura basilar da aplicação, estabelecendo dependências profundas, fronteiras de comunicação e convenções das quais múltiplos serviços e regras de negócio passam a depender diretamente. Um exemplo de decisão de baixo custo de reversão é a renomeação de variáveis ou a refatoração do algoritmo interno de uma função encapsulada, pois a mudança é pontual, protegida por testes unitários e concluída em poucos minutos sem impacto cascata no restante do sistema. Em contrapartida, um exemplo de alto custo de reversão é a troca do paradigma do banco de dados (migrar de relacional para NoSQL com gigabytes de dados já gravados) ou a migração de um monólito para arquitetura orientada a microsserviços assíncronos, exigindo reescrita de contratos, reformulação da infraestrutura, migração de dados e semanas de validação e risco operacional.

---

## Questão 4

Com o uso de IA, o profissional passa a escrever menos código. Quais competências ganham
importância nesse cenário e por quê? Avalie criticamente a afirmação "a IA vai nivelar o
conhecimento entre os profissionais".

**Resposta:**

Com a automação acelerada da digitação de código pelas ferramentas de IA, ganham destaque competências analíticas de alto nível, tais como o entendimento aprofundado do domínio de negócio, a capacidade de redigir especificações técnicas precisas, a leitura crítica e revisão criteriosa de código alheio, a modelagem arquitetural e o domínio de terminal, automação e infraestrutura. Essas habilidades tornam-se primordiais porque a geração de código vira commodity, enquanto o julgamento crítico, a governança e a responsabilidade pelas falhas permanecem integralmente humanas. A afirmação de que a IA vai nivelar o conhecimento é equivocada e ignora o padrão histórico de inovações como a internet e os motores de busca, que democratizaram o acesso à informação mas não igualaram a capacidade de raciocínio. A IA opera como um multiplicador de capacidade: profissionais com base técnica sólida usam prompts cirúrgicos e realizam diagnósticos refinados obtendo alavancagem exponencial, ao passo que profissionais sem base viram meros intermediários passivos que acumulam ilusão de competência e não sabem identificar alucinações ou brechas graves de segurança.

---

## Questão 5

Descreva as responsabilidades do Tech Lead e do PO e explique onde elas podem entrar em
conflito. Em seguida, explique por que o conhecimento do domínio do cliente (DDD) e a
escrita de uma especificação (spec) são tão importantes para quem trabalha com IA.

**Resposta:**

O Product Owner (PO) é responsável pelo "o quê" e "por quê" do produto, atuando como a voz do cliente e do negócio ao definir prioridades, escopo do MVP e critérios de aceitação para maximizar o valor entregue. Já o Tech Lead responde pelo "como", liderando a equipe técnica nas decisões de arquitetura, qualidade do código, padrões de engenharia e sustentabilidade da infraestrutura. O conflito entre ambos costuma surgir no equilíbrio entre velocidade de entrega e dívida técnica: enquanto o PO pode demandar lançamentos antecipados e novas funcionalidades para satisfazer o mercado, o Tech Lead precisa assegurar tempo para refatoração, testes e integridade arquitetural. Nesse cenário potencializado por IA, o domínio do cliente (DDD) e a criação de especificações claras (specs) tornam-se cruciais porque a IA não possui capacidade de dedução mágica; sem regras de negócio rigorosas e linguagem ubíqua documentadas com limites e exemplos de entrada/saída, a máquina gera código genérico com falhas silenciosas. A spec atua como o contrato formal do sistema e orienta os testes automatizados que comprovam se o código gerado atende perfeitamente ao negócio.

---

## Questão 6

Defina MVP, estimativa de prazo e escalabilidade e explique como cada um influencia as
decisões de arquitetura. Escolha uma abordagem do repertório de arquitetura vista em aula
(EDA, DDD ou SDD) e diga em que tipo de problema você a aplicaria.

**Resposta:**

O MVP (Produto Mínimo Viável) é a menor versão funcional que entrega valor imediato e valida hipóteses com usuários reais, direcionando a arquitetura a ser simples e pragmática, sem overengineering precoce, mas sem fechar portas para o futuro. A estimativa de prazo é a previsão realista do tempo necessário para materializar o escopo acordado, impondo restrições pragmáticas que impedem o uso irresponsável de ferramentas desconhecidas que ameacem o cronograma. A escalabilidade é a aptidão do software para suportar cargas crescentes de requisições, dados e usuários sem perda de desempenho, orientando decisões sobre distribuição horizontal, gerenciamento de estado e particionamento de bancos. Dentre as abordagens abordadas, escolho a EDA (Event-Driven Architecture), estilo arquitetural em que componentes desacoplados comunicam-se de forma assíncrona emitindo e reagindo a eventos de negócio por meio de filas ou tópicos. Eu a aplicaria em uma plataforma de e-commerce e logística com alto volume de vendas, onde após o pagamento de um pedido diversos subsistemas independentes (como baixa de estoque, nota fiscal e expedição) precisam processar dados em paralelo sem bloquear a experiência de checkout do consumidor.
