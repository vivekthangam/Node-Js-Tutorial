const jwt = require("jsonwebtoken");
const asyncHandler = require("./aync");
const ErrorRespone = require("../utils/errorResponse");
const User = require("../model/user.model")

//Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

    } else if (req.cookies.toekn) {
        token = req.cookies.token;
    }

    //make sure token exists
    if (!token) {
        return next(new ErrorRespone('Not Authorize to access this route', 401))
    }
    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRECT);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {

        return next(new ErrorRespone('Not Authorize to access this route', 401))
    }
})