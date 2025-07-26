import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"
import { getDeadline } from "@/utils/dayjs"
import { useEffect, useState } from "react"
import { BiAlarmExclamation } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { Button } from "../ui/button"
import AssignmentSkeleton from "../Skeleton/AssignmentSkeleton"
import { LayoutGrid, List, Search } from "lucide-react"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card } from "../ui/card"

const AssignmentSubmissions = () => {
  const { id } = useParams()
  const { 
    assignment,
    assignmentLoading,
    submissions,
    getSubmissionsLocal,
  } = useAssignmentDetailContext()

  const [ viewMode, setViewMode ] = useState("table")

  useEffect(() => {
    getSubmissionsLocal(id)
  }, [id])

  console.log(submissions)

  return (
    <div>
      <div className="flex gap-8 py-4">
        <div className="flex-1 space-y-4">
          {!assignmentLoading ? (
          <div className="flex gap-4 md:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold font-heading">{assignment.title}</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-base">
                <BiAlarmExclamation className="mr-2" />
                Deadline: {getDeadline(assignment.submissionDate)}
              </Button>
            </div>
          </div>
          )
          :
          <AssignmentSkeleton />
          }
        </div>
      </div>
      <div className="flex items-center justify-between mb-4 gap-5">
        <div className="relative flex items-center gap-2 mx-auto w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
              type="search" 
              // value={searchQuery}
              // onChange={handleFilterClassroomList}
              placeholder="Search Students"
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg bg-background"
          />
        </div>
        <div className="flex border rounded-lg p-1 bg-gray-50">
          <Button
            variant={viewMode === "cards" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="h-8"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

      </div>
      {viewMode === "cards" ? (
        <div></div>
      ) : 
      (
        <Card className="px-5 my-10">
          <Table className="text-md">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions && submissions.length > 0 ? (
                submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <td className="py-3">
                      {/* Replace with actual student name if available */}
                      {sub.studentId}
                    </td>
                    <td>
                      {sub.materials && sub.materials.length > 0 ? "Submitted" : "Missing"}
                    </td>
                    <td>
                      {/* If you have a submission date, show it here */}
                      {/* Example: {sub.submissionDate ? new Date(sub.submissionDate).toLocaleString() : "—"} */}
                      —
                    </td>
                    
                    <td>
                      {sub.grade > 0 ? sub.grade : "Ungraded"}
                    </td>
                    <td>
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    No submissions found.
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}

export default AssignmentSubmissions