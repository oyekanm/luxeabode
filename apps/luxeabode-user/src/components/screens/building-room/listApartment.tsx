"use client"

import RoomCardSkeleton from '@/components/skeletons/roomCardSkeleton'
import { useApartmentFilters } from '@/hooks/use-apartment-filters'
import useGetApartments from '@/hooks/useGetApartments'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import RoomCard from './roomCard'
import ServerErrorMessage from '@repo/ui/serverErrorMessage'

interface Props {
    url: string
}

export default function ListApartment() {
    const { filters, goToNext, goToPrev, setFilter, clearFilters, isPending } =
        useApartmentFilters()

    const { apartments, isLoading, error } = useGetApartments(filters)
    return (
        <section className="py-12">
            <div className="xtrw">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!isLoading && apartments?.map((apt) => (
                        <RoomCard room={apt} key={apt.id} />
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

                {error && (
                    <div className="flex items-center justify-center h-200">
                        <ServerErrorMessage title="Something went wrong" desc="Please try again later." />
                    </div>
                )}
            </div>
        </section>
    )
}