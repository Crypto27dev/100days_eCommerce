const mongoose = require("mongoose");

const connectDatabase = async (mongoUri, dbName) => {

    try {
        await mongoose.connect(mongoUri, {
            dbName: dbName,
        });
        console.log(`[db] connected successfully to MongoDB`);
    }
    catch (err) {
        console.log(`[db] could not connect due to [${err.message}]`);
    }

}

module.exports = connectDatabase;