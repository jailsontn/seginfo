const express = require('express')
const fs = require('fs')
const app = express()

const folder_download = './files'
const query_string = 'file'

app.get('/download', function(req, res, next){
    const filename = req.query[query_string]
    //TODO vulnerable to Directory traversal
    const file = fs.readFileSync(`${folder_download}/${filename}`)
    res.send(file)    
})

app.listen(3000, function(){
    console.log('Servidor em execução...')
})