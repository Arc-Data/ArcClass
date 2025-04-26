import { Button } from "@/components/ui/button"
import DisplayFiles from "@/components/DisplayFiles"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useState } from "react"
import { FaArrowLeft, FaPencil } from "react-icons/fa6"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDeadline } from "@/utils/dayjs"
import { FaClock, FaEllipsisV, FaPlus, FaRegClock, FaTrash, FaUser } from "react-icons/fa"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import CommentSection from "@/components/AssignmentDetail/CommentSection"
import { BiAlarmExclamation } from "react-icons/bi";
import { Separator } from "@/components/ui/separator"
import { MdOutlineInsertComment } from "react-icons/md";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Assignment404 from "@/components/errors/Assignment404"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import dayjs from "@/utils/dayjs"
import { Calendar } from "@/components/ui/calendar"


// TODO : Close dialog on delete
const AssignmentDetail = () => {
    const { id } = useParams()
    const { user, authTokens } = useContext(AuthContext)
    const [ loading, setLoading ] = useState(true)
    const [ assignment, setAssignment ] = useState()
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false)
    const { getAssignment, deleteAssignment, updateAssignment } = useAssignmentManager(authTokens)
    const [ isEditing, setEditing ] = useState(false)

    const [ editAssignment, setEditAssignment ] = useState({
        maxGrade: '',
        submissionDate: new Date(),
        title: '',
        description: '',
    })

    const [ error, setError ] = useState()
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    // TODO : File Uploads

    const handleCancel = () => {
        setEditAssignment({
            title: assignment.title,
            maxGrade: assignment.maxGrade,
            description: assignment.description,
            submissionDate: assignment.submissionDate,
        })
        setEditing(false)
    }

    const handleEditAssignment = async () => {
        try {
            const response = await updateAssignment(id, editAssignment)
            console.log(response)
            setAssignment(prev => ({
                ...prev, 
                maxGrade: editAssignment.maxGrade,
                title: editAssignment.title,
                description: editAssignment.description,
                submissionDate: editAssignment.submissionDate,
            }))
            setEditing(false)
        } catch (error) {
            console.log(error)
        } 
    }

    const handleEditAssignmentInputChange = (e) => {
        const { name, value } = e.target
        setEditAssignment(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleDeleteAssignment = () => {
        deleteAssignment(id)
        setOpenDeleteModal(false)
        setError({ status: 404} )
    }

    useEffect(() => {
        const fetchAssignmentData = async () => {
            try {
                const fetchAssignment = await getAssignment(id)
                setAssignment(fetchAssignment)
                setEditAssignment({
                    title: fetchAssignment.title,
                    maxGrade: fetchAssignment.maxGrade,
                    description: fetchAssignment.description,
                    submissionDate: fetchAssignment.submissionDate,
                })
            }
            catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchAssignmentData()
    }, [id])

    // TODO : error status 500s template
    if (error) {
        if (error.status === 404) {
            return (<Assignment404 />)
        } else {
            return (<div>Server Error</div>)
        }
    }  

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
                    <Button className="ml-auto bg-primary hover:bg-secondary">View Submissions</Button>
                    {assignment.classroom.teacher.id == user.nameid
                    &&
                    <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="grid p-2 rounded-full cursor-pointer hover:bg-gray-200 place-items-center">
                                    <FaEllipsisV size={12}/>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="*:cursor-pointer">
                                <DropdownMenuItem className="z-30 flex items-center gap-2" onClick={() => setEditing(prev => !prev)}>
                                    <FaPencil/>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem className="z-30 flex items-center gap-2">
                                        <FaTrash/>
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
                                {assignment.files.length > 0 &&
                                <div className="flex gap-4">
                                    <MdOutlineInsertComment />
                                    <p>{assignment.files.length} files</p>
                                </div>
                                }
                            </div>
                            <DialogFooter>
                                <Button variant="destructive" type="submit" onClick={handleDeleteAssignment}>Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    }
                </div>
                {!isEditing ? 
                <div className="flex gap-8 py-4">
                    <div className="flex-1 space-y-4" >
                        <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
                        <div className="flex gap-2 mt-4">
                            <div className="grid w-6 h-6 border rounded-full place-items-center">
                                <FaUser size={12}/> 
                            </div>  
                            <p className="text-text-600">{assignment.classroom.teacher.fullName}</p>
                            <Separator orientation="vertical" className="text-primary bg-primary w-[20px]"/>
                            <p className="text-text-600">{assignment.maxGrade} pts.</p>
                        </div>  
                        <p className="py-4">{assignment.description}</p>
                    </div>
                    <Button variant="outline" className="text-base ">
                        <BiAlarmExclamation className="mr-2"/>Deadline: {getDeadline(assignment.submissionDate)}
                    </Button>
                </div>
                :
                <div className="space-y-8">
                    <div className="flex justify-end w-full gap-8">
                        <div className="text-sm">
                            <p className="uppercase">Max Grade</p>
                            <input 
                                type="number" 
                                onChange={handleEditAssignmentInputChange} 
                                className=" px-2 py-1 text-base border-t-0 border-b border-black rounded-none cursor-pointer border-x-0" 
                                name="maxGrade"
                                value={editAssignment.maxGrade}/>
                        </div>
                        <div>
                            <p className="text-sm uppercase">Submission Deadline</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div variant="outline" className="flex items-center w-full gap-2 px-2 py-1 text-base border-t-0 border-b border-black rounded-none cursor-pointer border-x-0">
                                        <FaRegClock/> {dayjs(editAssignment.submissionDate).format("MMM DD YYYY - HH:mm:ss")}</div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={editAssignment.submissionDate}
                                        onSelect={(date) => setEditAssignment(prev => ({...prev, submissionDate: date}))}
                                    ></Calendar>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="text-sm uppercase">Title</div>
                        <input 
                            type="text" 
                            className="w-full py-4 text-2xl font-bold border border-t-0 border-gray-800 border-x-0 font-heading" 
                            onChange={handleEditAssignmentInputChange} 
                            name="title"
                            value={editAssignment.title}/>
                    </div>
                    <div className="w-full">
                        <p className="text-sm uppercase">Description</p>
                        <Textarea 
                            value={editAssignment.description} 
                            name="description"
                            onChange={handleEditAssignmentInputChange} 
                            className="border-b"/>
                    </div>
                    <div className="flex justify-end w-full gap-4">
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        <Button className="bg-primary" onClick={handleEditAssignment}>Submit</Button>
                    </div>
                </div>
                }
                {assignment.files && assignment.files.length > 0 && 
                <div className="pt-8 pb-4 space-y-4 border-t">
                    {isEditing && 
                    <div className="text-right">
                        <Button className="" variant="outline"><FaPlus className="mr-2"/>Add more files</Button>
                    </div>
                    }
                    <DisplayFiles materials={assignment.files}/>
                </div>
                }
                {!isEditing && 
                <CommentSection commentsData={assignment.comments}/>
                }
            </div>
        </div>
    )
}

export default AssignmentDetail