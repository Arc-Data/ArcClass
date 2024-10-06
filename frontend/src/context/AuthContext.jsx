import axios from "../utils/axios";
import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [ authTokens, setAuthTokens ] = useState(() => {
        const tokens = localStorage.getItem("authTokens")
        return tokens ? JSON.parse(tokens) : null
    })
    const [ user, setUser ] = useState(() => {
        const tokens = localStorage.getItem("authTokens")
        return tokens ? jwtDecode(JSON.parse(tokens).access) : null
    })

    const saveTokenData = (response) => {
        setAuthTokens(response.data)
        
        const user = jwtDecode(response.data.access)
        setUser(user)
        localStorage.setItem('authTokens', JSON.stringify(response.data))
    }

    const loginUser = async (data) => {
        try {
            const response = await axios.post('api/account/student/login', data)
            saveTokenData(response)
        }
        catch (error) {
            throw error
        }
    }

    const registerUser = async (data) => {
        try {
            const response = await axios.post('api/account/student', data)
            saveTokenData(response)
        }
        catch (error) {
            throw error;
        }
    }
    
    const contextData = {
        loginUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
