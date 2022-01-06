const sendToken = (user, statusCode, message, res) => {

    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: message,
        token: token
    })

}

module.exports = sendToken