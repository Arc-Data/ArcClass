import FileEntry from "@/components/FileEntry"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import ClassroomContext from "@/context/ClassroomContext"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useContext, useRef, useState } from "react"
import { FaCalendar, FaFile, FaMinus } from "react-icons/fa"
import { FaFileCirclePlus } from "react-icons/fa6"
import { useParams } from "react-router-dom"

const CreateAssignmentModal = ({ isTeacher }) => {
    const { id } = useParams()
    const [ isOpen, setIsOpen ] = useState(false)
    const [ files, setFiles ] = useState([])
    const [ data, setData ] = useState({
        title: '',
        description: '',
        submissionDate: null,
        maxGrade: 0,
    })
    
    const fileInputRef = useRef(null)

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
        handleCreateAssignment(id, data, files)
        setIsOpen(false)
    }

    const handleFiles = (e) => {
        const newFiles = Array.from(e.target.files)
        setFiles(prevFiles => [...prevFiles, ...newFiles])
    }

    const removeFile =( idx ) => {
        const updatedFiles =  files.filter((_, i) => idx !== i)
        setFiles(updatedFiles)
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    const FileDrop = () => {
        return (
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <p className="mb-2 text-gray-600 font-body">Related Files</p>
                    {files.length !== 0 && <p className="text-primary-default">{files.length} selected</p>}
                    <button type="button" onClick={handleClick} className="flex items-center gap-2 px-8 py-2 text-sm text-white rounded-lg shadow bg-primary-default rouned-lg">
                        <FaFileCirclePlus className="" size={20}/> 
                        <span className="font-bold uppercase ">Add File</span>
                    </button>
                </div>
                <ScrollArea className="h-[160px] mt-4 p-2 bg-gray-200 rounded-lg flex flex-col">
                    <input 
                        type="file"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFiles}
                    />
                    <div className="flex flex-col gap-2">
                    {files.map((file, idx) => <FileEntry key={idx} file={file} handleClick={() => removeFile(idx)}/>)}
                    </div>
                </ScrollArea>
            </div>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={`${isTeacher ? "block" : "hidden"}`} asChild>
                <button className="px-5 py-2 rounded-full bg-primary-default">Create Assignment</button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl font-body">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col max-h-[80vh]">
                        <DialogHeader>
                            <DialogTitle>
                            Create Class Assignment
                            </DialogTitle>
                            <DialogDescription>
                                
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-8 py-8 overflow-y-auto pspace-y-4 md:grid-cols-2">
                            <div className="flex flex-col gap-4">
                                <div className="w-full">
                                    <label htmlFor="section" className="block mb-2 text-gray-600 font-body">Title</label>
                                    <input 
                                        type="text" 
                                        id="title" 
                                        name="title"
                                        className="w-full font-body border bg-white border-gray-500  rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                                        placeholder="Activity Name"
                                        value={data.title}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="section" className="block mb-2 text-gray-600 font-body">Submission Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "justify-start bg-white border-gray-500 py-2.5 text-left font-body  font-normal w-full pr-8")}
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
                                    <label htmlFor="section" className="block mb-2 text-gray-600 font-body">Description</label>
                                    <Textarea
                                        name="description"
                                        value={data.description}
                                        placeholder="Optional"
                                        className="bg-white border-gray-500"
                                        onChange={handleInputChange}/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4" >
                                <div className="w-full">
                                    <label htmlFor="section" className="block mb-2 text-gray-600 font-body">Max Grade</label>
                                    <input 
                                        type="number" 
                                        id="maxGrade" 
                                        name="maxGrade"
                                        className="w-full font-body bg-white border border-gray-500   rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" 
                                        value={data.maxGrade}
                                    min={1}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <FileDrop/>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-8">
                        <button type="submit" className="px-5 py-2.5 rounded-xl  bg-primary-default">Create</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateAssignmentModal