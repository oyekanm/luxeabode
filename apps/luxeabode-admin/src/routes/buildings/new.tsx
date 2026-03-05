import GoBack from '@/components/reuseable/goback'
import AddNewBuildingForm from '@/features/buildings/components/addNewBuildingForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buildings/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="xtrw">
      <GoBack to="/buildings" title="Back to Buildings" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Add New Building</h1>
          <p className="text-neutral-500 text-base">
            Create a new building location to house your apartment units.
          </p>
        </div>
      </div>
      <AddNewBuildingForm />
    </div>
  )
}
