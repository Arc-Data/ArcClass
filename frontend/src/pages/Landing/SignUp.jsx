import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { MdNavigateNext } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "flowbite-react";


/* RECHECK : Login Form Errors
** Reassure that all form errors are accounted for 
** Rethink other possible ways of telling the users they are wrong
* Consider font sizing 
*/

const SignUp = () => {
    const { registerUser } = useContext(AuthContext)
    const [ formStep, setFormStep ] = useState(0)
    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
        account: '',
    })
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
        setErrors()

        if (name === "account") setFormStep(1);
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            await registerUser(formData)
        }
        catch (error)
        {
            console.log(error)
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
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className={`${formStep === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'} transition-opacity duration-300 transform`}>
                {formStep === 0 && (
                    <div className="px-6 py-4"> 
                        <h2 className="mt-12 text-xl font-medium text-center md:mt-4">Are you a...</h2>
                        <ul className="mt-8 space-y-4">
                            <li>
                                <input type="radio" name="account" value="Student" id="student" className="hidden peer" onChange={handleChange}/>
                                <label htmlFor="student" className="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-background-100 hover:bg-primary-default">
                                    <div>Student</div>
                                    <MdNavigateNext/>
                                </label>
                            </li>
                            <li>
                                <input type="radio" name="account" value="Teacher" id="teacher" className="hidden peer" onChange={handleChange}/>
                                <label htmlFor="teacher" className="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-background-100 hover:bg-primary-default">
                                    <div>Teacher</div>
                                    <MdNavigateNext/>
                                </label>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
    
            <div className={`${formStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} transition-opacity duration-300 transform`}>
                {formStep === 1 && (
                    <form className="px-6 py-4 space-y-4" onSubmit={handleSubmit}>
                        <button type="button" onClick={() => setFormStep(0)} className="flex items-center gap-2">
                            <FaArrowLeft/>
                            <span>Back</span>
                        </button>
                        <p className="text-xl font-heading">Create {formData.account} Account</p>
                        {errors?.general && <p className="text-red-500">{errors?.general}</p>}
                        
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
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                            <input 
                                type="text" 
                                id="last_name" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Doe" required />
                            {errors?.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                        </div>

                        <div>
                            <label htmlFor="middle_name" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                            <input 
                                type="text" 
                                id="middle_name" 
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Optional" />
                            {errors?.middleName && <p className="mt-2 text-sm text-red-600">{errors.middleName}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="example@domain.com" required />
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••" required />
                            {errors?.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
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
