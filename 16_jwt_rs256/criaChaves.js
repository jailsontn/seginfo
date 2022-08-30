//

const { generateKeyPairSync } = require('crypto');
const fs = require('fs')

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, // the length of your key in bits
  publicKeyEncoding: {
    type: 'spki', // recommended to be 'spki' by the Node.js docs
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
    format: 'pem',
  },
});

fs.writeFileSync('public.pem', publicKey)
console.log(publicKey);
fs.writeFileSync('private.pem', privateKey)
console.log(privateKey);