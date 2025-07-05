import axios from "@/utils/axios"

const useMaterialManager = (authTokens) => {
    const getMaterials = async (materials) => {
        if (!materials || materials.length === 0) {
            return []
        }

        try {
            const filePromises = materials.map(async (material) => {
                try {
                    const response = await axios.get(`api/file/${material.id}`, {
                        responseType: 'blob',
                        headers: {
                            Authorization: `Bearer ${authTokens.access}`
                        }
                    })
                    
                    return {
                        id: material.id,
                        filename: material.fileName,
                        file: response.data,
                        mimeType: response.data.type,
                        ...material
                    }
                } catch (error) {
                    console.warn(`File ${material.id} not found, skipping...`)
                    return null // Return null for missing files
                }
            })

            const results = await Promise.all(filePromises)
            return results // Let DisplayFiles filter out nulls
            
        } catch (error) {
            console.error("Error fetching materials:", error)
            throw error
        }
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

    const attachSubmissionFiles = async (submissionId, files) => {
        const formData = new FormData()

        files.forEach(file => {
            formData.append('files', file)
        })

        const response = await axios.post(`api/assignment/submissions/${submissionId}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })

        return response.data
    }

    return {
        getMaterials,
        deleteMaterial,
        attachMaterials,
        attachSubmissionFiles
    }
}

export default useMaterialManager