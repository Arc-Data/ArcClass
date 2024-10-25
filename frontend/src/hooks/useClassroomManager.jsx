import { useState } from "react"
import axios from "../utils/axios"

const useClassroomManager = (authTokens) => {
    const [ loading, setLoading ] = useState(true)
    const [ classroom , setClassroom ] = useState()
    const [ classrooms, setClassrooms ] = useState([])

    const [ filteredList, setFilteredList ] = useState([])

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
            throw error
        }
    }

    const getClassroomParticipants = async (id) => {
        setLoading(true)
       
        try {
            const response = await axios.get(`api/classroom/${id}/participants`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            return response.data
        }
        catch (error) {
            throw error
        }
        finally 
        {
            setLoading(false)
        }
    }

    const joinClassroom = async (id) => {
        try {
            const response = await axios.post(`api/classroom/${id}/join`, null, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            return response.data
        }
        catch (error) {
            throw error
        }
    }

    const getClassroomList = async () => {
        try {
            const response = await axios.get("api/classroom", {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            setClassrooms(response.data)
            setFilteredList(response.data)
            return response.data
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const getClassroomPosts = async (id) => {
        try {
            const response = await axios.get(`api/classroom/${id}/posts`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            console.log(response)
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    const deleteClassroom = async (id) => {
        try {
            const response = await axios.delete(`api/classroom/${id}`, {
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


    const checkClassroom = async (id) => {
        try {
            const response = await axios.post(`api/classroom/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            setClassroom(response.data.classroom)
            console.log(response.data)
            return response.data.isExisting
        }
        catch (error) {
            throw error
        }
    }

    const leaveClassroom = async (id) => {
        try {
            const response = await axios.post(`api/classroom/${id}/leave`, null, {
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
            throw error
        }
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        classroom,
        classrooms,
        filteredList,

        leaveClassroom,
        checkClassroom,
        joinClassroom,
        createClassroom,
        getClassroom,
        deleteClassroom,
        getClassroomList,
        getClassroomPosts, 
        getClassroomParticipants
    }
}

export default useClassroomManager