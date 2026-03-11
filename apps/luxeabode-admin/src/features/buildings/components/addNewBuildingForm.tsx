import { buildingFormFields } from '@/lib/formFields/buildingFormFields'
import {
  CreateApartmentSchema,
  type CreateApartmentInput,
} from '@/lib/validators/building'
import { zodResolver } from '@hookform/resolvers/zod'
import CardContainer from '@repo/ui/cardContainer'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormProvider,
  useFieldArray,
  useForm
} from '@repo/ui/form'
import FunctionalButton from '@repo/ui/functionalButton'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import InputTextArea from "@repo/ui/inputTextArea"
import UploadImageComp from '@repo/ui/uploadImageComp'
import UploadedImagePreview from '@repo/ui/uploadedImagePreview'
import { useFormPersist } from '../../../hooks/useFormPersist'
import AddRules from '../../../components/reuseable/addRules'
import useUploadFile from '@/hooks/useUploadFIle'
import useCreateBuilding from '../hooks/useCreateBuilding'

// type FormType = UseFormReturn<CreateApartmentInput>

export default function AddNewBuildingForm() {
  const form = useForm<CreateApartmentInput>({
    resolver: zodResolver(CreateApartmentSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: '',
      checkInTime: '',
      checkOutTime: '',
      minStayNights: 1,
      rules: [],
      images: [],
    },
    mode: "onChange"
  })

  console.log(form.watch())

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  })
  const { createBuilding, createError } = useCreateBuilding()
  const { handleCancel } = useFormPersist(form, "1", "/buildings")

  const { handleUpload, handleDeleteFile, isUploading } = useUploadFile()
  const uploadSuccess = (file: { url: string, key: string }) => {
    console.log(file)
    append(file)
  }

  const allRemoveKeys = (key: string, removeKey: (key: string) => void) => {
    remove(fields.findIndex((field) => field.key === key))
    removeKey(key)
  }

  const removeImage = (key: string, removeKey: (key: string) => void) => {
    handleDeleteFile(key, () => allRemoveKeys(key, removeKey))
  }

  async function onSubmit(data: CreateApartmentInput) {
    await createBuilding(data, handleCancel)
  }

  return (
    <FormProvider {...form}>
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
                      <InputLabel title={fld.label} />
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
          {/* <AddAmenities form={form} /> */}
          {/* <div className='h-px w-full bg-border/50'></div> */}
          <AddRules />
        </CardContainer>

        <CardContainer title='Building Media' description='Upload images of the building' className='space-y-8'>
          <UploadImageComp handleFileUpload={(files) => handleUpload(files, uploadSuccess)} isUploading={isUploading} title='Click to upload primary building image' description='Recommended size: 1920x1080px' />
          <FormMessage>{form.formState.errors.images?.message}</FormMessage>
          <UploadedImagePreview files={fields} handleRemoveFile={removeImage} />
        </CardContainer>

        <div className="flex gap-4 pt-4 flex-wrap items-center ml-auto">
          <FunctionalButton text='Cancel' click={handleCancel} variant='outline' className='flex-1 h-20 w-[20rem] bg-transparent' type='button' />
          <FunctionalButton text='Create Building' disable={form.formState.isSubmitting} className='flex-1 h-20 w-[20rem]' />
        </div>
      </form>
    </FormProvider>
  )
}

