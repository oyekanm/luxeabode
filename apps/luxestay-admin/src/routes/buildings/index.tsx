import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Building2,
  Eye,
} from 'lucide-react'
import { Suspense } from 'react' // added Suspense import
import BuildingCard from '@/features/buildings/components/buildingCard'
import FunctionalButton from '@repo/ui/functionalButton'

const BUILDINGS = [
  {
    id: '1',
    name: 'Skyline Residency',
    location: 'Downtown District',
    units: 12,
    status: 'Active',
    image: '/luxury-apartment-skyline-view.jpg',
  },
  {
    id: '2',
    name: 'Riverview Heights',
    location: 'Riverside Area',
    units: 8,
    status: 'Active',
    image: '/luxury-penthouse-river-view.jpg',
  },
]

export const Route = createFileRoute('/buildings/')({
  component: BuildingsManagementPage,
})

function BuildingsManagementPage() {
  return (
    <div className="min-h-screen">
      <div className="xtrw">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-3">
            <h1 className="text-4xl text-neutral-900 font-bold strong">
              Buildings Management
            </h1>
            <p className="text-neutral-500 text-lg">
              Manage your building locations and their properties.
            </p>
          </div>
          <FunctionalButton asChild>
            <Link to="/buildings/new">
              <Plus className="icon-size" />
              Add New Building
            </Link>
          </FunctionalButton>
        </div>
        <Card className="p-4 mb-8 border-border/50 bg-card">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search buildings..." className="pl-10 h-10" />
            </div>
          </div>
        </Card>
        <div className="grid gap-6">
          {BUILDINGS.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`border border-border/50 rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
}

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`border border-border/50 rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
}
