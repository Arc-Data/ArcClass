import axios from "../utils/axios";
import { createContext, useState } from "react";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const loginUser = async (data) => {
        console.log("Login supposedly")
    }

    const registerUser = async (data) => {
        try {
            const response = await axios.post('api/account/student', data)
            console.log(response);
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
