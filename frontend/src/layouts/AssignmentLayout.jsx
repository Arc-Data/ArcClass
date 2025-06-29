import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAssignmentDetailContext } from '@/context/AssignmentDetailContext'
import { FaArrowLeft, FaEllipsisV, FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { MdOutlineInsertComment } from 'react-icons/md'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const AssignmentLayout = () => {
	const navigate = useNavigate()
	const { 
		assignment, 
		assignmentFiles,
		assignmentLoading,
		deleteAssignment,
		error,
		setError,

		setEditing,
	} = useAssignmentDetailContext()

	const handleBack = () => {
		navigate(-1)
	}

	const handleDeleteAssignment = () => {
		deleteAssignment(assignment.id)
		setError({ status: 404 })
	}


	return (
		<div className='grid w-full grid-cols-1 gap-12 p-4 md:px-16'>
			<div className='col-span-2 space-y-4'>
				<div className="flex items-center gap-8 py-4 border-b">
					<Button onClick={handleBack} variant="outline">
						<FaArrowLeft className="mr-2" />
						Back
					</Button>
					{(!assignmentLoading && !error) &&
						<>
							<Link to={`/classroom/${assignment.classroom.id}`} className="hover:underline">
								in: {assignment?.classroom.subject}
							</Link>
							{assignment.isTeacherView &&
								<Button className="ml-auto bg-primary hover:bg-secondary">View Submissions</Button>
							}
							<Dialog>
								<DropdownMenu>
									{assignment.isTeacherView &&
										<DropdownMenuTrigger asChild>
											<button className="grid p-2 rounded-full cursor-pointer hover:bg-gray-200 place-items-center">
												<FaEllipsisV size={12} />
											</button>
										</DropdownMenuTrigger>
									}
									<DropdownMenuContent align="end" className="*:cursor-pointer">
										<DropdownMenuItem className="z-30 flex items-center gap-2" onClick={() => setEditing(prev => !prev)}>
											<FaPencil />
											<span>Edit</span>
										</DropdownMenuItem>
										<DialogTrigger asChild>
											<DropdownMenuItem className="z-30 flex items-center gap-2">
												<FaTrash />
												<span>Delete</span>
											</DropdownMenuItem>
										</DialogTrigger>
									</DropdownMenuContent>
								</DropdownMenu>
								<DialogContent className="max-w-md">
									<DialogHeader>
										<DialogTitle>Deleting Assigment</DialogTitle>
										<DialogDescription>
											This action is irreversible and will also delete associated comments and files including submissions. Proceed?
										</DialogDescription>
									</DialogHeader>
									<div className="flex flex-col p-4 text-sm text-text-600 ">
										{assignmentFiles.length > 0 &&
											<div className="flex gap-4">
												<MdOutlineInsertComment />
												<p>{assignmentFiles.length} files</p>
											</div>
										}
									</div>
									<DialogFooter>
										<Button variant="destructive" type="submit" onClick={handleDeleteAssignment}>Delete</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</>
					}
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default AssignmentLayout