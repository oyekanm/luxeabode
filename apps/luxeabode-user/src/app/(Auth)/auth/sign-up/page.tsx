"use client"
import { signUpAction } from "@/app/actions/authAction"
import { SignUpInputType, signUpSchema } from "@/lib/validators/authSchema"
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
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function UserSignUpPage() {
    const router = useRouter()

    const form = useForm<SignUpInputType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const submitForm = async (form: SignUpInputType) => {
        const formData = new FormData()
        formData.append("email", form.email)
        formData.append("password", form.password)
        formData.append("name", form.name)

        const result = await signUpAction(formData)

        if (result.success) {
            toast.success(result.message)
            router.push("/auth/confirm-email")
        } else {
            toast.error(result.error)
        }
    }

    return (
        <div className="h-300 w-full flex justify-center items-center">
            <CardContainer className="max-w-300 space-y-12" title=" ">
                <Form {...form} >
                    <form className="space-y-8" onSubmit={form.handleSubmit(submitForm)}>
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={"Name"} />
                                    <FormControl>
                                        <InputText
                                            placeholder={"Enter your name"}
                                            field={field}
                                            type={"text"}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name={"confirmPassword"}
                            render={({ field }) => (
                                <FormItem>
                                    <InputLabel title={"Confirm Password"} />
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
                        <FunctionalButton text={form.formState.isSubmitting ? "Signing Up..." : "Sign Up"} className="w-full" disable={form.formState.isSubmitting || !form.formState.isDirty} />
                        <span className="text-sm text-neutral-500">Already have an account? <Link className="underline font-semibold " href="/auth/sign-in">Sign In</Link></span>
                    </form>
                </Form>
            </CardContainer>
        </div>
    )
}
