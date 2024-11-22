import { useEffect, useMemo, useState } from "react"
import { FaFile, FaFileDownload, FaFilePdf } from "react-icons/fa"
import { IoMdDownload } from "react-icons/io";



const mimeTypeToIcon = (mimeType) => {
    switch (mimeType) {
        case 'application/pdf':
            return (<FaFilePdf />)
        default:
            return (<FaFile />)
    }
}

const FileBlock = ({ file, handleClick }) => {
    const [ objectUrl, setObjectUrl ] = useState()

    useEffect(() => {
        const url = URL.createObjectURL(file.file)
        setObjectUrl(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [file.file])

    return (
        <div className="flex items-center w-full max-w-sm overflow-hidden bg-white rounded-lg shadow cursor-pointer" onClick={() => file.mimeType.startsWith("image") && handleClick(file)}>
            {file.mimeType.startsWith("image") ? (
            <div className="flex-shrink-0 w-20 h-20">
                <img
                src={objectUrl}
                alt={file.filename}
                className="object-cover w-full h-full"
                />
            </div>
            ) : (
            <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 bg-primary-default">
                {mimeTypeToIcon(file.mimeType)}
            </div>
            )}
            <div className="flex items-center justify-between flex-grow w-full p-4 ">
                <p className="text-sm font-medium text-gray-900">{file.filename}</p>
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