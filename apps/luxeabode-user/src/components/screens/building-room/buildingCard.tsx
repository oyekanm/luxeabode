import { Apartment } from '@repo/db'
import getLocation from '@repo/helpers/getLocation'
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import { ArrowRight, Building2, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    building: Apartment
}

export default function BuildingCard({ building }: Props) {
    const location = getLocation(building.city, building.state)

    const firstImage = building.images[0].url
    return (
        <CardContainer className="p-0! overflow-hidden border-border/50 group flex flex-col h-full shadow-[0_0_5px_0_rgba(0,0,0,0.2)] ">
            <div className="relative h-100 overflow-hidden">
                <Image
                    // src={firstImage || "/placeholder.svg"}
                    src={firstImage || "/placeholder.svg"}
                    alt={building.images[0].altText || building.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 text-sm font-bold mb-2 opacity-90">
                        <MapPin className="icon-size" />
                        {location}
                    </div>
                    <h2 className="font-serif text-3xl font-bold">{building.name}</h2>
                </div>
            </div>
            <div className="p-8 pb-12 flex-1 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                    <p className="text-base text-neutral-500 h-24 line-clamp-3 leading-relaxed">{building.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Building2 className="icon-size" />
                        {building.rooms.length} Available Unit(s)
                    </div>
                </div>
                <FunctionalButton className="w-full group " >
                    <Link className='flex items-center' href={`/buildings/${building.slug}`}>
                        View Available Units
                        <ArrowRight className="ml-2 icon-size group-hover:translate-x-1 transition-transform" />
                    </Link>
                </FunctionalButton>
            </div>
        </CardContainer>
    )
}
