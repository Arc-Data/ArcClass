import axios from "@/utils/axios"
import { useState } from "react"

const usePostManager = (authTokens) => {
    const [ posts, setPosts ] = useState([])
    const [ loading, setLoading ] = useState(true)

    const getPosts = async (id) => {
        setLoading(true)

        try {
            const response = await axios.get(`api/classroom/${id}/posts`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`
                }
            })

            console.log(response)
            setPosts(response.data)
        }   
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        posts, 
        loading,

        getPosts,
    }
}

export default usePostManager