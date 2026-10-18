import Todo from "../models/todoModel.js";

export const readAllTodos = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const todos = await Todo.find({ title: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit);

    const totalDocuments = await Todo.countDocuments({
      title: { $regex: search, $options: "i" },
    });

    return res.status(200).json({
      message: "Todo fetched successfully",
      data: todos,
      limit: limit,
      totalDocuments: totalDocuments,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 export const readSingleTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todos = await Todo.findOne({ _id: todoId });
    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: todos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

 export const createTodo = async (req, res) => {
  try {
    // const {title,description} = req.body
    const payload = req.body;
    const todo = await Todo.create(payload);
    await todo.save();

    res.status(201).json({ message: "todo created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const payload = req.body;

    const todo = await Todo.findByIdAndUpdate(todoId, payload);
    return res.status(200).json({ message: "todo updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};