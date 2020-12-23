const express = require("express");
const router = express.Router();
const {
    getTodo,
    getTodos,
    updateTodo,
    DeleteTodo,
    createTodo,
    getTodoByUserId
} = require("../controllers/todo.controller");

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").get(getTodo).put(updateTodo).delete(DeleteTodo);
router.route("/user/:id").get(getTodoByUserId);
module.exports = router;