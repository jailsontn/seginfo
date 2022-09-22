# Exemplo simples de autorização

Esta aplicação exemplifica o uso de autorização em um blog simples

## Papeis/Funções

| Papel/Função  |
|---------------|
| Admin         |
| Editor        |
| Reader        |

## Usuários

| Usuário  | Senha    | Papel/Função |
|----------|----------|--------------|
| admin    | 12345678 | Admin        |
| editor   | 12345678 | Editor       |
| editor2  | 12345678 | Editor       |
| visitante| 12345678 | Visitante    |


## Observações

Para testar aplicação crie o arquivo .env igual ao arquivos .env_example substituindo os valores das variáveis de ambiente.

Leia todos os comentários do código.

Lembre-se de instalar todos as dependências utilizando o comando npm install.

Nota: Não utilize esse código em produção, exemplo simplificado para entendimento de alguns conceitos com o foco em aprendizagem