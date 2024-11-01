import axios from "@/utils/axios"
import { useState } from "react"

const useCommentManager = (authTokens) => {
    const createComment = async (id, content) => {
        try {
            const response = await axios.post(`api/post/${id}/comments`, { content }, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            return response.data
        }
        catch (error) {
            console.log(error)
            throw error
        }
        finally {

        }
    }

    const deleteComment = async (id) => {
        try {
            await axios.delete(`api/comments/${id}`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return {
        createComment,
        deleteComment,
    }
}

export default useCommentManager