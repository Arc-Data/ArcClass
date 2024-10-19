import { useState } from "react"
import axios from "../utils/axios"

const useClassroomManager = (authTokens) => {
    const [ loading, setLoading ] = useState(true)
    const [ classroom , setClassroom ] = useState()
    const [ classrooms, setClassrooms ] = useState([])

    const [ filteredList, setFilteredList ] = useState([])
    const [ searchQuery, setSearchQuery ] = useState("")

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
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
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

    const handleFilterClassroomList = (e) => {
        setSearchQuery(e.target.value)
        const query = e.target.value.toLowerCase();
        
        const filterClassroomsByQuery = classrooms.filter(classroom => {
            return classroom.subject.toLowerCase().includes(query)
        })
        setFilteredList(filterClassroomsByQuery)

    }

    const checkClassroom = async (id) => {
        try {
            const response = await axios.post(`api/classroom/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            setClassroom(response.data)
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
        searchQuery,

        leaveClassroom,
        checkClassroom,
        joinClassroom,
        createClassroom,
        getClassroom,
        deleteClassroom,
        getClassroomList,
        handleFilterClassroomList
    }
}

export default useClassroomManager