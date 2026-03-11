import {
    CreateApartmentSchema,
    type CreateApartmentInput,
} from '@/lib/validators/building'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Apartment } from '@repo/db'
import {
    FormProvider,
    useForm
} from '@repo/ui/form'
import BuildingForm from './buildingForm'
import useEditBuilding from '../hooks/useEditBuilding'
import { useFormPersist } from '../../../hooks/useFormPersist'
import { useEffect } from 'react'

// type FormType = UseFormReturn<CreateApartmentInput>

interface EditBuildingFormProps {
    buildingSlug: string
    building: Apartment
}

export default function EditBuildingForm({ buildingSlug, building }: EditBuildingFormProps) {
    const form = useForm<CreateApartmentInput>({
        resolver: zodResolver(CreateApartmentSchema),
        values: {
            name: building.name,
            description: building.description,
            address: building.address,
            city: building.city,
            state: building.state,
            country: building.country,
            checkInTime: building.checkInTime,
            checkOutTime: building.checkOutTime,
            minStayNights: building.minStayNights || 1,
            rules: building.rules || [],
            images: building.images,
        },
        mode: "onChange"
    })

    // reset form value with data
    useEffect(() => {
        form.reset({
            name: building.name,
            description: building.description,
            address: building.address,
            city: building.city,
            state: building.state,
            country: building.country,
            checkInTime: building.checkInTime,
            checkOutTime: building.checkOutTime,
            minStayNights: building.minStayNights || 1,
            rules: building.rules || [],
            images: building.images,
        })
    }, [building])

    const userFormKey = `userid-${building.id}`

    const { handleCancel } = useFormPersist(form, userFormKey, "/buildings")
    const { handleDeleteImage, editApartment } = useEditBuilding(handleCancel)


    console.log(form.watch(), building.images)

    const removeImage = (key: string, removeKey: (key: string) => void) => {
        handleDeleteImage(key, removeKey)
    }

    async function onSubmit(data: CreateApartmentInput) {
        await editApartment({ slug: buildingSlug, input: data })
    }

    return (
        <FormProvider {...form}>
            <BuildingForm form={form} onSubmit={onSubmit} submitBtnText={`Edit ${buildingSlug}`} removeEditImage={removeImage} handleCancel={handleCancel} />
        </FormProvider>
    )
}

