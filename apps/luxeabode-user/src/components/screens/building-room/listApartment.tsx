"use client"

import RoomCardSkeleton from '@/components/skeletons/roomCardSkeleton'
import { useApartmentFilters } from '@/hooks/use-apartment-filters'
import useGetApartments from '@/hooks/useGetApartments'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import RoomCard from './roomCard'

interface Props {
    url: string
}

export default function ListApartment() {
    const { filters, goToNext, goToPrev, setFilter, clearFilters, isPending } =
        useApartmentFilters()

    const { apartments, isLoading } = useGetApartments(filters)
    return (
        <section className="py-12">
            <div className="xtrw">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!isLoading && apartments?.map((apt) => (
                        <RoomCard room={apt} />
                    ))}
                    {isLoading && (
                        Array.from({ length: 3 }).map((_, index) => (
                            <RoomCardSkeleton key={index} />
                        ))
                    )}
                </div>
                {
                    apartments?.length === 0 && (
                        <div className="h-200">
                            <NotFoundErrorMessage
                                title={"No Units Found"}
                                desc="It looks like there are no units now. Check back later for new listings."
                            />
                        </div>
                    )
                }
            </div>
        </section>
    )
}