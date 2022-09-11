//middleware
const isAuth = function(req, res ,next){
    if (req.isAuthenticated()) {
      res.locals.username = req.user.username
      next()
    } else {
      res.status(401).send("Somente usuários autenticados")
    }
}


const sendUserView = function(req, res ,next){
  if (req.isAuthenticated()) {
    res.locals.username = req.user.username
    res.locals.user = req.user
  }else{
    res.locals.username = null
    res.locals.user = null
  }
  next()
}

module.exports = {
    isAuth,
    sendUserView
}