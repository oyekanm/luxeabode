import UserAccountSideNavigation from '@/components/layouts/userAccountSideNavigation'
import type React from 'react'

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className="xtrw">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <UserAccountSideNavigation />

                    {/* Content */}
                    <div className="md:col-span-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
