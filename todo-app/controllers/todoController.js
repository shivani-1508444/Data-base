import Todo from "../models/Todo.js";
import Comment from "../models/Comment.js";

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const { title, user } = req.body;

    if (!title || !user) {
      return res.status(400).json({ message: "Title and User are required" });
    }

    const todo = await Todo.create({ title, user });
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Todos with filter, pagination, sorting
export const getTodos = async (req, res) => {
  try {
    const { completed, page = 1, limit = 5, sort = "createdAt" } = req.query;

    let filter = {};
    if (completed) {
      filter.completed = completed === "true";
    }

    const todos = await Todo.find(filter)
      .populate("user", "name email")
      .sort(sort)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit));

    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add Comment to Todo
export const addComment = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const comment = await Comment.create({
      text: req.body.text,
      todo: req.params.id,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
