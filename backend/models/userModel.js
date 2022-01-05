const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
        maxLength: [40, "Name can't exceed 40 characters."],
        minLength: [3, "Name should have more than 3 characters."]
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minLength: [8, "Password should have more than 8 characters."],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 16);
})

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    // Generating Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hashing Token
    this.resetPasswordToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema)