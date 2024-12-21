import { useContext, useState, useTransition } from "react"
import PostInput from "../PostInput"
import useCommentManager from "@/hooks/useCommentManager"
import AuthContext from "@/context/AuthContext"
import { useParams } from "react-router-dom"
import { comment } from "postcss"
import PostComment from "../PostComment"
import AssignmentComment from "./AssignmentComment"

const CommentSection = ({ commentsData }) => {
    const { id } = useParams()
    const { user, authTokens } = useContext(AuthContext) 
    const [ comments, setComments ] = useState(commentsData)
    const { createAssignmentComment } = useCommentManager(authTokens)
    
    const [ loading, startTransition ] = useTransition()
    
    const handleCreateComment = async (content) => {
        const tempId = Date.now()
        const optimisticComment = {
            id: tempId, 
            content,
            user: {
                id: user.nameid,
                fullname: "Something"
            },
            createdAt: new Date().toISOString()
        }

        setComments(prev => [...prev, optimisticComment])

        try {
            startTransition( async () => {
                const comment = await createAssignmentComment(id, content)
                setComments(prev => prev.map(c => c.id === tempId ? comment : c))
            })
        }
        catch (error) {
            console.log("Error while creating assignment comment", error)
            setComments(prev => prev.filter(c => c.id !== tempId))
            setErrors(error)
        }
    }
    
    return (
        <div className="col-span-2 py-8 border-t">
            <div className="space-y-8">
                <PostInput onSubmitPost={content => handleCreateComment(content)} placeholder={"Add a comment"} filesHidden={true}/>
                { comments.map(comment => (<AssignmentComment key={comment.id} comment={comment} loading={loading}/>))}
            </div>
        </div>
    )
}

export default CommentSection