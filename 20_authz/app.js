'strict mode'
//Código simplificado para fins educacional, não utilize em produção
//Lembre-se valide todas as entrada
require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const session = require("express-session")
const MemoryStore = require('memorystore')(session)
const sessionOptions = require('./config/session')(new MemoryStore({
  checkPeriod: 86400000 // prune expired entries every 24h
}))

const { flash } = require('express-flash-message');
const passport = require('passport')

const moment = require('./middlewares/moment')

const authRouter = require('./routes/auth')
const articleRouter = require('./routes/article')

const { sendUserView } = require('./middlewares/auth')
const { handler_error } = require('./helpers/erros')


const app = express()

//configurando pug como mecanismo de modelo
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("combined"))

//configurando sessão
app.use(session(sessionOptions))
app.use(flash({ sessionKeyName: 'flashMessage' }));
//configurando passport
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.authenticate('session'));

//rotas
//Middleware para verificar a diferença entre req.user e o que armazenado na sessão
// app.use(function (req, res, next){
//   console.log(req.session)
//   console.log(req.user)
//   next()
// })
app.use(sendUserView)
app.use(moment)

//rotas
app.use('/', authRouter)
app.use('/blogs', articleRouter)
app.get('/', (req, res) => {
  res.redirect("/blogs")
  return
})

//tratamento de erro
app.use((err, req, res, next) => {
  handler_error(err, res, next)
})

app.listen(3000)
