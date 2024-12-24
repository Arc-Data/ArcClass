import useAssignmentManager from "@/hooks/useAssignmentManager"
import { createContext, useContext, useEffect, useMemo, useState, useTransition } from "react"
import AuthContext from "./AuthContext"
import dayjs from "@/utils/dayjs"

const CalendarContext = createContext()

export default CalendarContext

export const CalendarProvider = ({ children }) => {
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

    const contextData = {
         assignments,
         loading,
         error,

         assignmentsGroup
    }

    return (
        <CalendarContext value={contextData}>
            { children }
        </CalendarContext>
    )

}