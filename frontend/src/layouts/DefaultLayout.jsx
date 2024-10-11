import { Outlet } from "react-router-dom"
import UserNav from "../components/UserNav"
import Sidebar from "../components/Sidebar"

const DefaultLayout = () => {
  return (
    <div>
        <UserNav/>
        <div className="grid grid-cols-[280px_1fr] py-16 min-h-screen h-full">
            <Sidebar />
            <div className="p-4 border-l">
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default DefaultLayout