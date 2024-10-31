import axios from "@/utils/axios"

const useCommentManager = (authTokens) => {
    
    const createComment = async (id, content) => {
        try {
            const response = await axios.post(`api/post/${id}/comments`, { content }, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            console.log(response)
        }
        catch (error) {
            console.log(error)
            throw error
        }
        finally {

        }
    }
    
    return {
        createComment,
    }
}

export default useCommentManager