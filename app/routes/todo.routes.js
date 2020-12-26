const express = require("express");
const router = express.Router();
const {
    getTodo,
    getTodos,
    updateTodo,
    DeleteTodo,
    createTodo,
    getTodoByUserId,

} = require("../controllers/todo.controller");
const { protect, authorize } = require("../middeware/auth");
router.route("/").get(protect, getTodos).post(protect, createTodo);

router.route("/:id").get(getTodo).put(protect, updateTodo).delete(protect, DeleteTodo);
router.route("/user/:id").get(getTodoByUserId);

module.exports = router;