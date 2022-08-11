const express = require('express')
const router = express.Router()

//model
const Warning = require('../models/warnings.js');
//middleware
const { is_autenticate } = require('../utils/auth')


router.get('/', is_autenticate, function(req, res, next){
    res.render('warning_list', { 'title': 'Listar avisos', 'list_warnings': Warning.all(), 'csrfToken': req.csrfToken()})
})

router.get('/add', is_autenticate, function(req, res, next){
    res.render('warning_form', { 'title': 'Adicionar avisos', 'csrfToken': req.csrfToken() })
})

router.post('/add', function(req, res, next){
    let description = req.body.description
    let warning = Warning.create({
        description: description
    })
    res.redirect('/')
    return
})

router.get('/delete/:id', is_autenticate, function(req, res, next){
    let id = req.params.id
    let warning = Warning.findById(id)
    Warning.delete_(id)
    res.redirect('/')
    return
})

router.get('/edit/:id', is_autenticate, function(req, res, next){
    let id = req.params.id
    let warning = Warning.findById(id)
    res.render('warning_form', { 'title': 'Editar avisos', 'warning': warning, csrfToken: req.csrfToken() })
})

router.post('/edit/:id', is_autenticate, function(req, res, next){
    let id = req.params.id
    let description = req.body.description
    let warning_update = Warning.update(id, {
        description: description,
    })
    res.redirect('/')
    return
})

module.exports = router
