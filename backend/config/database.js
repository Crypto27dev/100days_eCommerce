const mongoose = require("mongoose");

const connectDatabase = () => {

    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    });

}

module.exports = connectDatabase