import axios from "@/utils/axios"

const useSubmissionManager = (authTokens) => {
    const getSubmission = async (id) => {
        const response = await axios.get(`api/assignments/${id}/my-submission`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        });
        return response.data
    }

    const gradeSubmission = async (submissionId, gradeData) => {
        const response = await axios.put(`api/assignment/submissions/${submissionId}/grade`, gradeData, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        });
        return response.data
    }

    const getSubmissions = async (id) => {
        const response = await axios.get(`api/assignments/${id}/submissions`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        });
        return response.data
    }

    const createSubmission = async (assignmentId, submissionData) => {
        const formData = new FormData()
        formData.append('Description', submissionData.description || '')
        
        if (submissionData.files && submissionData.files.length > 0) {
            submissionData.files.forEach(file => {
                formData.append('Files', file)
            })
        }

        const response = await axios.post(`api/assignments/${assignmentId}/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }

    const updateSubmissionDescription = async (submissionId, description) => {
        const response = await axios.put(`api/assignment/submissions/${submissionId}`, 
            { Description: description },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            }
        )

        return response.data
    }

    // ADD: Delete submission (optional - if you want this feature)
    const deleteSubmission = async (submissionId) => {
        const response = await axios.delete(`api/assignment/submissions/${submissionId}`, {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        })

        return response.status === 204
    }
    
    return {
        getSubmission,
        getSubmissions,
        createSubmission,
        updateSubmissionDescription,
        deleteSubmission,
        gradeSubmission,
    }
}

export default useSubmissionManager