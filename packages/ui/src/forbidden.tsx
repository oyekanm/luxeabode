type ForbiddenProps = {
    action?: string                    // e.g. "create apartments"
}

export default function Forbidden({ action }: ForbiddenProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="text-6xl">🔒</div>
            <h2 className="text-xl font-semibold text-foreground">Access Restricted</h2>
            <p className="text-muted-foreground text-center max-w-sm">
                {action
                    ? `You don't have permission to ${action}.`
                    : "You don't have permission to view this page."}
                {' '}Contact a super admin to request access.
            </p>
        </div>
    )
}