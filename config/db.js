const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/iNotebook')
.then(() => {
    console.log('Connected to MongoDB Successfully...');
}).catch((e) => {
    console.log("Error : ", e);
});