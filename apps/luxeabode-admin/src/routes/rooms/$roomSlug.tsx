import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rooms/$roomSlug')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/rooms/$roomSlug"!</div>
}
