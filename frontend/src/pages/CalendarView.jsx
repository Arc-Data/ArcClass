import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar"
import dayjs from "@/utils/dayjs"
import { useContext, useEffect, useMemo, useState } from "react"
import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { setDate } from "date-fns"

const localizer = dayjsLocalizer(dayjs)

const CalendarView = () => {
	const { authTokens } = useContext(AuthContext)
	const { getStudentAssignments } = useAssignmentManager(authTokens)
	const [ assignments, setAssignments] = useState([])
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState()

	const [ dateRange, setDateRange ] = useState({ start: null, end: null })

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


	const fetchData = async () => {
		try {
			const fetchAssignments = await getStudentAssignments(
				dateRange.start,
				dateRange.end
			)
			setAssignments(fetchAssignments)
		}
		catch (error) {
			console.log(error)
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const getCurrentMonthRange = () => {
        const startOfMonth = new Date();
        startOfMonth.setDate(1); 

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(startOfMonth.getMonth() + 1);
        endOfMonth.setDate(0); 

        return { start: startOfMonth, end: endOfMonth };
    };

	const handleRangeChange = (range) => {
		if (Array.isArray(range)) {
			setDateRange( { start: range[0], end: range[1]})
		} else {
			setDateRange({ start: range.start, end: range.end })
		}
	}

	useEffect(() => {
		const { start, end } = getCurrentMonthRange();
		setDateRange({ start, end })
	}, [])

	useEffect(() => {
		if (dateRange.start && dateRange.end) {
			fetchData()
		}
	}, [dateRange])

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
				onRangeChange={handleRangeChange}
				style={{ height: 700 }}/>
		</div>
	)
}

export default CalendarView