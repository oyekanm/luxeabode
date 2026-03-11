import { buildingFormFields } from '@/lib/formFields/buildingFormFields'
import type { CreateApartmentInput } from '@/lib/validators/building'
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
import AddRules from '../../../components/reuseable/addRules'
import useUploadFile from '@/hooks/useUploadFIle'



interface BuildingFormProps {
    form: UseFormReturn<CreateApartmentInput>,
    onSubmit: (input: CreateApartmentInput) => void,
    removeEditImage?: (key: string, removeKey: () => void) => void
    submitBtnText?: string,
    handleCancel: () => void
}


// TODO: add draft button to form
export default function BuildingForm({ form, onSubmit, submitBtnText = 'Create Building', removeEditImage, handleCancel }: BuildingFormProps) {

    const { handleUpload, handleDeleteFile, isUploading } = useUploadFile()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images",
    })

    console.log(form.watch("images"), fields)

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
            <CardContainer className='space-y-8' title='Building Information'>
                {
                    buildingFormFields.map((fld, idx) => {
                        return (
                            <FormField
                                key={idx}
                                control={form.control}
                                name={fld.name as (keyof CreateApartmentInput)}
                                render={({ field }) => (
                                    <FormItem>
                                        <InputLabel title={fld.label} required={fld.required} />
                                        <FormControl>
                                            {fld.name === "description" ? (<InputTextArea
                                                placeholder={fld.placeholder}
                                                field={field}
                                                type={fld.type}
                                            />) : (<InputText
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
            <CardContainer className='space-y-8' title='House Rules' description='Add house rules for the building'>
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
