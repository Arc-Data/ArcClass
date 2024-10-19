import { useContext, useState } from "react"
import useClassroomManager from "../hooks/useClassroomManager"
import AuthContext from "../context/AuthContext"
import { Datepicker, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "flowbite-react"
import { FaCalendar, FaPlus, FaTimes } from "react-icons/fa"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn  } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

/* TODO : Move to using ShadCN

*/

const CreateClassroomModal = ({}) => {
    const [ openModal, setOpenModal ] = useState(false)
    const { authTokens, user } = useContext(AuthContext)
    const { createClassroom } = useClassroomManager(authTokens)
    const [ loading, setLoading ] = useState(false)

    const navigate = useNavigate()

    const [ formData, setFormData] = useState({
        subject: '',
        section: '',
        semesterStart: null,
        semesterEnd: null,
    })
    const [ errors, setErrors ] = useState()
    const today = new Date()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData( prev => ({
            ...prev,
            [name] : value    
        }))
    }
    
    const clearDate = (field) => {
        setFormData(prev => ({
          ...prev,
          [field]: null,
          ...(field === 'semesterStart' ? { semesterEnd: null } : {})
        }))
      }
    

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (formData.semesterStart == null) {
            setFormData(prev => ({
                ...prev, semesterEnd: null
            }))
        } 
        console.log(formData)


        try {
            const classroomId = await createClassroom(formData)
            setOpenModal(false)
            navigate(`/classroom/${classroomId}`)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
        <div className="p-3 rounded-full cursor-pointer bg-background-100" onClick={() => setOpenModal(prev => !prev)}> 
            <FaPlus />
        </div>
        <Modal dismissible show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
            <form onSubmit={handleSubmit}>
            <ModalBody className="pb-20 space-y-2">
                <h2 className="my-4 text-lg font-heading md:mt-4">Create Class</h2>
                <div className="w-full">
                    <label htmlFor="subject" className="block mb-2 text-sm text-gray-900 font-body">Subject Name</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full font-body bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                        placeholder="Subject Name" 
                        required />
                </div>
                <div className="w-full">
                    <label htmlFor="section" className="block mb-2 text-sm text-gray-900 font-body">Class Name</label>
                    <input 
                        type="text" 
                        id="section" 
                        name="section"
                        value={formData.section}
                        onChange={handleInputChange}
                        className="w-full font-body bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                        placeholder="Section Name"
                        required />
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm text-gray-900 font-body">Semester Start</label>
                        <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "justify-start text-left font-normal w-full pr-8",
                                !formData.semesterStart && "text-muted-foreground"
                                )}
                            >
                                <FaCalendar className="w-4 h-4 mr-2" />
                                {formData.semesterStart ? format(formData.semesterStart, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.semesterStart}
                                onSelect={(date) => setFormData(prev => ({...prev, semesterStart: date}))}
                                initialFocus
                                disabled={(date) => date < today}
                            />
                            </PopoverContent>
                        </Popover>
                        {formData.semesterStart && (
                            <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-full"
                            onClick={() => clearDate('semesterStart')}
                            >
                            <FaTimes className="w-4 h-4" />
                            </Button>
                        )}
                        </div>
                    </div>
                    {formData.semesterStart && (
                        <div>
                        <label className="block mb-2 text-sm text-gray-900 font-body">Semester End</label>
                        <div className="relative">
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal pr-8",
                                    !formData.semesterEnd && "text-muted-foreground"
                                )}
                                >
                                <FaCalendar className="w-4 h-4 mr-2" />
                                {formData.semesterEnd ? format(formData.semesterEnd, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={formData.semesterEnd}
                                onSelect={(date) => setFormData(prev => ({...prev, semesterEnd: date}))}
                                initialFocus
                                disabled={(date) => date < today || date <= formData.semesterStart}
                                />
                            </PopoverContent>
                            </Popover>
                            {formData.semesterEnd && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-0 right-0 h-full"
                                onClick={() => clearDate('semesterEnd')}
                            >
                                <FaTimes className="w-4 h-4" />
                            </Button>
                            )}
                        </div>
                        </div>
                    )}
                    </div>
            </ModalBody>
            <ModalFooter>
                {loading ?
                <div className="text-center">
                    <Spinner/>
                </div>  
                :
                <button type="submit" disabled={loading} className="w-full text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">Create Classroom</button>
                }
                
            </ModalFooter>
            </form>
        </Modal>
        </>
    )
}

export default CreateClassroomModal