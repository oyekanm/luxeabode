import CardContainer from '@repo/ui/cardContainer'
import { Skeleton } from '@/components/ui/skeleton'

export default function RoomCardSkeleton() {
    return (
        <CardContainer
            className="shadow overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group p-0"
        >
            <div className="relative h-100 overflow-hidden">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
            <div className="p-8 space-y-8 flex-1 flex flex-col">
                <Skeleton className="h-7 w-3/4 mb-4" />

                <div className="grid grid-cols-3 h-40 gap-4 mb-6 py-4 border-y border-border">
                    <DetailCardSkeleton />
                    <DetailCardSkeleton />
                    <DetailCardSkeleton />
                </div>

                <div className="mt-auto">
                    <Skeleton className="h-20 w-full" />
                </div>
            </div>
        </CardContainer>
    )
}

const DetailCardSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-5 rounded-md" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-8" />
        </div>
    )
}
