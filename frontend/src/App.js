import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setTodos([...todos, data]);
    setText("");
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Todo App</h2>
      <div>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter task"
          style={{ padding: 10, width: "70%" }}
        />
        <button onClick={addTodo} style={{ padding: 10, marginLeft: 10 }}>
          Add
        </button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {todos.map(t => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
