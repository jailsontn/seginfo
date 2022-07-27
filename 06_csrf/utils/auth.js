const User = require('../models/users')
const bcrypt = require('bcrypt');

const URL_LOGIN = '/login'
const URL_LOGOUT = '/logout'
const REDIRECT_LOGIN = false

const autenticate = async function(username, password){
    const user = User.findByUsername(username)
    if(user){
        const password_is_correct = await bcrypt.compare(password, user.password)
        if (!password_is_correct){
            throw new Error("Usuário ou senha inválidos")    
        }
        return user
    }else{
        throw new Error("Usuário ou senha inválidos")
    }
    return
}

const login = function(session, user){
    session.user = user;
}

const logout = function(session){
    session.user = null;
    session.destroy()
}

const is_autenticate = function(req, res, next){
    const session = req.session;
    if(session && session.user) {
        next();
    }else{
        if (REDIRECT_LOGIN){
            res.redirect(URL_LOGIN)
            return
        }
        res.status(401).send('É necessário estar autenticado para acessar esse recurso. Acesse <a href="/login">Login</a>')
        return;
    }
}

const get_username = function(req, res, next){
    if (req.session !== undefined && req.session.user)
        res.locals.user = req.session ? req.session.user: '';
    next()
}

module.exports = {
    URL_LOGIN,
    URL_LOGOUT,
    REDIRECT_LOGIN,
    autenticate,
    login,
    logout,
    is_autenticate,
    get_username
}