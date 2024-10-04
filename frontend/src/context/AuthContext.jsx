import axios from "../utils/axios";
import { createContext, useState } from "react";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const loginUser = async (data) => {
        try {
            const response = await axios.post('api/account/student/login', data)
        }
        catch (error) {
            throw error
        }
    }

    const registerUser = async (data) => {
        try {
            const response = await axios.post('api/account/student', data)
        }
        catch (error) {
            throw error;
        }
    }
    
    const contextData = {
        loginUser,
        registerUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
