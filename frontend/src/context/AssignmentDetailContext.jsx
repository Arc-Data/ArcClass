import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useAuth } from "./AuthContext"
import { createContext, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const AssignmentDetailContext = createContext()

export const AssignmentDetailProvider = ({ children }) => {
    const { id } = useParams()
    const { user, authTokens } = useAuth()
    const [ assignment, setAssignment ] = useState()
    const [ assignmentFiles, setAssignmentFiles ] = useState([]) 
    const [ assignmentLoading, setAssignmentLoading ] = useState(true)
    const [ error, setError ] = useState()

    const [ isEditing, setEditing ] = useState(false)

    const {
        getAssignment,
        createAssignment,
        updateAssignment,
        deleteAssignment,
    } = useAssignmentManager(authTokens)

    const getAssignmentLocal = async () => {
        try {
            const fetchAssignment = await getAssignment(id)
            setAssignment(fetchAssignment)
            setAssignmentFiles(fetchAssignment.files)
            return fetchAssignment
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateAssignmentLocal = async (editAssignment) => {
        try { 
            const response = await updateAssignment(id, editAssignment)
            setAssignment(prev => ({
                ...prev,
                maxGrade: editAssignment.maxGrade,
                title: editAssignment.title,
                description: editAssignment.description,
                submissionDate: editAssignment.submissionDate,
            }))
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setAssignmentLoading(true)
        const fetchAssignment = async () => {
            try {
                setAssignmentLoading(true)
                const data = await getAssignment(id)
                setAssignment(data)
                setAssignmentLoading(false)
                setAssignmentFiles(data.files)
            }
            catch (error) {
                setError(error)
            }

            setAssignmentLoading(false)
        }

        fetchAssignment()
    }, [id])

    const contextData = {
        assignment,
        assignmentFiles,
        assignmentLoading,
        getAssignment,
        createAssignment,
        updateAssignment,
        deleteAssignment,

        isEditing,
        setEditing, 
    

        updateAssignmentLocal,
        getAssignmentLocal,

        error,
        setError,
    }

    return (
        <AssignmentDetailContext.Provider value={contextData}>
            {children}
        </AssignmentDetailContext.Provider>
    )
}

export default AssignmentDetailContext

export const useAssignmentDetailContext = () => useContext(AssignmentDetailContext)
