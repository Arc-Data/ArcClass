import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { Spinner } from "flowbite-react"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

const Classroom = () => {``
    const { id } = useParams()
    const { authTokens } = useContext(AuthContext)
    const { filteredList:classroom, loading, getClassroom } = useClassroomManager(authTokens)
    
    console.log(classroom)

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
            <div>{classroom.id}</div>
            <div>{classroom.subject}</div>
            <div>{classroom.section}</div>
            <div>{classroom.semesterStart}</div>
            <div>{classroom.semesterEnd}</div>
        </div>
    )
}

export default Classroom