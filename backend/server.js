const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve the React build folder
app.use(express.static(path.join(__dirname, "public")));

let todos = [
  { id: 1, text: "Learn AWS ECS", completed: false },
  { id: 2, text: "Push Docker to ECR", completed: false }
];

// API ROUTES
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = { id: Date.now(), text: req.body.text, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// Serve index.html for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(5000, () => console.log("Backend + Frontend running on port 5000"));
