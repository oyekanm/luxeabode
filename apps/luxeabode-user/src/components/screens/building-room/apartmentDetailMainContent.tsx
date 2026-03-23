import { Room } from "@repo/db";
import React from "react";
import { Bed, CheckCircle2, ChevronRight, MapPin, Sofa, Square, Users } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import getLocation from "@repo/helpers/getLocation";

interface Props {
    apartment: Room
}

export default function ApartmentDetailMainContent({ apartment }: Props) {
    const building = apartment.apartment
    const location = getLocation(building?.city!, building?.state!)

    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-base text-neutral-500">
                        <MapPin className="icon-size" />
                        {location}
                    </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold">{apartment.name}</h1>
                <p className="text-lg text-neutral-500">{apartment.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-muted/30 rounded-2xl border border-border">
                <div className="flex flex-col gap-1">
                    <Users className="icon-size text-primary" />
                    <span className="text-base font-semibold">{apartment.maxGuests} Guest(s)</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Bed className="icon-size text-primary" />
                    <span className="text-base font-semibold">{apartment.bedrooms} Bedroom(s)</span>
                </div>
                <div className="flex flex-col gap-1">
                    <Sofa className="icon-size text-primary" />
                    <span className="text-base font-semibold">{apartment.hasSittingRoom ? "Sitting Room" : "No Sitting Room"}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <CheckCircle2 className="icon-size text-success" />
                    <span className="text-base font-semibold">Instant Book</span>
                </div>
            </div>

            <Separator />

            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {apartment.amenities?.map((item) => (
                        <div key={item} className="flex items-center gap-4 text-neutral-500">
                            <CheckCircle2 className="icon-size text-primary" />
                            <span className="text-base">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">House Rules</h2>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-base text-neutral-500">
                        <div className="size-3 rounded-full bg-primary" />
                        Check-in after {building?.checkInTime}
                    </li>
                    <li className="flex items-center gap-3 text-base text-neutral-500">
                        <div className="size-3 rounded-full bg-primary" />
                        Check-out before {building?.checkOutTime}
                    </li>
                    <li className="flex items-center gap-3 text-base text-neutral-500">
                        <div className="size-3 rounded-full bg-primary" />
                        No smoking or parties
                    </li>
                </ul>
            </div>
        </div>
    );
}