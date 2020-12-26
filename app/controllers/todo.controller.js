const ToDo = require("../model/todo.model");
const asyncHandler = require("../middeware/aync");

const ErrorRespone = require("../utils/errorResponse");


//@desc     Get all Todos
//@route    GET /api/v1/todos
//@access   Public
exports.getTodos = asyncHandler(async(req, res, next) => {

    const _todo = await ToDo.find().populate({
        path: "user_id",
        select: "username email"
    });
    if (req.user.id.toString() !== _todo.user_id && req.user.role !== 'admin') {


    }
    res.status(200).json({
        sucess: false,
        count: _todo.length,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});

//@desc     Get Single Todos
//@route    GET /api/v1/todos/:id
//@access   Public
exports.getTodo = asyncHandler(async(req, res, next) => {
    const _todo = await ToDo.findById(req.params.id);

    if (!_todo) {
        next(err);
        // next(new ErrorRespone(`Todos id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});

//@desc     Get Single Todos user id
//@route    GET /api/v1/todos/:id
//@access   Public
exports.getTodoByUserId = asyncHandler(async(req, res, next) => {
    const _todo = await ToDo.find({
        user_id: req.params.id
    });

    if (req.user.id.toString() !== _todo.user_id && req.user.role !== 'admin') {

        next(new ErrorRespone(`${req.user.id} doesn't have access  this todo`, 400));
    }
    if (!_todo) {
        next(err);
        // next(new ErrorRespone(`Todos id ${req.params.id}  is not available at the moment`, 404));
    }

    res.status(200).json({
        sucess: false,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});

//@desc     Create Todos
//@route    POST /api/v1/todos
//@access   Public
exports.createTodo = asyncHandler(async(req, res, next) => {
    console.log("vive")
    const _todo = await ToDo.create(req.body);

    res.status(201).json({
        sucess: true,
        data: _todo,
        msg: "Create new Todos",
    });
});

//@desc     Update Single Todos
//@route    PUT /api/v1/todos/:id
//@access   Public
exports.updateTodo = asyncHandler(async(req, res, next) => {
    const _todo = await await ToDo.findById(req.params.id);
    if (req.user.id.toString() !== _todo.user_id && req.user.role !== 'admin') {

        next(new ErrorRespone(`${req.user.username} doesn't have access to update this todo`, 400));
    }

    if (!_todo) {
        next(err);
    }
    _todo = ToDo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        sucess: false,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});

//@desc     Delte Single Todos
//@route    DELETE /api/v1/todos/:id
//@access   Public
exports.DeleteTodo = asyncHandler(async(req, res, next) => {
    console.log("hi how");
    const _todo = await ToDo.findById(req.params.id);
    console.log(req.user.id);
    console.log(_todo)

    if (req.user.id.toString() !== _todo.user_id && req.user.role !== 'admin') {

        next(new ErrorRespone(`${req.user.username} doesn't have access to delete this todo`, 400));
    }

    _todo.remove();
    console.log("viekjnk")

    if (!_todo) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});