import { CheckCircle, Users } from 'lucide-react'

const TeacherAssignmentStatus = ({ assignment }) => {
  // Assume assignment.submissionCount and assignment.classroom.studentCount are available
  const total = assignment.classroom?.studentCount ?? 0
  const submitted = assignment.submissionCount ?? 0
  const allSubmitted = total > 0 && submitted === total

  return (
    <div className={`ml-auto flex items-center gap-2 px-4 border py-2 mb-2 rounded-sm 
      ${allSubmitted ? 'border-green-500 text-green-700 bg-green-50' : 'border-gray-300 text-gray-700'}`}>
      {allSubmitted && <CheckCircle className="w-4 h-4 text-green-500" />}
      <Users className="w-4 h-4" />
      <span className="font-semibold">
        {submitted}/{total} <span className="hidden md:inline">students submitted</span>
      </span>
    </div>
  )
}

export default TeacherAssignmentStatus