import { FormEvent, useState } from "react"
import { useTodo } from "../store/todos";

function AddToDo() {
    const [todo, setTodo] = useState("");
    const { handleFormSubmit } = useTodo();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleFormSubmit(todo);
        setTodo("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">ADD</button>
        </form>
    )
}

export default AddToDo