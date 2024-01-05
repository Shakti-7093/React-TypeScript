import { ReactNode, createContext, useContext, useState } from "react";

export type TodoProviderProps = {
    children: ReactNode;
}

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodoContext = {
    todos: Todo[];
    handleFormSubmit: (task: string) => void;
    toggleTodoCompleted: (id: string) => void;
    handleDeleteTodo: (id: string) => void;

}

export const TodoContext = createContext<TodoContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {

    //# Setting up the data into localstorage and get the data from localstorage
    const [todos, setTodos] = useState<Todo[]>(() => {
        const localData = localStorage.getItem("todos");
        return localData ? JSON.parse(localData) : [];
    });

    //# Add the todo into the list and set the data into localstorage
    const handleFormSubmit = (task:string) => {
        setTodos((prev) => {
            const newTodo:Todo[] = [
                {
                    id: Math.random().toString(),
                    task:task,
                    completed: false,
                    createdAt: new Date()
                },
                ...prev
            ]
            // console.log("Previous Data" + prev);
            // console.log(newTodo);
            localStorage.setItem("todos", JSON.stringify(newTodo));            
            return newTodo;
        })
    }

    //@ mark completed
    const toggleTodoCompleted = (id:string) => {
        setTodos((prev) => {
            const newTodo = prev.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        })
    }

    //@ delete the individual todo
    const handleDeleteTodo = (id:string) => {
        setTodos((prev) => {
            const newTodo = prev.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodo));
            return newTodo;
        })
    }

    return (
        <TodoContext.Provider value={{todos, handleFormSubmit, toggleTodoCompleted, handleDeleteTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

// consumer

export const useTodo = () => {
    const todoConsumer = useContext(TodoContext);
    if (!todoConsumer) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return todoConsumer;
}