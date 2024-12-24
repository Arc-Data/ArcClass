import AssignmentItem from "@/components/AssignmentItem"
import CalendarContext from "@/context/CalendarContext"
import { useContext } from "react"
import dayjs from "@/utils/dayjs"

const CalendarList = () => {
    const { assignmentsGroup } = useContext(CalendarContext)

    console.log(assignmentsGroup)

    return (
        <div className="space-y-6">
            {assignmentsGroup && Object.keys(assignmentsGroup)
                .sort((a, b) => dayjs(b).diff(dayjs(a)))
                .map(dateKey =>
                (
                    <div key={dateKey} className="">
                        <p className="my-4 text-lg font-medium">{dateKey}</p>
                        <div className="space-y-2">
                            {assignmentsGroup[dateKey].map(assignment => <div>Hello</div> )}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default CalendarList