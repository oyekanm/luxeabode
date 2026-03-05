import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/buildings/$buildingId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/buildings/$buildingId"!</div>
}
