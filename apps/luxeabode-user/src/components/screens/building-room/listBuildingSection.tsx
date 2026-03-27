"use client"

import { useApartmentFilters } from '@/hooks/use-apartment-filters'
import { useGetBuildings } from '@/hooks/useGetBuildings'
import BuildingCard from './buildingCard'
import BuildingCardSkeleton from '@/components/skeletons/buildingCardSkeleton'
import ServerErrorMessage from '@repo/ui/serverErrorMessage'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'

interface Props {
}

export default function ListBuildingSection() {

    const { filters, goToNext, goToPrev, setFilter, clearFilters, isPending } =
        useApartmentFilters()

    const { buildings, isLoading, error } = useGetBuildings(filters)

    return (
        <section className="">
            <div className="xtrw">
                {!isLoading && <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {buildings?.map((building) => (
                        <BuildingCard key={building.id} building={building} />
                    ))}
                </div>}
                {isLoading && (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <BuildingCardSkeleton key={index} />
                        ))}
                    </div>
                )
                }

                {
                    buildings?.length === 0 && (
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
