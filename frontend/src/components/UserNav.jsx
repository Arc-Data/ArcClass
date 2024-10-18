import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Link } from "react-router-dom"
import { FaPlus, FaUser } from "react-icons/fa";
import { HR, Modal, Popover } from "flowbite-react";
import customPopoverTheme from "./FlowbiteCustom/CustomPopoverTheme";
import { FaArrowRightFromBracket, FaGear } from "react-icons/fa6";
import CreateClassroomModal from "../modals/CreateClassroomModal";

/* TODO: Create a Toggle Sidebar 
Optionally a mobile menu option similar to anilist 
*/


const UserNav = () => {
    const { logoutUser, role, user } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)

    const PopoverContent = () => {
        return (
            <div className="flex flex-col  bg-background-default w-[240px] border *:p-2.5">
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer">
                        <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary-default">
                            <FaUser size={18}/>
                        </div>
                    </div>
                    <div className="truncate text-ellipsis">
                        <p className="text-sm font-thin">{user.given_name} {user.family_name}</p>
                        <p className="text-sm font-thin">{user.email}</p>
                    </div>
                </div>
                <button className="mt-4 flex gap-4 items-center font-medium py-2.5 outline-none hover:bg-primary-default" >
                    <FaGear/>
                    <span>Settings</span>
                </button>
                <button className="flex gap-4 items-center font-medium py-2.5 outline-none hover:bg-primary-default" onClick={logoutUser}>
                    <FaArrowRightFromBracket/>
                    <span>Logout</span>
                </button>
            </div>
        )
    }
    
    return (
        <div className="fixed top-0 w-full border-b bg-background-default">
            <div className="flex items-center py-2.5 w-full max-w-7xl mx-auto px-2">
                <Link to="/" className="text-2xl font-heading">ArcClass</Link>

                <div className="flex items-center gap-8 ml-auto">
                    {role === "Teacher"
                    &&
                    <CreateClassroomModal/>
                    }
                    <Popover theme={customPopoverTheme} content={<PopoverContent/>} placement="bottom" arrow={false} trigger="hover" className="bg-background-default">
                        <div className="cursor-pointer">
                            <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary-default">
                                <FaUser size={18}/>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
            {openModal && 
            <CreateClassroomModal show={openModal} onClose={() => setOpenModal(false)}/>
            }
        </div>
    )
}

export default UserNav