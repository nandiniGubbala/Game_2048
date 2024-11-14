const mongoose = require("mongoose");

async function connectMongoDb(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected");
    } catch(err) {
        process.exit(1);
    }
}

module.exports = {  connectMongoDb, }