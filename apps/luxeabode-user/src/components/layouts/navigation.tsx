"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"
import useAuth from "@/hooks/use-auth"
import FunctionalButton from "@repo/ui/functionalButton"
import LogoutBtn from "../reuseable/logoutBtn"

export function Navigation() {
    const { session } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    console.log(session)

    return (
        <header className="sticky top-0 z-50 bg-card/95  border-b border-border">
            <nav className="xtrw py-8!">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="size-12 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Building2 className="icon-size text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">Luxeabode</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {
                            navigations.map(nav => {
                                return (
                                    <Link
                                        key={nav.href}
                                        href={nav.href}
                                        className="text-base font-medium text-neutral-500 hover:text-primary transition-colors"
                                    >
                                        {nav.label}
                                    </Link>
                                )
                            })
                        }
                    </div>

                    {/* CTA Buttons */}
                    {session.data ?
                        (
                            <div className="hidden md:flex items-center gap-3">
                                <LogoutBtn />
                            </div>
                        )
                        :
                        (
                            <div className="hidden md:flex items-center gap-3">
                                <FunctionalButton variant="ghost" asChild>
                                    <Link className="text-primary" href="/auth/sign-in">Sign In</Link>
                                </FunctionalButton>
                                <FunctionalButton asChild>
                                    <Link href="/auth/sign-up">Sign Up</Link>
                                </FunctionalButton>
                            </div>
                        )
                    }

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-border">
                        <Link
                            href="/buildings"
                            className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Browse Locations
                        </Link>
                        <Link
                            href="/about"
                            className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="pt-3 flex flex-col gap-2">
                            <Button variant="outline" className="w-full bg-transparent" asChild>
                                <Link href="/apartments">Sign In</Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/apartments">Book Now</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}


const navigations = [
    {
        label: "Browse Locations",
        href: "/buildings",
    },
    {
        label: "All Apartments",
        href: "/apartments",
    },
    {
        label: "About Us",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
]