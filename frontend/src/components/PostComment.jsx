import { FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"

const PostComment = ({ comment }) => {
    return (
        <div className="flex gap-4 px-8 py-2">
            <div className="grid flex-shrink-0 w-10 h-10 border rounded-full bg-background-default place-items-center">
                <FaUser size={18} />
            </div>
            <div className="space-y-4">
                <div>
                    <p>{comment.user.fullName}</p>
                    <p className="text-sm">{dayjs(comment.createdAt).format('MMM DD, h:mm A')}</p>
                </div>
                <div>
                {comment.content}
                </div>
            </div>
        </div>
    )
}

export default PostComment