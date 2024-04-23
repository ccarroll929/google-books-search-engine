const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
    useCreateIndex: true,
    useFindAndModify: true,
    
}).catch ((err) => {
    console.error(err);
})
module.exports = mongoose.connection;
