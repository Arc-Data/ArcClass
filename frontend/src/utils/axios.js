import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL

export default axios.create({
    baseURL: backendUrl,
    withCredentials: true,  
})