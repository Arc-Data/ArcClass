import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"
import dayjs, { formatDateTime, getDeadline } from "@/utils/dayjs"
import { useEffect, useState } from "react"
import { BiAlarmExclamation } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { Button } from "../ui/button"
import AssignmentSkeleton from "../Skeleton/AssignmentSkeleton"
import { Calendar, Download, FileText, LayoutGrid, List, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card, CardContent } from "../ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { Badge } from "../ui/badge"
import { formatDate } from "date-fns"
import DisplayFiles from "../DisplayFiles"

const getStatusText = (status) => {
  switch (status) {
    case "submitted":
      return "Submitted";
    default:
      return "Unknown";
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "submitted":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}


const AssignmentSubmissions = () => {
  const { id } = useParams()
  const {
    assignment,
    assignmentLoading,
    submissions,
    getSubmissionsLocal,
  } = useAssignmentDetailContext()

  const [viewMode, setViewMode] = useState("table")
  const [selectedStudent, setSelectedStudent] = useState(null)

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
          <Card className="py-0">
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
                      <TableCell>
                        {sub.student.fullName}
                      </TableCell>

                      <TableCell>
                        {sub.materials && sub.materials.length > 0 ? "Submitted" : "Missing"}
                      </TableCell>
                      <TableCell>
                        {formatDateTime(dayjs(sub.submissionDate))}
                      </TableCell>
                      <TableCell>
                        {sub.grade > 0 ? sub.grade : "Ungraded"}
                      </TableCell>
                      <TableCell className="flex">
                        <Button size="sm" variant="outline" onClick={() => setSelectedStudent(sub)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-400">
                      No submissions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        )}
      <Sheet open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <SheetContent className="w-[600px] sm:max-w-[600px]">
          {selectedStudent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  {selectedStudent.student.fullName}'s Submission
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(selectedStudent.status)}>
                    {getStatusText(selectedStudent.status)}
                  </Badge>
                  {selectedStudent.grade && (
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.grade}/100</div>
                  )}
                </div>

                {selectedStudent.submissionDate && (
                  <Card className="rounded-sm shadow-none py-4">
                    <CardContent className="">
                      <div className="flex items-center space-x-2 py-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Submitted</p>
                          <p className="text-sm text-gray-600">
                            {formatDateTime(selectedStudent.submissionDate)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedStudent.materials && selectedStudent.materials.length > 0 && (
                  <Card>
                    <CardContent className="">
                      <h4 className="font-medium mb-3">Submitted Files</h4>
                      <div className="space-y-2">
                        {selectedStudent.materials.map((file) => (
                          <div key={file.id} className="flex items-center justify-between border rounded px-3 py-2 bg-gray-50">
                            <span className="truncate text-sm">{file.fileName}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-2"
                              asChild
                            >
                              <a>
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                <div className="flex items-center justify-between">
                  <Button variant="primary" className="flex-1">Grade Submission</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default AssignmentSubmissions