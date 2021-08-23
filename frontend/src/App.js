import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import TodoListView from "./components/TodoListView";

function App() {
    const [todoList, setTodoList] = useState([{}]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/todo")
            .then((res) => setTodoList(res.data));
    }, []);

    const addTodo = () => {
        axios
            .post("http://localhost:8000/api/todo", {
                title: title,
                description: description,
            })
            .then((res) => console.log(res))
            .then(() => {
                setTitle("");
                setDescription("");
            });
    };

    const deleteTodo = (title) => {
        axios
            .delete(`http://localhost:8000/api/todo/${title}`)
            .then((res) => console.log(res.data));
    };

    return (
        <div
            className="App list-group-item justify-content-center align-items-center mx-auto"
            style={{ width: "400px", marginTop: "15px" }}
        >
            <h1 className="card text-white bg-primary mb-1">Task manager</h1>
            <h6 className="card text-white bg-primary mb-3">
                FastAPI - React - MongoDB
            </h6>
            <div className="card-body">
                <h5 className="card text-white bg-dark mb-3">Add your task</h5>
                <span className="card-text">
                    <input
                        type="text"
                        className="mb-2 form-control titleIn"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        className="mb-2 form-control descIn"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary mx-2 mb-3"
                        style={{ borderRadius: "50px", fontWeight: "bold" }}
                        onClick={addTodo}
                    >
                        Add Task
                    </button>
                </span>

                <h5 className="card text-white bg-dark mb-3">Your tasks</h5>
                <div>
                    <ul>
                        {todoList?.map((todo) => (
                            <p key={todo?.title}>
                                <span style={{ fontWeight: "bold, underline" }}>
                                    {todo.title}:{" "}
                                </span>
                                {todo.description}
                                <button
                                    onClick={() => deleteTodo(todo.title)}
                                    className="btn btn-outline-danger my-2 mx-2"
                                    style={{ borderRadius: "50px" }}
                                >
                                    X
                                </button>
                            </p>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
