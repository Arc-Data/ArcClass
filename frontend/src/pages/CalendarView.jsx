import { Calendar, dayjsLocalizer, momentLocalizer } from "react-big-calendar"
import dayjs from "@/utils/dayjs"
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = dayjsLocalizer(dayjs)

const CalendarView = () => {
	return (
		<div>
			<Calendar
				localizer={localizer}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}/>
		</div>
	)
}

export default CalendarView