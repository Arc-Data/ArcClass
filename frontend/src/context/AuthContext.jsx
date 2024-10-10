import axios from "../utils/axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;

/* NOTE: SQL Timeout
// Single instance of sql timeout 
// Keep on the lookout for whether coincidence
*/

export const AuthProvider = ({ children }) => {
    const [ authTokens, setAuthTokens ] = useState(() => {
        const tokens = localStorage.getItem("authTokens")
        return tokens ? JSON.parse(tokens) : null
    })
    const [ user, setUser ] = useState(() => {
        const tokens = localStorage.getItem("authTokens")
        return tokens ? jwtDecode(JSON.parse(tokens).access) : null
    })
    const [ loading, setLoading ] = useState(true)

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

    const refreshToken = async () => {
        console.log("Attempting Refresh")
        try {
            const response = await axios.post('api/account/refresh', {
                refresh: authTokens.refresh
            })

            console.log("Token refreshed")
            console.log(response)
            setAuthTokens(response.data)
            setUser(jwtDecode(response.data.access))

            localStorage.setItem('authTokens', JSON.stringify(response.data))
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
        refreshToken,
        user,
        role,
        authTokens
    }

    useEffect(() => {
        let timeoutId 

        const checkTokenExpiryAndRefresh = async () => {
            if (authTokens) {
                const currentTimeInSeconds = Math.floor(Date.now() / 1000) 
                const decodedUser = jwtDecode(authTokens.access)
                const timeUntilExpiry = decodedUser.exp - currentTimeInSeconds 

                if (timeUntilExpiry < 180) {
                    try {
                        console.log("Will refresh token")
                        await refreshToken();
                        console.log("Successfully refreshed token")

                        const twelveMinutes = 1000 * 6 * 12
                        timeoutId = setTimeout(checkTokenExpiryAndRefresh, twelveMinutes)
                    }
                    catch (error) {
                        console.log("Token expired. Please login again")
                        logoutUser()
                    }
                } else {
                    const nextRefreshIn = Math.max(timeUntilExpiry - 180, 0) * 1000
                    console.log("Next refresh in", nextRefreshIn)
                    timeoutId = setTimeout(checkTokenExpiryAndRefresh, nextRefreshIn)
                }
            } else {
                clearTimeout()
            }
            setLoading(false)
        }

        checkTokenExpiryAndRefresh()
        return () => clearTimeout(timeoutId)
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
