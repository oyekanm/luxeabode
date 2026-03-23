// import type { Apartment } from '@repo/db/schema'
import type { Room } from '@repo/db'
import formatNairaCurrency from "@repo/helpers/formatNairaCurrency"
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import { Link } from '@tanstack/react-router'
import { Bed, Edit2, Eye, Trash2, Users } from 'lucide-react'
import useDeleteRoom from '../hooks/useDeleteRoom'

interface RoomCardProps {
    room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
    const { deleteRoom, isDeleting } = useDeleteRoom()
    return (
        <CardContainer className="overflow-hidden pl-0 py-0 pr-0 md:pr-8 border-border/50 group">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-120 h-60 md:h-100">
                    <img
                        src={room.images.length > 0 ? room.images[0].url : '/placeholder.svg'}
                        alt={room.images.length > 0 ? room.images[0].altText! : room.name}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <h3 className="strong text-2xl font-bold">{room.name}</h3>
                            <div className='text-sm text-neutral-500 border border-border/50 px-2 py-1 rounded-full'>
                                {room.apartment?.name}
                            </div>
                            <span>available</span>
                            {/* available / occupied */}
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Users className="icon-size" /> {room.maxGuests} Guest(s)
                            </span>
                            <span className="flex items-center gap-1">
                                <Bed className="icon-size" /> {room.bedrooms} Bed(s)
                            </span>
                            <span className="font-bold text-foreground">{formatNairaCurrency(room.nightlyRate)}/night</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {cardButtonValues.map((button) => (
                            <FunctionalButton
                                key={button.label}
                                variant={button.variant as any}
                                className={button.className}
                                disable={button.disable ? button.disable(isDeleting) : false}
                                asChild={button.asChild}
                                click={() => !button.click ? null : button.click(deleteRoom, room.slug)}
                            >
                                {button.asChild ? (
                                    <Link
                                        to={button.to}
                                        params={{ roomSlug: room.slug }}
                                    >
                                        {button.icon}
                                        {button.label}
                                    </Link>
                                ) : (
                                    <>
                                        {button.icon}
                                        {button.label}
                                    </>
                                )}
                            </FunctionalButton>
                        ))}
                    </div>
                </div>
            </div>
        </CardContainer>
    )
}

const cardButtonValues = [
    {
        label: 'Preview',
        icon: <Eye className="icon-size" />,
        variant: 'outline',
        className: 'h-9 bg-transparent',
        asChild: true,
        to: '/rooms/$roomSlug'
    },
    {
        label: 'Edit',
        icon: <Edit2 className="icon-size" />,
        variant: 'outline',
        className: 'h-9 bg-transparent',
        to: '/rooms/edit/$roomSlug',
        asChild: true,
    },
    {
        label: '',
        icon: <Trash2 className="icon-size" />,
        variant: 'outline',
        className:
            'h-9 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20',
        asChild: false,
        click: async (deleteRoom: (slug: string) => void, slug: string) => {
            deleteRoom(slug)
        },
        to: '/rooms',
        disable: (isDeleting: boolean) => {
            return isDeleting
        }
    },
]
