import { CiFileOff } from "react-icons/ci";
import { Link } from "react-router-dom";

const Assignment404 = () => {
    return (
        <div className="grid w-full h-full min-h-[400px] place-items-center">
            <div className="flex flex-col items-center">
                <CiFileOff size={80} />
                <p>This assignment does not exist or may have been deleted.</p>
                <Link to="/home" className="underline text-accent">Go back to home</Link>
            </div>
        </div>
    )
}

export default Assignment404