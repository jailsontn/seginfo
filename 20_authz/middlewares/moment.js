const moment = function (req, res, next) {
    res.locals.moment = require('moment')
    next()
}

module.exports = moment