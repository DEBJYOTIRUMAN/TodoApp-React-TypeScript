import { Link, useSearchParams } from 'react-router-dom';

const Navbar = () => {
    const [params] = useSearchParams();
    let paramsData = params.get("todos");

    return (
        <nav>
            <Link to="/" className={paramsData === null ? "active" : ""} > All </Link>
            <Link to="/?todos=active" className={paramsData === "active" ? "active" : ""} > Active </Link>
            <Link to="/?todos=completed" className={paramsData === "completed" ? "active" : ""} > Completed </Link>
        </nav>
    )
}
export default Navbar
