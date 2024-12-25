import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar"
import dayjs from "@/utils/dayjs"
import { useContext, useEffect, useMemo, useState } from "react"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"

const localizer = dayjsLocalizer(dayjs)

const CalendarView = () => {
	const { authTokens } = useContext(AuthContext)
	const { getStudentAssignments } = useAssignmentManager(authTokens)
	const [ assignments, setAssignments] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState()

	const events = useMemo(() => {
		if (assignments.length > 0) {
			return assignments.map((assignment) => ({
				title: assignment.title,
				start: new Date(assignment.submissionDate), // Ensure this is a valid Date object
				end: new Date(assignment.submissionDate),   // Ensure this is a valid Date object
				allDay: true,
			}));
		}
		return [];
	}, [assignments]) 

	console.log(events)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchAssignments = await getStudentAssignments()
				setAssignments(fetchAssignments)
			}
			catch (error) {
				console.log(error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	console.log(assignments)

	if (loading) {
		return (<div>Loading...</div>)
	}

	if (error) {
		return (<div>An error occured</div>)
	}

	return (
		<div>
			<Calendar
				localizer={localizer}
				startAccessor="start"
				endAccessor="end"
				events={events}
				style={{ height: 700 }}/>
		</div>
	)
}

export default CalendarView