import React from 'react'

import { Button } from "@/components/ui/button"
import { MapPin, Users, Bed, Square } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react" // added Suspense import
import CardContainer from '@repo/ui/cardContainer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-keys'
import { RoomsClientService } from '@/services/client/roomsClientService'
import ListApartment from '@/components/screens/building-room/listApartment'


interface Props {
    params: Promise<QueryFilters>
}
export default async function ApartmentsPage({ params }: Props) {
    const searchParams = await params
    const filters = {
        cursor: searchParams.cursor,
        city: searchParams.city,
        state: searchParams.state,
        minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    }
    const queryClient = new QueryClient()

    queryClient.prefetchQuery({
        queryKey: queryKeys.rooms.list(filters),
        queryFn: () => RoomsClientService.getAll({
            city: filters.city,
            state: filters.state,
            cursor: filters.cursor,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
        })
    })

    return (
        <main className="flex-1">
            {/* Header & Filter Section */}
            <section className="bg-card border-b border-border py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8">Available Apartments</h1>

                    {/* <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by location or name..." className="pl-10 h-12" />
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <Button variant="outline" className="h-12 flex-1 lg:flex-none bg-transparent">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button className="h-12 flex-1 lg:flex-none px-8">Search</Button>
              </div>
            </div> */}
                </div>
            </section>

            {/* Listings Grid */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ListApartment />
            </HydrationBoundary>

        </main>
    )
}