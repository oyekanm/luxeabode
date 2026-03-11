import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rooms/edit/$roomSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rooms/edit/$roomSlug"!</div>
}
