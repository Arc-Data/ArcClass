import useClassroomManager from "@/hooks/useClassroomManager"
import { createContext, useContext, useEffect, useState } from "react"
import AuthContext from "./AuthContext"

const ClassroomContext = createContext()

export default ClassroomContext

export const ClassroomProvider = ({ children }) => {
    const { authTokens } = useContext(AuthContext)
    const { filteredList, classrooms, getClassroomList, loading } = useClassroomManager(authTokens)

    useEffect(() => {
        const fetchData = async () => {
            await getClassroomList()
        }
        
        fetchData();
    }, [])

    const contextData = {
        filteredList, 
        classrooms, 
        getClassroomList,
        loading, 
    }

    return (
        <ClassroomContext.Provider value={contextData}>
            { loading ? null : children }
        </ClassroomContext.Provider>
    )
}