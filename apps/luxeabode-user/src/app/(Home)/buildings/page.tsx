import ListBuildingSection from "@/components/screens/building-room/listBuildingSection"
import { queryKeys } from "@/lib/query-keys"
import { BuildingsClientService } from "@/services/client/buildingsClientService"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

interface PageProps {
    searchParams: Promise<{
        cursor?: string
        city?: string
        state?: string
        minPrice?: string
        maxPrice?: string
    }>
}

export default async function BuildingsListingPage({ searchParams }: PageProps) {
    const params = await searchParams
    const filters = {
        cursor: params.cursor,
        city: params.city,
        state: params.state,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    }

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: queryKeys.buildings.list(filters),
        queryFn: () =>
            BuildingsClientService.getAll(
                { city: filters.city, state: filters.state, cursor: filters.cursor, limit: 12 }
            ),
    })

    return (
        <main className="flex-1">
            <section className="bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/luxury-apartment-skyline-view.jpg')] bg-cover bg-center opacity-20" />
                <div className="xtrw py-32! space-y-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Our Premium Buildings</h1>
                    <p className="text-xl text-primary-foreground/80 max-w-200 mx-auto">
                        Discover the perfect building for your stay.
                    </p>
                </div>
            </section>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <ListBuildingSection />
            </HydrationBoundary>

        </main>
    )
}
