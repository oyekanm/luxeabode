import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  useForm,
} from '@repo/ui/form'
import {
  CreateApartmentSchema,
  type CreateApartmentInput,
} from '@/lib/validators/building'
import CardContainer from '@repo/ui/cardContainer'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import { zodResolver } from '@hookform/resolvers/zod'
import { buildingFormFields } from '@/lib/formFields/buildingFormFields'
import InputTextArea from "@repo/ui/inputTextArea"
import type { UseFormReturn } from 'react-hook-form'
import AddAmenities from './addAmenities'
import AddRules from './addRules'
import { Upload } from 'lucide-react'
import FunctionalButton from '@repo/ui/functionalButton'

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
      amenities: [],
      checkInTime: '',
      checkOutTime: '',
      minStayNights: 1,
      rules: [],
    },
  })

  function onSubmit(data: CreateApartmentInput) { }

  console.log(form.watch())

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <CardContainer className='space-y-6 px-8'>
          {
            buildingFormFields.map((fld, idx) => {
              return <FormField
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
            })
          }
        </CardContainer>
        <CardContainer className='px-8 space-y-8'>
          <AddAmenities form={form} />
          <div className='h-px w-full bg-border/50'></div>
          <AddRules form={form} />
        </CardContainer>

        <CardContainer
          title='Building Media'
          description='Upload images of the building'
          className='px-8 space-y-8'
        >
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-medium mb-1">Click to upload primary building image</p>
            <p className="text-xs text-muted-foreground">Recommended size: 1920x1080px</p>
            <input type="file" accept="image/*" className="hidden" />
          </div>
        </CardContainer>

        <div className="flex gap-4 pt-4 flex-wrap justify-end ">
          <FunctionalButton
            text='Cancel'
            variant='outline'
            className='flex-1 h-12 bg-transparent'
            type='button'
          />
          <FunctionalButton
            text='Create Building'
            className='flex-1 h-12'
          />
        </div>
      </form>
    </Form>
  )
}
