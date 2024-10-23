import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { Spinner } from "flowbite-react"
import { useContext, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { FaRightFromBracket } from "react-icons/fa6"
import { useLocation, useNavigate } from "react-router-dom"

/* 
// [ ] - Classroom Settings : Set Passwords, Lock Group Members
// [ ] - Classroom does not exist
*/


const JoinClassroomModal = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ code, setCode ] = useState("")
    const [ step, setStep ] = useState(0)
    const { authTokens } = useContext(AuthContext)
    const { handleJoinClassroom } = useContext(ClassroomContext)
    const { classroom, checkClassroom } = useClassroomManager(authTokens)
    const [ loading, setLoading ] = useState(false)
    const [ errors, setErrors ] = useState()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const pathParts = location.pathname.split('/')
        const classroomCode = pathParts[2]

        const joinShortcut = async () => {
            setLoading(true);
            await handleStep1(classroomCode);
        }

        if (pathParts.length === 4 && pathParts[1] === 'classroom' && pathParts[3] === 'join') {
            setCode(classroomCode)
            setIsOpen(true)
            joinShortcut()
        }
    }, [location]);

    const handleStep1 = async (shortCutCode) => {
        setLoading(true)
        
        try {
            const isExisting = await checkClassroom(shortCutCode ?? code);
            if (isExisting) navigate(`/classroom/${shortCutCode ?? code}`)
            setStep(1)
        }
        catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
        finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        setStep(0)
        setCode("")
    };


    /* NOTE : This handle submit function looks disorganized and inconsistent

    */
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors()

        if (step == 0) {
            handleStep1()
        }
        else if (step == 1)
        {
            try {
                const id = await handleJoinClassroom(code)
                navigate(`/classroom/${id}`)
            }
            catch (error) {
                setErrors(error)
            }
            setLoading(false)
        }
        
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <div onClick={() => setIsOpen(prev => !prev)} className="flex items-center gap-2 p-4 text-sm rounded-full bg-primary-default hover:bg-gray-200">
                <span className="whitespace-nowrap">Join Classroom</span>
                <FaRightFromBracket size={16}/>
            </div>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                {step == 0 && 
                <>
                <DialogHeader>
                    <DialogTitle>Join Classroom</DialogTitle>
                    <DialogDescription>
                        Enter classroom code below 
                    </DialogDescription>
                </DialogHeader>
                <div className="relative my-4">
                    {loading ? 
                    <div className="text-center">
                        <Spinner />
                    </div>
                    : 
                    <input
                    id="id"
                    type="text"
                    className=" text-center text-xl font-bold block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-500 uppercase"
                    minLength={6}
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
                    }
                    {errors && <p className="mt-4 text-sm text-center text-red-700">{errors}</p>}
                </div>
                </>
                }

                {step == 1 && 
                <>
                <DialogHeader>
                    <DialogTitle>Join Classroom</DialogTitle>
                    <DialogDescription className="flex justify-between">
                        <span>{classroom.subject}</span>
                        <span>{classroom.studentCount} students</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-4 mt-4">
                    <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary-default">
                        <FaUser size={20}/>
                    </div>
                    <div>
                        <p className="text-sm font-body">{classroom.teacher.fullName}</p>
                        <p className="text-sm font-body">{classroom.section}</p>
                    </div>
                </div>
                </>
                }
                
                <DialogFooter className="mt-8">
                {!loading && 
                <button type="submit" className="gap-2 px-8 py-4 text-sm text-center rounded-2xl bg-primary-default hover:bg-gray-200" disabled={loading}>
                    Next
                </button>
                }
                </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default JoinClassroomModal