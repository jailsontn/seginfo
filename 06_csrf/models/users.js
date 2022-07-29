const { v4: uuidv4 } = require('uuid')

const objects = [ 
    //usuario jailson e senha 12345678
    {id: '7503061d-e90c-4200-b93c-9051c7825f17', username: "jailson", password: "$2b$10$HW798THX1AKf9kYVf4sEDuyxAQz/kTvF2nqCeq..yAVi2bol0KeXa"},
    //usuario admin e senha 12345678
    {id: '8b098986-23f1-44bd-bbef-320f2b0195a1', username: "admin", password: "$2b$10$CQlZks5/kfyAoyPzS9PiG.RoIHwBPWBE6DFN7WaQfl5oLwC1W2dlW"},
]

const all = function(){
    return objects
}

const findByUsername = function(username){
    return findBy('username', username)
}

const findById = function(id){
    return findBy('id', id)
}

const findBy = function(field, value){
    let user = ""
    const index = all().findIndex(user => user[field] === value)
    console.log(index)
    if (index >= 0) {
        user = all()[index]
    }
    return user
}

module.exports = {
    findByUsername,
}