"use client"

import FunctionalButton from '@repo/ui/functionalButton';
import { useEffect, useState, useTransition } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"
import ModalBg from "@repo/ui/modalBg"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BookingFilters } from '@/lib/validators/bookingSchema';

interface Props {
    setDates: (filters: Partial<BookingFilters>) => void
    clearDates: () => void,
    filters: BookingFilters
}

export default function DateRangeComponent({ setDates, clearDates, filters }: Props) {
    const [disabledDates, setDisabledDates] = useState<Date[]>([])
    const [open, setOpen] = useState(false)
    const [dateRange, setDateRange] = useState<any>([
        {
            startDate: filters.startDate || new Date(),
            endDate: filters.endDate || new Date(),
            key: 'selection',
        }
    ]);

    const changeDate = (item: any) => {
        const events = {
            startDate: format(item.selection.startDate, 'MM-dd-yyyy'),
            endDate: format(item.selection.endDate, 'MM-dd-yyyy'),
        }

        setDates(events)

        setDateRange([item.selection])
    }

    const reset = () => {
        setDateRange([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
        ])
        clearDates()
    }
    console.log(dateRange)
    return (
        <div>
            <div onClick={() => setOpen(true)} className='grid grid-cols-2 items-center p-2 h-20 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors duration-300'>
                <div className=''>
                    <span className='uppercase font-semibold'> check-in</span>
                    <p className='text-[1.3rem]'>{format(dateRange[0].startDate, 'MMM dd, yyyy')}</p>
                </div>
                <div className=' '>
                    <span className='uppercase font-semibold'>check-out</span>
                    <p className='text-[1.3rem]'>{format(dateRange[0].endDate, 'MMM dd, yyyy')}</p>
                </div>
            </div>
            {open && (
                <ModalBg noClose onClose={() => setOpen(false)}>
                    <div className='rangewidth'>
                        <div className='hidden md:block'>
                            <DateRange
                                ranges={dateRange}
                                onChange={item => changeDate(item)}
                                months={2}
                                // disabledDates={disabledDates}
                                direction={'horizontal'}
                                startDatePlaceholder='Check-in'
                                endDatePlaceholder='Check-out'
                                className='w-full'
                                minDate={new Date()}
                            // showMonthAndYearPickers
                            />
                        </div>
                        <div className='block md:hidden'>
                            <DateRange
                                ranges={dateRange}
                                onChange={item => changeDate(item)}
                                months={1}
                                direction={'horizontal'}
                                // disabledDates={disabledDates}
                                startDatePlaceholder='Check-in'
                                endDatePlaceholder='Check-out'
                                className='w-full'
                                minDate={new Date()}
                                classNames={{ dayActive: "text-[1.4rem]" }}
                            />
                        </div>
                        <div className='text-right'>
                            <FunctionalButton click={() => setOpen(false)} variant={'link'} text='Cancel' className='!bg-transparent hover:!bg-transparent underline font-semibold text-[1.3rem]' />
                            <FunctionalButton click={reset} text='Clear dates' />
                        </div>
                    </div>
                </ModalBg>
            )
            }
        </div>
    )
}



