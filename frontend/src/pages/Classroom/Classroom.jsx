import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Spinner } from "flowbite-react"
import { useContext, useEffect } from "react"
import { FaTrash } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"

/* TODO : Conceptualize Privacy Related Settings and User Control Systems
Unauthorized Joining, User Moderation.
*/


const Classroom = () => {
    const { id } = useParams()
    const { authTokens, user } = useContext(AuthContext)
    const { classroom, loading, getClassroom, deleteClassroom } = useClassroomManager(authTokens)
    
    const navigate = useNavigate()

    const handleDelete = async () => {
        await deleteClassroom(id)
        navigate('/home')
    }

    useEffect(() => {
        const fetchData = async () => {
            await getClassroom(id)
        }

        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="grid w-full h-full place-items-center">
                <Spinner />
            </div>
        )
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
        <div>
            <div className="flex items-center gap-4 p-2 border-b">
                <div className="flex items-center flex-1 gap-12">
                    <button>Overview</button>
                    <button>Class Files</button>
                    <button>People</button>
                </div>
                <ShareClassroomModal id={classroom.id}/>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                            <FaGear size={16}/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-30 bg-background-default *:p-2 rounded-lg">
                        {user.role.includes('Teacher') && classroom.teacher.id == user.nameid &&
                        <DropdownMenuItem 
                            onClick={handleDelete}
                            className="z-30 flex items-center gap-2 text-red-500">
                            <FaTrash/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="px-8 py-4">
                <div className="relative overflow-hidden rounded-lg h-60">
                    <img
                        src="/banner1.jpg"
                        alt=""
                        className="absolute inset-0 z-10 object-cover select-none"
                    />
                    <div className="absolute inset-0 z-30 flex items-end bg-black text-primary-default bg-opacity-30 ">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold">{classroom.subject}</h2>
                            <p className="mt-2">{classroom.section}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Classroom