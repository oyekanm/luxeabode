import GoBack from '@/components/reuseable/goback'
import EditBuildingForm from '@/features/buildings/components/editBuildingForm'
import useSingleBuilding from '@/features/buildings/hooks/useSIngleBuilding'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import { Spinner } from '@repo/ui/spinner'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/buildings/edit/$buildingSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { buildingSlug } = Route.useParams()
  const { building, isLoading, listError } = useSingleBuilding(buildingSlug)
  const navigate = useNavigate()
  return (
    <div className="xtrw">
      <GoBack to="/buildings" title="Back to Buildings" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <TitleDescContainer title={`Edit ${buildingSlug}`} desc='Edit your building location and its properties.' className='space-y-4' />
      </div>
      {isLoading && <div className='flex items-center justify-center'><Spinner className='size-16' /></div>}
      {listError?.status === 404 && <NotFoundErrorMessage title="404" desc={listError?.message || "Building not found"} btnText="Back to All Buildings" onClick={() => navigate({ to: '/buildings' })} />}
      {building?.data && <EditBuildingForm buildingSlug={buildingSlug} building={building.data!} />}
    </div>
  )
}
