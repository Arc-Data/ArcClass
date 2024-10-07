import axios from "../utils/axios";
import { createContext, useMemo, useState } from "react";
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
    const role = useMemo(() => user?.role || null, [user])

    const saveTokenData = (response) => {
        setAuthTokens(response.data)
        
        const user = jwtDecode(response.data.access)
        setUser(user)
        localStorage.setItem('authTokens', JSON.stringify(response.data))
    }
    
    const loginUser = async (data) => {
        try {
            const response = await axios.post('api/account/login', data)
            saveTokenData(response)
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    const registerUser = async (data) => {
        try {
            const response = await axios.post('api/account', data)
            saveTokenData(response)
        }
        catch (error) {
            throw error;
        }
    }

    const logoutUser = async() => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }
    
    const contextData = {
        loginUser,
        registerUser,
        logoutUser,
        user,
        role,
        authTokens
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
