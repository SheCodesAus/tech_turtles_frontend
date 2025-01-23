import { Link, Outlet } from "react-router-dom";

function NavBar() {
    return (
        <div>
            <nav>
                <Link to="/">Home </Link>
                <Link to="/lists">Shopping Lists </Link>
                <Link to="/login">Login </Link>
                <Link to="/signup">Sign Up</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;