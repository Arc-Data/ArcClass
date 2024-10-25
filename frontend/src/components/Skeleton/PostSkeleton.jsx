import { Skeleton } from "../ui/skeleton"
import UserSkeleton from "./UserSkeleton"

const PostSkeleton = ({ count }) => {
    return (
        <div className="space-y-10">
            {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="flex w-full gap-4 px-8 py-4 border rounded-lg">
                <Skeleton className="w-10 h-10 bg-gray-400 rounded-full"/>
                <div className="flex-1 p-2 space-y-4">
                    <Skeleton className="w-[100px] h-2 bg-gray-400"/>
                    <Skeleton className="w-full h-6 bg-gray-400"/>
                </div>
            </div>
            ))}
        </div>
    )
}

export default PostSkeleton