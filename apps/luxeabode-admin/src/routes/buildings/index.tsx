import BuildingCard from '@/features/buildings/components/buildingCard'
import { useBuildings } from '@/features/buildings/hooks/useBuilding'
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import InputText from '@repo/ui/inputText'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import ServerErrorMessage from '@repo/ui/serverErrorMessage'
import { Spinner } from '@repo/ui/spinner'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  Plus,
  Search
} from 'lucide-react'

export const Route = createFileRoute('/buildings/')({
  component: BuildingsManagementPage,
})

function BuildingsManagementPage() {
  const navigate = useNavigate()
  const { buildings, isLoading, listError } = useBuildings()

  // console.log(buildings?.length)

  return (
    <div className="xtrw">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <TitleDescContainer title={"Buildings Management"} desc='Manage your building locations and their properties.' />
        <FunctionalButton asChild>
          <Link to="/buildings/new">
            <Plus className="icon-size" />
            Add New Building
          </Link>
        </FunctionalButton>
      </div>
      <CardContainer className="p-4 mb-8 border-border/50 bg-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-size text-muted-foreground" />
            <InputText field={{}} placeholder="Search buildings..." className="pl-12 h-16" />
          </div>
        </div>
      </CardContainer>
      {isLoading && <div className='flex items-center justify-center'><Spinner className='size-16' /></div>}
      {!isLoading && buildings && <div className="grid gap-6">
        {buildings?.map((building) => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </div>}
      {!isLoading && buildings?.length === 0 && (
        <NotFoundErrorMessage
          title={"No Buildings Found"}
          desc="It looks like there are no buildings in the system yet. Click the button below to add your first building."
          btnText='Add New Building'
          onClick={() => navigate({ to: '/buildings/new' })}
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


