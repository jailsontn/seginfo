const { v4: uuidv4 } = require('uuid')
const {NotFound} = require('../helpers/erros')
const { getUserByID } = require('./user')
const moment = require('moment')

const format_date = 'DD/MM/YYYY HH:mm'

const comments = [
    {
        id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
        content: "comentario 1",
        creation_date: Date.now(),
        modification_date: Date.now(),
        deleted: false,
        article_id: "b2cebee5-57c1-4b8e-a551-651e34711234",
        author: "b2cebee5-57c1-4b8e-1551-651e34714321" //editor
    },
    {
        id: "b2cebee5-57c1-4b8e-a551-651e3471abdc",
        content: "comentario 2",
        creation_date: Date.now(),
        modification_date: Date.now(),
        deleted: false,
        article_id: "b2cebee5-57c1-4b8e-a551-651e34711234",
        author: "b2cebee5-57c1-4b8e-a551-651e34711234" //visitante
    },
]

//funções auxiliares

const getByID = function (id) {
    const comment = comments.find(c => c.id === id && c.deleted === false)
    if (!comment) throw new NotFound("Comentário não encontrado")
    comment.author_name = getUserByID(comment.author).name
    comment.creation_date_formated = moment(comment.creation_date).format(format_date)
    comment.modification_date_formated = moment(comment.modification_date).format(format_date)
    return comment
}

const getAll = function (article_id=null) {
    let all = comments.filter(comment => comment.deleted === false)
    if (article_id){
        all = all.filter(comment => comment.article_id === article_id)
    }
    all = all.map(comment => {
        comment.author_name = getUserByID(comment.author).name
        comment.creation_date_formated = moment(comment.creation_date).format(format_date)
        comment.modification_date_formated = moment(comment.modification_date).format(format_date)
        return comment
    })
    return all
}

const filter = function(f){
    return getAll().filter(f)
}

const save = function(comment){
    if (comment.id === undefined){
        comment.id = uuidv4()
        comment.creation_date = Date.now()
    }
    comment.modification_date = Date.now()
    comment.deleted = false
    //TODO veriricar se artigo existe
    comments.push(comment)
    return comment
}

const create = function(content, author, article_id){
    return {
        content: content,
        author: author,
        article_id: article_id
    }
}

const destroy = function(comment){
    const commentDB = getByID(comment.id)
    commentDB.deleted = true
}

module.exports = {
    getByID,
    getAll,
    filter,
    save,
    create,
    destroy,
}
