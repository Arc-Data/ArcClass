import { FaPencil, FaUserGroup } from 'react-icons/fa6'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { FaEllipsisV, FaTrash } from 'react-icons/fa'
import { useContext } from 'react'
import ClassroomContext from '@/context/ClassroomContext'

const AssignmentItem = ({ assignment, modifyPermission }) => {
    const { handleDeleteAssignment } = useContext(ClassroomContext)

    return (
        <div className='flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer group border-secondary-default hover:shadow'>
            <p>{assignment.title}</p>
            <p className='flex items-center gap-4'>
                <span>0/0</span>
                <FaUserGroup/>
                {modifyPermission && 
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        { modifyPermission && (
                        <button className="invisible p-2 ml-auto rounded-full group-hover:visible hover:bg-gray-200">
                            <FaEllipsisV />
                        </button>
                        )
                        }
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <FaPencil/>
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAssignment(assignment.id)} className="text-red-500">
                            <FaTrash/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                }
            </p>
        </div>
    )
}

export default AssignmentItem