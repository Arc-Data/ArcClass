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
import { useContext, useEffect, useState } from "react"
import { FaPaperPlane, FaTrash, FaUser } from "react-icons/fa"
import { FaGear, FaRightFromBracket } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "@/utils/dayjs"

/*
// [ ] - Conceptualize Privacy Related Settings and User Control Systems
// Unauthorized Joining, User Moderation.
// [ ] - Create alert dialog for leaving classroom
// [ ] - No Posts
// [ ] - Define Announcements
*/

const Classroom = () => {
    const { id } = useParams()
    const { authTokens, user, role } = useContext(AuthContext)
    const { classroom, loading, getClassroom } = useClassroomManager(authTokens)
    const { posts, loading:postLoading, getPosts } = usePostManager(authTokens)
    const [ error, setError ] = useState()

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

    // {
    //     "id": 4,
    //     "user": {
    //         "id": "67f3cef4-0478-4497-ad44-8b5e2159aaf5",
    //         "fullName": "something something"
    //     },
    //     "classroomId": "9QJ3MV",
    //     "createdAt": "2024-10-24T08:47:26.3540984",
    //     "dateModified": "2024-10-24T08:47:26.3540983",
    //     "content": "Writing Some Random Stuff"
    // }

    const postCards = posts && posts.map(post => {
        console.log(post)
        return (
            <div key={post.id} className="flex w-full gap-4 px-8 py-4 border rounded-lg shadow">
                <div className="grid w-10 h-10 border rounded-full place-items-center">
                    <FaUser size={18} />
                </div>
                <div className="flex-1 space-y-4">
                    <div className=" text-bold">
                        <p>{post.user.fullName}</p>
                        <p className="text-sm">{dayjs(post.createdAt).format('MMM DD, h:mm A')}</p>
                    </div>
                    <p>{post.content}</p>
                </div>
            </div>
        )
    })


    if (error) {
        return <Classroom404/>
    }

    // {
    //     "id": "OMFOU3",
    //     "subject": "Programming 1",
    //     "section": "BSIT 4-1N",
    //     "semesterStart": "2024-10-16T02:10:48.8453487",
    //     "semesterEnd": null,
    //     "teacher": {
    //         "id": "6b395212-5bca-4fcb-9ec1-badfda52b7b7",
    //         "fullName": "Teacher1 Teacher"
    //     }
    // }

    return (
        <div className="px-8 py-4">
            <div className="relative overflow-hidden rounded-lg h-60">
                <img
                    src="/banner1.jpg"
                    alt=""
                    className="absolute inset-0 z-10 object-cover select-none"
                />
                
                {loading ? 
                <div className="absolute inset-0 z-30 flex flex-col justify-end">
                    <div className="p-8 space-y-2">
                        <Skeleton className="w-1/3 h-6 bg-gray-400" /> 
                        <Skeleton className="w-1/4 h-3 bg-gray-400" /> 
                    </div>
                </div>
                :
                <div className="absolute inset-0 z-30 flex items-end bg-black text-primary-default bg-opacity-30 ">
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
                    <div className="flex items-center w-full gap-4 px-8 py-4 border rounded-lg shadow cursor-pointer">
                        <div className="grid w-10 h-10 border rounded-full place-items-center">
                            <FaUser size={18} />
                        </div>
                        <input type="text" className="w-full h-8 px-5 py-4 border border-gray-200 rounded-full cursor-pointer" placeholder="Announce something to the class" disabled/>
                        <FaPaperPlane size={18}/>
                    </div>
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