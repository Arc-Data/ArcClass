import { useContext, useState } from "react"
import { FaCalendar, FaPlus, FaTimes } from "react-icons/fa"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import HomeContext from "@/context/HomeContext"

// TODO: Update Primary Button Variant

const CreateClassroomModal = () => {
    const [formData, setFormData] = useState({
        subject: '',
        section: '',
        semesterStart: null,
        semesterEnd: null,
    })
    const [loading, setLoading] = useState(false)
    const { handleAddClassroom } = useContext(HomeContext)
    const navigate = useNavigate()
    const today = new Date()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const clearDate = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: null,
            ...(field === 'semesterStart' ? { semesterEnd: null } : {})
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (formData.semesterStart == null) {
            setFormData(prev => ({ ...prev, semesterEnd: null }))
        }

        const id = await handleAddClassroom(formData)
        if (id != null) {
            navigate(`classroom/${id}`)
        }

        setLoading(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <FaPlus size={16} />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-lg font-semibold">Create Class</h2>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium">Subject Name</label>
                        <input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Enter subject name"
                            required
                            className="w-full font-body bg-background border border-gray-300 text-text text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="section" className="block text-sm font-medium">Class Name</label>
                        <input
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={handleInputChange}
                            placeholder="Enter class section"
                            required
                            className="w-full font-body bg-background border border-gray-300 text-text text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Semester Start</label>
                            <div className="relative">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal pr-8",
                                                !formData.semesterStart && "text-muted-foreground"
                                            )}
                                        >
                                            <FaCalendar className="w-4 h-4 mr-2" />
                                            {formData.semesterStart
                                                ? format(formData.semesterStart, "PPP")
                                                : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-100" align="start" sideOffset={4}>
                                        <Calendar
                                            mode="single"
                                            selected={formData.semesterStart}
                                            onSelect={(date) =>
                                                setFormData(prev => ({ ...prev, semesterStart: date }))
                                            }
                                            disabled={(date) => date < today}
                                        />
                                    </PopoverContent>
                                </Popover>
                                {formData.semesterStart && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 h-full"
                                        onClick={() => clearDate("semesterStart")}
                                    >
                                        <FaTimes className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {formData.semesterStart && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Semester End</label>
                                <div className="relative">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal pr-8",
                                                    !formData.semesterEnd && "text-muted-foreground"
                                                )}
                                            >
                                                <FaCalendar className="w-4 h-4 mr-2" />
                                                {formData.semesterEnd
                                                    ? format(formData.semesterEnd, "PPP")
                                                    : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 z-100">
                                            <Calendar
                                                mode="single"
                                                selected={formData.semesterEnd}
                                                onSelect={(date) =>
                                                    setFormData(prev => ({ ...prev, semesterEnd: date }))
                                                }
                                                disabled={(date) =>
                                                    date < today || date <= formData.semesterStart
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {formData.semesterEnd && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-0 right-0 h-full"
                                            onClick={() => clearDate("semesterEnd")}
                                        >
                                            <FaTimes className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                    type="submit"
                        disabled={loading}
                        variant={"primary"}
                        className="w-full"
                    >
                        {loading ? "Creating..." : "Create Classroom"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateClassroomModal
