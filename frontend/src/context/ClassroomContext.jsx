import useClassroomManager from "@/hooks/useClassroomManager"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import AuthContext from "./AuthContext"
import { useParams } from "react-router-dom"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import dayjs from "dayjs"

const ClassroomContext = createContext()

export default ClassroomContext

export const ClassroomProvider = ({ children }) => {
    const [ classroom, setClassroom ] = useState()
    const [ assignments, setAssignments ] = useState()
    const [ participants, setParticipants ] = useState()
    const { authTokens } = useContext(AuthContext)
    const { id } = useParams()

    const { loading, getClassroom, getClassroomParticipants } = useClassroomManager(authTokens)
    const [ participantsLoading, setParticipantsLoading ] = useState(true)
    const [ errors, setErrors ] = useState()
    
    const {
        createAssignment,
        getAssignmentList,
        deleteAssignment,
    } = useAssignmentManager(authTokens)

    const assignmentsGroup = useMemo(() => {
        const group = {}

        if (assignments) {
            assignments.forEach(assignment => {
                const dateKey = dayjs.utc(assignment.submissionDate).local().format('MMM DD YYYY')
                group[dateKey] ||= []
                group[dateKey].push(assignment)
            })
        }

        return group
    }, [assignments])

    const handleCreateAssignment = async (id, data) => {
        try {
            const assignment = await createAssignment(id, data)
            const updatedAssignments = [...assignments, assignment]
            setAssignments(updatedAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAssignment = async ( assignmentId ) => {
        try {
            await deleteAssignment(assignmentId)
            const updatedAssignments = assignments.filter(a => a.id != assignmentId)
            setAssignments(updatedAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleGetAssignmentList = async () => {
        try {
            const fetchAssignments = await getAssignmentList(id);
            setAssignments(fetchAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleGetClassroomParticipants = async () => {
        try {
            console.log("I am here")
            const fetchParticipants = await getClassroomParticipants(id)
            setParticipants(fetchParticipants)
            console.log(fetchParticipants)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setParticipantsLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classroom = await getClassroom(id)
                setClassroom(classroom)
            }
            catch (error) {
                setErrors(error)
            }
        }

        setAssignments()
        fetchData()
    }, [id])

    const contextData = {
        classroomError: errors,
        classroom, 
        loading, 
        assignments,
        assignmentsGroup,
        participants,
        participantsLoading,

        handleGetAssignmentList,
        handleCreateAssignment,
        handleDeleteAssignment,
        handleGetClassroomParticipants
    }

    return (
        <ClassroomContext.Provider value={contextData}>
            { children }
        </ClassroomContext.Provider>
    )
}