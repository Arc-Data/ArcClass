import Classroom404 from "@/components/errors/Classroom404"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { useContext, useEffect, useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"
import { FaGear, FaRightFromBracket } from "react-icons/fa6"
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom"

const ClassroomLayout = () => {
    const { id } = useParams() 
    const { authTokens, role, user } = useContext(AuthContext)
    const { handleRemoveClassroom } = useContext(ClassroomContext)
    const { classroom, loading, getClassroom, deleteClassroom, leaveClassroom } = useClassroomManager(authTokens)
    const [ error, setError ] = useState()

    const [ openLeaveModal, setOpenLeaveModal ] = useState(false)
    
    const navigate = useNavigate()

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


    if (error) {
        return <Classroom404 />
    }

    return (
        <div className="">
            <Dialog open={openLeaveModal} onOpenChange={setOpenLeaveModal}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Deleting Classroom</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the classroom
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                    </DialogFooter>
                        <Button onClick={handleDelete} className="text-white bg-red-500">Delete</Button>
                </DialogContent>
            </Dialog>
            <div className="flex border-b">
                <div className="flex items-center flex-1 gap-4">
                    <NavLink
                        to={`/classroom/${id}`}
                        end
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? ' border-b-4 border-b-accent-default' : 'hover:border-b-gray-200'
                            }`
                        }
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to={`/classroom/${id}/activities`}
                        end
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? ' border-b-4 border-b-accent-default' : 'hover:border-b-gray-200'
                            }`
                        }
                    >
                        Activities
                    </NavLink>
                    <NavLink
                        to={`/classroom/${id}/people`}
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? 'border-b-4 border-b-accent-default' : ' hover:border-b-gray-200'
                            }`
                        }
                    >
                        People
                    </NavLink>
                </div>
                
                <ShareClassroomModal />
                {!loading && 
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                            <FaGear size={16}/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background-default *:p-2 rounded-lg *:cursor-pointer">
                        {role.includes('Teacher') && classroom.teacher?.id == user.nameid &&
                        <DropdownMenuItem 
                            onClick={ () => setOpenLeaveModal(true)}
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
                }
            </div>
            <Outlet/>
        </div>
    )
}

export default ClassroomLayout