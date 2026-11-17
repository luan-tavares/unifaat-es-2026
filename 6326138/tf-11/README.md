# TF-11 — Object Calisthenics e Refatoração

Refatoração da loja feia aplicando as regras do Object Calisthenics: normalização de dados, eliminação de primitive obsession, coleções de primeira classe, entidades pequenas com responsabilidade única, Lei de Demeter, Tell Don't Ask, eliminação de `else` e limite de 1 nível de indentação por método.

---

## Respostas do Roteiro

### 1. Normalização: o que é, e que problema ela resolveu na loja?
Normalização é a prática de manter cada dado em um único lugar na memória, fazendo os outros pontos apenas apontarem para essa referência. Na loja feia, os dados cadastrais da Ana Souza estavam duplicados nos pedidos 1 e 3; com a criação da classe `Cliente`, ambos os pedidos compartilham a mesma instância, eliminando redundância e o risco de inconsistência caso o endereço ou email dela mudasse.

### 2. Obsessão por tipos primitivos: por que Cpf virou classe e Dinheiro guarda centavos?
O `Cpf` virou classe (Value Object) para que sua regra de negócio (ter exatamente 11 dígitos) fique contida no próprio construtor, impedindo que CPFs inválidos circulem silenciosamente pela aplicação. O `Dinheiro` guarda centavos como número inteiro para evitar os erros clássicos de arredondamento e precisão do tipo `float` em operações financeiras (como `0.1 + 0.2 != 0.3`).

### 3. Diga, não pergunte: o que mudou na forma de pagar um pedido?
Em vez de um código externo inspecionar se o pedido está aberto e se tem itens via getters para depois invocar um setter, o cliente agora simplesmente diz `pedido.pagar()`. A regra de validação e a mudança de estado ficam totalmente encapsuladas dentro da própria classe `Pedido`, que responde se conseguiu realizar a ação ou não.

### 4. Fail first: onde estava o hadouken da loja feia e como ele ficou?
O hadouken estava na antiga função `valida`, que continha quatro níveis de `if/else` aninhados para checar email, cpf e cep. Ele foi eliminado ao transferir cada validação para o construtor do seu respectivo Value Object com retorno antecipado / exceção imediata. As ramificações de `else` nos descontos foram substituídas por polimorfismo (`TipoNormal`, `TipoVip`, `TipoFuncionario`).

### 5. Modularização: responsabilidade de cada classe criada
- `Cpf`: encapsula e valida os 11 dígitos do CPF.
- `Email`: encapsula e valida formato e preenchimento de e-mail.
- `Cep`: encapsula e valida os 8 dígitos do CEP.
- `Dinheiro`: manipula valores monetários como centavos inteiros com operações aritméticas seguras.
- `Status`: gerencia e transita os estados possíveis de um pedido.
- `TipoNormal`: calcula o desconto de 0% para clientes comuns.
- `TipoVip`: calcula o desconto de 10% para clientes VIP.
- `TipoFuncionario`: calcula o desconto de 20% para funcionários.
- `Pessoa`: agrupa os dados de identidade (nome, CPF e e-mail).
- `Endereco`: agrupa as informações de localização física (rua, cidade e CEP).
- `Cliente`: vincula a pessoa, seu endereço e a respectiva política de desconto.
- `Produto`: define o catálogo de itens com nome e preço unitário.
- `ItemDoPedido`: associa um produto à quantidade comprada e calcula o subtotal.
- `ItensDoPedido`: coleção de primeira classe que encapsula a lista de itens e totalizações do pedido.
- `Pedido`: controla o ciclo de vida, totalização e transições de pagamento de uma compra.
- `Pedidos`: coleção de primeira classe que encapsula o dicionário geral de pedidos da loja.

### 6. Dívida técnica
A regra mais desafiadora foi conciliar a **Lei de Demeter** com a restrição de **no máximo 3 variáveis por classe**. Para evitar que o relatório precisasse acessar `pedido.cliente.endereco.cidade`, foi necessário delegar a informação passo a passo (`pedido -> cliente -> endereco`). Isso exigiu atenção redobrada no desenho das entidades para não criar métodos desnecessários mantendo cada classe coesa e estritamente abaixo do limite de atributos.

