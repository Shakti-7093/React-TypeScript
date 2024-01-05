import { Todo, useTodo } from '../store/todos';
import { useSearchParams } from 'react-router-dom';

function Todos() {
    const { todos, toggleTodoCompleted, handleDeleteTodo } = useTodo();
    const [searchParams] = useSearchParams();
    const todosData = searchParams.get('todo');
    console.log(todosData);    
    let filterData = todos;

    if (todosData === 'active') {
        filterData = todos.filter((todo:Todo) => !todo.completed);        
    }

    if (todosData === 'completed') {
        filterData = todos.filter((todo:Todo) => todo.completed);        
    }

    return (
        <ul className='main-task'>
            {
                filterData.map((todo:Todo) => {
                    return (
                        <li key={todo.id}>
                            <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoCompleted(todo.id)}/>
                            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                            {
                                todo.completed && (
                                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                                )
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Todos