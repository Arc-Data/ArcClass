import { FaUsersSlash } from "react-icons/fa"

const Student404 = () => {
    return (
        <div className="grid w-full h-full place-items-center">
            <div className="flex flex-col items-center">
                <FaUsersSlash size={80} />
                <p>Classroom with this code does not exist.</p>
            </div>
        </div>
  )
}

export default Student404