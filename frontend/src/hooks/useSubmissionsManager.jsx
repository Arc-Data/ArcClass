const useSubmissionsManager = (authTokens) => {
	const getSubmission = async (assignmentId) => {
		const response = await axios.get(`api/assignments/submissions/${assignmentId}`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`
			}
		})
		return response.data
	}

	const createSubmission = async (assignmentId, formData) => {
		const response = await axios.post(`api/assignment/${assignmentId}/submit`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${authTokens.access}`
			}
		})
		return response.data
	}
	
	const getSubmissions = async (assignmentId) => {
		const response = await axios.get(`api/assignments/${assignmentId}/submissions`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`
			}
		})
		return response.data
	}

	return {
		createSubmission,
		getSubmission,
		getSubmissions,
	}
}

export default useSubmissionsManager