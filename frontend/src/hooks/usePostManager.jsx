import axios from "@/utils/axios"
import { useState } from "react"

const usePostManager = (authTokens) => {
    const [ posts, setPosts ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ optimisticLoading, setOptimisticLoading ] = useState(false)

    const getPosts = async (id) => {
        setLoading(true)

        try {
            const response = await axios.get(`api/classroom/${id}/posts`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            setPosts(response.data)
        }   
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const createPost = async (id, content) => {
        setOptimisticLoading(true)

        try {
            const response = await axios.post(`api/classroom/${id}/post`, { content }, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            const post = response.data 
            const updatedPosts = [post, ...posts]
            setOptimisticLoading(false)
            setPosts(updatedPosts)
        }
        catch (error) {
            setOptimisticLoading(false)
            throw error
        }
    }

    const deletePost = async (id) => {
        try {
            await axios.delete(`api/post/${id}`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            const updatedPosts = posts.filter(post => post.id != id)
            setPosts(updatedPosts)
        }
        catch (error) {
            throw error
        }
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