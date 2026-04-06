"use client"

import React from 'react'
import { User, Bookmark, Settings, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import FunctionalButton from '@repo/ui/functionalButton'
import { Button } from '../ui/button'

const accountLinks = [
    {
        href: '/account/profile',
        label: 'Profile',
        icon: User,
    },
    {
        href: '/account/bookings',
        label: 'My Bookings',
        icon: Bookmark,
    },
    {
        href: '/account/settings',
        label: 'Settings',
        icon: Settings,
    },
]

export default function UserAccountSideNavigation() {
    const pathname = usePathname()
    return (
        <div className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-20">
                <h2 className="font-serif text-lg font-bold mb-6">My Account</h2>

                <nav className="space-y-2 mb-8">
                    {accountLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <FunctionalButton
                                variant={isActive ? 'default' : 'ghost'}
                                className={`w-full justify-start gap-2 ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground'
                                    }`}
                                asChild
                            >
                                <Link key={link.href} href={link.href}>
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            </FunctionalButton>
                        )
                    })}
                </nav>

                <div className="border-t border-border pt-6">
                    <FunctionalButton
                        variant="ghost"
                        className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </FunctionalButton>
                </div>
            </div>
        </div>
    )
}