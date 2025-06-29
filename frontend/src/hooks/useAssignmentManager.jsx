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

    const updateAssignment = async (id, data) => {
        const response = await axios.put(`api/assignments/${id}`, data, {
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


    // NOTE: Do i want to design it as if its gonna be big in the first place?
    const getStudentAssignments = async (start = null, end = null, type = "all") => {
        const params = {}

        if (start) params.start = start.toISOString()
        if (end) params.end = end.toISOString()

        const response = await axios.get(`api/student/classrooms/assignments?type=${type}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            },
            params,
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
        updateAssignment,
        getAssignment,
        getAssignmentCount,
        getStudentAssignments,
    }
}

export default useAssignmentManager