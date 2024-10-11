import { FaCalendar, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="">
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    `flex items-center gap-8 px-4 py-2 text-lg rounded-full hover:bg-primary-default hover:text-white ${
                        isActive ? 'bg-primary-600 text-white' : ''
                    }`
                }
            >
                <FaHome />
                <span>Home</span>
            </NavLink>
            <NavLink
                to="/calendar"
                className={({ isActive }) =>
                    `flex items-center gap-8 px-4 py-2 text-lg rounded-full hover:bg-primary-default hover:text-white ${
                        isActive ? 'bg-primary-600 text-white' : ''
                    }`
                }
            >
                <FaCalendar />
                <span>Calendar</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;
