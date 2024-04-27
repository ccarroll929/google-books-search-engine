const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/googlebooks",
).catch ((err) => {
    console.error(err);
})
module.exports = mongoose.connection;
