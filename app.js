const express = require('express')
require('./config/db');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})