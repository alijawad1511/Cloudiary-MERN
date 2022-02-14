const express = require('express')
require('./config/db');
const app = express();


// Middleware to use req.body
app.use(express.json());


// Routes Files
const users = require('./routes/api/users');
app.use('/api/users', users);

const notes = require('./routes/api/notes');
app.use('/api/notes',notes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})