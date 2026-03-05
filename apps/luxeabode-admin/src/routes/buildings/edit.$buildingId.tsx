import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buildings/edit/$buildingId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/buildings/edit/$buildingId"!</div>
}
