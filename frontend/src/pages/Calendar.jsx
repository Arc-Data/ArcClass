import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { FaEllipsisV, FaTrash } from "react-icons/fa"

const Calendar = () => {
    const [ openDelete, setOpenDelete] = useState(true) 
    return (
        <div>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            <DropdownMenu className="">
                <DropdownMenuTrigger asChild>
                    <button className="p-4 ml-auto rounded-full hover:bg-gray-200">
                        <FaEllipsisV size={16}/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-40 bg-background-default border-2 shadow *:p-2 rounded-lg *:cursor-pointer">
                    <DropdownMenuItem onClick={() => setOpenDelete(prev => !prev)}
                        className="z-30 flex items-center gap-2 text-red-500">
                        <FaTrash/>
                        <span>Delete</span>
                    </DropdownMenuItem>
                    
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    )
}

export default Calendar