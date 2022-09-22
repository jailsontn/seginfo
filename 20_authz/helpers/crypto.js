const bcrypt = require('bcrypt')

const validPassword = function(user, password){
    return bcrypt.compareSync(password, user.password)
}

module.exports = {
    validPassword
}