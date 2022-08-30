'strict mode'
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const process = require('node:process')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const port = 3000
//Simulando base de usuários
const users = [
    {
      id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
      name: "Admin",
      email: "admin@teste.com",
      password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
    },
]


//funções auxiliares

//valida password enviado com hash de senha do usuário
const validPassword = function(user, password){
    return bcrypt.compareSync(password, user.password)
}
  
//gera hash de senha para uso na função de registro de usuários
const generatePasswordHash = function (password){
    return bcrypt.hashSync(password, 12)
}

//busca usuário no array de usuários
const getUser = function(email){
    return users.find(user => user.email.toLowerCase() === email.toLowerCase() )
}

//verifica se usuário com mesmo e-mail existe na base
const existUser = function(email){
    const user = getUser(email)
    if (user){
        return true
    }
    return false
}

//cria usuário
const createUser = function(name, email, password){
    //TODO Necessário validar entradar do usuário
    return {
        id: uuidv4(),
        name: name,
        email: email,
        password: generatePasswordHash(password)
    }
}

//salva usuário no array
const saveUser = function(user){
    users.push(user)
}

//cria token JWT
const createToken = function(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        subject: payload.email, issuer: 'myapp', expiresIn: "10m"
    })
}

//cria payload para token JWT a apartir do usuário
const createPayloadToken = function(user){
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}


//midleware

//verifica o e valida o token no cabeçalho http Autorization
const autenticateToken = function(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token && token == null) return res.status(401).json({message: 'Token não encontrado'})
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
        req.user = decoded
        next()
    } catch(err) {
        return res.status(401).json({message: 'Erro na autenticação'})
    }
}

//rota de acesso publico sem necessidade de autenticação
app.get("/public", (req, res) => {
    res.status(200).json({"message": "Dados públicos"})
})

//rota de login
app.post("/login", (req, res) => {
    //TODO Valide todas as entradas
    //TODO registre em log as atividades referentes a autenticação

    //logica de autenticação
    const user = getUser(req.body.email)
    //verifica se o usuário existe
    if (! user) {
        return res.status(401).json({auth: false, message: "Login ou senha inválidos."})
    }
    //verifica se a senha esta correta
    if (! validPassword(user, req.body.password)){
        return res.status(401).json({auth: false, message: "Login ou senha inválidos."})
    }
    //cria payload
    const payload = createPayloadToken(user)
    //retorna token de autenticação
    res.status(200).json({
        auth: true,
        email: payload.id,
        token: createToken(payload)
    })
})

//rota para registro de novos usuários
app.post('/register', (req, res) => {
    //TODO: valide todas as entradas do usuário e imponha uma politica de senha forte para o usuário
    //TODO: registre em log a criação do usuário

    //verifica se email já cadastrado
    if (existUser(req.body.email)){
        return res.status(400).json({ message: "Já existe e-mail cadastrado com esse e-mail."})
    }
    const user = createUser(
        req.body.name,
        req.body.email,
        req.body.password
    )
    //salva usuário criado no array
    saveUser(user)
    //cria payload para adicionar no token
    const payload = createPayloadToken(user)
    //retorna dados do usuário com token de autenticação
    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: createToken(payload)
    })
})

//rota para logout
app.delete("/logout", (req, res) => {
    //como não é possivel validar o token a mensagem é informando o cliente para destruir o token
    res.status(200).json({
        auth: false,
    })
})

//rota acessivel somente autenticada
app.get("/private",
    autenticateToken, 
    (req, res) => {
        res.status(200).json({"message": `Acesso autenticado via token para ${req.user.email} `})
    }
)

app.listen(port, () =>{
    console.log(`Servidor iniciado na porta ${port}`)
})
