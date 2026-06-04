import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="text-center p-10">
            <h1>404 - Page not found</h1>
            <Link to="/">Home</Link>
        </div>
    );
}
