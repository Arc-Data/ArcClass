import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="grid h-screen gap-2 p-2 overflow-y-hidden md:grid-cols-5">
            <div className="hidden col-span-2 border-2 border-gray-200 rounded md:block bg-background-default"></div>
            <div className="grid col-span-3 rounded bg-primary-default md:place-items-center">
                <div className="w-full rounded md:w-2/3 bg-background-default">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout