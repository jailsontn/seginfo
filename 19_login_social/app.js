'strict mode'
//Código simplificado para fins educacional, não utilize em produção
//Lembre-se valide todas as entrada
//Crie log para todas as ações importantes

const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

//Adiciona modulos do passport
const passport = require('passport')
const passportLocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

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
    sameSite: "lax",
    maxAge: 1000 * 60 * 30, //em milisegundos
  }
}))

//Simulando base de usuários
let users = [
  {
    id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
    name: "Admin",
    email: "admin@teste.com",
    password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
    last_login: null,
    federation: {
      strategy: 'local',
      info_strategy: ''
    }
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

//busca usuário no array de usuários
const getUserByID = function(id){
  return users.find(user => user.id === id)
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
      password: generatePasswordHash(password),
      federation: {
        strategy: 'local',
        info_strategy: ''
      }
  }
}

//salva usuário no array
const saveUser = function(user){
  users.push(user)
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
  // Atualiza data do ultimo login
  user.last_login = Date.now();
  return done(null, user)
}))

//estrategia google
passport.use(new GoogleStrategy(    
  { 
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/auth/redirect',
      scope: [ 'profile', 'email', 'openid' ],
      state: false,
  }, 
  function(accessToken, refreshToken, profile, done){
    let user = getUser(profile.emails[0].value);
    if (!user){
      user = createUser(
        profile.displayName, //name
        profile.emails[0].value, //email
        "", //password
      )
      //adiciona dados do provedor de autenticação
      user.federation = {
        strategy: profile.provider,
        info_strategy: profile.id
      }
      //sava usuário na base
      saveUser(user)
    }else{
      // Atualiza data do ultimo login
      user.last_login = Date.now();
    }
    return done(null, user);
},
));


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

//app.use(passport.initialize());
app.use(passport.session());

//Middleware para verificar a diferença entre req.user e o que armazenado na sessão
app.use(function (req, res, next){
  console.log(req.session)
  console.log(req.user)
  next()
})

//middleware
const isAuth = function(req, res ,next){
  if (req.isAuthenticated()) {
    res.locals.email = req.user.email
    return next()
  }
  return res.status(401).send("Somente usuários autenticados")
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
    res.render('restrict', {email: req.user.email})
    return
  }
  return res.redirect('/login')
})

//Area acessível só por usuário autenticado usando middleware
app.get('/restrict2', isAuth, (req, res, next) => {
  
  return res.render('restrict')
})


//rotas para o login social
app.get('/google/auth', passport.authenticate('google'));
app.get('/google/auth/redirect', 
  passport.authenticate('google', { 
    failureRedirect: '/login?erro=1',
    successReturnToOrRedirect: '/restrict',
  }),
);

app.listen(3000)
