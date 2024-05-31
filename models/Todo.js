import mongoose from "mongoose";

// Define Mongoose Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedOn: {
    type : Date,
  },
  completedOn: {
    type: Date,
    default: null,
  },
});

// Define Mongoose Model
const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
