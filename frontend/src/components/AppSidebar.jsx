import { Link, NavLink } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "./ui/sidebar"
import { FaHome } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa6"
import { useContext, useEffect, useState } from "react"
import ClassroomContext from "@/context/ClassroomContext"

const SIDEBAR_STATE_KEY = "sidebarOpen"

const AppSidebar = () => {
    const { classrooms }  = useContext(ClassroomContext)
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== "undefined") {
          const savedState = localStorage.getItem(SIDEBAR_STATE_KEY)
          return savedState ? JSON.parse(savedState) : true
        }
        return true
      })

      useEffect(() => {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(sidebarOpen))
      }, [sidebarOpen])
    

    const classroomLinks = classrooms && classrooms.map(classroom => {
        return (
            <NavLink 
                to={`/classroom/${classroom.id}`} 
                key={classroom.id} 
                className={({ isActive }) =>
                    `flex items-center gap-8 px-4 py-2 text-base rounded-full hover:bg-primary-default hover:text-white ${
                        isActive ? 'bg-primary-600 text-white' : ''
                    }`}>
                {classroom.subject}
            </NavLink>
        )
    })

    return (
        <Sidebar defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
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
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Classroom</SidebarGroupLabel>
                    <SidebarGroupContent>
                    {classroomLinks}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar