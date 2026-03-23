import { Room } from '@repo/db'
import Image from 'next/image'
import React from 'react'

interface Props {
    apartment: Room
}

export default function HeroGalery({ apartment }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-160 md:h-240 rounded-2xl overflow-hidden bg-transparent ">
            <div className="md:col-span-3 relative h-full">
                <Image
                    src={apartment.images[0].url || "/placeholder.svg"}
                    alt={apartment.images[0].altText || apartment.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="hidden md:flex flex-col gap-4 h-full">
                {apartment.images.slice(1, 3).map((img, i) => (
                    <div key={i} className="relative h-1/2">
                        <Image
                            src={img.url || "/placeholder.svg"}
                            alt={img.altText || apartment.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
            <div className="hidden md:flex flex-col gap-4 h-full">
                {apartment.images.slice(3, 5).map((img, i) => (
                    <div key={i} className="relative h-1/2">
                        <Image
                            src={img.url || "/placeholder.svg"}
                            alt={img.altText || apartment.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}