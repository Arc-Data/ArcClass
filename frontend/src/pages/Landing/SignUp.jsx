import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


/* NOTE: 
** Reassure that all form errors are accounted for 
** Rethink other possible ways of telling the users they are wrong
* Consider font sizing 
*/

const SignUp = () => {
    const { registerUser } = useContext(AuthContext)
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
    })
    const [ errors, setErrors ] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))

        setErrors()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(formData)
        }
        catch (error)
        {
            if (error.response && error.response.data) {
                const responseErrors = error.response.data
                const newErrors = {};

                if (responseErrors.Email) {
                    newErrors.email = responseErrors.Email[0]; 
                }
                if (responseErrors.Password) {
                    newErrors.password = responseErrors.Password[0];
                }
                if (responseErrors.FirstName) {
                    newErrors.firstName = responseErrors.FirstName[0];
                }
                if (responseErrors.LastName) {
                    newErrors.lastName = responseErrors.LastName[0];
                }
                if (responseErrors.MiddleName) {
                    newErrors.middleName = responseErrors.MiddleName[0];
                }

                setErrors(newErrors);
            }
        }
    }

    return (
        <form className="px-6 py-4 space-y-4" onSubmit={handleSubmit}>
            <p className="text-2xl font-heading">Create Account</p>
            {errors?.general && <p className="text-red-500">{errors?.general}</p>} {/* General error message */}


            <div>
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input 
                    type="text" 
                    id="first_name" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
                    {errors?.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
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
                {errors?.middleName && <p className="mt-2 text-sm text-red-600">{errors.middleName}</p>} 
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
                {errors?.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>} 
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="johndoe@gmail.com" required />
                 {errors?.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>} 
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
                    {errors?.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>} 
            </div>
            <button type="submit" className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Register</button>
            <p>Already have an account? <span><Link to="/signin" className="text-primary-default">Login</Link></span></p>
        </form>
    )
}

export default SignUp;