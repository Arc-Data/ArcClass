import dayjs, { formatDateTime } from "@/utils/dayjs"
import { Calendar, Download, FileText } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import { useState } from "react"

const getSubmissionStatus = (submission) => {
    if (!submission) return "Missing"
    if (submission.isGraded) return "Graded"
    return "Submitted"
}

const getSubmissionStatusColor = (submission) => {
    if (!submission) return "bg-red-100 text-red-800 border-red-200"
    if (submission.isGraded) return "bg-blue-100 text-blue-800 border-blue-200"
    return "bg-green-100 text-green-800 border-green-200"
}

const SubmissionSheet = ({ selectedStudent, onClose }) => {
    const [gradingMode, setGradingMode] = useState(false)
    const [grade, setGrade] = useState(selectedStudent?.submission?.grade || 0)

    return (
        <Sheet open={!!selectedStudent} onOpenChange={onClose}>
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
                                <Badge className={getSubmissionStatusColor(selectedStudent.submission)}>
                                    {getSubmissionStatus(selectedStudent.submission)}
                                </Badge>
                                {selectedStudent.submission?.isGraded && (
                                    <div className="text-2xl font-bold text-green-600">
                                        {selectedStudent.submission.grade}/100
                                    </div>
                                )}
                            </div>

                            {selectedStudent.submission?.submissionDate && (
                                <Card className="rounded-sm shadow-none py-4">
                                    <CardContent className="">
                                        <div className="flex items-center space-x-2 py-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-sm font-medium">Submitted</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatDateTime(dayjs(selectedStudent.submission.submissionDate))}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {selectedStudent.submission?.description && (
                                <Card>
                                    <CardContent className="">
                                        <h4 className="font-medium mb-3">Description</h4>
                                        <p className="text-sm text-gray-600">{selectedStudent.submission.description}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {selectedStudent.submission?.materials && selectedStudent.submission.materials.length > 0 && (
                                <Card>
                                    <CardContent className="">
                                        <h4 className="font-medium mb-3">Submitted Files</h4>
                                        <div className="space-y-2">
                                            {selectedStudent.submission.materials.map((file) => (
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

                            {!selectedStudent.submission && (
                                <Card>
                                    <CardContent className="text-center py-8">
                                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">No submission found for this student.</p>
                                    </CardContent>
                                </Card>
                            )}

                            <div className="flex items-center justify-between">
                                {selectedStudent.submission ? (
                                    <Button variant="primary" className="flex-1">Grade Submission</Button>
                                ) : (
                                    <Button variant="outline" className="flex-1" disabled>
                                        No Submission to Grade
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default SubmissionSheet