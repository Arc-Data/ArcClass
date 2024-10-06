import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="grid gap-2 p-2 overflow-y-hidden md:h-screen md:grid-cols-5">
            <div className="col-span-2 p-6 border-2 border-gray-200 rounded md:p-20 md:block bg-background-default">
                <Link to="/" className="text-2xl font-heading">ArcClass</Link>
                <h1 className="mt-12 text-3xl text-transparent font-heading bg-clip-text bg-gradient-to-r from-black to-primary-default">
                    Interactive, Intuitive and Engaging Learning Experience. 
                </h1>
                <p className="mt-4 text-lg md:max-w-60">Connect students and teacher needs in this wonderful platform.</p>
            </div>
            <div className="grid col-span-3 rounded bg-primary-default md:place-items-center">
                <div className="w-full rounded md:w-2/3 bg-background-default">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout