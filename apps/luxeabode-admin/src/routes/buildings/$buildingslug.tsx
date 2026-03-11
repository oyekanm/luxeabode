import GoBack from '@/components/reuseable/goback'
import useSingleBuilding from '@/features/buildings/hooks/useSIngleBuilding'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Loader, MapPin } from 'lucide-react'
import TitleDescContainer from "@repo/ui/titleDescContainer"
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import ServerErrorMessage from '@repo/ui/serverErrorMessage'
import { Spinner } from '@repo/ui/spinner'

export const Route = createFileRoute('/buildings/$buildingslug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { buildingslug } = Route.useParams()
  const { building, isLoading, listError } = useSingleBuilding(buildingslug)
  const navigate = useNavigate()

  if (listError?.status === 404) {
    return <NotFoundErrorMessage title="404" desc={listError?.message || "Building not found"} btnText="Back to All Buildings" onClick={() => navigate({ to: '/buildings' })} />
  }

  if (isLoading) return <div className='flex items-center justify-center'><Spinner className='size-16' /></div>

  if (listError?.status === 500) return <ServerErrorMessage title="500" desc={listError?.message || "Internal server error"} />

  const location = `${building?.data?.city}, ${building?.data?.state}`
  return (
    <div className="xtrw space-y-16">
      <GoBack to="/buildings" title="Back to All Buildings" />

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs mb-2">
          <MapPin className="icon-size" />
          {location}
        </div>
        <TitleDescContainer title={building?.data?.name || ""} desc='Browse all available units at this location' />
      </div>

      {/* {bi ? <></>:<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {building?.data?.rooms.map((unit) => (
            
            ))}
          </div>} */}
    </div>
  )
}
