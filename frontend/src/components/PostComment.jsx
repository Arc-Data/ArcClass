import { FaEllipsisV, FaTrash, FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useContext, useState } from "react"
import AuthContext from "@/context/AuthContext"
import useCommentManager from "@/hooks/useCommentManager"
import { FaPencil } from "react-icons/fa6"
import { Textarea } from "./ui/textarea"

const PostComment = ({ comment, onDeleteComment }) => {
    const { authTokens, user, role } = useContext(AuthContext)

    const [ content, setContent ] = useState(comment.content)
    const { editComment } = useCommentManager(authTokens)

    const [ isEditing, setIsEditing ] = useState(false)

    const handleCancel = () => {
        setIsEditing(false)
        setContent(comment.content)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsEditing(false)
        try {
            await editComment(comment.id, content)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex gap-4 px-8 py-2 group">
            <div className="grid flex-shrink-0 w-8 h-8 border rounded-full bg-background-default place-items-center">
                <FaUser size={16} />
            </div>
            <div className="flex-1 space-y-4">
                <div className="flex justify-between">
                    <div>
                        <p>{comment.user.fullName}</p>
                        <p className="text-sm">{dayjs(comment.createdAt).format('MMM DD, h:mm A')}</p>
                    </div>
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                        {(user.nameid == comment.user.id  || role.includes("Teacher")) && 
                            <button className="invisible p-4 ml-auto rounded-full group-hover:visible hover:bg-gray-200">
                                <FaEllipsisV size={16}/>
                            </button>
                        }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {user.nameid == comment.user.id && 
                            <DropdownMenuItem onClick={() => setIsEditing(true)}
                            className="z-30 flex items-center gap-2">
                                <FaPencil/>
                                <span>Edit</span>
                            </DropdownMenuItem>
                            }
                            <DropdownMenuItem className="z-30 flex items-center gap-2 text-red-500" onClick={() => onDeleteComment(comment.id)}>
                                <FaTrash />
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {!isEditing ? 
                <p>
                {content}
                </p>
                :
                <form onSubmit={handleSubmit} className="space-y-2">
                    <Textarea className="text-base" required value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
                    <div className="justify-end flex gap-2 *:px-4 *:py-2 *:border *:rounded-lg">
                        <button onClick={handleCancel}>Cancel</button>
                        <button className="bg-primary-default">Edit</button>
                    </div>
                </form>
                }
            </div>
        </div>
    )
}

export default PostComment