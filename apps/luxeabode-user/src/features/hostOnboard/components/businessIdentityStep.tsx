import { hostIdentityFields } from '@/lib/formFields/hostFormFields'
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

export default function BusinessIdentityStep() {
    const form = useFormContext<CreateHostInput>()

    return (
        <CardContainer title='Business Identity' description='Tell us about your business' className="p-8 space-y-8">
            <div className="space-y-4">
                {
                    hostIdentityFields.map((hostField) => (
                        <FormField
                            key={hostField.name}
                            control={form.control}
                            name={hostField.name as keyof CreateHostInput}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={hostField.label} required={hostField.required} />
                                    <FormControl>
                                        {
                                            hostField.type === "number" ? (
                                                <NumberInput field={field} name={field.name} placeholder={hostField.placeholder} maxLength={11} isValueNumber={false} />
                                            )
                                                : hostField.type === "file" ? (
                                                    <div className="border-2 border-dashed border-border rounded-lg p-6 py-10 text-center">
                                                        <input
                                                            type="file"
                                                            accept="image/*,.pdf"
                                                            className="hidden"
                                                            id="id-front"
                                                        />
                                                        <label htmlFor="id-front" className="cursor-pointer">
                                                            <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                                            <p className="text-sm font-medium text-foreground">
                                                                {field.value || 'Click to upload'}
                                                            </p>
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <InputText
                                                        field={field}
                                                        placeholder={hostField.placeholder}

                                                    />
                                                )
                                        }
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