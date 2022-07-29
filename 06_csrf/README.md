# Cross Site Scripting (XSS)

É um tipo de ataque que tem como objetivo inserir requisições em sessões que já estejam abertas pelo usuário. Em resumo, um ataque CSRF ocorre quando a vítima executa um script, sem perceber, no seu navegador, e este script explora a sessão iniciada em um determinado site.

# Como se proteger?

Uma forma de prevenir ataques do tipo CSRF é adotando um tipo de Token, ou seja, se insere no documento HTML e gera-se uma identificação aleatória.Sendo assim, pode-se autenticar as informações armazenadas na sessão para que cada transação se execute conforme um comando.

## Exploit

1. Execute a aplicação
2. Logue com o usuário admin (Senha: 12345678).
3. Abra o Arquivos csrf.html

## Dica

No nodejs/express use a biblioteca csurf