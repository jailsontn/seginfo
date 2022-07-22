const {  publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

secretMessage = "Mouratech aprendendo criptografia assimétrica"

//Encrypt
const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(secretMessage)
  );
console.log(encryptedData.toString('hex'))

//Decrypt
const decryptedData = privateDecrypt(
    privateKey,
    encryptedData
);
console.log(decryptedData.toString('utf-8'));