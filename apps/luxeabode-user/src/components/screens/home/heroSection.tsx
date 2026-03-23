import FunctionalButton from '@repo/ui/functionalButton'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HeroSection() {
    return (
        <section className="relative min-h-280 overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/modern-luxury-apartment-interior-with-floor-to-cei.jpg"
                    alt="Luxury apartment interior"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/70" />
            </div>

            <div className="relative z-10 xtrw space-y-12 text-center ">
                <span className="block w-fit mx-auto text-sm bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-3">
                    Book Your Dream Stay
                </span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance">
                    Luxury Apartments,
                    <br />
                    <span className="text-primary">Unforgettable Stays</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-240 mx-auto text-pretty">
                    Experience the comfort of home with the luxury of a hotel. Book premium short-term apartments in the
                    city's best locations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <FunctionalButton size="lg" className="px-8 text-lg shadow-xl shadow-primary/20" asChild>
                        <Link href="/apartments">
                            <Search className="w-5 h-5 mr-2" />
                            Browse Apartments
                        </Link>
                    </FunctionalButton>
                    <FunctionalButton
                        size="lg"
                        variant="outline"
                        className="px-8 text-lg bg-background/50 backdrop-blur shadow"
                        asChild
                    >
                        <Link href="#features">Learn More</Link>
                    </FunctionalButton>
                </div>
            </div>
        </section>
    )
}
