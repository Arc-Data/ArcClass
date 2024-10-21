import { NavLink } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar"
import { FaHome } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa6"

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className="flex flex-col gap-0 py-12">
                    <NavLink to="/home"
                        className={({ isActive }) =>
                            `flex items-center gap-8 px-4 py-2 text-md rounded-full hover:bg-primary-default hover:text-white ${
                                isActive ? 'bg-primary-600 text-white' : ''
                            }`}
                    >
                        <FaHome/>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/calendar"
                        className={({ isActive }) =>
                            `flex items-center gap-8 px-4 py-2 text-md rounded-full hover:bg-primary-default hover:text-white ${
                                isActive ? 'bg-primary-600 text-white' : ''
                            }`}
                    >
                        <FaCalendar />
                        <span>Calendar</span>
                    </NavLink>
                </SidebarHeader>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar