import RoomCard from '@/features/rooms/components/roomCard'
import { useRooms } from '@/features/rooms/hooks/useRooms'
import FunctionalButton from '@repo/ui/functionalButton'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import { Spinner } from '@repo/ui/spinner'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/rooms/')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const { rooms, isLoading, listError } = useRooms()
    return (
        <div className="xtrw" >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <TitleDescContainer title={"Rooms Management"} desc='Create, edit, and manage your property inventory.' />
                <FunctionalButton asChild>
                    <Link to="/rooms/new">
                        <Plus className="icon-size" />
                        Add New Room
                    </Link>
                </FunctionalButton>
            </div>
            {/* <CardContainer className="p-4 mb-8 border-border/50 bg-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-size text-muted-foreground" />
            <InputText field={{}} placeholder="Search buildings..." className="pl-12 h-16" />
          </div>
        </div>
      </CardContainer> */}
            {isLoading && <div className='flex items-center justify-center'><Spinner className='size-16' /></div>}
            {!isLoading && rooms?.data && <div className="grid gap-6">
                {rooms?.data?.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>}
            {rooms?.data?.length === 0 && (
                <NotFoundErrorMessage
                    title={listError?.message || "No Rooms Found"}
                    desc="It looks like there are no rooms in the system yet. Click the button below to add your first room."
                    btnText='Add New Room'
                    onClick={() => navigate({ to: '/rooms/new' })}
                />
            )
            }
        </div>
    )
}

const ROOMS = [
    {
        id: "1",
        name: "Executive Skyline Suite",
        building: "Skyline Residency", // added building association
        type: "Suite",
        status: "Available",
        price: 250,
        guests: 4,
        beds: 2,
        image: "/luxury-living-room.png",
    },
    {
        id: "2",
        name: "Urban Garden Loft",
        building: "Garden View Apartments", // added building association
        type: "Loft",
        status: "Occupied",
        price: 180,
        guests: 2,
        beds: 1,
        image: "/modern-apartment-garden-loft.jpg",
    },
    {
        id: "3",
        name: "Serene Riverview Penthouse",
        building: "River View Penthouse", // added building association
        type: "Penthouse",
        status: "Available",
        price: 450,
        guests: 6,
        beds: 3,
        image: "/luxury-penthouse-river-view.jpg",
    },
]
