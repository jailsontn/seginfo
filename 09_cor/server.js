
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(cors()) //evite utilizar

// app.use(cors(
//   {
//     origin: [
//       'http://127.0.0.1:4000',
//     ]
//   }
// ))

app.get('/', (req, res) => {
  console.log(req.ip)
  res.send([{'id':1, 'nome': 'Fulano'},{'id':2, 'nome': 'Sicrano'}])
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
