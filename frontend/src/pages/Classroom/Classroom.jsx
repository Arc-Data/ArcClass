import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { Spinner } from "flowbite-react"
import { useContext, useEffect } from "react"
import { FaGear } from "react-icons/fa6"
import { useParams } from "react-router-dom"

/* TODO : Share classroom link. Join Classroom
Specify settings for how others can join classroom
*/

const Classroom = () => {``
    const { id } = useParams()
    const { authTokens } = useContext(AuthContext)
    const { classroom, loading, getClassroom } = useClassroomManager(authTokens)
    
    useEffect(() => {
        const fetchData = async () => {
            await getClassroom(id)
        }

        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="grid w-full h-full place-items-center">
                <Spinner />
            </div>
        )
    }

    // {
    //     "id": "OMFOU3",
    //     "subject": "Programming 1",
    //     "section": "BSIT 4-1N",
    //     "semesterStart": "2024-10-16T02:10:48.8453487",
    //     "semesterEnd": null,
    //     "teacher": {
    //         "id": "6b395212-5bca-4fcb-9ec1-badfda52b7b7",
    //         "fullName": "Teacher1 Teacher"
    //     }
    // }

    return (
        <div>
            <div className="flex p-2 border-b ">
                <div className="p-4 ml-auto rounded-full cursor-pointer hover:bg-gray-200">
                    <FaGear size={16}/>
                </div>
            </div>
            <div className="px-8 py-4">
            <div className="relative overflow-hidden rounded-lg h-60">
                <img
                    src="/banner1.jpg"
                    alt=""
                    className="absolute inset-0 z-10 object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-end bg-black text-primary-default bg-opacity-30 ">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold">{classroom.subject}</h2>
                        <p className="mt-2">{classroom.section}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Classroom