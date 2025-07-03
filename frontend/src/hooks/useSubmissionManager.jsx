import axios from "@/utils/axios"

const useSubmissionManager = () => {
    const getSubmission = async (id) => {
        const response = await axios.get(`api/assignments/${id}/my-submission`);
        return response.data
    }
    
    return {
        getSubmission
    }
}

export default useSubmissionManager