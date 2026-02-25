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
      coverImageKey: '',
      amenities: [],
      checkInTime: '',
      checkOutTime: '',
      minStayNights: 1,
      rules: [],
    },
  })

  function onSubmit(data: CreateApartmentInput) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <CardContainer>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <InputLabel title="Name" />
                <FormControl>
                  <InputText
                    placeholder="olivia@your-email.com"
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContainer>
        <CardContainer>
          <div></div>
        </CardContainer>
      </form>
    </Form>
  )
}
