'strict mode'
const bcrypt = require('bcrypt')

//Função para criar hash para armazenar no banco
const generatePassword = function(password){
    const rounds = 12
    return bcrypt.hashSync(password, rounds)
}

//função para validar senha passada comparando a hash armazenado no banco
const validPassword = function(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword)
}

//Exemplo de uso

//Cria hash da senha 1234568 utilizando o algoritimo bcrypt
password = '12345678'
const ini = Date.now()
const passwordHash = generatePassword(password)
const fim = Date.now()
console.log(`Hash da senha ${password}: ${passwordHash}`)
console.log(`tempo para criar o hash ${fim - ini} milisegundos`)

//compara senha passada com hash 
const match = validPassword(password, passwordHash)

console.log(match ? '✔️  good password' : '❌  password does not match');