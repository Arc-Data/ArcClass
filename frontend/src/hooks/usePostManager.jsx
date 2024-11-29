import axios from "@/utils/axios"
import { useState } from "react"

const usePostManager = (authTokens) => {
    const [ loading, setLoading ] = useState(true)
    const [ optimisticLoading, setOptimisticLoading ] = useState(false)

    const getPosts = async (id) => {
        setLoading(true)

        const response = await axios.get(`api/classroom/${id}/posts`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        setLoading(false)
        return response.data
       
    }

    const createPost = async (id, content, files) => {
        setOptimisticLoading(true)

        const formData = new FormData()
        formData.append('content', content)
        
        files.forEach(file => {
            formData.append(`files`, file); 
        });

        const response = await axios.post(`api/classroom/${id}/post`, formData , {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        setOptimisticLoading(false)
        return response.data
    }

    const deletePost = async (id) => {
        await axios.delete(`api/post/${id}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
    }

    const editPost = async (id, content) => {
        await axios.put(`api/post/${id}`, { content }, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })
    }

    return {
        loading,
        optimisticLoading,

        getPosts,
        createPost,
        deletePost,
        editPost
    }
}

export default usePostManager