import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"
import AuthContext from "@/context/AuthContext"
import useMaterialManager from "@/hooks/useMaterialManager"
import dayjs from "dayjs"
import { Pencil, Plus, Save, Upload, X } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import DisplayFiles from "../DisplayFiles"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import SubmissionCreator from "./SubmissionCreator"

const AssignmentSubmission = () => {
    const { id } = useParams()
    const {
        assignment,     
        submission,
        submissionLoading,
        getSubmissionLocal,
        createSubmissionLocal,
        updateSubmissionDescriptionLocal,

    } = useAssignmentDetailContext()

    const { authTokens } = useContext(AuthContext)
    const { 
        attachSubmissionFiles, 
    } = useMaterialManager(authTokens)

    const fileRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [editData, setEditData] = useState({
        description: ''
    })

    const isSubmitted = assignment?.submissionStatus === "Submitted"

    useEffect(() => {
        if (!submission && !submissionLoading && isSubmitted) {
            console.log("Fetching submission data")
            getSubmissionLocal(id)
        }
    }, [id, isSubmitted])

    useEffect(() => {
        if (submission) {
            setEditData({
                description: submission.description || ''
            })
        }
    }, [submission])

    // Handle submission creation from SubmissionCreator
    const handleSubmissionCreate = async (submissionData) => {
        try {
            setUploading(true)
            
            const newSubmission = await createSubmissionLocal(submissionData)
            console.log('Submission created:', newSubmission)
            
        } catch (error) {
            console.error('Error creating submission:', error)
            alert(`Error creating submission: ${error.message}`)
        } finally {
            setUploading(false)
        }
    }

    const handleFilesChange = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        setUploading(true)
        try {
            console.log(submission)
            await attachSubmissionFiles(submission.id, files)
            await getSubmissionLocal(id)
        } catch (error) {
            console.error('Error uploading files:', error)
            alert(`Error uploading files: ${error.message}`)
        } finally {
            setUploading(false)
            e.target.value = null
        }
    }

    const handleSave = async () => {
        try {
            await updateSubmissionDescriptionLocal(submission.id, editData.description)
            setIsEditing(false)
        } catch (error) {
            console.error('Error saving description:', error)
            alert(`Error saving: ${error.message}`)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        if (submission) {
            setEditData({
                description: submission.description || ''
            })
        }
    }

    console.log(submission)
    // Show submission creation UI if not submitted
    if (!isSubmitted) {
        return (
            <SubmissionCreator 
                onSubmit={handleSubmissionCreate}
                uploading={uploading}
            />
        )
    }

    if (submissionLoading) {
        return <div>Loading submission...</div>
    }

    if (!submission) {
        return (
            <div className="border py-4 px-6 w-full rounded-lg">
                <p className="text-red-600">Error: Could not load submission data. Please refresh the page.</p>
                <Button onClick={() => getSubmissionLocal(id)} className="mt-2">
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
    

            {/* Edit Controls */}
            <div className="flex justify-end">
                {!isEditing ? (
                    <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(true)} 
                        className="flex items-center gap-2"
                        disabled={uploading}
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Submission
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            onClick={handleCancel} 
                            className="flex items-center gap-2"
                            disabled={uploading}
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSave}
                            variant="primary" 
                            className="flex items-center gap-2"
                            disabled={uploading}
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {/* Upload Indicator */}
            {uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800">
                        <Upload className="w-4 h-4 animate-pulse" />
                        <span className="font-medium">Uploading files...</span>
                    </div>
                </div>
            )}

            {/* Editing Mode Banner */}
            {isEditing && !uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800">
                        <Pencil className="w-4 h-4" />
                        <span className="font-medium">Editing Mode</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                        Make your changes and click "Save Changes" to update your submission.
                    </p>
                </div>
            )}

            {/* Submission Info */}
            <div className="border py-4 px-6 w-full rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold font-heading">My Submission</p>
                    <span className="text-sm text-gray-500">
                        Submitted on: {dayjs(submission.submissionDate).format("MMM DD YYYY - HH:mm:ss")}
                    </span>
                </div>
                
                <div className="mb-4">
                    <h4 className="font-medium mb-2">Description:</h4>
                    {!isEditing ? (
                        <p className="text-gray-700">{submission.description || 'No description provided'}</p>
                    ) : (
                        <Textarea
                            value={editData.description}
                            onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Add a description for your submission..."
                            className="min-h-24"
                        />
                    )}
                </div>
                
                {submission.grade > 0 && (
                    <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Grade: {submission.grade}
                        </span>
                    </div>
                )}
            </div>

            {/* Files Section */}
            <div className="border py-4 px-6 w-full rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xl font-bold font-heading">Submitted Files</p>
                    {isEditing && (
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => fileRef.current?.click()} 
                            className="flex items-center gap-2"
                            disabled={uploading}
                        >
                            <Plus className="w-4 h-4" />
                            Add Files
                        </Button>
                    )}
                </div>
                
                <input 
                    type="file" 
                    ref={fileRef}
                    accept=".pdf,.doc,.docx,.txt,.zip,.rar,.png,.jpg,.jpeg"
                    multiple
                    className="hidden"
                    onChange={handleFilesChange}
                    disabled={uploading}
                />

                {submission.materials && submission.materials.length > 0 ? (
                    <DisplayFiles 
                        materials={submission.materials}
                        isEditing={isEditing}
                        getAssignmentLocal={() => getSubmissionLocal(id)}
                    />
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {isEditing ? (
                            <div>
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p>No files yet. Click "Add Files" to upload.</p>
                            </div>
                        ) : (
                            <p>No files submitted</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AssignmentSubmission