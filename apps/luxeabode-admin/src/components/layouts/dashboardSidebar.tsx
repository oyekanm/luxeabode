import {
  Building2,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Link, useLocation } from '@tanstack/react-router'

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-6">
        <Link to={'/'} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            LuxeAdmin
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <SidebarLink href="/" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink href="/buildings" icon={Building2} label="Buildings" />
        <SidebarLink href="/rooms" icon={Building2} label="Rooms" />
        <SidebarLink href="/bookings" icon={Calendar} label="Bookings" />
        <SidebarLink href="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="p-4 mt-auto">
        {/* <Separator className="mb-4" /> */}
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          asChild
        >
          <Link to="/">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Link>
        </Button>
      </div>
    </aside>
  )
}

function SidebarLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: any
  label: string
}) {
  const pathname = useLocation().pathname
  const isActive =
    pathname === href || (href !== '/admin' && pathname.startsWith(href))

  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <Icon
        className={`w-4 h-4 transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}
      />
      {label}
    </Link>
  )
}
