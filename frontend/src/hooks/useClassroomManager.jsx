import { useState } from "react"
import axios from "../utils/axios"

const useClassroomManager = (authTokens) => {
    const [ loading, setLoading ] = useState(true)
    const [ classroom , setClassroom ] = useState()
    const [ classrooms, setClassrooms ] = useState([])

    const createClassroom = async (data) => {
        try {
            const response = await axios.post('api/classroom', data, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    const getClassroomList = async () => {
        try {

        }
        catch (error) {
            console.log(error)
        }
    }

    const getClassroom = async (id) => {
        try {
            const response = await axios.get(`api/classroom/${id}`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            setClassroom(response.data)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        classroom,
        classrooms,
        createClassroom,
        getClassroom,
        getClassroomList,
    }
}

export default useClassroomManager