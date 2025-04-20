import { TbChalkboardOff } from "react-icons/tb";
import { Link } from "react-router-dom";

const Classroom404 = () => {
  return (
    <div className="grid w-full h-full min-h-[400px] place-items-center">
        <div className="flex flex-col items-center">
            <TbChalkboardOff size={80} />
            <p>Classroom with this code does not exist.</p>
            <Link to="/home" className="underline text-accent">Go back to home</Link>
        </div>
    </div>
  )
}

export default Classroom404