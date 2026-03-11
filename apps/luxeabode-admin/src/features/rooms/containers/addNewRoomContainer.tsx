import { FormProvider, useForm } from "@repo/ui/form"
import RoomForm from "../components/roomForm"
import { createRoomSchema, type CreateRoomInput } from "@/lib/validators/room"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormPersist } from "@/hooks/useFormPersist"
import useCreateRoom from "../hooks/useCreateRoom"

export default function AddNewRoomContainer() {

    const form = useForm<CreateRoomInput>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: "",
            description: "",
            images: [],
            amenities: [],
            maxGuests: 1,
            bathrooms: 0,
            bedrooms: 1,
            apartmentId: "",
            bookingMode: "room_only" as CreateRoomInput["bookingMode"],
            type: "single" as CreateRoomInput["type"],
            monthlyRate: 0,
            rules: [],
            hasSittingRoom: false,
            nightlyRate: 0,

        },
        mode: "onChange"
    })
    const userFormKey = `userid-new`

    const { handleCancel } = useFormPersist(form, userFormKey, "/rooms")
    // const handleCancel = () => {
    //     console.log("cancel")
    // }
    const { createRoom } = useCreateRoom(handleCancel)
    console.log(form.watch())
    const onSubmit = async (data: CreateRoomInput) => {
        await createRoom(data)
    }

    return (
        <FormProvider {...form}>
            <RoomForm form={form} onSubmit={onSubmit} handleCancel={handleCancel} />
        </FormProvider>
    )
}