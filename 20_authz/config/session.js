module.exports = function (store) {
  return {
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, //Produção deve ser true, utiliza https
      sameSite: "strict",
      maxAge: 1000 * 60 * 30, //em milisegundos
    }
  }
}