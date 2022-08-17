'strict mode'
require('dotenv').config()

const morgan = require('morgan')
const express = require('express')
const session = require('express-session')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('combined'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 10,
        httpOnly: true,
        secure: false, //production true
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: false,
}))


app.get('/', (req, res, next) => {
    if (!req.session.views){
        req.session.views = 0
    }
    req.session.views++
    res.send(`Endpoint / ${req.session.views} acessos na sessão ${req.session.id}`)
})


app.listen(3000)