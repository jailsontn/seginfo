const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

const message = 'Mouratech aprendendo criptografia simétrica';
const key = randomBytes(32); //key
const iv = randomBytes(16); //vector inicialization
const cipher = createCipheriv('aes256', key, iv);

/// Encrypt
const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
console.log(`Encrypted: ${encryptedMessage}`);

/// Decrypt
const decipher = createDecipheriv('aes256', key, iv);
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
console.log(`Deciphered: ${decryptedMessage.toString('utf-8')}`);