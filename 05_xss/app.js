const express = require('express')
//TODO: FIX vunerability
//const sanitizeHtml = require('sanitize-html');

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', function(req, res, next){
    res.render('index')
})

app.get('/search', function(req, res, next){
    //TODO vulnerable XSS
    const search = req.query['search']
    //TODO: FIX vunerability
    // const search = sanitizeHtml(req.query['search'])
    
    res.render('search', {'search': search})
})

app.listen(3000)