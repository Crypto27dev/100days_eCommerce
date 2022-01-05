const express = require('express');
const cookieParser = require("cookie-parser");

const app = express();

const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());

// Routes
const product = require('./routes/productRoute');
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app