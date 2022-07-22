const crypto = require('crypto');
const fs = require('fs');

const fileBuffer = fs.readFileSync('hash.js');
const hashSum = crypto.createHash('sha256');
hashSum.update(fileBuffer);

const hex = hashSum.digest('hex');

console.log(hex);