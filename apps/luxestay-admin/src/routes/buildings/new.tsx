import AddNewBuildingForm from '@/features/buildings/components/addNewBuildingForm'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'

export const Route = createFileRoute('/buildings/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="xtrw">
      <Link
        to="/buildings"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary mb-6 transition-colors group"
      >
        <ChevronLeft className="icon-size group-hover:-translate-x-1 transition-transform" />
        Back to Buildings
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="strong text-3xl font-bold">Add New Building</h1>
          <p className="text-neutral-500">
            Create a new building location to house your apartment units.
          </p>
        </div>
      </div>
      <AddNewBuildingForm />
    </div>
  )
}
