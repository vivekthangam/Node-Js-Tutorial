const message = require("../model/message.model");
const asyncHandler = require("../middeware/aync");
//@desc     Get all messages
//@route    GET /api/v1/messages
//@access   Public
exports.getmessages = asyncHandler(async(req, res, next) => {
    const _message = await message.find();
    res.status(200).json({
        sucess: false,
        count: _message.length,
        data: _message,
        msg: `Show message ${req.params.id}`,
    });
});

//@desc     Get Single messages
//@route    GET /api/v1/messages/:id
//@access   Public
exports.getmessage = asyncHandler(async(req, res, next) => {
    const _message = await message.findById(req.params.id);

    if (!_message) {
        next(err);
        // next(new ErrorRespone(`messages id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _message,
        msg: `Show message ${req.params.id}`,
    });
});

//@desc     Create messages
//@route    POST /api/v1/messages
//@access   Public
exports.createmessage = asyncHandler(async(req, res, next) => {
    const _message = await message.create(req.body);
    res.status(201).json({
        sucess: true,
        data: _message,
        msg: "Create new messages",
    });
});

//@desc     Update Single messages
//@route    PUT /api/v1/messages/:id
//@access   Public
exports.updatemessage = asyncHandler(async(req, res, next) => {
    const _message = await message.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!_message) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _message,
        msg: `Show message ${req.params.id}`,
    });
});

//@desc     Delte Single messages
//@route    DELETE /api/v1/messages/:id
//@access   Public
exports.Deletemessage = asyncHandler(async(req, res, next) => {
    const _message = await message.findByIdAndDelete(req.params.id);

    if (!_message) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _message,
        msg: `Show message ${req.params.id}`,
    });
});