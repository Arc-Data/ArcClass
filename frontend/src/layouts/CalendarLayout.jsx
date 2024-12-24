import CalendarContext from "@/context/CalendarContext"
import { use, useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"

const CalendarLayout = () => {
    const { } = useContext(CalendarContext)

    return (
        <div className="space-y-4">
            <div className="flex gap-4 border-b-2 *:p-2">
                <NavLink 
                    to="" 
                    end
                    className={({ isActive }) =>
                        `border-b-4 border-transparent py-2 px-4 ${
                            isActive ? ' border-b-4 border-b-accent-default' : 'hover:border-b-gray-200'
                        }`
                    }>To Do</NavLink>
                <NavLink 
                    to="view" 
                    className={({ isActive }) =>
                        `border-b-4 border-transparent py-2 px-4 ${
                            isActive ? ' border-b-4 border-b-accent-default' : 'hover:border-b-gray-200'
                        }`
                    }>Calendar</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default CalendarLayout