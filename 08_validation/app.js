'strict mode'
const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const { body, validationResult } = require('express-validator')

const app = express()
const logConfiguration = {
    'transports':[
        new winston.transports.Console(
            {
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.label({label: '08_validation'}),
                    winston.format.json()
                )
            }
        )
    ]
}
const logger = winston.createLogger(logConfiguration)


app.use(morgan('combined'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//utilize insomnia para enviar o dados como em uma api
app.post('/users',
    body('username').isLength({ min: 3, max: 20 }).escape(),
    body('name').isLength({ min: 3, max: 40 }).escape(),
    body('password').isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1
    }).withMessage('Password does not meet security criteria'),
    body('email').isEmail().escape(),
    function(req, res, next){
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            //Mascara campo value do erro caso a erro senha no campo da senha - dado sensível
            for (let erro of errors.array()){
                if (erro.param === "password"){
                    erro.value = "*******"
                }
            }
            logger.info({"action": "validation", "type": "users", "value": errors.array(), "ip": ip, "result": "fail" })
            return res.status(400).json({ errors: errors.array() })
        }
        //remove a senha antes de adicionar ao log e de enviar de volta - dado sensível
        delete(req.body.password)
        logger.info({"action": "add", "type": "users", "value": req.body, "ip": ip, "result": "success"})
        res.json(req.body)}
)

app.listen(3000)