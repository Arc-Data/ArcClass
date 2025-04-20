import { useRef, useState } from "react"

const SubmissionSection = () => {
    const [ files, setFiles ] = useState([])
    const fileRef = useRef(null)

    const handleFileChange = () => {
        
    }

    const openFileDialog = () => {
        fileRef.current?.click()
    }

    return (
        <div className="md:col-span-1">
            <div className="sticky p-8 bg-white border rounded-lg shadow-xs top-4">
                <h2 className="text-lg font-bold font-heading">
                Your submissions
                </h2>
                { files.Length == 0 ? 
                <p>You have no assignment submissions yet</p>
                :
                <div>
                    
                </div>
                }
                <input 
                    type="file" 
                    multiple
                    ref={fileRef}
                    onChange={handleFileChange}
                    className="hidden" 
                />
                <button 
                    className="w-full p-2 mt-8 transition-colors border rounded hover:bg-primary hover:text-white"
                    onClick={openFileDialog}
                    >
                    Submit files
                </button>
            </div>
        </div>
    )
}

export default SubmissionSection