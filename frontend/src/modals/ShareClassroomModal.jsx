import { useState } from "react"
import { FaUserPlus } from "react-icons/fa6"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useParams } from "react-router-dom"

const ShareClassroomModal = () => {
    const { id } = useParams()

    return (
        <Dialog>
            <DialogTrigger asChild>
            <button className="p-4 rounded-full hover:bg-gray-200">
                <FaUserPlus size={16}/>
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Students</DialogTitle>
                    <DialogDescription>
                        Have your students enter the code below to join the classroom. 
                    </DialogDescription>
                </DialogHeader>
                <div className="grid w-full ">
                    <div className="relative">
                        <input
                            id="id"
                            type="text"
                            className=" text-center text-lg font-bold block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 "
                            value={id}
                            disabled
                            readOnly
                        />
                        {/* <Clipboard.WithIcon valueToCopy={id} /> */}
                    </div>
                </div>
                {/* <HR className="my-4"/> */}
                <DialogDescription>
                    Alternatively, copy the link below for easier joining
                </DialogDescription>
                <div className="grid w-full ">
                    <div className="relative">
                        <label htmlFor="npm-install" className="sr-only">
                        Label
                        </label>
                        <input
                            id="npm-install"
                            type="text"
                            className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 "
                            value={`http://localhost:5173/classroom/${id}/join`}
                            disabled
                            readOnly
                        />
                        {/* <Clipboard.WithIcon valueToCopy={`http://localhost:5173/classroom/${id}/join`} /> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ShareClassroomModal