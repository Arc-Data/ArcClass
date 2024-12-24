import { Link } from "react-router-dom"

const AssignmentItem = ({ assignment }) => {
    return (
        <Link to={`/assignments/${assignment.id}`} className='flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer group border-secondary-default hover:shadow'>
            <p>{assignment.title}</p>
        </Link>
    )
}

export default AssignmentItem