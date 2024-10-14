import { useState } from "react"
import axios from "../utils/axios"

const useClassroomManager = (authTokens) => {
    const [ loading, setLoading ] = useState(true)
    const [ classroom , setClassroom ] = useState()
    const [ classrooms, setClassrooms ] = useState([])

    const createClassroom = async (data) => {
        console.log(authTokens)
        try {
            const response = await axios.post('api/classroom', data, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }

    const getClassroomList = async () => {

    }

    return {
        loading,
        classroom,
        classrooms,
        createClassroom,
        getClassroomList,
    }
}

export default useClassroomManager