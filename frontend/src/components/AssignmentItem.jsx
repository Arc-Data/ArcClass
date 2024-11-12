import { FaPencil, FaUserGroup } from 'react-icons/fa6'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'
import { useContext } from 'react'
import ClassroomContext from '@/context/ClassroomContext'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const AssignmentItem = ({ assignment, modifyPermission }) => {
    const { handleDeleteAssignment } = useContext(ClassroomContext)

    return (
        <div className='flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer group border-secondary-default hover:shadow'>
            <p>{assignment.title}</p>
            <p className='flex items-center gap-4'>
                <span>0/0</span>
                <FaUserGroup/>
                {modifyPermission && 
                <Dialog>
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            { modifyPermission && (
                            <button className="invisible p-2 ml-auto rounded-full group-hover:visible hover:bg-gray-200">
                                <FaEllipsisV />
                            </button>) }
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <FaPencil/>
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <FaTrash/>
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Deleting Assignment
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will delete the assignment and all related submissions
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <button onClick={() => handleDeleteAssignment(assignment.id)} className='px-4 py-2.5 rounded-xl text-white bg-red-500'>Delete</button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                }
            </p>
        </div>
    )
}

export default AssignmentItem