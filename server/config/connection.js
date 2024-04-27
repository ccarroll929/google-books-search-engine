const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks",
).catch ((err) => {
    console.error(err);
})
module.exports = mongoose.connection;
