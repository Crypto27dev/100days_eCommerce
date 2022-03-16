const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// Routes
const product = require('./routes/productRoute');
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// SETTING STATIC WEB PATH
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(
        __dirname,
        "../frontend/build/index.html"
    ))
});


// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;