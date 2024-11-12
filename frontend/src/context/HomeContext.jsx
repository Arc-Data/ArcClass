import useClassroomManager from "@/hooks/useClassroomManager";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const HomeContext = createContext()

export default HomeContext

export const HomeProvider = ({ children }) => {
    const { authTokens } = useContext(AuthContext)
    const [ classrooms, setClassrooms ] = useState([])
    const [ filteredList, setFilteredList ] = useState([])
    
    const [ searchQuery, setSearchQuery ] = useState("")

    const [ errors, setErrors ] = useState()
    const navigate = useNavigate()

    const { createClassroom, getClassroomList, joinClassroom, deleteClassroom, leaveClassroom, loading } = useClassroomManager(authTokens)

    const handleAddClassroom = async (data) => {
        const classroom = await createClassroom(data)
        const updatedClassroomList = [...classrooms, classroom]
        setClassrooms(updatedClassroomList)
        setFilteredList(updatedClassroomList)

        return classroom.id
    }

    const handleJoinClassroom = async (code) => {
        try {
            const classroom = await joinClassroom(code)
            const updatedClassroomList = [...classrooms, classroom]
            setClassrooms(updatedClassroomList)
            setFilteredList(updatedClassroomList)
            return classroom.id
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteClassroom = async (id) => {
        try {
            deleteClassroom(id);
            const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id)
            setClassrooms(updatedClassrooms)
            setFilteredList(updatedClassrooms)
            navigate('/home')
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleLeaveClassroom = async (id) => {
        try {
            leaveClassroom(id)
            const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id)
            setClassrooms(updatedClassrooms)
            setFilteredList(updatedClassrooms)
            navigate('/home')
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFilterClassroomList = async (e) => {
        setSearchQuery(e.target.value)
        const query = e.target.value.toLowerCase();
        
        const filterClassroomsByQuery = classrooms.filter(classroom => {
            return classroom.subject.toLowerCase().includes(query)
        })
        setFilteredList(filterClassroomsByQuery)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchClassrooms = await getClassroomList()
                setClassrooms(fetchClassrooms)
                setFilteredList(fetchClassrooms)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const contextData = {
        classrooms,
        filteredList,
        loading,
        searchQuery,
        errors,

        handleAddClassroom,
        handleJoinClassroom,
        handleDeleteClassroom,
        handleFilterClassroomList,
        handleLeaveClassroom,
    }

    return (
        <HomeContext.Provider value={contextData}>
            { children }
        </HomeContext.Provider>
    )
}