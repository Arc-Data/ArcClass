import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useMemo, useState } from "react"
import dayjs from "@/utils/dayjs"
import AssignmentItem from "@/components/Assignments/AssignmentItem"

const Assignments = () => {
    const { authTokens } = useContext(AuthContext)
    const [ assignments, setAssignments ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState()
    const { getStudentAssignments } = useAssignmentManager(authTokens)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignments = await getStudentAssignments()
                setAssignments(assignments)
            }
            catch (error) {
                setError(error)
            } 
            finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [])

    if (loading) { 
        return (<div>
            Loading...
        </div>)
    }

    if (error) {
        return (<div>
            Error
        </div>)
    }

    return (
        <div className="container w-full px-10 mx-auto">
            <div className="space-y-6">
                {assignmentsGroup && Object.keys(assignmentsGroup)
                    .sort((a, b) => dayjs(b).diff(dayjs(a)))
                    .map(dateKey =>
                    (
                        <div key={dateKey} className="">
                            <p className="my-4 text-lg font-medium">{dateKey}</p>
                            <div className="space-y-2">
                                {assignmentsGroup[dateKey].map(assignment => <AssignmentItem assignment={assignment} key={assignment.id}/>)}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Assignments