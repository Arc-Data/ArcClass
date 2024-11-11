import axios from "@/utils/axios"

const useAssignmentManager = (authTokens) => {
    const createAssignment =  async (id, data) => {
        const response = await axios.post(`api/classroom/${id}/assignment`, data, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
        return response.data
    }
    
    return {
        createAssignment
    }
}

export default useAssignmentManager