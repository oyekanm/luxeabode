import { apiClient } from '@/lib/api-client'
import { Room } from '@repo/db'
import { getClientError } from '@repo/helpers/getClientError'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import TitleDescContainer from '@repo/ui/titleDescContainer'

export default async function FeaturedRoomSection() {
  try {
    const resp = await apiClient.get<Room[]>('/rooms-featured')

    if (resp.data?.length === 0) return null

    return (
      <section>
        <div className="xtrw space-y-24">
          <TitleDescContainer title="Featured Rooms" desc="Discover our most popular and luxurious rooms" className='text-center' />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resp.data?.map((room, i) => (
              <div key={i}>
                {room.name}
              </div>
              // <Card key={i} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
              //   <div className="relative h-64 overflow-hidden">
              //     <Image
              //       src={room.image}
              //       alt={room.title}
              //       fill
              //       className="object-cover transition-transform duration-500 hover:scale-105"
              //     />
              //     <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
              //       {room.price}
              //     </div>
              //   </div>
              //   <div className="p-6">
              //     <h3 className="font-serif text-xl font-bold mb-2">{room.title}</h3>
              //     <p className="text-muted-foreground mb-4">{room.description}</p>
              //     <div className="flex items-center gap-4 mb-4">
              //       <div className="flex items-center gap-2">
              //         <Bed className="w-5 h-5 text-muted-foreground" />
              //         <span className="text-sm text-muted-foreground">{room.beds} beds</span>
              //       </div>
              //       <div className="flex items-center gap-2">
              //         <Bath className="w-5 h-5 text-muted-foreground" />
              //         <span className="text-sm text-muted-foreground">{room.baths} baths</span>
              //       </div>
              //     </div>
              //     <Button className="w-full">
              //       Book Now
              //       <ArrowRight className="ml-2 w-4 h-4" />
              //     </Button>
              //   </div>
              // </Card>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.log(error, "error")
    const apiError = getClientError(error)
    if (apiError?.status === 404) return (
      <section>
        <div className="xtrw">
          <NotFoundErrorMessage
            title={apiError.message || "No Featured Rooms Found"}
            desc="It looks like there are no featured rooms in the system yet. Check back later for new listings."
          />
        </div>
      </section>
    )

    return <div className="text-center">Something went wrong</div>
  }
}