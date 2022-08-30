'strict mode'
//Código para fins educacionais. Não utilize-o em produção.
const jwt = require('jsonwebtoken')

payload = {
    id: "1",
    nome: "Admin"
}

/*ATENCÃO: 

Se um atacante tiver acesso ao secredo utilizado na geração dos tokens JWT ele poderá gerar token JWT
e caso utilize-o
Não adicione o segredo hardcode (direto no codigo) utilize outras formas como
 como variaveis de ambiente.
Tenha cuidado para não enviar os segredos para os repositórios do github
O segredo ser randomico e grande para evitar ataques de força bruta
*/

//HS256 (HMAC with SHA-256) 
const SEGREDO = '12345678'
token = jwt.sign(payload, SEGREDO, {
    encoding: "utf-8",
    expiresIn: "10m",
    issuer: "myapp"
})
console.log(token)

//verificar token gerando usando o https://jwt.io/ 