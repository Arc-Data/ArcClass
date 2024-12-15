import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { MdNavigateNext } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import { useActionState } from "react";

const SignUp = () => {
    const { registerUser } = useContext(AuthContext)
    const [ formStep, setFormStep ] = useState(0)
    const [ accountType, setAccountType ] = useState("")
    const [ errors, submitAction, loading ] = useActionState(registerUser, null)
    
    const handleAccountChange = (value) => {
        setAccountType(value)
        setFormStep(1)
    }

    return (
        <div>
            <div className={`${formStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} transition-opacity duration-300 transform`}>
                {formStep === 0 && (
                    <div className="px-6 py-4 space-y-4"> 
                        <h2 className="mt-12 text-xl font-medium text-center md:mt-4">Are you a...</h2>
                        <div>
                            <label
                                htmlFor="student"
                                className="flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600"
                                onClick={() => handleAccountChange("student")}
                            >
                                <span>Student</span>
                                <MdNavigateNext />
                            </label>
                            </div>
                        <div>
                            <label
                                htmlFor="teacher"
                                className="flex items-center justify-between w-full p-5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 peer-checked:border-blue-600 peer-checked:text-blue-600"
                                onClick={() => handleAccountChange("teacher")}
                            >
                                <span>Teacher</span>
                                <MdNavigateNext />
                            </label>
                        </div>
                        <p className="mt-8">Already have an account? <span><Link to="/signin" className="text-primary-default">Login</Link></span></p>
                        </div>
                )}
            </div>
    
            <div className={`${formStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} transition-opacity duration-300 transform`}>
                {formStep === 1 && (
                    <form action={submitAction} className="px-6 py-4 space-y-4">
                        <button type="button" onClick={() => setFormStep(0)} className="flex items-center gap-2">
                            <FaArrowLeft/>
                            <span>Back</span>
                        </button>
                        <p className="text-xl font-heading">Create {accountType} Account</p>
                        {errors?.general && <p className="text-red-500">{errors?.general}</p>}
                        <input 
                            type="hidden" 
                            name="account"
                            value={accountType || ""}/>
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                            <input 
                                type="text" 
                                id="first_name" 
                                name="firstName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                            {errors?.FirstName && 
                            errors.FirstName.map(error => (
                                <ul>
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                </ul>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                            <input 
                                type="text" 
                                id="last_name" 
                                name="lastName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
                            {errors?.LastName && 
                            errors.LastName.map(error => (
                                <ul>
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                </ul>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                            <input 
                                type="text" 
                                id="middle_name" 
                                name="middleName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Optional" />
                            {errors?.MiddleName && 
                            errors.MiddleName.map(error => (
                                <ul>
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                </ul>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="example@domain.com" required />
                            {errors?.Email && 
                            errors.Email.map(error => (
                                <ul>
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                </ul>
                            ))}
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••" required />
                            {errors?.Password && 
                            errors.Password.map(error => (
                                <ul>
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                </ul>
                            ))}
                        </div>

                        {loading ? 
                        <div className="text-center">
                            <Spinner/>
                        </div>
                        :
                        <button type="submit" disabled={loading} className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Register</button>
                        }
                        <p>Already have an account? <span><Link to="/signin" className="text-primary-default">Login</Link></span></p>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SignUp;
