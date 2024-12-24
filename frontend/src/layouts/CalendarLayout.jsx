import { NavLink, Outlet } from "react-router-dom"

const CalendarLayout = () => {
    return (
        <div className="space-y-4">
            <div className="flex gap-4 border-b-2 *:p-2">
                <NavLink to="" className="border-b-2 border-primary-default">To Do</NavLink>
                <NavLink to="view" className="border-b-2 border-primary-default">Calendar</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default CalendarLayout