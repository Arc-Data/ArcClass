import { FaEllipsisV, FaTrash, FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useContext } from "react"
import AuthContext from "@/context/AuthContext"

const PostComment = ({ comment, onDeleteComment }) => {
    const { user, role } = useContext(AuthContext)

    return (
        <div className="flex gap-4 px-8 py-2 group">
            <div className="grid flex-shrink-0 w-10 h-10 border rounded-full bg-background-default place-items-center">
                <FaUser size={18} />
            </div>
            <div className="flex-1 space-y-4">
                <div className="flex justify-between">
                    <div>
                        <p>{comment.user.fullName}</p>
                        <p className="text-sm">{dayjs(comment.createdAt).format('MMM DD, h:mm A')}</p>
                    </div>
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                        {(user.nameid == comment.user.id  || role.contains("Teacher")) && 
                            <button className="invisible p-4 ml-auto rounded-full group-hover:visible hover:bg-gray-200">
                                <FaEllipsisV size={16}/>
                            </button>
                        }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="z-30 flex items-center gap-2 text-red-500" onClick={() => onDeleteComment(comment.id)}>
                                <FaTrash />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                {comment.content}
                </div>
            </div>
        </div>
    )
}

export default PostComment