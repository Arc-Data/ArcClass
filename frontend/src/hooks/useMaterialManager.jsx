import axios from "@/utils/axios"

const useMaterialManager = (authTokens) => {
    const getMaterials = async (materials) => {
        const filePromises = materials.map(async (material) => {
            try {
                const response = await axios.get(`api/file/${material.id}`, {
                    headers: {
                        Authorization: `Bearer ${authTokens.access}`
                    },
                    responseType: "blob"
                })


                return {
                    id: material.id,
                    filename: material.fileName,
                    file: response.data,
                    mimeType: response.headers["content-type"]
                }
            }
            catch (e) {
                console.error("Error fetching file", e)
                return null
            }
        })

        const filesResults = await Promise.all(filePromises)
        return filesResults
    }

    const deleteMaterial = (assignmentId, id) => {
        const response = axios.delete(`api/assignments/${assignmentId}/files/${id}`, {
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

        console.log(response)


        return response.data;
    }
  
    return {
        getMaterials,
        deleteMaterial,
        attachMaterials
    }
}

export default useMaterialManager