const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Intenal Server Error";


    // Wrong MongoDB Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    // Mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Email is already in use.`;
        err = new ErrorHandler(message, 400);
    }


    // Wrong JWT error
    if (err.name === "jsonWebTokenError") {
        const message = `JWT is invalid.`;
        err = new ErrorHandler(message, 400);
    }


    // JWT Expire error
    if (err.name === "TokenExpiredError") {
        const message = `JWT is expired.`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });

}