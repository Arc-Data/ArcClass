import { FaUser } from "react-icons/fa"
import dayjs, { getDeadline } from "../utils/dayjs"
import { Link } from "react-router-dom"

const AssignmentCard = ({ post }) => {
    return (
        <Link to={`/assignments/${post.assignment.id}`} className="block w-full gap-4 border rounded-lg shadow-sm cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800">
            <div className="flex gap-4 px-8 py-4">
                <div className="grid w-10 h-10 border rounded-full place-items-center">
                    <FaUser size={18} />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm">{dayjs.utc(post.createdAt).local().format('MMM DD, h:mm A')}</p>
                        <p className="p-1 px-4 border rounded-lg shadow-sm group-hover:bg-primary-500 group-hover:text-white">{getDeadline(post.assignment.submissionDate)}</p>
                    </div>
                    <p>{post.user.fullName} created a new assignment. "<span className="font-medium font-body">{post.assignment.title}</span>"</p>
                </div>
            </div>
        </Link>
    )
}

export default AssignmentCard