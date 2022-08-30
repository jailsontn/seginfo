const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync('private.pem', {encoding: 'utf-8'})

const payload = {
    id: 1,
    nome: "Admin"
}

const token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    issuer: "myapp",
    encoding: "utf-8",
    expiresIn: "5m",
})

console.log(token)


