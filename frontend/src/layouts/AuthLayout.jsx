import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="grid md:grid-cols-2 h-screen overflow-y-hidden p-2 gap-2">
            <div className="hidden md:block rounded bg-background-default border-gray-200 border-2"></div>
            <div className="bg-primary-default rounded grid place-items-center">
                <div className="bg-background-default w-4/5 md:w-2/3 rounded">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout