import express from "express";
import dbConnection from "./dbConnection.js";

import cors from "cors";
import { createTodo, deleteTodo, readAllTodos, readSingleTodo, updateTodo } from "./controller/todoController.js";

const app = express();

app.use(cors())

// configuration
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("server working...");
});

// reads all todos
app.get("/todo", readAllTodos);
// read single todo 
app.get("/todo/:id",readSingleTodo);
// create todo
app.post("/todo", createTodo);
// delete todo
app.delete("/todo/:id", deleteTodo );
// update todo
app.put("/todo/:id", updateTodo );


app.listen(8080, function () {
  console.log("Server running");
});
