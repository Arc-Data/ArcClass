import { FaFilePdf, FaFile, FaFileWord, FaFileExcel } from "react-icons/fa"

const mimeTypeToIcon = (mimeType) => {
    switch (mimeType) {
        case 'application/pdf':
            return (<FaFilePdf />)
        case 'application/msword':
            return <FaFileWord />;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // .xlsx
        case 'application/vnd.ms-excel':
            return <FaFileExcel />;
        default:
            return (<FaFile />)
    }
}

export default mimeTypeToIcon