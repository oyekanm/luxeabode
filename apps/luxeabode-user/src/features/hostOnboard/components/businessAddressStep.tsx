import { hostAddressFields } from '@/lib/formFields/hostFormFields'
import { CreateHostInput } from '@/lib/validators/hostSchema'
import CardContainer from '@repo/ui/cardContainer'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage, useFormContext
} from '@repo/ui/form'
import InputLabel from '@repo/ui/inputLabel'
import InputText from '@repo/ui/inputText'
import NumberInput from '@repo/ui/numberInput'
import { FileText } from 'lucide-react'
import { useEffect } from 'react'

export default function BusinessAddressStep() {
    const form = useFormContext<CreateHostInput>()
    useEffect(() => {
        form.clearErrors()
    }, [])
    return (
        <CardContainer title='Address Information' description='Where is your business located?' className="p-8 space-y-8">
            <div className="space-y-4">
                {
                    hostAddressFields.map((hostField) => (
                        <FormField
                            key={hostField.name}
                            control={form.control}
                            name={hostField.name as keyof CreateHostInput}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={hostField.label} required={hostField.required} />
                                    <FormControl>
                                        <InputText
                                            field={field}
                                            placeholder={hostField.placeholder}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))
                }
            </div>
        </CardContainer>
    )
}