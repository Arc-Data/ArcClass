import { FaEllipsisV, FaTrash, FaUser } from "react-icons/fa"
import dayjs from "@/utils/dayjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import PostInput from "./PostInput"
import { useContext, useState } from "react"
import ClassroomContext from "@/context/ClassroomContext"
import PostComment from "./PostComment"
import useCommentManager from "@/hooks/useCommentManager"
import AuthContext from "@/context/AuthContext"
import { FaPencil, FaUserGroup } from "react-icons/fa6"
import { Textarea } from "./ui/textarea"
import usePostManager from "@/hooks/usePostManager"
import { Spinner } from "flowbite-react"
import PostSkeleton from "./Skeleton/PostSkeleton"

/* TODO : Obtain only the latest comment at first into loading all comments

*/

const PostCard = ({ classroom, post, openModal, userId }) => {
    const { authTokens } = useContext(AuthContext)
    console.log(post)

    const [ comments, setComments ] = useState(post.comments)
    const [ showAllComments, setShowAllComments ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const [ count, setCount ] = useState(post.numberOfComments)
    const [ content, setContent ] = useState(post.content)
    
    const [ isEditing, setEditing ] = useState(false)

    const { editPost } = usePostManager(authTokens)
    const { createComment, deleteComment, loadComments } = useCommentManager(authTokens)

    const handleCancel = () => {
        setEditing(false)
        setContent(post.content)
    }

    const handleLoadComments = async () => {
        setLoading(true)
        if (showAllComments) {
            setComments(post.comments)
        } else {
            const allComments = await loadComments(post.id)
            console.log(allComments)
            setComments(prevComments => [...prevComments, ...allComments])
        }

        setShowAllComments(prev => !prev)
        setLoading(false)
        // see google classroom people
        // there is a button that loads all comments when clicked 
        // and otherwise only shows the 2 most recent comments if applicable
        // the question is, how do i make it so in display? do i have to
        // slice the comments state back to the 2 most recent ones and then 
        // refetch? this might be the best time to make use of skip
        // const skip = post.comments 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEditing(false)
        try {
            await editPost(post.id, content)
        }
        catch (error) {
            console.log(error)
        }
    }

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
                                {post.user.id == userId && 
                                <DropdownMenuItem onClick={() => setEditing(true)}
                                className="z-30 flex items-center gap-2">
                                    <FaPencil/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                }
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
                    {!isEditing ? 
                    <p>{content}</p>
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
            {count > 1 && 
            <button 
                className="flex items-center gap-4 p-2 mx-10 my-3 text-left border border-transparent rounded-xl text-bold hover:text-text-900 hover:bg-secondary-200"
                onClick={handleLoadComments}
                >
                <FaUserGroup />
                <span>{count} Comments</span>
            </button>
            }
            {loading && <PostSkeleton count={1}/>}
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