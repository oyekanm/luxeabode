import CardContainer from '@repo/ui/cardContainer'
import { Skeleton } from '@/components/ui/skeleton'

export default function BuildingCardSkeleton() {
    return (
        <CardContainer className="p-0! overflow-hidden border-border/50 flex flex-col h-full shadow-[0_0_5px_0_rgba(0,0,0,0.2)]">
            <div className="relative h-100 overflow-hidden">
                {/* Image Placeholder */}
                <Skeleton className="w-full h-full rounded-none" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 w-full space-y-2">
                    {/* Location Placeholder */}
                    <div className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-white/20" />
                        <Skeleton className="h-4 w-32 bg-white/20" />
                    </div>
                    {/* Name Placeholder */}
                    <Skeleton className="h-8 w-48 bg-white/20" />
                </div>
            </div>
            <div className="p-8 pb-12 flex-1 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                    {/* Description Placeholder */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    {/* Available Units Placeholder */}
                    <div className="flex items-center gap-2 mt-4">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                {/* Button Placeholder */}
                <Skeleton className="h-10 w-full" />
            </div>
        </CardContainer>
    )
}
