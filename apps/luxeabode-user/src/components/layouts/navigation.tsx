"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Building2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-serif text-xl font-bold text-foreground">LuxeStay</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/buildings"
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                            Browse Locations
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="ghost" asChild>
                            <Link href="/apartments">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/apartments">Book Now</Link>
                        </Button>
                    </div>

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
