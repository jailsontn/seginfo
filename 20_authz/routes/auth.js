const express = require('express');
const passport = require('passport')
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login', { erro: req.query.erro })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login?erro=1'
}))

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router