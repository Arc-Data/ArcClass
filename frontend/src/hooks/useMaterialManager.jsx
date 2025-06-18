import axios from "@/utils/axios"

const useMaterialManager = (authTokens) => {
    const getMaterials = (id) => {
        const response = axios.get(`api/${id}/files`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }

    const deleteMaterial = (assignmentId, id) => {
        const response = axios.delete(`api/${assignmentId}/files/${id}`, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }

    const attachMaterials = async (id, file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`api/assignments/${id}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authTokens.access}`
            }
        });

        return response.data;
    }
  
    return {
        getMaterials,
        deleteMaterial,
        attachMaterials
    }
}

export default useMaterialManager