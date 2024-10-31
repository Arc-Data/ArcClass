import useClassroomManager from "@/hooks/useClassroomManager"
import { createContext, useContext, useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { useNavigate } from "react-router-dom"
import useCommentManager from "@/hooks/useCommentManager"

const ClassroomContext = createContext()

export default ClassroomContext

export const ClassroomProvider = ({ children }) => {
    const { authTokens } = useContext(AuthContext)
    const [ classrooms, setClassrooms ] = useState([])
    const [ filteredList, setFilteredList ] = useState([])

    const [ searchQuery, setSearchQuery ] = useState("")
    const { 
        loading, 
        getClassroomList, 
        createClassroom, 
        joinClassroom,
    } = useClassroomManager(authTokens)

    const { 
        createComment,
    } = useCommentManager(authTokens)

    const [ errors, setErrors ] = useState()

    const handleAddClassroom = async (data) => {
        try {
            const classroom = await createClassroom(data)
            const updatedClassroomList = [...classrooms, classroom]
            setClassrooms(updatedClassroomList)
            setFilteredList(updatedClassroomList)
            return classroom.id
        }
        catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const handleCreateComment = async (e, id) => {
        console.log(e)
        e.preventDefault()
        try {
            const content = e.target.elements.content.value
            await createComment(id, content)
        }
        catch (error) { 
            console.log(error)
        }
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

    const handleRemoveClassroom = async (id) => {
        const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id)
        setClassrooms(updatedClassrooms)
        setFilteredList(updatedClassrooms)
    }

    const handleFilterClassroomList = async () => {
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
            catch (error) 
            {
                setErrors(error.response.data)
            }
        }
        
        fetchData();
    }, [])

    const contextData = {
        filteredList, 
        classrooms, 
        errors,
        searchQuery,
        loading, 

        handleFilterClassroomList,
        handleAddClassroom,
        handleRemoveClassroom,
        handleJoinClassroom,
        handleCreateComment
    }

    return (
        <ClassroomContext.Provider value={contextData}>
            { children }
        </ClassroomContext.Provider>
    )
}