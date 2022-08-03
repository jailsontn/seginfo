
const express = require('express')
const path = require('path');

const app = express()
const port = 4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/buscar.html'));
})

app.listen(port, () => {
  console.log(`Client on port ${port}`)
})
