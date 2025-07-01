import StudentAssignmentStatus from '@/components/AssignmentDetail/StudentAssignmentStatus'
import TeacherAssignmentStatus from '@/components/AssignmentDetail/TeacherAssignmentStatus'
import { Button } from '@/components/ui/button'
import { useAssignmentDetailContext } from '@/context/AssignmentDetailContext'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'

const AssignmentLayout = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { 
		assignment, 
		assignmentLoading,
		error,
	} = useAssignmentDetailContext()

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<div className='grid w-full grid-cols-1 gap-12 p-4 md:px-16'>
			<div className='col-span-2 space-y-4'>
				<div className="pb-4">
					<div className="flex items-center gap-8 py-4">
						<Button onClick={handleBack} variant="outline">
							<FaArrowLeft className="mr-2" />
							Back
						</Button>
						{(!assignmentLoading && !error) &&
						<Link to={`/classroom/${assignment.classroom.id}`} className="hover:underline">
							in: {assignment?.classroom.subject}
						</Link>
						}
					</div>
					{assignment && 
					<div className='flex items-center gap-4 border-b'>
						<NavLink 
							to={`/assignments/${id}`}
							end
							className={({ isActive }) => 
								`border-b-4 border-transparent py-2 px-4 ${
									isActive ? 'border-b-4 border-b-accent text-primary' : 'hover:border-b-gray-200'
								}`
							}
							>
							Overview
						</NavLink>
						{!assignment.isTeacherView ?
						<NavLink 
							to={`/assignments/${id}/submission`} 
							className={({ isActive }) => 
								`border-b-4 border-transparent py-2 px-4 ${
									isActive ? 'border-b-4 border-b-accent text-primary' : 'hover:border-b-gray-200'
								}`
							}
							>
							Submission
						</NavLink>
						:
						<>
							<NavLink 
								to={`/assignments/${id}/submissions`} 
								className={({ isActive }) => 
									`border-b-4 border-transparent py-2 px-4 ${
										isActive ? 'border-b-4 border-b-accent text-primary' : 'hover:border-b-gray-200'
									}`
								}
								>
								Submissions
							</NavLink>
							<NavLink 
								to={`/assignments/${id}/performance`} 
								className={({ isActive }) => 
									`border-b-4 border-transparent py-2 px-4 ${
										isActive ? 'border-b-4 border-b-accent text-primary' : 'hover:border-b-gray-200'
									}`
								}
								>
								Performance
							</NavLink>
						</>
						}
						{/* 
						// TODO: Teacher View: display of how many students have already submitted 
						// or otherwise a success indicating complete student submissions  
						*/}

						{assignment.isTeacherView ?
						<TeacherAssignmentStatus assignment={assignment} />
						:
						<StudentAssignmentStatus assignment={assignment} />
					}
					</div>
					}
				</div>
				<div></div>
				<Outlet />
			</div>
		</div>
	)
}

export default AssignmentLayout