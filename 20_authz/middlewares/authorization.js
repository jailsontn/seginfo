const { isAdmin, isAuthor} = require("../helpers/autorization")

//middleware
const can = (roles) => {
    return (req, res, next) => {
        if (req.isAuthenticated()){
            const userRole = req.user.role
            if (roles.includes(userRole)){
                next()
            }else{
                //TODO passar erro para o next e realizar um tratamento centralizado
                res.status(403).send("Você não possui permissão")
            }
        }else{
            res.status(401).send("Somente usuários autenticados")
        }
    }
}

const onlyAuthorOrAdmin = (object) => {
    return (req, res, next) => {
        if (req.isAuthenticated()){
            try {
                const user = req.user
                req.object = object.getById(req.param.id)
                if (isAuthor(req.object, user) || isAdmin(user)){
                    next()
                }
            } catch (err) {
                res.status(404).send(err.message)
            }
        } else {
            res.status(401).send("Somente usuários autenticados")
        }
    }
}

module.exports = {
    can, 
    onlyAuthorOrAdmin,
}