import useClassroomManager from "@/hooks/useClassroomManager"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import AuthContext from "./AuthContext"
import { useParams } from "react-router-dom"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import dayjs from "dayjs"
import usePostManager from "@/hooks/usePostManager"

const ClassroomContext = createContext()

export default ClassroomContext

// TODO : Loading states should be as close as possible to the component they are working with

export const ClassroomProvider = ({ children }) => {
    const { authTokens } = useContext(AuthContext)
    const [ classroom, setClassroom ] = useState()
    const { loading, getClassroom, getClassroomParticipants } = useClassroomManager(authTokens)
    const [ assignments, setAssignments ] = useState()
    const { id } = useParams()
    
    const [ participants, setParticipants ] = useState()
    const [ errors, setErrors ] = useState()

    const [ posts, setPosts ] = useState()
    const { loading:postLoading, getPosts, createPost, deletePost, optimisticLoading } = usePostManager(authTokens) 
    
    const {
        createAssignment,
        getAssignmentList,
        deleteAssignment,
    } = useAssignmentManager(authTokens)

    const assignmentsGroup = useMemo(() => {
        const group = {}

        if (assignments) {
            assignments.forEach(assignment => {
                const dateKey = dayjs.utc(assignment.submissionDate).local().format('MMM DD YYYY')
                group[dateKey] ||= []
                group[dateKey].push(assignment)
            })
        }

        return group
    }, [assignments])

    const handleCreateAssignment = async (id, data) => {
        try {
            const assignment = await createAssignment(id, data)
            const updatedAssignments = [...assignments, assignment]
            setAssignments(updatedAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAssignment = async ( assignmentId ) => {
        try {
            await deleteAssignment(assignmentId)
            const updatedAssignments = assignments.filter(a => a.id != assignmentId)
            setAssignments(updatedAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleGetAssignmentList = async () => {
        try {
            const fetchAssignments = await getAssignmentList(id);
            setAssignments(fetchAssignments)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleGetClassroomParticipants = async () => {
        try {
            const fetchParticipants = await getClassroomParticipants(id)
            setParticipants(fetchParticipants)
        }
        catch (error) {
            console.log(error)
        }
       
    }

    const handleGetPosts = async () => {
        try {
            const fetchPosts = await getPosts(id)
            setPosts(fetchPosts)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCreatePost = async (content, files) => {
    try {
            const post = await createPost(id, content, files)
            const updatedPosts = [post, ...posts]
            setPosts(updatedPosts)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async (postId) => {
        try {
            deletePost(postId)
            const updatedPosts = posts.filter(post => post.id != postId)
        setPosts(updatedPosts)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const classroom = await getClassroom(id)
                setClassroom(classroom)
            }
            catch (error) {
                setErrors(error)
            }
        }

        setAssignments()
        setPosts()
        setParticipants()

        fetchData()
    }, [id])

    const contextData = {
        classroomError: errors,
        classroom, 
        loading, 
        assignments,
        assignmentsGroup,
        participants,

        posts,
        getPosts,
        postLoading,
        optimisticLoading,

        handleGetAssignmentList,
        handleCreateAssignment,
        handleDeleteAssignment,
        handleGetClassroomParticipants,

        handleGetPosts,
        handleCreatePost,
        handleDeletePost,
    }

    return (
        <ClassroomContext.Provider value={contextData}>
            { children }
        </ClassroomContext.Provider>
    )
}