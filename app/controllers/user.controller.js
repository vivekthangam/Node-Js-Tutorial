const User = require("../model/user.model");
const asyncHandler = require("../middeware/aync");
const createFilterQuery = require("../utils/createFilterQuery");
const ErrorRespone = require("../utils/errorResponse");

//@desc     Get all Users
//@route    GET /api/v1/Users
//@access   Public
exports.getUsers = asyncHandler(async(req, res, next) => {
    // let query = createFilterQuery(req, User);

    // console.log(query)
    // query = User.find(JSON.parse(query))
    const _data = await createFilterQuery(req, User);

    const _User = _data["data"]
    const _pagination = _data["pagination"]
    res.status(200).json({
        sucess: false,
        pagination: _pagination,
        count: _User.length,
        data: _User,
        msg: `Show User ${req.params.id}`,
    });
});

//@desc     Get Single Users
//@route    GET /api/v1/Users/:id
//@access   Public
exports.getUser = asyncHandler(async(req, res, next) => {
    const _User = await User.findById(req.params.id);

    if (!_User) {
        next(err);
        // next(new ErrorRespone(`Users id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _User,
        msg: `Show User ${req.params.id}`,
    });
});

//@desc     Create Users
//@route    POST /api/v1/Users
//@access   Public
exports.createUser = asyncHandler(async(req, res, next) => {
    console.log("vvvv")
    const _user = await User.create(req.body);


    sendTokenResponse(_user, 200, res);
});

//@desc     Update Single Users
//@route    PUT /api/v1/Users/:id
//@access   Public
exports.updateUser = asyncHandler(async(req, res, next) => {
    const _User = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!_User) {
        next(err);
    }


    res.status(200).json({
        sucess: false,
        data: _User,
        token: token,
        msg: `Show User ${req.params.id}`,
    });
});

//@desc     Delte Single Users
//@route    DELETE /api/v1/Users/:id
//@access   Public
exports.DeleteUser = asyncHandler(async(req, res, next) => {
    const _User = await User.findById(req.params.id);

    if (!_User) {
        next(err);
    }
    _User.remove();
    res.status(200).json({
        sucess: false,
        data: _User,
        msg: `Show User ${req.params.id}`,
    });
});



//@desc     Update Photo for users
//@route    PUT /api/v1/Users/:id/photo
//@access   Private
exports.UploadPhotoForUser = asyncHandler(async(req, res, next) => {
    console.log("hi bu");
    console.log(req.params.id)
    const _User = await User.findById(req.params.id);

    if (!_User) {
        next(err);
    }
    if (!req.files) {
        next(new ErrorRespone(`Please upload a file`, 400));
    }
    console.log(req.files)

    res.status(200).json({
        sucess: false,
        data: "_User",
        msg: `Show User ${req.params.id}`,
    });
});




//@desc     Login User
//@route    GET /api/v1/Users/login
//@access   Public
exports.login = asyncHandler(async(req, res, next) => {
    console.log("funct")
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorRespone('please provide an email and password', 400));
    }

    const _user = await User.findOne({ email }).select('+password');

    if (!_user) {
        return next(new ErrorRespone('Invalid credentials', 400));
    }

    //check if password matches
    const isMatch = await _user.matchPassword(password);
    console.log(isMatch)
    if (!isMatch) {
        return next(new ErrorRespone('Invalid credentials', 400));

    }
    sendTokenResponse(_user, 200, res);
});

const sendTokenResponse = (User, statusCode, res) => {

    const token = User.getSignedJwtToken();
    console.log(process.env.JWT_COOKIE_EXPIRE);
    console.log(token)
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),

        httpOnly: true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}






//@desc     Get logged in User
//@route    GET /api/v1/Users/me
//@access   Private
exports.getMe = asyncHandler(async(req, res, next) => {
    console.log(req.user)
    const _User = await User.findById(req.user.id);
    res
        .status(200)
        .json({
            success: true,
            _User
        });
});