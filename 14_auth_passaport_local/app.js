'strict mode'
//Código simplificado para fins educacional, não utilize em produção
//Lembre-se valide todas as entrada

const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const bcrypt = require('bcrypt')

//Adiciona modulos do passport
const passport = require('passport')
const passportLocalStrategy = require('passport-local').Strategy

const app = express()

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
const getUser = function(username){
  return users.find(user => user.username.toLowerCase() === username.toLowerCase() )
}

const getUserByID = function(id){
  return users.find(user => user.id === id)
}

const validPassword = function(user, password){
  return bcrypt.compareSync(password, user.password)
}

//configurando passport

/* Esta função é chamada quando o método passport.authenticate() é chamado.
   Se um usuário for encontrado e validado, um callback é chamado (done(null, user)) com o objeto user.
   O objeto de usuário é então serializado com passport.serializeUser() e adicionado ao objeto 
   req.session.passport.
*/
passport.use(new passportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  
},function(username, password, done){
  const user = getUser(username)
  if (!user) return done(null, false, { message: 'Usuário ou senha incorretos.' })
  if (!validPassword(user, password)){
    return done(null, false, { message: 'Usuário ou senha incorretos.' })
  }
  return done(null, user)
}))

/*
  Salva dados do usuário em uma sessão
*/
passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    //done(null, { id: user.id, username: user.username });
    done(null, { id: user.id });
  });
});

/*
  Recupera dados do usuário utilizando as informações da sessão ao acessar req.user
*/
passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    //return done(null, user);
    userInfo = getUserByID(user.id)
    delete(userInfo.password)
    return done(null, userInfo);
  });
});

app.use(passport.initialize());
app.use(passport.authenticate('session'));

//Middleware para verificar a diferença entre req.user e o que armazenado na sessão
// app.use(function (req, res, next){
//   console.log(req.session)
//   console.log(req.user)
//   next()
// })

//middleware
const isAuth = function(req, res ,next){
  if (req.isAuthenticated()) {
    res.locals.username = res.user.username
    next()
  }
  res.status(401).send("Somente usuários autenticados")
}

//rotas

app.get('/', (req, res, next) => {
  res.redirect("/public")
  return
})

app.get('/login', (req, res, next) => {
  res.render('login', {erro: req.query.erro})
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/restrict',
  failureRedirect: '/login?erro=1'
}))

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

//Area pública acessivel sem autenticação
app.get('/public', (req, res, next) => {
  res.render('public')
})

//Area acessível só por usuário autenticado usando metodo de verificação
app.get('/restrict', (req, res, next) => {
  if (req.isAuthenticated()){
    res.render('restrict', {username: req.user.username})
    return
  }
  return res.redirect('/login')
})

//Area acessível só por usuário autenticado usando middleware
app.get('/restrict2', isAuth, (req, res, next) => {
  res.render('restrict')
})

app.listen(3000)
