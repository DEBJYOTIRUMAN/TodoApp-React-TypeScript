import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    toggleTodoCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null)

export function TodosProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const newTodos = localStorage.getItem('todos') || "[]";
            return JSON.parse(newTodos) as Todo[]
        } catch (error) {
            return []
        }

    })

    function handleAddTodo(task: string) {
        setTodos((prev) => {
            const newTodos: Todo[] = [
                {
                    id: (Date.now() + Math.floor(Math.random() * 1000)).toString(),
                    task,
                    completed: false,
                    createdAt: new Date(),
                },
                ...prev,
            ];
            localStorage.setItem("todos", JSON.stringify(newTodos))
            return newTodos;
        })
    }

    const toggleTodoCompleted = (id: string) => {
        setTodos((prev) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed }
                }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        })
    }

    function handleDeleteTodo(id: string) {
        setTodos((prev) => {
            const newTodos = prev.filter((task) => task.id !== id)
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        });

    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoCompleted, handleDeleteTodo }}>
            {children}
        </todosContext.Provider>
    );
}

export function useTodos() {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("Something went wrong.");
    }
    return todosContextValue;
}