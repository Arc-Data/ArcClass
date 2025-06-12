import AssignmentItem from "../AssignmentItem"
import dayjs from "@/utils/dayjs"

const AssignmentGroup = ({ assignments = [] }) => {
	const group = {}

	assignments.forEach(assignment => {
		const dateKey = dayjs.utc(assignment.submissionDate).local().format('MMM DD YYYY')
		group[dateKey] ||= []
		group[dateKey].push(assignment)
	})

	return (
		<div className="space-y-6">
		{Object.keys(group)
			.sort((a, b) => dayjs(b).diff(dayjs(a)))
			.map((dateKey) => (
			<div key={dateKey}>
				<p className="my-4 text-lg font-medium">{dateKey}</p>
				<div className="space-y-2">
				{group[dateKey].map((assignment) => (
					<AssignmentItem key={assignment.id} assignment={assignment} />
				))}
				</div>
			</div>
			))}
		</div>
	)
}

export default AssignmentGroup