import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const { authTokens } = useContext(AuthContext)
    const { classrooms, loading, getClassroomList } = useClassroomManager(authTokens)
    
    // [
    //     {
    //         "id": "CT8ZA3",
    //         "subject": "Semester",
    //         "section": "Something",
    //         "semesterStart": "2024-10-23T16:00:00",
    //         "semesterEnd": null,
    //         "teacher": {
    //             "id": "6b395212-5bca-4fcb-9ec1-badfda52b7b7",
    //             "fullName": "Teacher1 Teacher"
    //         }
    //     },
    //     {
    //         "id": "OKHAHO",
    //         "subject": "English For I Dunno",
    //         "section": "BSIT 4-1N",
    //         "semesterStart": "2024-10-16T16:00:00",
    //         "semesterEnd": null,
    //         "teacher": {
    //             "id": "6b395212-5bca-4fcb-9ec1-badfda52b7b7",
    //             "fullName": "Teacher1 Teacher"
    //         }
    //     },
    // ]

    const classCards = classrooms && classrooms.map(classroom => {
        return (
            <Link to={`/classroom/${classroom.id}`} className="flex flex-col shadow">
                <img src="/banner1.jpg" alt="" className="object-cover h-40 rounded-t-lg" />
                <div className="p-4">
                    <p className="font-heading">{classroom.subject}</p>
                    <div>{classroom.section}</div>
                </div>
            </Link>
        )
    })

    useEffect(() => {
        const fetchData = async () => {
            await getClassroomList()
        }
        
        fetchData()
    }, [])
    
    return (
        <div className="w-full">
            <h1>Recent</h1>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {classCards}
            </div>
        </div>
    )
}

export default Home