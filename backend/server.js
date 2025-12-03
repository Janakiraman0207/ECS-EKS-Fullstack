const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Learn AWS ECS", completed: false },
  { id: 2, text: "Push Docker to ECR", completed: false }
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
