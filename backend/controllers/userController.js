const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const cloudUpload = await cloudinary.v2.uploader
        .upload(req.body.avatar, {
            folder: 'avatars',
            crop: 'scale'
        });

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url
        }
    });

    sendToken(user, 201, "User registered successfully.", res);

})


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    // Email and Password validation
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password to login.", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password.", 401));
    }

    sendToken(user, 200, "Logged in successfully.", res);

})


// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "User logged out sucessfully."
    })

})


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    // Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Hello ${user.name},
    \nYour password reset token is :- \n\n ${resetPasswordUrl}.
    \nIf you have not requested this email then, please ignore it.
    \n\nThank You,\nNixLab Technologies Team`;

    try {

        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        });

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }

})

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Token is invalid or expired.", 400));
    }


    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, "Password changed successfully.", res);

})


// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    res.status(200).json({
        success: true,
        result: user
    })

})


// Update Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Both passwords do not matched.", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, "Password changed successfully.", res);

})


// Update User Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserDetails = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const cloudUpload = await cloudinary.v2.uploader
            .upload(req.body.avatar, {
                folder: 'avatars',
                width: 150,
                crop: 'scale'
            });

        newUserDetails.avatar = {
            public_id: cloudUpload.public_id,
            url: cloudUpload.secure_url
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "User details updated.",
        result: user
    })

})


// Get All Users -- Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {

    const users = await User.find();
    const usersCount = await User.countDocuments();

    res.status(200).json({
        success: true,
        count: usersCount,
        results: users
    })

})


// Get Custom User Details -- Admin
exports.getCustomUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    res.status(200).json({
        success: true,
        result: user
    })

})


// Update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserDetails = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    await User.findByIdAndUpdate(req.params.id, newUserDetails, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "User role updated."
    })

})


// Delete User -- Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found.", 404));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully."
    })

})