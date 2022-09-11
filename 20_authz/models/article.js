const { v4: uuidv4 } = require('uuid')
const Comments = require('./comments')
const { getUserByID } = require('./user')
const {NotFound} = require('../helpers/erros')

const DRAFT = '1'
const PUBLISHED = '2'
const ALL='ALL'

const articles = [
    {
        id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
        title: "How Bedrock Streaming migrated from VMware to XCP-ng",
        content: "For our latest user story we had the opportunity to speak with Vincent Gallissot, Lead Ops at Bedrock Streaming. In 2021, the company made the choice to migrate its on-premises infrastructure from VMware to XCP-ng.",
        creation_date: Date.now(),
        modification_date: Date.now(),
        status: DRAFT,
        author: 'b2cebee5-57c1-4b8e-1551-651e34714321', //editor
        deleted: false,
    },
    {
        id: "b2cebee5-57c1-4b8e-a551-651e34711234",
        title: "Why Xen wasn't hit by RETBleed on Intel CPUs",
        content: "You probably heard about RETBleed security issue. Almost all operating systems had to release patches regarding this new hardware vulnerability. See our previous blog post about it:",
        creation_date: Date.now(),
        modification_date: Date.now(),
        status: PUBLISHED,
        author: 'b2cebee5-57c1-4b8e-1551-651e34714321', //editor
        deleted: false,
    },
]

//funções auxiliares

const getByID = function (id) {
    const article = articles.find(article => article.id === id && article.deleted === false)
    if (!article) throw new NotFound("Artigo não encontrado")
    article.comments = Comments.getAll(id)
    article.author_name = getUserByID(article.author).name
    return article
}

const getAll = function (status=ALL) {
    if (status === ALL){
        return articles.filter(article => article.deleted === false)
    }
    return articles.filter(article => article.status === status && article.deleted === false)
}

const filter = function(f){
    return getAll().filter(f)
}

const update = function(article_id, title, content, status){
    const article = getByID(article_id)
    article.title = title
    article.content = content
    article.status = status
    article.modification_date = Date.now()
}

const save = function(article){
    if (article.id === undefined){
        article.id = uuidv4()
        article.creation_date = Date.now()
        article.modification_date = Date.now()
        article.deleted = false
        articles.push(article)
    }else{
        update(
            article.id,
            article.title,
            article.content,
            article.status
        )
    }
    return article
}



const create = function(title, content, author, status=DRAFT){
    return {
        title: title,
        content: content,
        author: author,
        status: status,
        deleted: false,
    }
}

const destroy = function(id){
    const article = getByID(id)
    article.deleted = true
}

module.exports = {
    getByID,
    getAll,
    save,
    create,
    filter,
    destroy,
    update,
    ALL,
    PUBLISHED,
    DRAFT
}