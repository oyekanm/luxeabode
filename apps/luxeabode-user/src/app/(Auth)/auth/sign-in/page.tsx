"use client"
import { signInAction, signUpAction } from "@/app/actions/authAction"
import { SignInInputType, signInSchema, SignUpInputType, signUpSchema } from "@/lib/validators/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import CardContainer from "@repo/ui/cardContainer"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    useForm
} from "@repo/ui/form"
import FunctionalButton from "@repo/ui/functionalButton"
import InputLabel from "@repo/ui/inputLabel"
import InputText from "@repo/ui/inputText"
import PasswordInput from "@repo/ui/passwordInput"
import { useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function UserSignInPage() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const form = useForm<SignInInputType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const submitForm = async (form: SignInInputType) => {
        const formData = new FormData()
        formData.append("email", form.email)
        formData.append("password", form.password)

        const result = await signInAction(formData)

        if (result.success) {
            toast.success(result.message, { duration: 1000 })
            router.push(callbackUrl || "/")
            await queryClient.invalidateQueries({ queryKey: ['account', 'me'] })
        } else {
            toast.error(result.error)
        }
    }
    return (
        <div className="h-300 w-full flex justify-center items-center">
            <CardContainer className="max-w-300 space-y-12" title="Input your login Credential">
                <Form {...form} >
                    <form className="space-y-8" onSubmit={form.handleSubmit(submitForm)}>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={"Email"} />
                                    <FormControl>
                                        <InputText
                                            placeholder={"Enter your email"}
                                            field={field}
                                            type={"email"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={"Password"} />
                                    <FormControl>
                                        <PasswordInput
                                            placeholder={"Enter your confirm password"}
                                            field={field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Link href="/auth/forgot-password" className="text-sm text-neutral-500 text-right block">Forgot Password?</Link>

                        <FunctionalButton text={form.formState.isSubmitting ? "Signing In..." : "Sign In"} className="w-full" disable={form.formState.isSubmitting || !form.formState.isDirty} />

                        <span className="text-sm text-neutral-500">Don't have an account? <Link className="underline font-semibold " href="/auth/sign-up">Sign Up</Link></span>
                    </form>
                </Form>
            </CardContainer>
        </div>
    )
}
