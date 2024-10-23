import { Skeleton } from "../ui/skeleton"

const UserSkeleton = () => {
    return (
        <div className="flex items-center gap-4 bg-black-200">
            <Skeleton className="w-10 h-10 rounded-full bg-text-default text-primary-default" />
            <div className="space-y-2">
                <Skeleton className="bg-text-default h-4 w-[240px]"></Skeleton>
            </div>
        </div>
    )
}

export default UserSkeleton