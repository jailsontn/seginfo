const { createHash } = require('crypto');

//Cria hash
function hash(str, algoritm='sha256') {
    return createHash(algoritm).update(str).digest('hex');

}
//Não utilizar para armazenar senhas.

//Armazena hash
let password = 'Mouratech';
const hashPassword = hash(password);
console.log(hashPassword);

//Cria novo hash
password = 'Mouratech';
const hashPassword2 = hash(password);

//compara hash 
const match = hashPassword === hashPassword2;
console.log(hashPassword2);

console.log(match ? '✔️  good password' : '❌  password does not match');
