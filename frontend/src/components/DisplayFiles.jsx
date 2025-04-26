import AuthContext from "@/context/AuthContext"
import useFileManager from "@/hooks/useFileManager"
import { useContext, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./ui/dialog"
import FileBlock from "./FileBlock"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const DisplayFiles = ({ materials }) => {
    const [ files, setFiles ] = useState([])
	const [ maximizeImage, setMaximizeImage ] = useState(false)
	const [ image, setImage ] = useState()

    const [ loading, setLoading ] = useState(true)
    const { authTokens } = useContext(AuthContext)
    const { getFiles } = useFileManager(authTokens)

    const handleClick = (file) => {
		if (file.mimeType === "image/png") {
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

	console.log("Surely this triggers")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const fetchedFiles = await getFiles(materials)
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
    }, [])

	if (loading) return (<div></div>)

    return (
        <div className="grid w-full gap-4 md:grid-cols-2">
            {files.map(file => <FileBlock file={file} handleClick={handleClick} key={file.id}/>)}
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