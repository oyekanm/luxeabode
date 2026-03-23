import GoBack from '@/components/reuseable/goback'
import RoomCardSkeleton from '@/components/skeletons/roomCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function SingleBuildingLoading() {
    return (
        <main className="flex-1">
            <div className="xtrw space-y-12">
                <GoBack title="Back to All Buildings" to="/buildings" />

                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs mb-2">
                        <Skeleton className="icon-size" />
                        <Skeleton className="h-8 w-32 rounded-none" />
                    </div>
                    <Skeleton className="w-80 h-16 rounded-none" />
                    <Skeleton className="w-100 h-8 rounded-none" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <RoomCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </main>
    )
}