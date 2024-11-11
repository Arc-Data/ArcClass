import ClassroomContext from "@/context/ClassroomContext"
import CreateAssignmentModal from "@/modals/CreateAssignmentModal"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

const Assignments = () => {
    const { assignments, handleGetAssignmentList } = useContext(ClassroomContext)
    const { id } = useParams()

    useEffect(() => {
        /* NOTE: Undefined Decision
        // by strictly matching assignments to undefined, empty arrays wouldnt count for a refetch
        */
        const fetchData = async () => {
            if (assignments === undefined) {
                await handleGetAssignmentList()
            }
        }

        fetchData()
    }, [id, assignments])

    return (
        <div className="w-full px-4 mx-auto">
            <div className="flex justify-between w-full my-4">
                <div className="self-end text-md font-heading">Activity List</div>
                <CreateAssignmentModal/>
            </div>
            <div>
                {assignments && assignments.map(a => (<h1 key={a.id}>{a.title}</h1>))}
            </div>
        </div>
    )
}

export default Assignments