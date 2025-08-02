import { useAssignmentDetailContext } from "@/context/AssignmentDetailContext"
import dayjs, { formatDateTime, getDeadline } from "@/utils/dayjs"
import { useEffect, useState } from "react"
import { BiAlarmExclamation } from "react-icons/bi"
import { useParams } from "react-router-dom"
import { Button } from "../ui/button"
import AssignmentSkeleton from "../Skeleton/AssignmentSkeleton"
import { LayoutGrid, List, Paperclip, Search, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import SubmissionSheet from "./SubmissionSheet"
import { useAuth } from "@/context/AuthContext"
import useSubmissionManager from "@/hooks/useSubmissionManager"

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
	const { authTokens } = useAuth()
	const { gradeSubmission } = useSubmissionManager(authTokens)
	console.log(assignment)
	useEffect(() => {
		getSubmissionsLocal(id)
	}, [id])

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
			) : (
				<Card className="py-0">
					<Table className="text-md">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[250px]">Student</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Date of Submission</TableHead>
								<TableHead>Files</TableHead>
								<TableHead>Grade</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{submissions && submissions.length > 0 ? (
								submissions.map((sub) => (
									<TableRow key={sub.student.id}>
										<TableCell>
											<div className="flex items-center">
												<User className="inline-block mr-2 h-5 w-5 text-gray-500" />
												<p>{sub.student.fullName}</p>
											</div>
										</TableCell>
										<TableCell>
											<Badge className={getSubmissionStatusColor(sub.submission)}>
												{getSubmissionStatus(sub.submission)}
											</Badge>
										</TableCell>
										<TableCell>
											{sub.submission ? formatDateTime(dayjs(sub.submission.submissionDate)) : ""}
										</TableCell>
										<TableCell className="">
											{sub.submission ? sub.submission.materials.length : 0} <Paperclip className="inline-block ml-1 h-4 w-4" />
										</TableCell>
										<TableCell>
											{sub.submission ? sub.submission.isGraded ? sub.submission.grade : "Ungraded" : ""}
										</TableCell>
										<TableCell className="flex">
											<Button size="sm" variant="outline" onClick={() => setSelectedStudent(sub)}>
												View
											</Button>
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
			{!assignmentLoading && 
			<SubmissionSheet
				selectedStudent={selectedStudent}
				gradeSubmission={gradeSubmission}
				maxGrade={assignment.maxGrade}
				onClose={() => setSelectedStudent(null)}
			/>
			}
		</div>
	)
}

export default AssignmentSubmissions