import { apiClient } from '@/lib/api-client'
import { Room } from '@repo/db'
import { getClientError } from '@repo/helpers/getClientError'
import NotFoundErrorMessage from '@repo/ui/notFoundErrorMessage'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import RoomCard from '../building-room/roomCard'

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
              <RoomCard room={room} key={i} />
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