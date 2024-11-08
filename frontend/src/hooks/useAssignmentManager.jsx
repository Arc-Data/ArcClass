import axios from "@/utils/axios"
import { data } from "autoprefixer"

const useAssignmentManager = (authTokens) => {
    const createAssignment =  async (id, data) => {
        console.log(id)
        console.log(authTokens)
        console.log(data)
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