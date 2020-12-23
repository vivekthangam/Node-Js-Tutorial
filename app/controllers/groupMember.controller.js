const groupMember = require("../model/groupMember.model");
const asyncHandler = require("../middeware/aync");
//@desc     Get all groupMembers
//@route    GET /api/v1/groupMembers
//@access   Public
exports.getgroupMembers = asyncHandler(async(req, res, next) => {
    console.log(req.query)
    const _groupMember = await groupMember.find(req.query);
    res.status(200).json({
        sucess: false,
        count: _groupMember.length,
        data: _groupMember,
        msg: `Show groupMember ${req.params.id}`,
    });
});

//@desc     Get Single groupMembers
//@route    GET /api/v1/groupMembers/:id
//@access   Public
exports.getgroupMember = asyncHandler(async(req, res, next) => {
    const _groupMember = await groupMember.findById(req.params.id);

    if (!_groupMember) {
        next(err);
        // next(new ErrorRespone(`groupMembers id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _groupMember,
        msg: `Show groupMember ${req.params.id}`,
    });
});

//@desc     Create groupMembers
//@route    POST /api/v1/groupMembers
//@access   Public
exports.creategroupMember = asyncHandler(async(req, res, next) => {
    const _groupMember = await groupMember.create(req.body);
    res.status(201).json({
        sucess: true,
        data: _groupMember,
        msg: "Create new groupMembers",
    });
});

//@desc     Update Single groupMembers
//@route    PUT /api/v1/groupMembers/:id
//@access   Public
exports.updategroupMember = asyncHandler(async(req, res, next) => {
    const _groupMember = await groupMember.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!_groupMember) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _groupMember,
        msg: `Show groupMember ${req.params.id}`,
    });
});

//@desc     Delte Single groupMembers
//@route    DELETE /api/v1/groupMembers/:id
//@access   Public
exports.DeletegroupMember = asyncHandler(async(req, res, next) => {
    const _groupMember = await groupMember.findByIdAndDelete(req.params.id);

    if (!_groupMember) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _groupMember,
        msg: `Show groupMember ${req.params.id}`,
    });
});