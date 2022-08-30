const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicKey = fs.readFileSync('public.pem', {encoding: 'utf-8'})

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkFkbWluIiwiaWF0IjoxNjYxNjQyNTA5LCJleHAiOjE2NjE2NDI4MDksImlzcyI6Im15YXBwIn0.qC86SpbrlCEmZfsAjRNPz7YMtW2WHaj0djIp65F937MV5FNItEBn1LehEpJ0wVQID8HXPVegvbKPU5f1XS-rOF9rmG4757fDBV64WDeqsKxFN5QTRjDhzjE_ydOPM36eQ8VoBZw9R8vuBtXbuoz0Rpo9DvIPFDvXSo6Pqbb-LMd3aNqXfietPszP8ZWz2RXPJIMBBR1bbOVnWt6EW9k03v-fyb6W5cI8ZiFlGXsxQeZ75f9nEw175HTI-e4UgwVpMtbS3B730c9WMmUf5jhHM8kU5-5cSyoEljCJm_tSSnYSh9ZKU1LPUQINk7QC6ngLIBibQbFY4GYxqxyrnWXWXQ'

try {
    const decode = jwt.verify(token, publicKey, {
        algorithm: 'RS256',
        issuer: 'myapp',
    })
    console.log(decode)
} catch (err){
    console.log(err.message)
}
