import useClassroomManager from "@/hooks/useClassroomManager"
import { createContext, useContext, useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { useParams } from "react-router-dom"
import useAssignmentManager from "@/hooks/useAssignmentManager"

const ClassroomContext = createContext()

export default ClassroomContext

export const ClassroomProvider = ({ children }) => {
    const [ classroom, setClassroom ] = useState()
    const [ assignments, setAssignments ] = useState([])
    const { authTokens } = useContext(AuthContext)
    const { id } = useParams()

    const { loading, getClassroom } = useClassroomManager(authTokens)
    const [ errors, setErrors ] = useState()

    const {
        createAssignment
    } = useAssignmentManager(authTokens)

    const handleCreateAssignment = async (id, data) => {
        try {
            const assignment = await createAssignment(id, data)
            console.log(assignment)
            const updatedAssignments = [...assignments, assignment]
            setAssignments(updatedAssignments)
        }
        catch (error) {
            console.log(error)
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

        fetchData()
    }, [id])

    const contextData = {
        classroomError: errors,
        classroom, 
        loading, 

        handleCreateAssignment,
    }

    return (
        <ClassroomContext.Provider value={contextData}>
            { children }
        </ClassroomContext.Provider>
    )
}