import GoBack from '@/components/reuseable/goback'
import AddNewBuildingForm from '@/features/buildings/components/addNewBuildingForm'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buildings/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="xtrw">
      <GoBack to="/buildings" title="Back to Buildings" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <TitleDescContainer title={"Add New Building"} desc='Create a new building location to house your apartment units.' />
      </div>
      <AddNewBuildingForm />
    </div>
  )
}
