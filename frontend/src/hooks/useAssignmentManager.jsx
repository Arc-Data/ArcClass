import axios from "@/utils/axios"
import { useState } from "react"

//  NOTE: This project handles errors and state and hooks on a component level basis

// TODO : Implement use action state with files
const useAssignmentManager = (authTokens) => {
    const createAssignment =  async (id, data, files) => {
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('submissionDate', data.submissionDate.toISOString())
        formData.append('maxGrade', data.maxGrade)

        files.forEach(file => {
            formData.append(`files`, file)
        })

        const response = await axios.post(`api/classroom/${id}/assignment`, formData, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
                'Content-Type': 'multipart/form-data'
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

    const getAssignmentCount = async () => {
        const response = await axios.get(`api/student/classrooms/count`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        
        return response.data
    }

    const deleteAssignment = async (id) => {
        await axios.delete(`api/assignments/${id}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
    }  

    const getStudentAssignments = async () => {
        const response = await axios.get(`api/student/classrooms/assignments`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }
    
    const getAssignment = async (id) => {
        const response = await axios.get(`api/assignments/${id}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }
    
    return {
        createAssignment,
        getAssignmentList,
        deleteAssignment,
        getAssignment,
        getAssignmentCount,
        getStudentAssignments,
    }
}

export default useAssignmentManager