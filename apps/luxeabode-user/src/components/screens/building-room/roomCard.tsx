import { Apartment } from '@repo/db'
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import { Bed, Sofa, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import formatNairaCurrency from '@repo/helpers/formatNairaCurrency'

interface RoomCardProps {
    room: Apartment
}

export default function RoomCard({ room }: RoomCardProps) {
    return (
        <CardContainer
            className="shadow overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group p-0"
        >
            <div className="relative h-100 overflow-hidden">
                <Image
                    src={room.images[0]?.url || "/placeholder.svg"}
                    alt={room.images[0]?.altText || room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    {formatNairaCurrency(room.nightlyRate)}/night
                </div>
            </div>
            <div className="p-8 space-y-8">
                <h2 className="text-xl font-bold mb-4">{room.name}</h2>

                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
                    <DetailCard icon={<Users className='icon-size' />} title="Guests" value={room.maxGuests.toString()} />
                    <DetailCard icon={<Bed className='icon-size' />} title="Beds" value={room.bedrooms.toString()} />
                    <DetailCard icon={<Sofa className='icon-size' />} title="Sitting Room" value={`${room.hasSittingRoom}`} />
                </div>

                <div className="mt-auto">
                    <FunctionalButton className="w-full" asChild>
                        <Link href={`/apartments/${room.slug}`}>View Details & Book</Link>
                    </FunctionalButton>
                </div>
            </div>
        </CardContainer>
    )
}

const DetailCard = ({ icon, title, value }: { icon: ReactElement, title: string, value: string }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            {icon}
            <span className="text-sm text-muted-foreground uppercase">{title}</span>
            <span className="text-base font-medium">{value}</span>
        </div>
    )
}