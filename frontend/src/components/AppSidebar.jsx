import { NavLink } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "./ui/sidebar"
import { FaHome } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa6"
import { useContext } from "react"
import { MdOutlineAssignment } from "react-icons/md";
import { Skeleton } from "./ui/skeleton"
import HomeContext from "@/context/HomeContext"
import AuthContext from "@/context/AuthContext"


const AppSidebar = () => {
    const { hasRole } = useContext(AuthContext)
    const { classrooms, loading, assignmentCount }  = useContext(HomeContext)

    const classroomLinks = classrooms && classrooms.map(classroom => {
        return (
            <NavLink 
                to={`/classroom/${classroom.id}`} 
                key={classroom.id} 
                className={({ isActive }) =>
                    `flex items-center gap-8 px-4 py-2 text-base rounded-full hover:bg-primary hover:text-white ${
                        isActive ? 'bg-primary-600 text-white' : ''
                    }`}>
                {classroom.subject}
            </NavLink>
        )
    })

    return (
        <Sidebar className="z-0">
            <SidebarHeader className="flex flex-col gap-0 py-12 font-body">
                <NavLink to="/home"
                    className={({ isActive }) =>
                        `flex items-center gap-8 px-4 py-2 text-md rounded-full hover:bg-primary hover:text-white ${
                            isActive ? 'bg-primary-600 text-white' : ''
                        }`}
                >
                    <FaHome/>
                    <span className="">Home</span>
                </NavLink>
                <NavLink to="/calendar"
                    className={({ isActive }) =>
                        `flex items-center gap-8 px-4 py-2 text-md rounded-full hover:bg-primary hover:text-white ${
                            isActive ? 'bg-primary-600 text-white' : ''
                        }`}
                >
                    <FaCalendar />
                    <div className="flex items-center flex-1">
                        <p>Calendar</p>
                    </div>
                </NavLink>
                {hasRole("Student") && 
                <NavLink to="/assignments"
                className={({ isActive }) =>
                        `flex items-center gap-8 px-4 py-2 text-md rounded-full hover:bg-primary hover:text-white ${
                            isActive ? 'bg-primary-600 text-white' : ''
                        }`}
                >
                    <MdOutlineAssignment />
                    <div className="flex items-center flex-1">
                        <p>Assignments</p>
                        {assignmentCount > 0 && 
                        <p className="grid w-5 h-5 ml-auto text-sm text-white rounded bg-primary place-items-center" variant="secondary">{assignmentCount}</p>
                        }
                    </div>
                </NavLink>
                }
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="font-body">
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