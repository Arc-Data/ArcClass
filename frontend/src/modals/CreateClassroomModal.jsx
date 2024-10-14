import { useContext, useState } from "react"
import Modal from "../components/Modal"
import useClassroomManager from "../hooks/useClassroomManager"
import AuthContext from "../context/AuthContext"
import { Spinner } from "flowbite-react"

const CreateClassroomModal = ({ closeModal }) => {
    const { authTokens } = useContext(AuthContext)
    const { createClassroom } = useClassroomManager(authTokens)
    const [ loading, setLoading ] = useState(false)

    const [ formData, setFormData] = useState({
        name: '',
        semesterStart: null,
        semesterEnd: null,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData( prev => ({
            ...prev,
            [name] : value    
        }))
    }   

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        console.log(formData)

        try {
            await createClassroom(formData);
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Modal onClick={closeModal} >
            <h2 className="mt-12 text-xl font-medium md:mt-4">Create Class</h2>
            <form className="w-full max-w-lg py-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900">Class Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-[360px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="Doe" required />
                    {/* {errors?.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>} */}
                </div>
                {loading ?
                <div className="text-center">
                    <Spinner/>
                </div>  
                :
                <button type="submit" disabled={loading} className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Create Classroom</button>
                }
            </form>
        </Modal>
    )
}

export default CreateClassroomModal