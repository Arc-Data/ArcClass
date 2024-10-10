import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa";


const UserNav = () => {
    const { logoutUser, role } = useContext(AuthContext)
    
    return (
        <div className="fixed top-0 w-full shadow bg-background-default">
            <div className="flex items-center py-2.5 w-full max-w-7xl mx-auto px-2">
                <Link to="/" className="text-2xl font-heading">ArcClass</Link>

                <div className="flex items-center gap-8 ml-auto">
                    {role === "Teacher"
                    &&
                    <div className="p-3 rounded-full bg-background-100"> 
                        <FaPlus />
                    </div>
                    }
                    <button className="" onClick={logoutUser}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserNav