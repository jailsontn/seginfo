const express = require('express');
const asyncHandler = require('express-async-handler')
const router = express.Router();
const Article = require('../models/article')
const Comment = require('../models/comments')
const ROLE = require('../models/roles')
const { AccessDenied } = require('../helpers/erros')
const { isAuth } = require('../middlewares/auth')

router.get('/', async (req, res) => {
    //TODO validar req.query.status valores aceitos (undefined, ALL, 1 or 2)
    let articles = []
    //Pega artigos de acordo com o papel do usuário    
    if (!req.isAuthenticated() || req.user.role === ROLE.READER) {
        articles = Article.getAll(Article.PUBLISHED)
    }
    else if (req.user.role === ROLE.ADMIN) {
        articles = Article.getAll()
    } else if (req.user.role === ROLE.EDITOR) {
        articles = Article.filter(article => article.status === Article.PUBLISHED || article.author === req.user.id)
    }
    //ordena artigos pela data de modificação
    articles.sort((a, b) => b.modification_date - a.modification_date)
    //filtra artigos pelo status
    if (req.query.status) {
        if (req.query.status !== 'ALL') {
            articles = articles.filter((article) => article.status === req.query.status)
        }
    }
    //filtra meus artigos
    if (req.query.me) {
        if (req.query.me === '1' && req.isAuthenticated()) {
            articles = articles.filter((article) => article.author === req.user.id)
        }
    }
    //captura mensagem da sessão
    const messages = await req.consumeFlash('info');
    //redenriza pagina
    res.render('blog_list', { 'articles': articles, messages: messages, search: req.query })
})

router.post('/add',
    isAuth,
    asyncHandler(
        async (req, res) => {
            if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.EDITOR) {
                const article = Article.create(
                    req.body.title,
                    req.body.content,
                    req.user.id,
                    req.body.status,
                )
                Article.save(article)
                await req.flash('info', 'Artigo adicionado com sucesso')
                return res.redirect('/blogs')
            } else {
                throw new AccessDenied("Vocẽ não pode incluir novos artigos")
            }
        }
    )
)

router.get('/add',
    isAuth,
    (req, res) => {
        if (req.user.role === ROLE.ADMIN || req.user.role === ROLE.EDITOR) {
            return res.render('article_form')
        } else {
            throw new AccessDenied("Vocẽ não pode incluir novos artigos")
        }
    }
)

router.get('/edit/:id',
    isAuth,
    (req, res) => {
        const article = Article.getByID(req.params.id)
        if (req.user.role === ROLE.ADMIN || //regra admin
            (req.user.role === ROLE.EDITOR && article.author === req.user.id)) { //regra editor
            return res.render('article_form', { article: article })
        } else {
            throw new AccessDenied("Vocẽ não possui acesso a esse artigo")
        }
    }
)

router.post('/edit/:id',
    isAuth,
    asyncHandler(
        async (req, res) => {
            const article = Article.getByID(req.params.id)
            if (req.user.role === ROLE.ADMIN || // regra admin
                (req.user.role === ROLE.EDITOR && article.author === req.user.id)) { // regra editor
                article.title = req.body.title
                article.content = req.body.content
                article.status = req.body.status
                Article.save(article)
                await req.flash('info', 'Artigo atualizado com sucesso')
                return res.redirect('/blogs')
            } else {
                throw new AccessDenied("Vocẽ não possui acesso a esse artigo")
            }
        }
    )
)

router.get('/delete/:id',
    isAuth,
    asyncHandler(
        async (req, res) => {
            const user = req.user
            const article = Article.getByID(req.params.id)
            if (user.role === ROLE.ADMIN || //regra admin
                (user.role === ROLE.EDITOR && article.author === user.id)) { //regra editor
                Article.destroy(article.id)
            } else {
                throw new AccessDenied("Vocẽ não pode acessar esse artigo")
            }
            await req.flash('info', 'Artigo excluido com sucesso')
            return res.redirect('/blogs')
        }
    )
)

router.get('/:id', (req, res) => {
    const article = Article.getByID(req.params.id)
    if ((!req.isAuthenticated() && article.status === Article.PUBLISHED) || //usuário não autenticado
        (req.user.role === ROLE.READER && article.status === Article.PUBLISHED) || //usuário comum
        (req.user.role === ROLE.ADMIN) || // regra para admin
        (req.user.role === ROLE.EDITOR) && (article.status === Article.PUBLISHED || article.author === req.user.id)) { // regra editor
        const comments = Comment.getAll(article.id)
        res.render('blog_view', { article: article, comments: comments })
    } else {
        throw new AccessDenied("Vocẽ não possui acesso a esse artigo")
    }
})

router.post('/comments/add',
    isAuth,
    (req, res) => {
        const comment = Comment.create(
            req.body.content,
            req.user.id,
            req.body.article_id,
        )
        Comment.save(comment)
        return res.redirect(`/blogs/${req.body.article_id}`)
    })

router.get('/comments/delete/:id',
    isAuth,
    (req, res) => {
        const comment = Comment.getByID(req.params.id)
        if ((req.user.role === ROLE.ADMIN) || //regra admin
            (req.user.role === ROLE.EDITOR && comment.author === req.user.id) || //regra editor
            (req.user.role === ROLE.READER && comment.author === req.user.id)) {//regra comum
            Comment.destroy(comment)
            return res.redirect(`/blogs/${comment.article_id}`)
        } else {
            throw new AccessDenied("Vocẽ não possui acesso a esta operação")
        }
    }
)

module.exports = router