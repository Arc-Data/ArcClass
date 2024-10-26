import { useEffect, useRef, useState } from "react"
import { Textarea } from "./ui/textarea"
import { FaUser } from "react-icons/fa"

const PostInput = ({ onSubmitPost, placeholder }) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const textAreaRef = useRef()

    const handleSubmit = async (e) => {
        onSubmitPost(e);
        setIsEditing(false)
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
                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-5 py-2 border rounded-md bg-background-100 opacity-80 hover:opacity-100 hover:shadow" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="px-5 py-2 border rounded-md bg-primary-default opacity-80 hover:opacity-100 hover:shadow">Submit</button>
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