import ApartmentDetailBookingSidebar from "@/components/screens/building-room/apartmentDetailBookingSidebar"
import ApartmentDetailMainContent from "@/components/screens/building-room/apartmentDetailMainContent"
import HeroGalery from "@/components/screens/building-room/hero-galery"
import { RoomsClientService } from "@/services/client/roomsClientService"
import { getClientError } from "@repo/helpers/getClientError"
import NotFoundErrorMessage from "@repo/ui/notFoundErrorMessage"
import { ChevronRight } from "lucide-react"

import Link from "next/link"

interface Props {
    params: Promise<{ slug: string }>
}

export default async function ApartmentDetailsPage({ params }: Props) {
    try {
        const { slug } = await params

        const data = await RoomsClientService.getOne(slug)
        const apartment = data?.data

        if (!apartment) {
            return (
                <div className="h-240">
                    <NotFoundErrorMessage title="Apartment not found" desc="The apartment you are looking for does not exist." />
                </div>
            )
        }

        return (
            <main className="flex-1">
                <div className="xtrw space-y-16">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/apartments" className="hover:text-primary transition-colors">
                            Apartments
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{apartment.name}</span>
                    </div>

                    {/* Hero Gallery */}
                    <HeroGalery apartment={apartment} />

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <ApartmentDetailMainContent apartment={apartment} />

                        {/* Booking Sidebar */}
                        <ApartmentDetailBookingSidebar apartment={apartment} />
                    </div>
                </div>
            </main>
        )
    } catch (error) {
        const err = getClientError(error)
        console.log(err)

        if (err?.status === 404) {
            return (
                <div className="h-240">
                    <NotFoundErrorMessage title="Apartment not found" desc="The apartment you are looking for does not exist." />
                </div>
            )
        }
    }
}
