import Classroom404 from "@/components/errors/Classroom404"
import PostSkeleton from "@/components/Skeleton/PostSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import usePostManager from "@/hooks/usePostManager"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Spinner } from "flowbite-react"
import { useContext, useEffect, useRef, useState } from "react"
import { FaEllipsisV, FaPaperPlane, FaTrash, FaUser } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "@/utils/dayjs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

/*
// [ ] - Conceptualize Privacy Related Settings and User Control Systems
// Unauthorized Joining, User Moderation.
// [ ] - No Posts
// [ ] - Define Announcements
*/

// NOTE : Would be absolutely nice if i could leverage React 19 for most of this

const Classroom = () => {
    const { id } = useParams()
    const { authTokens, user, role } = useContext(AuthContext)
    const { classroom, loading, getClassroom } = useClassroomManager(authTokens)
    const { posts, loading:postLoading, getPosts, createPost, deletePost, optimisticLoading } = usePostManager(authTokens)
    const [ error, setError ] = useState()

    // add post related state
    const [ addPost, setAddPost ] = useState(false)
    const textAreaRef = useRef(null)

    const [ openDeleteModal, setOpenDeleteModal ] = useState()
    const [ selectedPostId, setSelectedPostId ] = useState()

    const handleOpenDeleteModal = (id) => {
        setSelectedPostId(id)
        setOpenDeleteModal(prev => !prev)
    }

    const handleDeletePost = async () => {
        deletePost(selectedPostId)
        setOpenDeleteModal(prev => !prev)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getClassroom(id)
                await getPosts(id)
            }
            catch (error) {
                console.log(error)
                setError(error)
            }
        }

        fetchData()
    }, [id])

    useEffect(() => {
        if (addPost && textAreaRef.current) {
          textAreaRef.current.focus()
        }
      }, [addPost])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        try {
            await createPost(id, content)
        }
        catch (error) {
            console.log(error)
        } finally {
            setAddPost(false)
        }

    }

    const postCards = posts && posts.map(post => {
        return (
            <div key={post.id} className="flex w-full gap-4 px-8 py-4 border rounded-lg shadow">
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
                                    {(classroom.teacher?.id == user.nameid || post.user.id == user.id) &&
                                    <DropdownMenuItem onClick={() => handleOpenDeleteModal(post.id)}
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
        )
    })

    if (error) {
        return <Classroom404/>
    }

    return (
        <div className="px-8 py-4">
            <Dialog 
                open={openDeleteModal} 
                className
                onOpenChange={setOpenDeleteModal}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button 
                            onClick={handleDeletePost}
                            className="text-white bg-red-600 text-md px-2.5 py-2.5 rounded-lg">Delete</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="relative overflow-hidden rounded-lg h-60">
                <img
                    src="/banner1.jpg"
                    alt=""
                    className="absolute inset-0 object-cover select-none z-90"
                />
                
                {loading ? 
                <div className="absolute inset-0 flex flex-col justify-end z-90">
                    <div className="p-8 space-y-2">
                        <Skeleton className="w-1/3 h-6 bg-gray-400" /> 
                        <Skeleton className="w-1/4 h-3 bg-gray-400" /> 
                    </div>
                </div>
                :
                <div className="absolute inset-0 flex items-end bg-black z-90 text-primary-default bg-opacity-30 ">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold">{classroom.subject}</h2>
                        <p className="mt-2">{classroom.section}</p>
                    </div>
                </div>
                }
            </div>
            <div className="mt-8 grid grid-cols-[2fr_1fr] gap-4 ">
                {postLoading 
                ?
                <PostSkeleton count={4}/>
                :
                <div className="space-y-10">
                    <div className="flex w-full gap-4 px-8 py-4 border rounded-lg shadow cursor-pointer hover:bg-gray-200">
                        <div className="grid flex-shrink-0 w-10 h-10 border rounded-full bg-background-default place-items-center">
                            <FaUser size={18} />
                        </div>
                        {addPost ? 
                        <form onSubmit={handleSubmit} className="flex-1">
                            <Textarea ref={textAreaRef} name="content" className="text-base" />
                            <div className="flex justify-end gap-2 mt-4">
                                <button className="px-5 py-2 border rounded-md bg-background-100 opacity-80 hover:opacity-100 hover:shadow" onClick={() => setAddPost(false)}>Cancel</button>
                                <button type="submit" className="px-5 py-2 border rounded-md bg-primary-default opacity-80 hover:opacity-100 hover:shadow">Submit</button>
                            </div>
                        </form>
                        :
                        <input 
                            type="text" 
                            className={
                                `w-full h-8 px-5 py-4 border border-gray-200 rounded-full cursor-pointer
                                ${addPost ? 'hidden' : 'block'}
                                `
                            } 
                            onClick={() => setAddPost(true)}
                            placeholder="Announce something to the class" />
                        }
                    </div>
                    {optimisticLoading && <PostSkeleton count={1} />}
                    {postCards}
                    
                </div>
                }
                <div className="flex flex-col">
                    <div className="px-8 py-4 space-y-8 border">
                        <p className="font-heading text-md">Announcements</p>
                        {postLoading 
                        ?
                        <div className="space-y-2">
                            <Skeleton className="w-1/3 h-3 bg-gray-600 "/>
                            <Skeleton className="w-3/4 h-2 bg-gray-600 "/>
                            <Skeleton className="w-2/3 h-2 bg-gray-600 "/>
                        </div>
                        :
                        <div>
                            
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Classroom