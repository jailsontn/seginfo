'use strict'
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use(helmet())

//HSTS
// app.use(helmet.hsts()); //Padrão é 15552000 segundos, ou seja 180 dias, e incluir os subdominios
// configura Strict-Transport-Security incluindo subdominios pelo tempo de 1 ano
// app.use(
//     helmet.hsts({
//       maxAge: 31536000,
//       preload: true,
//     })
// );


//
// app.use(helmet.noSniff());

//Hide Poweredby
// app.use(helmet.hidePoweredBy());


//CSP

// app.use(helmet.contentSecurityPolicy());

// Desabilita `contentSecurityPolicy` middleware mas mantem o outros.

// app.use(
//     helmet({
//       contentSecurityPolicy: false,
//     })
// );


// Sets all of the defaults, but overrides `script-src` and disables the default `style-src`
// app.use(
//     helmet.contentSecurityPolicy({
//       directives: {
//         "script-src": ["'self'", "example.com"],
//         "style-src": null,
//       },
//     })
// );
  
  // Sets "Content-Security-Policy: default-src 'self';script-src 'self' example.com;object-src 'none';upgrade-insecure-requests"
//   app.use(
//     helmet.contentSecurityPolicy({
//       useDefaults: false,
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "example.com"],
//         objectSrc: ["'none'"],
//         upgradeInsecureRequests: [],
//       },
//     })
// );

//Ativa somente relatório

// app.use(
//     helmet.contentSecurityPolicy({
//       reportOnly: true,
//       directives: {
//         /* ... */
//       },
//     })
// );


app.get('/', function(req, res){
    res.send('Teste helmet')
});

app.listen(3000)