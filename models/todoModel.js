import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({}, { strict: false });

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
