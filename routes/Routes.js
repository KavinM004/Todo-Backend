// backend/routes/Routes.js
import express from "express";
import Todo from "../models/Todo.js";
import { sendCompletionEmail, sendNewTodoEmail } from "../utils/mailer.js";

const router = express.Router();

// Create a new todo item (POST)
router.post("/todos", async (req, res) => {
  const { title, description, addedOn } = req.body;
  const newTodo = new Todo({
    title,
    description,
    addedOn,
  });

  try {
    const savedTodo = await newTodo.save();
    // await sendNewTodoEmail(savedTodo); // Send email after saving the todo
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all todo items (GET)
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a todo item by ID (PUT)
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completedOn, addedOn } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completedOn, addedOn },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (completedOn) await sendCompletionEmail(updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a todo item by ID (DELETE)
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
