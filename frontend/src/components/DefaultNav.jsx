import { Link } from "react-router-dom"

const DefaultNav = () => {
    return (
        <div className="fixed top-0 w-full shadow-sm bg-background">
            <div className="flex items-center justify-between py-2.5 w-full max-w-7xl mx-auto px-2">
                <Link to="/" className="text-2xl font-heading">ArcClass</Link>

                <Link to="/signin">Login</Link>
            </div>
        </div>
    )
}

export default DefaultNav