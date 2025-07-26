import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useAuth } from "./AuthContext"
import { createContext, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useSubmissionManager from "@/hooks/useSubmissionManager"

const AssignmentDetailContext = createContext()

export const AssignmentDetailProvider = ({ children }) => {
    const { id } = useParams()
    const { user, authTokens } = useAuth()
    const [ assignment, setAssignment ] = useState()
    const [ assignmentFiles, setAssignmentFiles ] = useState([]) 
    const [ assignmentLoading, setAssignmentLoading ] = useState(true)
    const [ error, setError ] = useState()

    const [ submission, setSubmission ] = useState()
    const [ submissions, setSubmissions ] = useState([])
    const [ submissionLoading, setSubmissionLoading ] = useState(true)

    const {
        getAssignment,
        createAssignment,
        updateAssignment,
        deleteAssignment,
    } = useAssignmentManager(authTokens)

    const { 
        getSubmission, 
        getSubmissions,
        createSubmission,
        updateSubmissionDescription,
    } = useSubmissionManager(authTokens)

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

    const getSubmissionLocal = async () => {
        try {
            console.log("Getting local")
            setSubmissionLoading(true)
            const response = await getSubmission(id)
            setSubmission(response)
        }
        catch (error) {
            console.log(error)
        } 

        setSubmissionLoading(false)
    }

    const getSubmissionsLocal = async () => {
        try {
            setSubmissionLoading(true)
            console.log("This is running")
            const response = await getSubmissions(id)
            console.log(response)
            setSubmissions(response)
        }  
        catch (error) {
            console.log(error)
        }   

        setSubmissionLoading(false)
    }

    const createSubmissionLocal = async (submissionData) => {
        try {
            setSubmissionLoading(true)
            const response = await createSubmission(id, submissionData)
            setSubmission(response)

            const updatedAssignment = await getAssignmentLocal()
            setAssignment(updatedAssignment)
        }
        catch (error) {
            console.log(error)
        }

        setSubmissionLoading(false)
    }

    const updateSubmissionDescriptionLocal = async (submissionId, description) => {
        try {
            await updateSubmissionDescription(submissionId, description)
            // Refresh submission data
            await getSubmissionLocal(id)
        } catch (error) {
            console.log("Error updating submission description:", error)
            throw error
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
                
                // ADD THIS: Auto-fetch submission if assignment is submitted
                if (data.submissionStatus === "Submitted") {
                    console.log("Assignment is submitted, fetching submission...")
                    await getSubmissionLocal()
                }
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

        submission,
        submissions,
        submissionLoading,

        updateAssignmentLocal,
        getAssignmentLocal,
        createSubmissionLocal,
        updateSubmissionDescriptionLocal,

        getSubmissionLocal,
        getSubmissionsLocal,

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
