import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import ClassroomContext from "@/context/ClassroomContext"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useContext, useState } from "react"
import { FaCalendar } from "react-icons/fa"
import { useParams } from "react-router-dom"

const CreateAssignmentModal = () => {
    const { id } = useParams()
    const [ data, setData ] = useState({
        title: '',
        description: '',
        submissionDate: null,
        maxGrade: 0,
    })

    const { handleCreateAssignment } = useContext(ClassroomContext)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateAssignment(id, data)
    }

    return (
        <Dialog className="">
            <DialogTrigger className="" asChild>
                <button className="px-5 py-2 rounded-full bg-primary-default">Create Assignment</button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <form onSubmit={handleSubmit}>
                
                <div className="flex flex-col max-h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>
                        Create Class Assignment
                        </DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow py-4 space-y-4 overflow-y-auto">
                        <div className="w-full">
                            <label htmlFor="section" className="block mb-2 text-sm text-gray-900 font-body">Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title"
                                className="w-full font-body bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                                placeholder="Activity Name"
                                value={data.title}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="section" className="block mb-2 text-sm text-gray-900 font-body">Description</label>
                            <Textarea
                                name="description"
                                value={data.description}
                                placeholder="Optional"
                                onChange={handleInputChange}/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="section" className="block mb-2 text-sm text-gray-900 font-body">Submission Date</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal w-full pr-8")}
                                        >
                                            <FaCalendar className="w-4 h-4 mr-2"/>
                                            {data.submissionDate ? format(data.submissionDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar 
                                        mode="single"
                                        selected={data.submissionDate}
                                        onSelect={(date) => setData(prev => ({...prev, submissionDate: date}))}
                                        disabled={(date) => date < new Date()}
                                        required
                                        className="bg-background-default"/>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="w-full">
                            <label htmlFor="section" className="block mb-2 text-sm text-gray-900 font-body">Max Grade</label>
                            <input 
                                type="number" 
                                id="maxGrade" 
                                name="maxGrade"
                                className="w-full font-body bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                                value={data.maxGrade}
                            min={1}
                                onChange={handleInputChange}
                                required />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <button type="submit" className="px-5 py-2.5 rounded-xl text-sm bg-primary-default">Create</button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAssignmentModal