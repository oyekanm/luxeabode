'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Building2, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const BOOKINGS = [
  {
    id: 'BK-1003',
    building: 'Skyline Towers',
    unit: 'Executive Skyline Suite',
    location: 'Downtown District',
    image: '/luxury-living-room.png',
    dates: 'Jan 12 - Jan 17, 2026',
    status: 'Confirmed',
    price: 1325,
    type: 'upcoming',
  },
  {
    id: 'BK-1002',
    building: 'Green Park Residences',
    unit: 'Modern Garden Loft',
    location: 'North Hill',
    image: '/modern-apartment-garden-loft.jpg',
    dates: 'Feb 20 - Feb 25, 2026',
    status: 'Pending',
    price: 895,
    type: 'upcoming',
  },
  {
    id: 'BK-1001',
    building: 'Downtown Living',
    unit: 'Minimalist Zen Studio',
    location: 'North Hill',
    image: '/minimalist-studio-apartment.jpg',
    dates: 'Dec 15 - Dec 20, 2025',
    status: 'Completed',
    price: 675,
    type: 'past',
  },
]

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage all your reservations</p>
        </div>
        <Button asChild>
          <Link href="/buildings">Book New Stay</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-card border border-border p-1">
          <TabsTrigger value="upcoming" className="px-8">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="px-8">
            Past Stays
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {BOOKINGS.filter((b) => b.type === 'upcoming').map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
          {BOOKINGS.filter((b) => b.type === 'upcoming').length === 0 && (
            <EmptyState message="No upcoming bookings found." />
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {BOOKINGS.filter((b) => b.type === 'past').map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookingCard({ booking }: { booking: any }) {
  const isUpcoming = booking.type === 'upcoming'
  const isPending = booking.status === 'Pending'

  return (
    <Card className="overflow-hidden border-border hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-40 md:h-auto flex-shrink-0">
          <Image
            src={booking.image || '/placeholder.svg'}
            alt={booking.unit}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-6 space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant={isUpcoming ? 'default' : 'secondary'}
                  className={
                    isPending
                      ? 'bg-amber-500 hover:bg-amber-600 text-white'
                      : isUpcoming
                        ? 'bg-success hover:bg-success text-success-foreground'
                        : ''
                  }
                >
                  {isPending ? (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  ) : isUpcoming ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {booking.status}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-mono">Building: {booking.building}</p>
                <h3 className="font-serif text-lg font-bold">{booking.unit}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {booking.location}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">${booking.price}</div>
              <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm py-3 border-t border-b border-border">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{booking.dates}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            {isUpcoming && (
              <>
                <Button size="sm">Modify Dates</Button>
                <Button variant="destructive" size="sm">
                  Cancel Booking
                </Button>
              </>
            )}
            {!isUpcoming && (
              <Button size="sm">Write Review</Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <Card className="p-12 text-center border-dashed bg-transparent border-2">
      <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
      <p className="text-muted-foreground mb-4">{message}</p>
      <Button asChild>
        <Link href="/buildings">Browse Available Buildings</Link>
      </Button>
    </Card>
  )
}
