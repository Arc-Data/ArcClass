import { Button } from "@/components/ui/button"
import DisplayFiles from "@/components/DisplayFiles"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useRef, useState } from "react"
import { FaArrowLeft, FaUserGroup } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"
import PostInput from "@/components/PostInput"

const AssignmentDetail = () => {
    const { authTokens } = useContext(AuthContext)
    const [ loading, setLoading ] = useState(true)
    const [ assignment, setAssignment ] = useState()
    const [ comments, setComments ] = useState(() => assignment ? assignment.comments : [])
    const { assignmentId } = useParams()
    const { getAssignment } = useAssignmentManager(authTokens)
    
    const [ erorrs, setErrors ] = useState([])

    const fileRef = useRef(null)
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    const handleFileChange = () => {
        
    }

    const openFileDialog = () => {
        fileRef.current?.click()
    }

    console.log(assignment)

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
        <div className="grid w-full grid-cols-1 gap-4 px-4 py-4 md:grid-cols-3">
            <div className="col-span-2">
                <Button onClick={handleBack} variant="outline" className="mb-4 ">
                    <FaArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
                <p className="mt-4">{assignment.description}</p>
                <div className="mt-20">
                    <DisplayFiles materials={assignment.files}/>
                </div>
                <div className="col-span-2 py-8 mt-40 space-y-4 border-t">
                    {comments.length > 2 && 
                    <div className="flex items-center gap-2 p-2">  <FaUserGroup /> Comments</div>
                    }
                    <PostInput placeholder={"Add a comment"}/>
                </div>
            </div>
            <div className="md:col-span-1">
                <div className="sticky p-8 bg-white border rounded-lg shadow-sm top-4">
                    <h2 className="text-lg font-bold font-heading">
                    Your submissions
                    </h2>
                    <p>You have no assignment submissions yet</p>
                    <input 
                        type="file" 
                        multiple
                        ref={fileRef}
                        onChange={handleFileChange}
                        className="hidden" 
                    />
                    <button 
                        className="w-full p-2 mt-8 transition-colors border rounded hover:bg-primary-default hover:text-white"
                        onClick={openFileDialog}
                        >
                        Submit files
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default AssignmentDetail