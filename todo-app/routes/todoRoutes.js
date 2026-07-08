import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  addComment
} from "../controllers/todoController.js";

const router = express.Router();

// Get all todos
router.get("/", getTodos);

// Create new todo
router.post("/", createTodo);

// Update todo by ID
router.put("/:id", updateTodo);

// Delete todo by ID
router.delete("/:id", deleteTodo);

// Add comment to a todo
router.post("/:id/comment", addComment);

export default router;
