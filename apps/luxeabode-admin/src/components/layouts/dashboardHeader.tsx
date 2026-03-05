import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Search, User } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search everything..."
            className="pl-10 h-10 bg-muted/50 border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
        </Button>
        {/* <Separator orientation="vertical" className="h-6" /> */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold leading-none">Admin User</p>
            <p className="text-xs text-muted-foreground">Property Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}
