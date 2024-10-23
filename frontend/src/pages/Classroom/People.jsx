import AuthContext from "@/context/AuthContext"
import useClassroomManager from "@/hooks/useClassroomManager"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const People = () => {
    const { authTokens } = useContext(AuthContext)
    const { getClassroomParticipants, loading } = useClassroomManager(authTokens)
    const [ participants, setParticipants ] = useState() 
    const [ errors, setErrors ] = useState()
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getClassroomParticipants(id)
                console.log(response)
            }
            catch (error) {
                setErrors(error.response)
            }
        }

        fetchData()
    }, [])

    return (
        <div>People</div>
    )
}

export default People