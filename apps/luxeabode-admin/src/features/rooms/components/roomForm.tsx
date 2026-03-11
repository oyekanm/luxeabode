
import { priceFields, roomFormFields } from '@/lib/formFields/roomFormFields'
import type { CreateRoomInput } from '@/lib/validators/room'
import CardContainer from '@repo/ui/cardContainer'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    useFieldArray,
    type UseFormReturn
} from '@repo/ui/form'
import FunctionalButton from '@repo/ui/functionalButton'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import InputTextArea from "@repo/ui/inputTextArea"
import UploadImageComp from '@repo/ui/uploadImageComp'
import UploadedImagePreview from '@repo/ui/uploadedImagePreview'
import useUploadFile from '@/hooks/useUploadFIle'
import InputSelectObj from "@repo/ui/inputSelectObj"
import AddAmenities from './addAmenities'
import { useBuildings } from '@/features/buildings/hooks/useBuilding'
import AddRules from '@/components/reuseable/addRules'
import { Switch } from '@/components/ui/switch'



interface RoomFormProps {
    form: UseFormReturn<CreateRoomInput>,
    onSubmit: (input: CreateRoomInput) => void,
    removeEditImage?: (key: string, removeKey: () => void) => void
    submitBtnText?: string,
    handleCancel: () => void
}


// TODO: add draft button to form
export default function RoomForm({ form, onSubmit, submitBtnText = 'Create Room', removeEditImage, handleCancel }: RoomFormProps) {
    const { buildings } = useBuildings()
    const apartey = buildings?.data?.map(ap => ({ label: ap.name, value: ap.id })) || []
    const { handleUpload, handleDeleteFile, isUploading } = useUploadFile()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images",
    })



    const uploadSuccess = (file: { url: string, key: string }) => {
        console.log(file)
        append(file)
    }

    const allRemoveKeys = (key: string, removeKey: (key: string) => void) => {
        remove(fields.findIndex((field) => field.key === key))
        removeKey(key)
    }



    const removeImage = (key: string, removeKey: (key: string) => void) => {
        if (removeEditImage) {
            removeEditImage(key, () => allRemoveKeys(key, removeKey))
        } else {
            handleDeleteFile(key, () => allRemoveKeys(key, removeKey))
        }
    }
    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
        >
            <CardContainer className='space-y-8' title='Basic Information'>
                <FormField
                    control={form.control}
                    name={"apartmentId"}
                    render={({ field }) => (
                        <FormItem>
                            <InputLabel title={"Assign to building"} required />
                            <FormControl>
                                <InputSelectObj
                                    field={field}
                                    options={apartey}
                                    text={"Select building location"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    roomFormFields.map((fld, idx) => {
                        return (
                            <FormField
                                key={idx}
                                control={form.control}
                                name={fld.name as (keyof CreateRoomInput)}
                                render={({ field }) => (
                                    <FormItem>
                                        <InputLabel title={fld.label} required={fld.required} />
                                        <FormControl>
                                            {fld.name === "description" ? (
                                                <InputTextArea
                                                    placeholder={fld.placeholder}
                                                    field={field}
                                                    type={fld.type}
                                                />
                                            ) :
                                                fld.type === "select" ? (
                                                    <InputSelectObj
                                                        field={field}
                                                        options={fld.options}
                                                        text={fld.placeholder}
                                                    />
                                                ) :
                                                    fld.type === "boolean" ? (
                                                        <Switch
                                                            checked={field.value as boolean}
                                                            onCheckedChange={field.onChange}
                                                        />) :
                                                        (<InputText
                                                            placeholder={fld.placeholder}
                                                            field={field}
                                                            type={fld.type}
                                                        />)}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )
                    })
                }
            </CardContainer>
            <CardContainer className='space-y-8 ' title='Pricing & Capacity' description='Set the price and maximum occupancy'>
                <div className='grid grid-cols-2 gap-4'>
                    {
                        priceFields.map((fld, idx) => {
                            return (
                                <FormField
                                    key={idx}
                                    control={form.control}
                                    name={fld.name as (keyof CreateRoomInput)}
                                    render={({ field }) => (
                                        <FormItem>
                                            <InputLabel title={fld.label} required={fld.required} />
                                            <FormControl>
                                                <InputText
                                                    placeholder={fld.placeholder}
                                                    field={field}
                                                    type={fld.type}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })
                    }
                </div>
            </CardContainer>
            <CardContainer className='space-y-8' title='Amenities' description='Select available amenities and features'>
                <AddAmenities />
            </CardContainer>
            <CardContainer className='space-y-8' title='House Rules (not necessary if you have set it generally for the building)' description='Set guidelines for guests staying at this property'>
                <AddRules />
            </CardContainer>

            <CardContainer title='Building Media' description='Upload images of the building' className='space-y-8'>
                <UploadImageComp handleFileUpload={(files) => handleUpload(files, uploadSuccess)} isUploading={isUploading} title='Click to upload primary building image' description='Recommended size: 1920x1080px' />
                <FormMessage>{form.formState.errors.images?.message}</FormMessage>
                <UploadedImagePreview files={fields} handleRemoveFile={removeImage} />
            </CardContainer>

            <div className="flex gap-4 pt-4 flex-wrap items-center ml-auto">
                <FunctionalButton text='Cancel' click={handleCancel} variant='outline' className='flex-1 h-20 w-[20rem] bg-transparent' type='button' />
                <FunctionalButton text={submitBtnText} disable={form.formState.isSubmitting} className='flex-1 h-20 w-[20rem]' />
            </div>
        </form>
    )
}
