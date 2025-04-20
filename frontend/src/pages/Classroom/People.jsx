import Student404 from "@/components/errors/Student404"
import UserSkeleton from "@/components/Skeleton/UserSkeleton"
import AuthContext from "@/context/AuthContext"
import ClassroomContext from "@/context/ClassroomContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { useContext, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useParams } from "react-router-dom"

// TODO : Create User Avatar + Data Component

const People = () => {
    const { loading, classroom, participants, handleGetClassroomParticipants } = useContext(ClassroomContext)
    const { id } = useParams()
    const [ participantsLoading, setParticipantsLoading ] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (participants === undefined) {
                await handleGetClassroomParticipants()
            }
            setParticipantsLoading(false)
        }

        fetchData()
    }, [id, participants])

    if (loading) {
        return (<div></div>)
    }

    return (
        <div>
            <div className="w-full p-4 mx-auto">
                <p className="py-2 my-4 text-lg border-b">Teacher</p>
                {participantsLoading ? 
                <UserSkeleton/> 
                :
                <div className="flex items-center gap-4 mt-4">
                    <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary">
                        <FaUser size={16}/>
                    </div>
                    <div>
                        <p className="text-sm font-body">{classroom.teacher.fullName}</p>
                    </div>
                </div>
                }
                <p className="py-2 mt-8 mb-4 text-lg border-b">Students</p>
                {participantsLoading ?
                <div className="space-y-4">
                    <UserSkeleton/>  
                    <UserSkeleton/>  
                    <UserSkeleton/>  
                </div>
                :
                <div className="space-y-4">
                    {participants.students.length == 0
                    ?
                    <Student404/>
                    :
                    participants.students.map(student => {
                        return (
                            <div className="flex items-center gap-4 mt-4" key={student.id}>
                                <div className="grid w-10 h-10 overflow-hidden rounded-full place-items-center bg-primary">
                                    <FaUser size={16}/>
                                </div>
                                <div>
                                    <p className="text-sm font-body">{student.fullName}</p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                }

            </div>
        </div>
    )
}

export default People