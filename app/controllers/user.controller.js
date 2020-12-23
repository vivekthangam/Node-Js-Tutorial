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
    const _User = await User.create(req.body);
    res.status(201).json({
        sucess: true,
        data: _User,
        msg: "Create new Users",
    });
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
        next(new ErrorRespone(`Please upload a file`, 400))
    }
    console.log(req.files)

    res.status(200).json({
        sucess: false,
        data: "_User",
        msg: `Show User ${req.params.id}`,
    });
});