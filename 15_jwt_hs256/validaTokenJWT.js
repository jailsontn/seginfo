const jwt = require('jsonwebtoken')

//substitua pelo token gerando em criaTokenJWT
tokenJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJub21lIjoiQWRtaW4iLCJpYXQiOjE2NjE2NDA2NTAsImV4cCI6MTY2MTY0MDY3MCwiaXNzIjoibXlhcHAifQ.XhPoZsae9taL0YWF0Sjb44DQej_MhYOhwSxJkSf1acA'

/*ATENCÃO: 
Se um atacante tiver acesso ao secredo utilizado na geração dos tokens JWT ele poderá gerar token JWT
e caso utilize-o
Não adicione o segredo hardcode (direto no codigo) utilize outras formas como
 como variaveis de ambiente.
Tenha cuidado para não enviar os segredos para os repositórios do github
*/
const SEGREDO = '12345678'

try{
    const decode = jwt.verify(tokenJwt, SEGREDO, {
        issuer: 'myapp'
    })
} catch (err){
    console.log(err.message)
}