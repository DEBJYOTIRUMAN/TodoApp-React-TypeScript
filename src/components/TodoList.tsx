import { useTodos } from '../store/todos';
import { useSearchParams } from 'react-router-dom';

const TodoList = () => {
    const { todos, toggleTodoCompleted, handleDeleteTodo } = useTodos();

    const [params] = useSearchParams();
    let paramsData = params.get("todos");

    let filteredTodos = todos;

    if (paramsData === "active") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    } else if (paramsData === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    }

    return (
        <ul className="main-task">
            {
                filteredTodos.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => {
                            toggleTodoCompleted(todo.id)
                        }
                        } />
                        <label htmlFor={`todo-${todo.id}`}> {todo.task}</label>

                        {
                            todo.completed && (
                                <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                                    Delete
                                </button>
                            )
                        }

                    </li>
                })
            }
        </ul>
    )
}

export default TodoList
