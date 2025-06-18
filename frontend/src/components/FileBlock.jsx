import { Button } from "@/components/ui/button";
import mimeTypeToIcon from "@/utils/mimeTypeToIcon";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

const FileBlock = ({ file, handleClick, isEditing, onDelete }) => {
    const [ objectUrl, setObjectUrl ] = useState()

    useEffect(() => {
        const url = URL.createObjectURL(file.file)
        setObjectUrl(url)
        return () => {
            URL.revokeObjectURL(url)
        }
    }, [file.file])

    return (
        <div className={`flex items-center w-full  bg-background-100 dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer relative`}>
            {file.mimeType.startsWith("image") ? (
            <div className="shrink-0 w-20 h-20 overflow-hidden" onClick={() => handleClick(file)}>
                <img
                src={objectUrl}
                alt={file.filename}
                className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg"
                />
            </div>
            ) : (
            <div className="flex items-center justify-center shrink-0 w-20 h-20 bg-primary">
                {mimeTypeToIcon(file.mimeType)}
            </div>
            )}
            <div className="flex items-center justify-between grow w-full p-4 relative">
                {isEditing &&
                <Button
                    variant="destructive"
                    className="absolute -top-5 right-2 h-8 w-8 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(file.id);
                    }}
                >
                    <X className="w-4 h-4 text-white" />
                </Button>
                }
                <p className="text-sm font-medium text-text">{file.filename}</p>
                {!file.mimeType.startsWith("image") && 
                <div className="p-2 rounded-full group hover:bg-background-400">
                    <IoMdDownload className="group-hover:text-white" onClick={() => handleClick(file)}/>
                </div>
                }
            </div>
        </div>
    )
}

export default FileBlock