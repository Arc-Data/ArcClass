import AuthContext from "@/context/AuthContext"
import useAssignmentManager from "@/hooks/useAssignmentManager"
import { useContext, useEffect, useMemo, useState } from "react"
import dayjs from "@/utils/dayjs"
import AssignmentItem from "@/components/Assignments/AssignmentItem"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AssignmentGroup from "@/components/Assignments/AssignmentGroup"

const Assignments = () => {
    const { authTokens } = useContext(AuthContext)
    const [ assignments, setAssignments ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState()
    const { getStudentAssignments } = useAssignmentManager(authTokens)
    const [ tab, setTab ] = useState("all")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignments = await getStudentAssignments(null, null, tab)
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
    }, [tab])

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
            <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <AssignmentGroup assignments={assignments} />
                </TabsContent>
                <TabsContent value="upcoming">
                    <AssignmentGroup assignments={assignments} />
                </TabsContent>
                <TabsContent value="completed">
                    <AssignmentGroup assignments={assignments} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Assignments