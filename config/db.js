const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Successfully...');
    }).catch((e) => {
        console.log("Error : ",e);
    });