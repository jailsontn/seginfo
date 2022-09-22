const passportLocalStrategy = require('passport-local').Strategy
const { getUser, getUserByID } = require('../models/user')
const { validPassword } = require('../helpers/crypto')

//configurando passport
module.exports = function (passport) {
    passport.use(new passportLocalStrategy({
        usernameField: 'username',
        passwordField: 'password',

    }, function (username, password, done) {
        const user = getUser(username)
        if (!user) return done(null, false, { message: 'Usuário ou senha incorretos.' })
        if (!validPassword(user, password)) {
            return done(null, false, { message: 'Usuário ou senha incorretos.' })
        }
        return done(null, user)
    }))

    /*
      Salva dados do usuário em uma sessão
    */
    passport.serializeUser(function (user, done) {
        process.nextTick(function () {
            //done(null, { id: user.id, username: user.username });
            done(null, { id: user.id });
        });
    });

    /*
      Recupera dados do usuário utilizando as informações da sessão ao acessar req.user
    */
    passport.deserializeUser(function (user, done) {
        process.nextTick(function () {
            const userInfo = getUserByID(user.id)
            return done(null, userInfo);
        });
    });
}