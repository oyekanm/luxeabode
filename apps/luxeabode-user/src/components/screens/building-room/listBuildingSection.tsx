"use client"

import { useApartmentFilters } from '@/hooks/use-apartment-filters'
import { useGetBuildings } from '@/hooks/useGetBuildings'
import BuildingCard from './buildingCard'
import BuildingCardSkeleton from '@/components/skeletons/buildingCardSkeleton'

interface Props {
}

export default function ListBuildingSection() {

    const { filters, goToNext, goToPrev, setFilter, clearFilters, isPending } =
        useApartmentFilters()

    const { buildings, isLoading } = useGetBuildings(filters)

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
            </div>
        </section>
    )
}
