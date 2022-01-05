const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to fetch products.", 401));
    }

    const userData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(userData.id);

    next();

})


// AUthorize Roles
exports.authorizeRoles = (...roles) => {
    
    return (req, res, next) => {

        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403));
        }

        next();

    }

}