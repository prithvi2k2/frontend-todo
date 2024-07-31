import { useState } from "react";
import axios from "axios";
export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const updateTextInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length === 0) return;
    // Axios POST/ todo
    axios
      .post("http://localhost:3000/todo", { text: input })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    console.log(input);
    setInput("");
  };

  const getTodos = () => {
    axios
      .get("http://localhost:3000/todo")
      .then(function (response) {
        // handle success
        console.log(response);
        setTodos(todos);
        console.log(todos);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      {/* Input todo items */}
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={updateTextInput} value={input}></input>
        <input type="submit"></input>
      </form>
      {/* Fetch todos */}
      <button onClick={getTodos}> Fetch/Refresh Todos </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
