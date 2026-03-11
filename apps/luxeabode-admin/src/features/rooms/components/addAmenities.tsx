import type { CreateRoomInput } from '@/lib/validators/room'
import { useFormContext } from '@repo/ui/form'
import FunctionalButton from '@repo/ui/functionalButton'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import { Plus, Trash } from 'lucide-react'
import React from 'react'


export default function AddAmenities() {
    const form = useFormContext<CreateRoomInput>()
    const amenities = form.watch("amenities") || []

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        // console.log(e.target.value)
        const allAmenities = [...amenities]
        allAmenities[idx] = e.target.value
        form.setValue("amenities", [...allAmenities], { shouldDirty: true })
    }

    const removeAmenity = (idx: number) => {
        const allAmenities = [...amenities]
        allAmenities.splice(idx, 1)
        form.setValue("amenities", [...allAmenities], { shouldDirty: true })
    }

    const setCustom = (text: string) => {
        console.log(text)
        const amenities = form.watch("amenities")
        console.log(amenities)
        const isAvailable = amenities.includes(text)

        console.log(isAvailable)

        if (isAvailable) {
            const newAmenities = amenities.filter(amn => amn !== text)
            form.setValue("amenities", [...newAmenities], { shouldDirty: true })
            return
        }

        amenities.push(text)
        form.setValue("amenities", [...amenities], { shouldDirty: true })
    }

    // Derive the custom ones for the "Custom List" section
    const customAmenities = amenities.map((amn, idx) => {
        return {
            id: idx,
            value: amn
        }
    }).filter(amn => !PRESET_AMENITIES.includes(amn.value));



    return (
        <div className='space-y-4'>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PRESET_AMENITIES.map((amenity) => {
                    const field = {
                        value: amenity,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCustom(e.target.value)
                    }
                    return (
                        <label
                            key={amenity}
                            className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                        >
                            <InputText field={field} type="checkbox" checked={amenities.includes(amenity)} className="w-4 h-4 accent-primary" />
                            <span className="text-sm">{amenity}</span>
                        </label>
                    )
                })}
            </div>
            <InputLabel title={"Add custom Amenities"} />
            {
                customAmenities.map((amenity, idx) => {

                    const field = {
                        value: amenity.value,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e, amenity.id)
                    }
                    return (
                        <div className='relative'>
                            <InputText
                                key={idx}
                                placeholder={"add an amenity"}
                                field={field}
                                type={"text"}
                                className='pr-10'
                            />
                            <Trash className='icon-size text-red-500 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2' onClick={() => removeAmenity(idx)} />
                        </div>
                    )
                })
            }
            <FunctionalButton type='button' className='flex items-center gap-2' click={() => form.setValue("amenities", [...amenities, ""])}>
                <Plus className='icon-size' />
                Add Amenity
            </FunctionalButton>
        </div>
    )
}

const PRESET_AMENITIES = [
    "Free WiFi",
    "Parking Space",
    "Air Conditioning",
    "Coffee Machine",
    "24/7 Security",
    "Fitness Center",
    "Swimming Pool",
    "Kitchen",
    "Washer/Dryer",
    "Balcony",
    "TV",
    "Workspace",
]