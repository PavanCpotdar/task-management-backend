const express = require('express');
const router = express.Router();



const todoController = require("../controllers/todos.controller");

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.post("/:id", todoController.toggleTodo);
router.delete("/:id", todoController.deleteTodo)


module.exports = router;
