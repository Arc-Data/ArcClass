import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { Spinner } from "flowbite-react"
import { useContext, useState } from "react"
import { FaRightFromBracket } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

const JoinClassroomModal = () => {
    const [ code, setCode ] = useState("")
    const { authTokens } = useContext(AuthContext)
    const { joinClassroom } = useClassroomManager(authTokens)
    const [ loading, setLoading ] = useState(false)
    const [ errors, setErrors ] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const id = await joinClassroom(code);
            navigate(`/classroom/${id}`)
        }
        catch (error) {
            console.log(error)
            setErrors(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
            <button className="flex items-center gap-2 p-4 text-sm rounded-full bg-primary-default hover:bg-gray-200">
                <span className="whitespace-nowrap">Join Classroom</span>
                <FaRightFromBracket size={16}/>
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                <DialogHeader>
                    <DialogTitle>Join Classroom</DialogTitle>
                    <DialogDescription>
                        Enter classroom code below 
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <input
                        id="id"
                        type="text"
                        className=" text-center text-xl font-bold block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-500 uppercase"
                        minLength={6}
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <DialogFooter>
                <button type="submit" className="gap-2 px-8 py-4 text-sm text-center rounded-2xl bg-primary-default hover:bg-gray-200" disabled={loading}>
                    {loading ? <Spinner /> : <span className="whitespace-nowrap">Next</span>}
                </button>
                </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default JoinClassroomModal