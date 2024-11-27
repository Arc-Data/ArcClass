import mimeTypeToIcon from "@/utils/mimeTypeToIcon"
import { FaMinus } from "react-icons/fa"

const FileEntry = ({ file, handleClick }) => {
    return (
        <div className="flex items-center gap-4 p-2 bg-white border rounded-lg shadow-lg border-accent-default">
            <div className="p-2 rounded-full shadow-lg cursor-pointer" onClick={handleClick}>
                <FaMinus className="text-red-500"/>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-primary-default">
                    {mimeTypeToIcon(file.type)}
                </div>
                <p className="text-base text-center font-body">{file.name}</p>
            </div>
        </div>
    )
}

export default FileEntry