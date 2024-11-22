import axios from "@/utils/axios"
import { useEffect, useState } from "react"

const useFileManager = (authTokens) => {

    const getFiles = async (materials) => {
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

    return {
        getFiles
    }
}

export default useFileManager