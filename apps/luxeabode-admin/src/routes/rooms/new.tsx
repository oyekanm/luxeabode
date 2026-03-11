import GoBack from '@/components/reuseable/goback'
import { createFileRoute } from '@tanstack/react-router'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import AddNewRoomContainer from '@/features/rooms/containers/addNewRoomContainer'

export const Route = createFileRoute('/rooms/new')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="xtrw">
            <GoBack to="/rooms" title="Back to Rooms" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <TitleDescContainer title={"Add New Room"} desc='Create a new room unit for your apartment.' />
            </div>
            <AddNewRoomContainer />
        </div>
    )
}
