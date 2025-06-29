import { FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"

const AssignmentComment = ({ comment, loading }) => {
    return (
        <div className="flex gap-4 group">
            <div className="grid shrink-0 w-8 h-8 border rounded-full bg-background place-items-center">
                <FaUser size={16} />
            </div>
            <div className="flex-1 space-y-4">
                <div>
                    <p>{comment.user?.fullName}</p>
                    <p className="text-sm">{dayjs(comment.createdAt).format("MMM DD, h:mm A")}</p>
                </div>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}

export default AssignmentComment