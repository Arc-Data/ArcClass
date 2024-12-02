import { Button } from "@/components/ui/button"
import DisplayFiles from "@/components/DisplayFiles"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"

const AssignmentDetail = () => {
    const { authTokens } = useContext(AuthContext)
    const [ loading, setLoading ] = useState(true)
    const [ assignment, setAssignment ] = useState()
    const { assignmentId } = useParams()
    const { getAssignment } = useAssignmentManager(authTokens)
    const navigate = useNavigate()

    const [ erorrs, setErrors ] = useState([])

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchAssignmentData = async () => {
            try {
                const fetchAssignment = await getAssignment(assignmentId)
                setAssignment(fetchAssignment)
            }
            catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchAssignmentData()
    }, [assignmentId])

    if (loading) {
        return (
            <div className="w-full px-4 py-12">
                <Skeleton className="w-[400px] h-10 bg-gray-400"/>
            </div>
        )
    }

    return (
        <div className="w-full px-4 py-12">
            <Button onClick={handleBack} variant="outline" className="mb-4">
                <FaArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
            <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
            <p className="mt-4">{assignment.description}</p>
            <div className="mt-20">
                <DisplayFiles materials={assignment.files}/>
            </div>
        </div>
    )
}

export default AssignmentDetail