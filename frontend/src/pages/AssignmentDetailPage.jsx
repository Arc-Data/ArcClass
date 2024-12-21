import { Suspense } from "react"
import { useParams } from "react-router-dom"

const AssignmentDetailPage = () => {
    const { id } = useParams()

    return (
        <Suspense>
            <AssignmentDetailPage/>
        </Suspense>
    )
}

export default AssignmentDetailPage