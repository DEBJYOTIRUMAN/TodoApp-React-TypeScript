import { FormEvent, useState } from "react";
import { useTodos } from "../store/todos";

const AddTodo = () => {
    const [todo, setTodo] = useState("");
    const { handleAddTodo } = useTodos();

    function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Write your todo" value={todo}
                onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">ADD</button>
        </form>
    )
}

export default AddTodo
