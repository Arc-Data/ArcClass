import { CheckCircle, Clock, XCircle, Star } from 'lucide-react'

const StudentAssignmentStatus = ({ assignment }) => {
  // Determine if late
  const now = new Date()
  const due = new Date(assignment.submissionDate)
  const isLate = assignment.submissionStatus !== "Not Submitted" && now > due

  let status = assignment.submissionStatus
  let color = "border-gray-300 text-gray-700"
  let icon = <Clock className="w-4 h-4 mr-2" />
  let label = "Not Submitted"

  if (status === "Graded") {
    color = "border-green-500 text-green-700 bg-green-50"
    icon = <Star className="w-4 h-4 mr-2 text-green-500" />
    label = "Graded"
  } 
  else if (status === "Submitted") {
    color = "border-blue-500 text-blue-700 bg-blue-50"
    icon = <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
    label = "Submitted"
  }

  return (
    <div className={`ml-auto px-4 border py-2 mb-2 rounded-sm flex items-center gap-2 ${color}`}>
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
  )
}

export default StudentAssignmentStatus