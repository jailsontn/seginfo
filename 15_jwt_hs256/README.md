# Exemplos de geração e validação de Token JWT utilizando HS256

HS256 (HMAC com SHA-256) é um algoritmo de hash com chave simétrica que usa uma chave secreta. Simétrico significa que duas partes compartilham a chave secreta. A chave é usada tanto para gerar a assinatura quanto para validá-la.

Os exemplos desse projeto utilizam a biblioteca *jsonwebtoken*.
Mais informações sobre o uso da biblioteca https://www.npmjs.com/package/jsonwebtoken

## Observações

Esteja atento ao usar uma chave compartilhada; ela pode abrir vulnerabilidades potenciais se os verificadores (vários aplicativos) não estiverem devidamente protegidos.
