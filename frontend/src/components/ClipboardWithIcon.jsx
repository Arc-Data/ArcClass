import { useState } from "react"
import { FaClipboard, FaClipboardCheck } from "react-icons/fa"

const ClipboardWithIcon = ({ valueToCopy }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(valueToCopy)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <button 
            onClick={handleCopy} 
            className="absolute right-2 top-2 p-1 cursor-pointer rounded hover:bg-gray-200"
        >
            {copied ? <FaClipboardCheck className="text-accent" /> : <FaClipboard />}
        </button>
    )
}

export default ClipboardWithIcon
