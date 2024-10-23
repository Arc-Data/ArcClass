import Classroom404 from "@/components/errors/Classroom404"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Spinner } from "flowbite-react"
import { useContext, useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FaGear, FaRightFromBracket } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"

/*
// [ ] - Conceptualize Privacy Related Settings and User Control Systems
// Unauthorized Joining, User Moderation.
// [ ] - Create alert dialog for leaving classroom
*/

const Classroom = () => {
    const { id } = useParams()
    const { authTokens, user, role } = useContext(AuthContext)
    const { classroom, loading, getClassroom, deleteClassroom, leaveClassroom } = useClassroomManager(authTokens)
    const [ error, setError ] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getClassroom(id)
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
            </div>
    )
}

export default Classroom