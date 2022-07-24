const express = require('express')
const fs = require('fs')
const app = express()

const folder_download = './files'
const query_string = 'file'

//TODO Fix
function valide_filename(filename){
    allow_filename = await fs.readdirSync(folder_download)
    if (! allow_filename.includes(filename)){
        throw new Error('Arquivo inválido')
    }
}

app.get('/download', function(req, res, next){
    //TODO vulnerable to Directory traversal
    const filename = req.query[query_string]
    //TODO Fix
    // const filename = valide_filename(req.query[query_string])
    const file = fs.readFileSync(`${folder_download}/${filename}`)
    res.send(file)    
})

app.listen(3000, function(){
    console.log('Servidor em execução...')
})