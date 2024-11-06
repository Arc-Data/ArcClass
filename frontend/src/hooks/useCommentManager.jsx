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

    const loadComments = async (id) => {
        try {
            const response = await axios.get(`api/post/${id}/comments`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    const editComment = async (id, content) => {
        try {
            const response = await axios.put(`api/comments/${id}`, { content },
                {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    }
                })

            console.log(response)
        }
        catch (error) {
            console.log(error)
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
        loadComments,   
        deleteComment,
        editComment,
    }
}

export default useCommentManager