import { FaEllipsisV, FaTrash, FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import PostInput from "./PostInput"
import { useContext, useState } from "react"
import ClassroomContext from "@/context/ClassroomContext"
import PostComment from "./PostComment"
import useCommentManager from "@/hooks/useCommentManager"
import AuthContext from "@/context/AuthContext"

/* TODO : Obtain only the latest comment at first into loading all comments

*/

const PostCard = ({ classroom, post, openModal, userId }) => {
    const { authTokens } = useContext(AuthContext)
    const [ comments, setComments ] = useState(post.comments)
    const [ count, setCount ] = useState(post.numberOfComments)

    const { createComment, deleteComment } = useCommentManager(authTokens)

    const handleCreateComment = async (e, id) => {
        e.preventDefault()
        try {
            const content = e.target.elements.content.value
            const comment = await createComment(id, content)
            setComments(prev => [...prev, comment])
            setCount(prev => prev + 1)
        }
        catch (error) { 
            console.log(error)
        }
    }
    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id)
            const updatedComments = comments.filter(comment => comment.id != id)
            setComments(updatedComments)
            setCount(prev => prev - 1)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div key={post.id} className="w-full gap-4 border rounded-lg shadow">
            <div className="flex gap-4 px-8 py-4 border-b">
                <div className="grid w-10 h-10 border rounded-full place-items-center">
                    <FaUser size={18} />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-bold">
                        <div className="">
                            <p>{post.user.fullName}</p>
                            <p className="text-sm">{dayjs(post.createdAt).format('MMM DD, h:mm A')}</p>
                        </div>
                        <DropdownMenu className="">
                            <DropdownMenuTrigger asChild>
                                <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                                    <FaEllipsisV size={16}/>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="z-40 bg-background-default border-2 shadow *:p-2 rounded-lg *:cursor-pointer">
                                {(classroom.teacher?.id == userId || post.user.id == userId) &&
                                <DropdownMenuItem onClick={() => openModal(post.id)}
                                    className="z-30 flex items-center gap-2 text-red-500">
                                    <FaTrash/>
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p>{post.content}</p>
                </div>
            </div>
            {count > 1 && 
            <p className="px-12 py-4 text-right text-bold">{count} Comments</p>
            }
            {comments.map(comment => (<PostComment 
                                        key={comment.id} 
                                        comment={comment} 
                                        onDeleteComment={handleDeleteComment}
                                    />))}
            <PostInput onSubmitPost={(e) => handleCreateComment(e, post.id)} placeholder={"Add a comment"}/>
        </div>
    )
}

export default PostCard