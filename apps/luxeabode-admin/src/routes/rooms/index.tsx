import RoomCard from '@/features/rooms/components/roomCard'
import { useRooms } from '@/features/rooms/hooks/useRooms'
import FunctionalButton from '@repo/ui/functionalButton'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import ServerErrorMessage from '@repo/ui/serverErrorMessage'
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
                    title={"No Rooms Found"}
                    desc="It looks like there are no rooms in the system yet. Click the button below to add your first room."
                    btnText='Add New Room'
                    onClick={() => navigate({ to: '/rooms/new' })}
                />
            )
            }
            {listError && (
                <div className="flex items-center justify-center h-200">
                    <ServerErrorMessage title="Something went wrong" desc="Please try again later." />
                </div>
            )}
        </div>
    )
}


