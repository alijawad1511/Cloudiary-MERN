const express = require('express');
const cors = require('cors');
require('./config/db');
const app = express();


// Middleware to use req.body
app.use(express.json());
app.use(cors());


// Routes Files
const users = require('./routes/api/users');
app.use('/api/users', users);

const notes = require('./routes/api/notes');
app.use('/api/notes',notes);



app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`iNotebook Backend is listening at http://localhost:${PORT}`)
})