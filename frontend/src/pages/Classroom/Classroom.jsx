import PostSkeleton from "@/components/Skeleton/PostSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostCard from "@/components/PostCard"
import PostInput from "@/components/PostInput"
import ClassroomContext from "@/context/ClassroomContext"
import AssignmentCard from "@/components/AssignmentCard"

/*
// [ ] - Conceptualize Privacy Related Settings and User Control Systems
// Unauthorized Joining, User Moderation.
// [ ] - No Posts
// [ ] - Define Announcements
// [ ] - Announcements Responsivenesss
*/

const Classroom = () => {
    const { id } = useParams()
    const { 
        classroom, 
        loading,
    
        posts,
        postLoading,
        optimisticLoading,

        handleGetPosts,
        handleCreatePost,
    } = useContext(ClassroomContext)

    /* NOTE : Delete Post Handler needs a better naming
    // deletePost is not exactly a good term as this function is still 
    // technically a handler that passes control but to yet another handler
    // simply because the openDeleteModal exists only in this component

    // currently ==============================================
    // deletePost()             - a Classroom Component method
    // ---- handleDeletePost()  - a ClassroomContext method
    // -------- deletePost()    - a useClassroomManager method/hook
    */
   
    useEffect(() => {
        const fetchData = async () => {
            if (posts === undefined) await handleGetPosts()
        }

        fetchData()
    }, [id, posts])

    return (
        <div className="px-8 py-4">
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
            <div className="mt-8 grid md:grid-cols-[2fr_1fr]  gap-4 ">
                {postLoading 
                ?
                <PostSkeleton count={4} className="order-2"/>
                :
                <div className="space-y-10 ">
                    <div className="px-8 py-4 border shadow hover:bg-gray-200">
                        <PostInput onSubmitPost={handleCreatePost} placeholder={"Announce something to the class"} filesHidden={false}/>
                    </div>
                    {optimisticLoading && <PostSkeleton count={1} />}
                    {posts && posts.map(post => post.assignment ? 
                        (
                            <AssignmentCard 
                                post={post} 
                                key={post.id} />
                        ) 
                        : 
                        (
                        <PostCard 
                            key={post.id} 
                            post={post} 
                            />
                        )
                        )}
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