import Classroom404 from "@/components/errors/Classroom404"
import PostSkeleton from "@/components/Skeleton/PostSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import usePostManager from "@/hooks/usePostManager"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import PostCard from "@/components/PostCard"
import PostInput from "@/components/PostInput"

/*
// [ ] - Conceptualize Privacy Related Settings and User Control Systems
// Unauthorized Joining, User Moderation.
// [ ] - No Posts
// [ ] - Define Announcements
*/

// NOTE : Would be absolutely nice if i could leverage React 19 for most of this

const Classroom = () => {
    const { id } = useParams()
    const { authTokens, user } = useContext(AuthContext)
    const { classroom, loading, getClassroom } = useClassroomManager(authTokens)
    const { posts, loading:postLoading, getPosts, createPost, deletePost, optimisticLoading } = usePostManager(authTokens)
    const [ error, setError ] = useState()

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

    const handlePostSubmit = async (e) => {
        e.preventDefault()
        const content = e.target.elements.content.value
        try {
            await createPost(id, content)
        }
        catch (error) {
            console.log(error)
        } 
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
                    <div className="border shadow">
                        <PostInput onSubmitPost={handlePostSubmit} placeholder={"Announce something to the class"}/>
                    </div>
                    {optimisticLoading && <PostSkeleton count={1} />}
                    {posts.map(post => (
                        <PostCard 
                            key={post.id} 
                            classroom={classroom} 
                            post={post} 
                            openModal={handleOpenDeleteModal} 
                            />
                    ))}
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