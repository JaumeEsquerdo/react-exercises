import { HookLocalStorage } from "./components/HookLocalStorage"
import { useState } from "react"

function App() {
  // dentro del hook se pasa la key y la initialvalue ("todos" va con comillas porq en localStorage se guardan strings)
  const [todos, setTodos] = HookLocalStorage("todos", []);

  const [task, setTask] = useState("");

  /* trim() quita espacios en blanco al principio y al final */
  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const removeTodo = (index) => {
    /* se pasa dos argumentos, elemento actual y el indice. Comom no importa el elemento actual se pone _ */
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", alignItems: "center" }}>
      <h1>Todo App</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
        aria-label="Campo para añadir tarea"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => removeTodo(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
