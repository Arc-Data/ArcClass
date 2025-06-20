import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useCommentManager from "@/hooks/useCommentManager"
import usePostManager from "@/hooks/usePostManager"
import dayjs from "@/utils/dayjs"
import { useContext, useState } from "react"
import { FaEllipsisV, FaTrash, FaUser } from "react-icons/fa"
import { FaPencil, FaUserGroup } from "react-icons/fa6"
import DisplayFiles from "./DisplayFiles"
import PostComment from "./PostComment"
import PostInput from "./PostInput"
import PostSkeleton from "./Skeleton/PostSkeleton"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Textarea } from "./ui/textarea"

/* 
// [ ]: Confirmation to delete associated materials
// Deleted posts will not automatically delete associated materials
// unless the classroom itself is deleted.
// [ ] : Review comment fetching logic  
// [ ] : This needs to get optimized ngl
*/

const PostCard = ({ post }) => {
    const { user, authTokens } = useContext(AuthContext)
    const { classroom, handleDeletePost } = useContext(ClassroomContext)

    const [ comments, setComments ] = useState(post.comments)
    const [ showAllComments, setShowAllComments ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const [ count, setCount ] = useState(post.numberOfComments)
    const [ content, setContent ] = useState(post.content)
    
    const [ isEditing, setEditing ] = useState(false)

    const { editPost } = usePostManager(authTokens)
    const { createComment, deleteComment, loadComments } = useCommentManager(authTokens)

    const createdAt = dayjs(post.createdAt)
    const dateModified = dayjs(post.dateModified)

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
            setComments(prevComments => [...prevComments, ...allComments])
        }

        setShowAllComments(prev => !prev)
        setLoading(false)
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

    const handleCreateComment = async (content) => {
        console.log(content)
        try {
            const comment = await createComment(post.id, content)
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
        <div className="w-full gap-4 border rounded-lg shadow-sm">
            <div className="flex gap-4 px-8 py-4 border-b">
                <div className="grid w-10 h-10 border rounded-full place-items-center">
                    <FaUser size={18} />
                </div>
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between text-bold">
                        <div className="">
                            <p>{post.user.fullName}</p>
                            <p className="text-sm">{dayjs.utc(post.createdAt).local().format('MMM DD, h:mm A')}</p>
                            {dateModified.isAfter(createdAt) && " (edited)"}
                        </div>
                        <Dialog>
                            <DropdownMenu className="">
                                <DropdownMenuTrigger asChild>
                                    <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                                        <FaEllipsisV size={16}/>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="z-40 bg-background border-2 shadow-sm *:p-2 rounded-lg *:cursor-pointer">
                                    {post.user.id == user.nameid && 
                                    <DropdownMenuItem onClick={() => setEditing(true)}
                                    className="z-30 flex items-center gap-2">
                                        <FaPencil/>
                                        <span>Edit</span>
                                    </DropdownMenuItem>
                                    }
                                    <DialogTrigger asChild>
                                        {(classroom.teacher?.id == user.nameid || post.user.id == user.nameid) &&
                                        <DropdownMenuItem 
                                        className="z-30 flex items-center gap-2 text-red-500">
                                            <FaTrash/>
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                        }
                                    </DialogTrigger>
                                    
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Deleting Post</DialogTitle>
                                    <DialogDescription>
                                        This action is irreversible and will also delete associated comments and files. Proceed?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="text-white bg-red-600 text-md px-2.5 py-2.5 rounded-lg">
                                        Delete
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {!isEditing ?
                    <>
                    <p>{content}</p>
                    {post.materials && post.materials.length > 0 &&  
                        <DisplayFiles materials={post.materials}/>
                    }
                    </>
                    :
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <Textarea className="text-base" required value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
                        <div className="justify-end flex gap-2 *:px-4 *:py-2 *:border *:rounded-lg">
                            <button onClick={handleCancel}>Cancel</button>
                            <button className="bg-primary">Edit</button>
                        </div>
                    </form>
                    }
                </div>
            </div>
            {count > 2 && 
            <button 
                className={
                    `flex items-center gap-4 p-2 mx-10 my-3 text-sm font-bold font-heading text-left rounded-xl hover:text-text-900 hover:bg-background-50
                    ${showAllComments  && ""}`
                }
                onClick={handleLoadComments}
                >
                <FaUserGroup />
                {showAllComments ? 
                <span>View Less</span>
                :
                <span>{count} Comments</span>
                }
            </button>
            }
            {loading && <PostSkeleton count={1}/>}
            {comments.map(comment => (<PostComment 
                                        key={comment.id} 
                                        comment={comment} 
                                        onDeleteComment={handleDeleteComment}
                                    />))}
            <div className="px-8 py-4 hover:bg-gray-200 dark:hover:bg-gray-800">
                <PostInput onSubmitPost={content => handleCreateComment(content)} placeholder={"Add a comment"} filesHidden={true}/>
            </div>
        </div>
    )
}

export default PostCard