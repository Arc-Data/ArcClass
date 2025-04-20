import Classroom404 from "@/components/errors/Classroom404"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import HomeContext from "@/context/HomeContext"
import ShareClassroomModal from "@/modals/ShareClassroomModal"
import { useContext, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { FaGear, FaRightFromBracket } from "react-icons/fa6"
import { NavLink, Outlet, useParams } from "react-router-dom"

const ClassroomLayout = () => {
    const { id } = useParams() 
    const { role, user } = useContext(AuthContext)
    const { classroom, loading, classroomError } = useContext(ClassroomContext)
    const { handleDeleteClassroom, handleLeaveClassroom } = useContext(HomeContext)
    
    const [ openLeaveModal, setOpenLeaveModal ] = useState(false)
    
    if (classroomError) {
        return <Classroom404 />
    }

    return (
        <div>
            <Dialog open={openLeaveModal} onOpenChange={setOpenLeaveModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                    <DialogTitle>Deleting Classroom</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the classroom
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                    </DialogFooter>
                        <Button onClick={() => handleDeleteClassroom(id)} className="text-white bg-red-500">Delete</Button>
                </DialogContent>
            </Dialog>
            <div className="flex border-b">
                <div className="flex items-center flex-1 gap-4">
                    <NavLink
                        to={`/classroom/${id}`}
                        end
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? ' border-b-4 border-b-accent' : 'hover:border-b-gray-200'
                            }`
                        }
                    >
                        Overview
                    </NavLink>
                    <NavLink
                        to={`/classroom/${id}/assignments`}
                        end
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? ' border-b-4 border-b-accent' : 'hover:border-b-gray-200'
                            }`
                        }   
                    >
                        Assignments
                    </NavLink>
                    <NavLink
                        to={`/classroom/${id}/people`}
                        className={({ isActive }) =>
                            `border-b-4 border-transparent py-2 px-4 ${
                                isActive ? 'border-b-4 border-b-accent' : ' hover:border-b-gray-200'
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
                    <DropdownMenuContent align="end" className="bg-background *:p-2 rounded-lg *:cursor-pointer">
                        {role.includes('Teacher') && classroom.teacher?.id == user.nameid &&
                        <DropdownMenuItem 
                            onClick={ () => setOpenLeaveModal(true)}
                            className="z-30 flex items-center gap-2 text-red-500">
                            <FaTrash/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                        }
                        {role.includes('Student') &&
                        <DropdownMenuItem onClick={ () => handleLeaveClassroom(id) } className="z-30 flex items-center gap-2 text-red-500">
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