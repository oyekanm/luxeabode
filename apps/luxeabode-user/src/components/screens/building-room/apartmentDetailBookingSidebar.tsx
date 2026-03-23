"use client"

import { Separator } from '@/components/ui/separator'
import { Room } from '@repo/db'
import formatNairaCurrency from '@repo/helpers/formatNairaCurrency'
import CardContainer from '@repo/ui/cardContainer'
import FunctionalButton from '@repo/ui/functionalButton'
import InputText from '@repo/ui/inputText'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'

interface Props {
    apartment: Room
}

export default function ApartmentDetailBookingSidebar({ apartment }: Props) {
    const [guests, setGuests] = useState<number>(1)
    const field = {
        value: guests,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setGuests(Number(e.target.value))
        }
    }

    const isGuestError = useMemo(() => {
        if (guests > apartment.maxGuests) {
            return true
        }
        return false
    }, [guests, apartment.maxGuests])

    const handleReserve = () => {
        // save guest number and checkin and out to kv
    }

    const isReserved = useMemo(() => {
        return guests > 0 && !isGuestError
    }, [guests, isGuestError])

    return (
        <div className="lg:col-span-1">
            <CardContainer className="sticky top-24 p-8 border-border shadow-xl rounded-2xl space-y-16">
                <div className="space-y-4">
                    <div>
                        <span className="text-3xl font-bold text-primary">{formatNairaCurrency(apartment.nightlyRate)}</span>
                        <span className="text-neutral-500 text-base"> / night</span>
                    </div>
                    <div className="text-base text-success font-medium flex items-center gap-1">
                        <ShieldCheck className="icon-size" />
                        Best Price Guarantee
                    </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Check In</label>
                      <Input type="date" className="h-12" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Check Out</label>
                      <Input type="date" className="h-12" />
                    </div>
                  </div> */}

                <div className="space-y-1">
                    <label className="text-base font-medium text-neutral-700">Guests</label>
                    <InputText field={field} />
                    <p className="text-sm text-neutral-500">Max {apartment.maxGuests} guests</p>
                    {isGuestError && <span className="text-red-500 text-base">Guests cannot be more than {apartment.maxGuests}</span>}
                </div>



                <FunctionalButton disable={isReserved} className="w-full text-lg font-bold" asChild>
                    <Link href={`/apartments/${apartment.id}/book`}>Reserve Now</Link>
                </FunctionalButton>

                <p className="text-center text-sm text-neutral-500">You won't be charged yet</p>

                <div className="pt-8 border-t border-border space-y-4">
                    <div className="flex justify-between text-base">
                        <span className="text-muted-foreground">{formatNairaCurrency(apartment.nightlyRate)} x 5 nights</span>
                        <span className="font-medium">{formatNairaCurrency(apartment.nightlyRate * 5)}</span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cleaning fee</span>
                    <span className="font-medium">{formatNairaCurrency(apartment.cleaningFee)}</span>
                  </div> */}
                    <div className="flex justify-between text-base">
                        <span className="text-muted-foreground">Service fee</span>
                        <span className="font-medium">{formatNairaCurrency(500)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">{formatNairaCurrency(apartment.nightlyRate * 5 + 500)}</span>
                    </div>
                </div>
            </CardContainer>
        </div>
    )
}