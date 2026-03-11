import React from 'react'
import CardContainer from './cardContainer'
import type { Room } from "../../db/index"
import { Bed, Square, Users } from 'lucide-react'

interface RoomCard {
  room: Room
}

export default function RoomCard({ room }: RoomCard) {
  const list = [
    { icon: Users, label: "Guests", value: room.guests },
    { icon: Bed, label: "Beds", value: room.beds },
    { icon: Square, label: "m²", value: room.size },
  ]
  return (
    <CardContainer>
      <div className="relative h-64 overflow-hidden">
        {/* <Image
                    src={unit.image || "/placeholder.svg"}
                    alt={unit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  /> */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
          $/night
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="font-serif text-xl font-bold mb-4">{room.name}</h2>

        <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
          <div className="flex flex-col items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase">Guests</span>
            <span className="text-sm font-medium">{unit.guests}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase">Beds</span>
            <span className="text-sm font-medium">{unit.beds}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Square className="w-4 h-4 text-primary" />
            <span className="text-[10px] text-muted-foreground uppercase">m²</span>
            <span className="text-sm font-medium">{unit.size}</span>
          </div>
        </div>

        <div className="mt-auto">
          <Button className="w-full" asChild>
            <Link href={`/apartments/${unit.id}`}>View Details & Book</Link>
          </Button>
        </div>
      </div>
    </CardContainer>
  )
}



const MinorDetail = ({ icon, label, value }: {
  icon: React.ReactNode
  label: string
  value: string
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
