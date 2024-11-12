import axios from "@/utils/axios"
import { useState } from "react"

//  NOTE: This project handles errors and state and hooks on a component level basis

const useAssignmentManager = (authTokens) => {
    const createAssignment =  async (id, data) => {
        const response = await axios.post(`api/classroom/${id}/assignment`, data, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        return response.data
    }

    const getAssignmentList = async (id) => {
        const response = await axios.get(`api/classroom/${id}/assignments`, {   
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }

    const deleteAssignment = async (id) => {
        const response = await axios.delete(`api/assignments/${id}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        console.log(response)
    }   
    
    return {
        createAssignment,
        getAssignmentList,
        deleteAssignment,
    }
}

export default useAssignmentManager