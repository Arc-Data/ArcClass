import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import JoinClassroomModal from "@/modals/JoinClassroomModal"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

/* COMMENT : To use a context
Would it be actually better to wrap all of this in a context.
Considering
1. It is highly unlikely for a person to have more than 50 classrooms
2. Saves time to fetch the database, then why not just do it in login
*/

/* TODO : Loading Skeleton for classroom skeleton
Low priority but after designing the basic ideas should be good
*/

const Home = () => {
    const { authTokens, role } = useContext(AuthContext)
    const { filteredList: classrooms, loading, getClassroomList, handleFilterClassroomList, searchQuery } = useClassroomManager(authTokens)

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
            <Link key={classroom.id} to={`/classroom/${classroom.id}`} className="flex flex-col shadow">
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
            <search className="flex items-center max-w-4xl gap-2 mx-auto">
                <input 
                    type="search" 
                    value={searchQuery}
                    onChange={handleFilterClassroomList}
                    placeholder="Search Class Name"
                    className="w-full text-sm border border-gray-300 rounded-lg bg-gray-50"/>
                {role.includes("Student") && <JoinClassroomModal/>}
            </search>
            <div className="mt-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                {classCards}
            </div>
        </div>
    )
}

export default Home