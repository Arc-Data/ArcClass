import axios from "@/utils/axios"
import { useState } from "react"

const usePostManager = (authTokens) => {
    const [ posts, setPosts ] = useState([])
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

    const createPost = async (id, content) => {
        setOptimisticLoading(true)

        const response = await axios.post(`api/classroom/${id}/post`, { content }, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
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
        try {
            await axios.put(`api/post/${id}`, { content }, {
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
        posts, 
        loading,
        optimisticLoading,

        getPosts,
        createPost,
        deletePost,
        editPost
    }
}

export default usePostManager