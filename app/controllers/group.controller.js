const group = require("../model/group.model");
const asyncHandler = require("../middeware/aync");
//@desc     Get all groups
//@route    GET /api/v1/groups
//@access   Public
exports.getgroups = asyncHandler(async(req, res, next) => {
    console.log(req.query)
    const _group = await group.find(req.query);
    res.status(200).json({
        sucess: false,
        count: _group.length,
        data: _group,
        msg: `Show group ${req.params.id}`,
    });
});

//@desc     Get Single groups
//@route    GET /api/v1/groups/:id
//@access   Public
exports.getgroup = asyncHandler(async(req, res, next) => {
    const _group = await group.findById(req.params.id);

    if (!_group) {
        next(err);
        // next(new ErrorRespone(`groups id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _group,
        msg: `Show group ${req.params.id}`,
    });
});

//@desc     Create groups
//@route    POST /api/v1/groups
//@access   Public
exports.creategroup = asyncHandler(async(req, res, next) => {
    const _group = await group.create(req.body);
    res.status(201).json({
        sucess: true,
        data: _group,
        msg: "Create new groups",
    });
});

//@desc     Update Single groups
//@route    PUT /api/v1/groups/:id
//@access   Public
exports.updategroup = asyncHandler(async(req, res, next) => {
    const _group = await group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!_group) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _group,
        msg: `Show group ${req.params.id}`,
    });
});

//@desc     Delte Single groups
//@route    DELETE /api/v1/groups/:id
//@access   Public
exports.Deletegroup = asyncHandler(async(req, res, next) => {
    const _group = await group.findByIdAndDelete(req.params.id);

    if (!_group) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _group,
        msg: `Show group ${req.params.id}`,
    });
});