import { Link } from "react-router-dom"

const SignIn = () => {
    return (
        <form className="px-6 py-4 space-y-4">
            <p className="font-heading text-2xl">Login</p>
            <div>
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="johndoe@gmail.com" required />
            </div>
            <div>
                <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Password" required />
            </div>
            <button type="button" className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Login</button>
            <p>Don't have an account? <span><Link to="/signup" className="text-primary-default">Register</Link></span></p>
        </form>
    )
}

export default SignIn