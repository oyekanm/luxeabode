// import type { Apartment } from '@repo/db/schema'
import CardContainer from '@repo/ui/cardContainer'
import { Link } from '@tanstack/react-router'
import FunctionalButton from '@repo/ui/functionalButton'
import { Edit2, Trash2, MapPin, Building2, Eye } from 'lucide-react'

interface BuildingCardProps {
  // building:Apartment
  building: {
    id: string
    name: string
    location: string
    units: number
    status: string
    image: string
  }
}

export default function BuildingCard({ building }: BuildingCardProps) {
  return (
    <CardContainer className="overflow-hidden pl-0 py-0 border-border/50 group">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-120 h-60 md:h-100">
          <img
            src={building.image || '/placeholder.svg'}
            alt={building.name}
            className="object-cover w-full "
          />
        </div>
        <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <h3 className="strong text-2xl font-bold">{building.name}</h3>
              <div className="bg-green-100 text-green-600 px-2 py-1 rounded-[.6rem]">
                {building.status}
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 text-base text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="icon-size" /> {building.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="icon-size" /> {building.units} Units
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {cardButtonValues.map((button) => (
              <FunctionalButton
                key={button.label}
                variant={button.variant as any}
                className={button.className}
                asChild={button.asChild}
              >
                {button.asChild ? (
                  <Link
                    to={`/buildings/$buildingId`}
                    params={{ buildingId: building.id }}
                    target="_blank"
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
  },
  {
    label: 'Edit',
    icon: <Edit2 className="icon-size" />,
    variant: 'outline',
    className: 'h-9 bg-transparent',
  },
  {
    label: 'Delete',
    icon: <Trash2 className="icon-size" />,
    variant: 'outline',
    className:
      'h-9 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20',
  },
]

const returnLink = ()=>{
  
}
