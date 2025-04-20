import { Link } from "react-router-dom"

const AssignmentItem = ({ assignment }) => {
    return (
        <Link to={`/assignments/${assignment.id}`} className='flex items-center justify-between p-4 border rounded-lg shadow-xs cursor-pointer group border-secondary hover:shadow-sm'>
            <p>{assignment.title}</p>
        </Link>
    )
}

export default AssignmentItem