import CommentSection from "@/components/AssignmentDetail/CommentSection"
import DisplayFiles from "@/components/DisplayFiles"
import Assignment404 from "@/components/errors/Assignment404"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import useMaterialManager from "@/hooks/useMaterialManager"
import dayjs, { getDeadline } from "@/utils/dayjs"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useContext, useEffect, useRef, useState } from "react"
import { BiAlarmExclamation } from "react-icons/bi"
import { FaEllipsisV, FaPlus, FaRegClock, FaTrash, FaUser } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { MdOutlineInsertComment } from "react-icons/md"
import { useParams } from "react-router-dom"


/* TODO : Assignment Comments should be a separate request
// The current implementation has the comments 
// be a nested component of the assignment response
*/
const AssignmentDetail = () => {
    const { id } = useParams()
    const {
        assignment,
        assignmentLoading: loading,
        assignmentFiles,
        getAssignment,

        isEditing,
        setEditing,

        updateAssignmentLocal,
        getAssignmentLocal,

        error,
    } = useAssignmentDetailContext()
    const { authTokens } = useContext(AuthContext)

    const {
        attachMaterials,
    } = useMaterialManager(authTokens)

    const [editAssignment, setEditAssignment] = useState({
        maxGrade: '',
        submissionDate: new Date(),
        title: '',
        description: '',
    })

    const fileInputRef = useRef()

    const handleAddFilesClick = () => {
        fileInputRef.current.click()
    }

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
            updateAssignmentLocal(editAssignment)
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

    const handleFilesChange = async (e) => {
        const files = Array.from(e.target.files)
        for (const file of files) {
            try {
                await attachMaterials(id, file)
            }
            catch (error) {
                console.log(error)
            }
        }
        
        getAssignmentLocal() 
        e.target.value = null 
    }

    useEffect(() => {
        if (assignment) {
            setEditAssignment({
                title: assignment.title,
                maxGrade: assignment.maxGrade,
                description: assignment.description,
                submissionDate: assignment.submissionDate,
            })
        }
    }, [assignment])

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
                <Skeleton className="w-[400px] h-10 bg-gray-400" />
            </div>
        )
    }

    return (
        <div>
            {!isEditing ?
                <div className="flex gap-8 py-4">
                    <div className="flex-1 space-y-4" >
                        <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
                        <div className="flex gap-2 mt-4">
                            <div className="grid w-6 h-6 border rounded-full place-items-center">
                                <FaUser size={12} />
                            </div>
                            <p className="text-text-600">{assignment.classroom.teacher.fullName}</p>
                            <Separator orientation="vertical" className="text-primary bg-primary w-[20px]" />
                            <p className="text-text-600">{assignment.maxGrade} pts.</p>
                        </div>
                        <p className="py-4">{assignment.description}</p>
                    </div>
                    <Button variant="outline" className="text-base ">
                        <BiAlarmExclamation className="mr-2" />Deadline: {getDeadline(assignment.submissionDate)}
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
                                value={editAssignment.maxGrade} />
                        </div>
                        <div>
                            <p className="text-sm uppercase">Submission Deadline</p>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div variant="outline" className="flex items-center w-full gap-2 px-2 py-1 text-base border-t-0 border-b border-black rounded-none cursor-pointer border-x-0">
                                        <FaRegClock /> {dayjs(editAssignment.submissionDate).format("MMM DD YYYY - HH:mm:ss")}</div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={editAssignment.submissionDate}
                                        onSelect={(date) => setEditAssignment(prev => ({ ...prev, submissionDate: date }))}
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
                            value={editAssignment.title} />
                    </div>
                    <div className="w-full">
                        <p className="text-sm uppercase">Description</p>
                        <Textarea
                            value={editAssignment.description}
                            name="description"
                            onChange={handleEditAssignmentInputChange}
                            className="border-b" />
                    </div>
                    <div className="flex justify-end w-full gap-4 my-4">
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        <Button className="bg-primary" onClick={handleEditAssignment}>Submit</Button>
                    </div>
                </div>
            }
                <div className="pt-8 pb-4 space-y-4 border-t">
                    {isEditing &&
                        <div className="text-right">
                            <Button
                                variant="outline"
                                onClick={handleAddFilesClick}
                            >
                                <FaPlus className="mr-2" />
                                Add more files
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                className="hidden"
                                onChange={handleFilesChange}
                            />
                        </div>
                    }
                    <DisplayFiles
                        materials={assignmentFiles}
                        isEditing={isEditing}
                    />
                </div>
            {!isEditing &&
                <CommentSection commentsData={assignment.comments} />
            }
        </div>
    )
}

export default AssignmentDetail