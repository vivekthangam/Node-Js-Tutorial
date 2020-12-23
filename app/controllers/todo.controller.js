const ToDo = require("../model/todo.model");
const asyncHandler = require("../middeware/aync");
//@desc     Get all Todos
//@route    GET /api/v1/todos
//@access   Public
exports.getTodos = asyncHandler(async(req, res, next) => {
    console.log("test")
    const _todo = await ToDo.find().populate({
        path: "user_id",
        select: "username email"
    });
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
    const _todo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!_todo) {
        next(err);
    }

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
    const _todo = await ToDo.findByIdAndDelete(req.params.id);

    if (!_todo) {
        next(err);
    }

    res.status(200).json({
        sucess: false,
        data: _todo,
        msg: `Show todo ${req.params.id}`,
    });
});