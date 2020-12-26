const jwt = require("jsonwebtoken");
const asyncHandler = require("./aync");
const ErrorRespone = require("../utils/errorResponse");
const User = require("../model/user.model");
const { use } = require("../routes/todo.routes");
const sendMail = require('../utils/sendEmail')

const crypto = require("crypto");
//Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    console.log(req.cookies.toekn)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log("vvvvvf")
        token = req.headers.authorization.split(' ')[1];

    } else if (req.cookies.token) {
        token = req.cookies.token;
        console.log("v")
    }

    //make sure token exists
    if (!token) {
        return next(new ErrorRespone('Not Authorize to access this route', 401))
    }
    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        console.log("jnj")
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        console.log(req.user)
        next();
    } catch (err) {
        console.log(err)
        return next(new ErrorRespone('Not Authorize to access this route', 401))
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorRespone(`user role ${req.user.role} is not authorized to access this route`, 401))
        }
    }
}

//Forget Password
exports.forgetPassword = asyncHandler(async(req, res, next) => {
    console.log(req.body.email)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorRespone("Ther is no user with that mail", 404));
    }
    console.log(user.email)
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    console.log(resetToken)

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

    const message = `you are receiving this email because you (or someone else) has requested the reset of pasword
    .please make a PUT request to: \n\n ${resetUrl}`
    try {
        console.log(user.email)
        await sendMail({
            email: user.email,
            subject: "Password reset token",
            message

        })
        res.status(200).json({
            success: true,
            data: "email sent"
        })
    } catch (err) {
        console.log(err);
        await user.save({ validateBeforeSave: false });
        user.resetPasswordToken = undefined;
        user.resetpasswordExpire = undefined
        return next(new ErrorRespone("Email could not be sent", 500));
    }
    // console.log(resetToken)
    // res.status(200).json({
    //     success: true,
    //     data: user
    // })
});

exports.resetPassword = asyncHandler(async(req, res, next) => {
    //Get Hasehd token
    console.log("mkmk")
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resttoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetpasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorRespone('Invalid Token', 400));
    }
    //Set new Password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetpasswordExpire = undefined;
    res.status(200).json({
        success: true,
        data: user
    })
})




exports.logout = asyncHandler(async(req, res, next) => {
    console.log("jn")
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 + 1000),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        data: "Logo out sucessfull"
    })
})