import Classroom404 from "@/components/errors/Classroom404"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { Spinner } from "flowbite-react"
import { useContext, useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { Link, Outlet, useNavigate, useParams } from "react-router-dom"

const ClassroomLayout = () => {
    const { id } = useParams() 
    const { authTokens, role, user } = useContext(AuthContext)
    const { handleRemoveClassroom } = useContext(ClassroomContext)
    const { classroom, loading, getClassroom, deleteClassroom, leaveClassroom } = useClassroomManager(authTokens)
    const [ error, setError ] = useState()

    const navigate = useNavigate()
    console.log(role)

    const handleDelete = async () => {
        await deleteClassroom(id)
        handleRemoveClassroom(id)
        navigate('/home')
    }

    const handleLeaveClassroom = async () => {
        await leaveClassroom(id)
        handleRemoveClassroom(id)
        navigate('/home')
    }

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

    if (loading) {
        return (
            <div className="grid w-full h-full place-items-center">
                <Spinner />
            </div>
        )
    }

    if (error) {
        return <Classroom404 />
    }

    return (
        <div className="">
            <div className="flex border-b">
                <div className="flex items-center flex-1 gap-12">
                    <button>Overview</button>
                    <button>Class Files</button>
                    <Link to={`/classroom/${id}/people`}>People</Link>
                </div>
                <ShareClassroomModal  />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                            <FaGear size={16}/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-40 bg-background-default *:p-2 rounded-lg *:cursor-pointer">
                        {role.includes('Teacher') && classroom.teacher?.id == user.nameid &&
                        <DropdownMenuItem 
                            onClick={handleDelete}
                            className="z-30 flex items-center gap-2 text-red-500">
                            <FaTrash/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                        }
                        {role.includes('Student') &&
                        <DropdownMenuItem onClick={ handleLeaveClassroom } className="z-30 flex items-center gap-2 text-red-500">
                            <FaRightFromBracket/>
                            <span>Leave Classroom</span>
                        </DropdownMenuItem>
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Outlet/>
        </div>
    )
}

export default ClassroomLayout