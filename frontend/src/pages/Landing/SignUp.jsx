import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const SignUp = () => {
    const { registerUser } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        registerUser(formData)
    }

    return (
        <form className="px-6 py-4 space-y-4" onSubmit={handleSubmit}>
            <p className="font-heading text-2xl">Create Account</p>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="johndoe@gmail.com" required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your password here" required />
            </div>
            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input 
                    type="text" 
                    id="first_name" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
            </div>
            <div>
                <label htmlFor="midle_name" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                <input 
                    type="text" 
                    id="middle_name" 
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
            </div>
            <div>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                <input 
                    type="text" 
                    id="last_name" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
            </div>
            <button type="submit" className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Register</button>
            <p>Already have an account? <span><Link to="/signin" className="text-primary-default">Login</Link></span></p>
        </form>
    )
}

export default SignUp;