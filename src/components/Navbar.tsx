import { Link, useSearchParams } from "react-router-dom"

function Navbar() {
    const [searchParams] = useSearchParams();
    const todosData = searchParams.get('todo');
    return (
        <nav>
            <Link to="/" className={todosData === null? "active all" : ""}>All</Link>
            <Link to="/?todo=active" className={todosData === "active"? "active current" : ""}>Active</Link>
            <Link to="/?todo=completed" className={todosData === "completed"? "active completed" : ""}>Completed</Link>
        </nav>
    )
}

export default Navbar