import ClassSkeleton from "@/components/Skeleton/ClassSkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import HomeContext from "@/context/HomeContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import JoinClassroomModal from "@/modals/JoinClassroomModal"
import { useContext, useEffect, useState } from "react"
import { FaImage } from "react-icons/fa"
import { Link } from "react-router-dom"

// TODO : No classrooms

const Home = () => {
    const { role } = useContext(AuthContext)
    const { filteredList: classrooms, loading, handleFilterClassroomList, searchQuery } = useContext(HomeContext)

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

    const classCards = () => classrooms && classrooms.map(classroom => {
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
                {loading ? 
                <ClassSkeleton count={5}/>
                :
                <div className="mt-8 grid gap-4  grid-cols-[repeat(auto-fill,300px)]">
                    {classCards()}
                </div>
                }
        </div>
    )
}

export default Home