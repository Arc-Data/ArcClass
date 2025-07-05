import { useAuth } from "@/context/AuthContext"
import useMaterialManager from "@/hooks/useMaterialManager"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FileBlock from "./FileBlock"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"

const DisplayFiles = ({ materials, isEditing, getAssignmentLocal }) => {
    const { id } = useParams()
    const [files, setFiles] = useState([])
    const [maximizeImage, setMaximizeImage] = useState(false)
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(true)
    
    const { authTokens } = useAuth()
    const { getMaterials, deleteMaterial } = useMaterialManager(authTokens)

    const handleDeleteFile = async (materialId) => {
        try {
            await deleteMaterial(id, materialId)
            getAssignmentLocal(id)
        } catch (error) {
            console.error("Error deleting file:", error)
        }
    }

    const handleClick = (file) => {
        if (file.mimeType === "image/png" || file.mimeType === "image/jpeg" || file.mimeType === "image/gif") {
            setImage(file)
            setMaximizeImage(prev => !prev)
        } else {
            const blobUrl = URL.createObjectURL(file.file)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = file.filename
            link.click()
            URL.createObjectURL(blobUrl)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            // Early return if no materials
            if (!materials || materials.length === 0) {
                setFiles([])
                setLoading(false)
                return
            }

            setLoading(true)
            try {
                const fetchedFiles = await getMaterials(materials)
                
                // Filter out null values (deleted files)
                const validFiles = fetchedFiles.filter(file => file !== null && file !== undefined)
                setFiles(validFiles)
            } catch (error) {
                console.log("Error fetching materials:", error)
                setFiles([]) // Set empty array on error
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [materials])

    if (loading) return <div>Loading files...</div>

    // Show empty state if no valid files
    if (!files || files.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No files available</p>
            </div>
        )
    }

    return (
        <div className="grid w-full gap-4 md:grid-cols-2">
            {files.map(file => (
                <FileBlock 
                    file={file} 
                    handleClick={handleClick} 
                    key={file.id} 
                    isEditing={isEditing} 
                    onDelete={() => handleDeleteFile(file.id)}
                />
            ))}
            
            {image && (
                <Dialog open={maximizeImage} onOpenChange={setMaximizeImage} className="overflow-hidden">
                    <DialogContent className="sm:max-w-[80vh] bg-black md:max-w-[60vw] p-4 m-0">
                        <VisuallyHidden asChild>
                            <DialogHeader>
                                <DialogTitle/>
                                <DialogDescription/>
                            </DialogHeader>
                        </VisuallyHidden>
                        <div className="h-full max-h-[80vh]">
                            <img
                                src={URL.createObjectURL(image.file)}
                                alt={image.filename}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}

export default DisplayFiles