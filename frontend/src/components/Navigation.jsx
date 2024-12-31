import { useContext } from "react"
import { SidebarTrigger } from "./ui/sidebar"
import AuthContext from "@/context/AuthContext"
import { Link } from "react-router-dom"
import CreateClassroomModal from "@/modals/CreateClassroomModal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { FaUser } from "react-icons/fa"
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6"

const Navigation = () => {
    const { user, role, logoutUser } = useContext(AuthContext)
    return (
        <div className="w-full border-b bg-background-default" >
            <div className="flex items-center gap-4 py-2.5 w-full mx-auto px-2">
                <SidebarTrigger />
                <Link to="/" className="text-2xl font-heading">ArcClass</Link>
                <div className="flex items-center gap-8 ml-auto mr-4">
                    {role === "Teacher"
                    &&
                    <CreateClassroomModal/>
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                            <FaUser size={16}/>
                        </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[240px]">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <div className="flex items-center gap-2 p-2.5">
                            <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary-default">
                            <FaUser size={18}/>
                            </div>
                            <div className="truncate text-ellipsis font-body">
                            <p className="text-sm font-thin">{user.given_name} {user.family_name}</p>
                            <p className="text-sm font-thin">{user.email}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator/>
                        <div className="*:px-2.5 *:w-full">
                            <button className="mt-4 flex gap-4 items-center font-medium py-2.5 outline-none hover:bg-primary-default" >
                                <FaGear/>
                                <span>Settings</span>
                            </button>
                            <button className="flex gap-4 items-center font-medium py-2.5 outline-none hover:bg-primary-default" onClick={logoutUser}>
                                <FaArrowRightFromBracket/>
                                <span>Logout</span>
                            </button>
                        </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default Navigation