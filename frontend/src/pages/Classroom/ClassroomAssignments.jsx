import AssignmentItem from "@/components/AssignmentItem"
import ClassroomContext from "@/context/ClassroomContext"
import CreateAssignmentModal from "@/modals/CreateAssignmentModal"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import dayjs from "@/utils/dayjs"
import AuthContext from "@/context/AuthContext"

const ClassroomAssignments = () => {
    const { user, hasRole } = useContext(AuthContext)
    const { 
        classroom, 
        assignments, 
        assignmentsGroup, 
        handleGetAssignmentList, 
        handleDeleteAssignment,
        loading } = useContext(ClassroomContext)
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            if (assignments === undefined) {
                await handleGetAssignmentList()
            }
        }

        fetchData()
    }, [id, assignments])

    if (loading) {
        return (<div></div>)
    }

    return (
        <div className="w-full px-4 mx-auto">
            {hasRole("Teacher") && 
            <div className="flex justify-end w-full p-4 mt-4">
                <CreateAssignmentModal isTeacher={ classroom.teacher.id == user.nameid }/>
            </div>
            }
            <div className="space-y-6">
                {assignmentsGroup && Object.keys(assignmentsGroup)
                    .sort((a, b) => dayjs(b).diff(dayjs(a)))
                    .map(dateKey =>
                    (
                        <div key={dateKey} className="">
                            <p className="my-4 text-lg font-medium">{dateKey}</p>
                            <div className="space-y-2">
                                {assignmentsGroup[dateKey].map(assignment => <AssignmentItem key={assignment.id} assignment={assignment} modifyPermission={ classroom.teacher.id == user.nameid } onDelete={handleDeleteAssignment}/>)}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ClassroomAssignments