const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ccarroll0528:vLT2dDmZSKWaeThw@googlebooks.wlexjm2.mongodb.net/",
).catch ((err) => {
    console.error(err);
})
module.exports = mongoose.connection;
