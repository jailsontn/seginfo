require('express-async-errors');
const express = require('express')
const session = require('express-session')
const createError = require('http-errors')
const log = require('morgan')
//const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: false })

//router
const authRoute = require('./routers/auth')
const warningRoute = require('./routers/warnings')

//middleware
const { get_username } = require('./utils/auth')

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(log("combined"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session(
    {
        name: 'teste',
        cookie: {
            httpOnly: false, //TODO
            sameSite: true,
        },
        secret: 'apkdakpfjsvmdsmlvdslifjkflsd', //TODO
        resave: false,
        saveUninitialized:false,
    }
))
app.use(get_username)
//app.use(cookieParser())
app.use(csrfProtection)
app.get('/', function(req, res , next){
    res.redirect('/warnings')
    return
})
app.use('/', authRoute)
app.use('/warnings', warningRoute)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
app.listen(3000)