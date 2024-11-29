import { useEffect, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"
import { FaFileUpload, FaTimes, FaUser } from "react-icons/fa"
import { Button } from "./ui/button"

// TODO : File Format Restrictions

const PostInput = ({ onSubmitPost, placeholder }) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const [ files, setFiles ] = useState([])
    const fileInputRef = useRef(null)
    const textAreaRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)
        const content = formData.get('content')
        onSubmitPost(content, files)

        setIsEditing(false)
        setFiles([])
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)])
        }
    }

    const removeFile = (fileToRemove) => {
        setFiles(files.filter(file => fike !== fileToRemove ))
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    useEffect(() => {
        if (isEditing && textAreaRef.current) {
          textAreaRef.current.focus()
        }
      }, [isEditing])

    return (
        <div className="flex w-full gap-4 px-8 py-4 cursor-pointer hover:bg-gray-200">
            <div className="grid flex-shrink-0 w-10 h-10 border rounded-full bg-background-default place-items-center">
                <FaUser size={18} />
            </div>
            {isEditing ? 
            <form onSubmit={handleSubmit} className="flex-1">
                <Textarea ref={textAreaRef} name="content" className="text-base" />
                {files.length > 0 && (
                <div className="p-2 border-t bg-gray-50">
                  {files.map((file, index) => (
                    <div key={index} className="inline-flex items-center gap-1 px-2 py-1 mb-2 mr-2 text-sm bg-gray-200 rounded">
                        <span className="max-w-[150px] truncate">{file.name}</span>
                        <button 
                            type="button" 
                            onClick={() => removeFile(file)}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label={`Remove ${file.name}`}
                        >
                            <FaTimes size={12} />
                        </button>
                        </div>
                    ))}
                    </div>
                )}
                <div className="flex justify-between gap-2 mt-4">
                    <div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            aria-label="Upload files"/>
                        <Button 
                            type="button"
                            variant="outline"
                            onClick={openFileDialog}>
                            <FaFileUpload className="mr-2"/>
                            Add Files
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 border rounded-md bg-background-100 opacity-80 hover:opacity-100 hover:shadow" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button type="submit" className="px-5 py-2 border rounded-md bg-primary-default opacity-80 hover:opacity-100 hover:shadow">Submit</button>
                    </div>
                </div>
            </form>
            :
            <input 
                type="text" 
                className={
                    `w-full self-center h-8 px-5 py-4 border border-gray-200 rounded-full cursor-text
                    ${isEditing ? 'hidden' : 'block'}
                    `
                } 
                onClick={() => setIsEditing(true)}
                placeholder={placeholder} />
            }
        </div>
    )
}

export default PostInput