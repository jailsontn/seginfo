'strict mode'
//Código simplificado para fins educacional, não utilize em produção
//Lembre-se valide todas as entrada

const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const bcrypt = require('bcrypt')

const app = express()

//variaveis de ambiente a partir do arquivo .env
require('dotenv').config()

//configurando pug como mecanismo de modelo
app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("combined"))

//configurando sessão
//Exemplo de codigo para gerar chave secreta
// require('crypto').randomBytes(64).toString('hex')
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  //store: O armazenamento padrão não é feito para produção 
  cookie: {
    httpOnly: true,
    secure: false, //Produção deve ser true, utiliza https
    sameSite: "strict",
    maxAge: 1000 * 60 * 30, //em milisegundos
  }
}))

//Simulando base de usuários

//gerar id utilizando o uuid v4
//const { v4: uuidv4 } = require('uuid')
//uuidv4()

//gerar senhas
//const bcrypt = require("bcrypt")
//bcrypt.hashSync("12345678", 10)
const users = [
  {
    id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
    name: "Admin",
    username: "admin",
    password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
  },
]


//funções auxiliares

//busca usuário no array de usuários
const getUser = function(username){
  return users.find(user => user.username.toLowerCase() === username.toLowerCase() )
}

//valida password enviado com hash de senha do usuário
const validPassword = function(user, password){
  return bcrypt.compareSync(password, user.password)
}

//gera hash de senha para uso na função de registro de usuários
const generatePasswordHash = function (password){
  return bcrypt.hashSync(password, 10)
}

//autenticação baseada em sessão

//Adiciona usuário a sessão
const login = function(req, user){
  req.session.user = user
}

//destroi a sessão
const logout = function(req){
  req.session.user = null
  req.session.destroy()
}

//verifica se o usuário está autenticado
const isAutenticaded = function(req){
  if (! req.session.user) {
    return false
  }
  return true
}

//middleware
//verifica se o usuário está auntenticado
const isAuth = function(req, res, next){
  if (! req.session.user) {
    return res.status(401).send("Somente usuários autenticados")
    //return res.redirect(`/login?next=${req.originalUrl}`)
  }
  //adiciona a variavel username para ser utilizada na view do pug
  res.locals.username = req.session.user.username
  next()
}

//rotas

app.get('/', (req, res, next) => {
  res.redirect("/public")
  return
})

app.get('/login', (req, res, next) => {
  res.render('login', {erro: req.query.erro})
})

app.post('/login', (req, res, next) => {
  //TODO Valide todas as entradas
  const user = getUser(req.body.username)
  //verifica se o usuário existe
  if (! user) {
    return res.redirect('/login?erro=1')
  }
  //verifica se a senha esta correta
  if (! validPassword(user, req.body.password)){
    return res.redirect('login?erro=1')
  }
  //Adiciona o usuário na sessão
  login(req, user)
  //redireciona para área restrita após logar
  return res.redirect('/restrict')
})

app.get('/logout', (req, res, next) => {
  logout(req)
  return res.redirect('/')
})

//Area pública acessivel sem autenticação
app.get('/public', (req, res, next) => {
  res.render('public')
})

//Area acessível só por usuário autenticado usando metodo de verificação
app.get('/restrict', (req, res, next) => {
  if (isAutenticaded(req)){
    //res.send(`Bem vindo ${req.session.user.username}. <a href="/logout">Logout</a>`)
    res.render('restrict', {username: req.session.user.username})
    return
  }
  //res.send('Acesso restrito a usuários autenticados. Faça <a href="/login">login</a>.')
  return res.redirect('/login')
})

//Area acessível só por usuário autenticado usando middleware
app.get('/restrict2', isAuth, (req, res, next) => {
  res.render('restrict')
})

app.listen(3000)
