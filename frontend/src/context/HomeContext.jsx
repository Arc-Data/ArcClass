import useClassroomManager from "@/hooks/useClassroomManager";
import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const HomeContext = createContext()

export default HomeContext

export const HomeProvider = ({ children }) => {
    const { authTokens } = useContext(AuthContext)
    const [ classrooms, setClassrooms ] = useState([])
    const [ filteredList, setFilteredList ] = useState([])
    
    const [ searchQuery, setSearchQuery ] = useState("")

    const [ errors, setErrors ] = useState()

    const { createClassroom, getClassroomList, loading } = useClassroomManager(authTokens)

    const handleAddClassroom = async (data) => {
        const classroom = await createClassroom(data)
        const updatedClassroomList = [...classrooms, classroom]
        setClassrooms(updatedClassroomList)
        setFilteredList()
    }

    const handleRemoveClassroom = async () => {
        const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id)
        setClassrooms(updatedClassrooms)
        setFilteredList(updatedClassrooms)
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
        handleRemoveClassroom,
        handleFilterClassroomList
    }

    return (
        <HomeContext.Provider value={contextData}>
            { children }
        </HomeContext.Provider>
    )
}