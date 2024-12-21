import { Button } from "@/components/ui/button"
import DisplayFiles from "@/components/DisplayFiles"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useState } from "react"
import { FaArrowLeft, FaPencil } from "react-icons/fa6"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDeadline } from "@/utils/dayjs"
import { FaEllipsisV, FaPlus, FaTrash, FaUser } from "react-icons/fa"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import CommentSection from "@/components/AssignmentDetail/CommentSection"
import { BiAlarmExclamation } from "react-icons/bi";


const AssignmentDetail = () => {
    const { id } = useParams()
    const { user, authTokens } = useContext(AuthContext)
    const [ loading, setLoading ] = useState(true)
    const [ assignment, setAssignment ] = useState()
    const { getAssignment } = useAssignmentManager(authTokens)

    const [ erorrs, setErrors ] = useState([])
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchAssignmentData = async () => {
            try {
                const fetchAssignment = await getAssignment(id)
                setAssignment(fetchAssignment)
            }
            catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchAssignmentData()
    }, [id])

    if (loading) {
        return (
            <div className="w-full px-4 py-12">
                <Skeleton className="w-[400px] h-10 bg-gray-400"/>
            </div>
        )
    }


    return (
        <div className="grid w-full grid-cols-1 gap-12 px-4 py-4 md:px-16">
            <div className="col-span-2 space-y-4">
                <div className="flex items-center gap-8 py-4 border-b">
                    <Button onClick={handleBack} variant="outline" className="">
                        <FaArrowLeft className="mr-2" />
                        Back
                    </Button>
                    <Link to={`/classroom/${assignment.classroom.id}`} className="hover:underline" >in: {assignment.classroom.subject}</Link>
                    <Button className="ml-auto bg-primary-default hover:bg-secondary-default">View Submissions</Button>
                    {assignment.classroom.teacher.id == user.nameid
                    &&
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="grid p-2 rounded-full cursor-pointer hover:bg-gray-200 place-items-center">
                                <FaEllipsisV size={12}/>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="z-30 flex items-center gap-2">
                                <FaPencil/>
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="z-30 flex items-center gap-2">
                                <FaTrash/>
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    }
                </div>
                <div className="flex items-center justify-between py-4">
                    <div>
                        <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
                        <div className="flex gap-2 mt-4">
                            <div className="grid w-6 h-6 border rounded-full place-items-center">
                                <FaUser size={12}/>
                            </div>  
                            <p className="text-text-600">{assignment.classroom.teacher.fullName}</p>
                        </div>  
                    </div>
                    <Button variant="outline" className="text-base">
                        <BiAlarmExclamation className="mr-2"/>Deadline: {getDeadline(assignment.submissionDate)}</Button>
                </div>
                <p className="py-4">{assignment.description}</p>
                {assignment.files && assignment.files.length > 0 && 
                <div className="pt-8 pb-4 space-y-4 border-t">
                    <div className="text-right">
                        <Button className="" variant="outline"><FaPlus className="mr-2"/>Add more files</Button>
                    </div>
                    <DisplayFiles materials={assignment.files}/>
                </div>
                }
                <CommentSection commentsData={assignment.comments}/>
            </div>
        </div>
    )
}

export default AssignmentDetail