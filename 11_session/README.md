# Exemplo utilizando o modulo express-session

## Como usar

1. Entre na pasta 11_SESSION
2. Instale as dependências do projeto utilizando o comando npm install
3. Renomei o arquivo .env_example para .env e modifique o valor da variavel de ambiente SESSION_SECRET para o valor aleatório.
4. Acesse http://127.0.0.1:3000 varias vezes e verifique o contador modificar nos acesso dentro da mesma sessão.
5. Aguarde 20 segundo e verifique que o contador reinciou devido a expiração da sessão.