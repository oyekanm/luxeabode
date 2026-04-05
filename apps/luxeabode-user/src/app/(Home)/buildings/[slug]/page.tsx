import ChangeRoute from "@/components/reuseable/changeRoute"
import GoBack from "@/components/reuseable/goback"
import RoomCard from "@/components/screens/building-room/roomCard"
import { queryKeys } from "@/lib/query-keys"
import { BuildingsClientService } from "@/services/client/buildingsClientService"
import getLocation from "@repo/helpers/getLocation"
import NotFoundErrorMessage from "@repo/ui/notFoundErrorMessage"
import TitleDescContainer from "@repo/ui/titleDescContainer"
import { useQueryClient } from "@tanstack/react-query"
import { MapPin } from "lucide-react"

// Mock data for a specific building's units
const BUILDING = {
    id: "1",
    name: "Skyline Residency",
    location: "Downtown District",
    units: [
        {
            id: "101",
            name: "Executive Skyline Suite",
            price: 250,
            beds: 2,
            guests: 4,
            size: 85,
            image: "/luxury-apartment-skyline-view.jpg",
        },
        {
            id: "102",
            name: "Junior Urban Loft",
            price: 150,
            beds: 1,
            guests: 2,
            size: 55,
            image: "/modern-apartment-garden-loft.jpg",
        },
        {
            id: "106",
            name: "Junior Urban Loft",
            price: 150,
            beds: 1,
            guests: 2,
            size: 55,
            image: "/modern-apartment-garden-loft.jpg",
        },
        {
            id: "104",
            name: "Junior Urban Loft",
            price: 150,
            beds: 1,
            guests: 2,
            size: 55,
            image: "/modern-apartment-garden-loft.jpg",
        },
    ],
}

interface Props {
    params: Promise<{ slug: string }>
}

export default async function SingleBuildingPage({ params }: Props) {
    try {
        const { slug } = await params

        const data = await BuildingsClientService.getOne(slug)
        const building = data?.data

        if (!building) {
            return <ChangeRoute path="/buildings" />
        }

        const location = getLocation(building?.city!, building?.state!)

        return (
            <main className="flex-1">
                <div className="xtrw space-y-12">
                    <GoBack title="Back to All Buildings" to="/buildings" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs mb-2">
                            <MapPin className="icon-size" />
                            {location}
                        </div>
                        <TitleDescContainer title={building?.name || ""} desc='Browse all available units at this location' />
                    </div>

                    {/* TODO: add a view more button to navigate to a new page for pagination */}

                    {building &&
                        building?.rooms?.length! > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                            {building?.rooms?.map((unit) => (
                                <RoomCard key={unit.id} room={unit} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-200">
                            <NotFoundErrorMessage
                                title={"No Units Found for this building"}
                                desc="It looks like there are no units in this building. Check back later for new listings."
                            />
                        </div>
                    )
                    }
                </div>
            </main>
        )
    } catch (error) {
        console.log(error)
        return <ChangeRoute path="/buildings" />
    }
}
