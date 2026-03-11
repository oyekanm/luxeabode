// import type { Apartment } from '@repo/db/schema'
import type { Apartment } from '@repo/db'
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import { Link } from '@tanstack/react-router'
import { Building2, Edit2, Eye, MapPin, Trash2 } from 'lucide-react'
import useDeleteBuilding from '../hooks/useDeleteBuilding'

interface BuildingCardProps {
  building: Apartment
}

export default function BuildingCard({ building }: BuildingCardProps) {
  const { deleteBuilding, isDeleting } = useDeleteBuilding()
  return (
    <CardContainer className="overflow-hidden pl-0 py-0 pr-0 md:pr-8 border-border/50 group">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-120 h-60 md:h-100">
          <img
            src={building.images.length > 0 ? building.images[0].url : '/placeholder.svg'}
            alt={building.images.length > 0 ? building.images[0].altText! : building.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <h3 className="strong text-2xl font-bold">{building.name}</h3>
              <div className={building.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                {building.isActive ? 'Active' : 'Inactive'}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 text-base text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="icon-size" /> {building.city}, {building.state}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="icon-size" /> {building.rooms.length} Units
              </span>
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
                click={() => !button.click ? null : button.click(deleteBuilding, building.slug)}
              >
                {button.asChild ? (
                  <Link
                    to={button.to}
                    params={{ buildingslug: building.slug, buildingSlug: building.slug }}
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
    label: 'View Page',
    icon: <Eye className="icon-size" />,
    variant: 'outline',
    className: 'h-9 bg-transparent',
    asChild: true,
    to: '/buildings/$buildingslug'
  },
  {
    label: 'Edit',
    icon: <Edit2 className="icon-size" />,
    variant: 'outline',
    className: 'h-9 bg-transparent',
    to: '/buildings/edit/$buildingSlug',
    asChild: true,
  },
  {
    label: 'Delete',
    icon: <Trash2 className="icon-size" />,
    variant: 'outline',
    className:
      'h-9 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20',
    asChild: false,
    click: async (deleteBuilding: (slug: string) => void, slug: string) => {
      deleteBuilding(slug)
    },
    to: '/buildings',
    disable: (isDeleting: boolean) => {
      return isDeleting
    }
  },
]
