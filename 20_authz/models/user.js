// const { v4: uuidv4 } = require('uuid')

const users = [
    {
        id: "b2cebee5-57c1-4b8e-a551-651e3471303d",
        name: "Admin",
        username: "admin",
        password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
        role: "Admin",
    },
    {
        id: "b2cebee5-57c1-4b8e-a551-651e34711234",
        name: "Visitante",
        username: "visitante",
        password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
        role: "Comum",
    },
    {
        id: "b2cebee5-57c1-4b8e-1551-651e34714321",
        name: "editor",
        username: "editor",
        password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
        role: "Editor",
    },
    {
        id: "b2cebee5-57c1-4b8e-1551-651e34717891",
        name: "editor2",
        username: "editor2",
        password: "$2b$10$iodV6OmVXNi/h6hQFVnJ3uVKyAJt2dVj.tp.Qc2znF31zPoEAl3fq",
        role: "Editor",
    },
]

//funções auxiliares
const getUser = function (username) {
    return users.find(user => user.username.toLowerCase() === username.toLowerCase())
}

const getUserByID = function (id) {
    return users.find(user => user.id === id)
}

module.exports = {
    getUser,
    getUserByID,
}