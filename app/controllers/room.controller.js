const room = require("../model/room.model");
const asyncHandler = require("../middeware/aync");
//@desc     Get all rooms
//@route    GET /api/v1/rooms
//@access   Public
exports.getrooms = asyncHandler(async (req, res, next) => {
    console.log("test")
  const _room = await room.find();
  res.status(200).json({
    sucess: false,
    count: _room.length,
    data: _room,
    msg: `Show room ${req.params.id}`,
  });
});

//@desc     Get Single rooms
//@route    GET /api/v1/rooms/:id
//@access   Public
exports.getroom = asyncHandler(async (req, res, next) => {
  const _room = await room.findById(req.params.id);

  if (!_room) {
    next(err);
    // next(new ErrorRespone(`rooms id ${req.params.id}  is not available at the moment`, 404));
  }

  res.status(200).json({
    sucess: false,
    data: _room,
    msg: `Show room ${req.params.id}`,
  });
});

//@desc     Create rooms
//@route    POST /api/v1/rooms
//@access   Public
exports.createroom = asyncHandler(async (req, res, next) => {
  const _room = await room.create(req.body);
  res.status(201).json({
    sucess: true,
    data: _room,
    msg: "Create new rooms",
  });
});

//@desc     Update Single rooms
//@route    PUT /api/v1/rooms/:id
//@access   Public
exports.updateroom = asyncHandler(async (req, res, next) => {
  const _room = await room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!_room) {
    next(err);
  }

  res.status(200).json({
    sucess: false,
    data: _room,
    msg: `Show room ${req.params.id}`,
  });
});

//@desc     Delte Single rooms
//@route    DELETE /api/v1/rooms/:id
//@access   Public
exports.Deleteroom = asyncHandler(async (req, res, next) => {
  const _room = await room.findByIdAndDelete(req.params.id);

  if (!_room) {
    next(err);
  }

  res.status(200).json({
    sucess: false,
    data: _room,
    msg: `Show room ${req.params.id}`,
  });
});
