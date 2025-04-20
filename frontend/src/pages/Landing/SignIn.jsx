import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import { useActionState } from "react"

// TODO: Spinner update
const SignIn = () => {
    const { loginUser } = useContext(AuthContext)
    const [error, submitAction, loading] = useActionState(loginUser, null)

    return (
        <form className="px-6 py-4 space-y-4" action={submitAction}>
            <p className="text-2xl font-extrabold">Login</p>
            {error && <p className="text-red-500">{error}</p>}

            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="johndoe@gmail.com" />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    placeholder="Password"/>
            </div>
            {loading ? 
            <div className="text-center">
                {/* <Spinner/> */}
            </div>
            :
            <button type="submit" disabled={loading} className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Login</button>
            }
            <p className="mt-8">Don't have an account? <span><Link to="/signup" className="text-primary-default">Register</Link></span></p>
        </form>
    )
}

export default SignIn