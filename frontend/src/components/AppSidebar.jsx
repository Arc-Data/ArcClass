import { Link, NavLink } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "./ui/sidebar"
import { FaHome } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa6"
import { useContext, useEffect, useState } from "react"
import ClassroomContext from "@/context/ClassroomContext"
import { Skeleton } from "./ui/skeleton"


const AppSidebar = () => {
    const { classrooms, loading }  = useContext(ClassroomContext)

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
        <Sidebar >
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
                    {loading ?
                    <div className="px-2 space-y-6">
                        <div className="space-y-2">
                            <Skeleton className="w-full h-3 bg-gray-400"/>
                            <Skeleton className="w-2/3 h-3 bg-gray-400"/>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="w-full h-3 bg-gray-400"/>
                            <Skeleton className="w-2/3 h-3 bg-gray-400"/>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="w-full h-3 bg-gray-400"/>
                            <Skeleton className="w-2/3 h-3 bg-gray-400"/>
                        </div>
                    </div>
                    :
                    <SidebarGroupContent>
                    {classroomLinks}
                    </SidebarGroupContent>
                    }
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="h-20"/>
        </Sidebar>
    )
}

export default AppSidebar