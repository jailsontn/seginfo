const express = require('express')
const router = express.Router()

const User = require('../models/users')

const { autenticate, login, logout, URL_LOGIN} = require('../utils/auth')

router.get('/login', function(req, res, next){
    res.render('login_form', {'csrfToken': req.csrfToken()})
})

router.post('/login', async function(req, res, next){
    let username = req.body.username
    let password = req.body.password
    try {
        let user = await autenticate(req.body.username, req.body.password)
        login(req.session, user)
        res.redirect('/');
    } catch(e){
        res.render('login_form', {errors: [{'msg': e.message}]});
    }
    return    
})

router.post('/logout', function(req, res, next){
    logout(req.session)
    res.redirect(URL_LOGIN)
    return
})

module.exports = router