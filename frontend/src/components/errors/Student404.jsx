import { FaUsersSlash } from "react-icons/fa"

const Student404 = () => {
    return (
        <div className="grid w-full h-full min-h-[300px] place-items-center">
            <div className="flex flex-col items-center">
                <FaUsersSlash size={80} />
                <p>No students have joined yet.</p>
            </div>
        </div>
  )
}

export default Student404