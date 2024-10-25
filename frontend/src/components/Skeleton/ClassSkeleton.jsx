import { FaImage } from "react-icons/fa"
import { Skeleton } from "../ui/skeleton"

const ClassSkeleton = ({ count }) => {


    return (
        <div className="mt-8 grid gap-4  grid-cols-[repeat(auto-fill,300px)]">
            {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow cursor-pointer">
                <div className="mb-4 overflow-hidden cursor-pointer">
                    <div className="grid h-40 bg-gray-400 place-items-center">
                        <FaImage className="text-white" /> 
                    </div>
                    <div className="p-4 space-y-2">
                        <Skeleton className="w-full h-2 bg-gray-400" />
                        <Skeleton className="w-1/3 h-2 bg-gray-400" />
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default ClassSkeleton