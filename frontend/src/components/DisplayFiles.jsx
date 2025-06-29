import { useAuth } from "@/context/AuthContext"
import useMaterialManager from "@/hooks/useMaterialManager"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FileBlock from "./FileBlock"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"

const DisplayFiles = ({ materials, isEditing }) => {
	const { id } = useParams()
    const [ files, setFiles ] = useState([])
	const [ maximizeImage, setMaximizeImage ] = useState(false)
	const [ image, setImage ] = useState()
	
	const {
		getAssignmentLocal,
	} = useAssignmentDetailContext()

    const [ loading, setLoading ] = useState(true)
    const { authTokens } = useAuth()
    
	const { 
		getMaterials, 
		deleteMaterial,
	} = useMaterialManager(authTokens)

	const handleDeleteFile = async (materialId) => {
		try {
			await deleteMaterial(id, materialId)
			getAssignmentLocal(id)
			
		} catch (error) {
			console.error("Error deleting file:", error)
		}
	}

    const handleClick = (file) => {
		console.log(file)
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
            setLoading(true)
            try {
                const fetchedFiles = await getMaterials(materials)
				setFiles(fetchedFiles)
            }
            catch (error) {
				console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [materials])

	if (loading) return (<div></div>)

    return (
		// If user is editing, show delete button
        <div className="grid w-full gap-4 md:grid-cols-2">
            {files.map(file => <FileBlock file={file} handleClick={handleClick} key={file.id} isEditing={isEditing} onDelete={() => handleDeleteFile(file.id)}/>)}
			{image && 
			<Dialog open={maximizeImage} onOpenChange={setMaximizeImage} className="overflow-hidden ">
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
			}
        </div>
    )
}

export default DisplayFiles