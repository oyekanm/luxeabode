import { hostBankingFields } from '@/lib/formFields/hostFormFields'
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
import { useEffect } from 'react'

export default function BusinessBankingStep() {
    const form = useFormContext<CreateHostInput>()
    useEffect(() => {
        form.clearErrors()
    }, [])

    return (
        <CardContainer title='Banking Information' description='Add your bank account for secure payouts' className="p-8 space-y-8">
            <div className="space-y-4">
                {
                    hostBankingFields.map((hostField) => (
                        <FormField
                            key={hostField.name}
                            control={form.control}
                            name={hostField.name as keyof CreateHostInput}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={hostField.label} required={hostField.required} />
                                    <FormControl>
                                        {hostField.name === "bankAccount" ? (
                                            <NumberInput field={field} name={field.name} placeholder={hostField.placeholder} maxLength={10} isValueNumber={false} />
                                        ) : (
                                            <InputText
                                                field={field}
                                                placeholder={hostField.placeholder}

                                            />
                                        )}
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