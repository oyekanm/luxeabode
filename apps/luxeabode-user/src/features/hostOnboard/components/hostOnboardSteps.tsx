'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useFormPersist } from '@/hooks/use-form-persist';
import { CreateHostInput, hostSchema } from '@/lib/validators/hostSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from '@repo/ui/form';
import FunctionalButton from '@repo/ui/functionalButton';
import { CheckCircle2, CreditCard, FileText, Home } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import useAddHost from '../hooks/useAddHost';
import BusinessAddressStep from './businessAddressStep';
import BusinessBankingStep from './businessBankingStep';
import BusinessIdentityStep from './businessIdentityStep';
import OnboardingComplete from './onboardingComplete';

interface OnboardingStep {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const steps: OnboardingStep[] = [
    {
        id: 1,
        title: 'Identity',
        description: 'Verify your business',
        icon: <FileText className="h-5 w-5" />,
    },
    {
        id: 2,
        title: 'Address',
        description: 'Property location details',
        icon: <Home className="h-5 w-5" />,
    },
    {
        id: 3,
        title: 'Banking',
        description: 'Bank account details',
        icon: <CreditCard className="h-5 w-5" />,
    },
    {
        id: 4,
        title: 'Complete',
        description: 'Review and confirm',
        icon: <CheckCircle2 className="h-5 w-5" />,
    },
];

type HostStep = "identity" | "address" | "banking" | "complete";

export function HostOnboardingSteps() {
    const { session } = useCurrentUser()
    const searchParams = useSearchParams()
    const router = useRouter();
    const currentStep = searchParams.get('host-step') as HostStep;

    const { addAdmin } = useAddHost()

    const form = useForm<CreateHostInput>({
        resolver: zodResolver(hostSchema),
        defaultValues: {
            businessName: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            country: "",
            govtIdKey: "idkeyforr2",
            cacDocKey: "cacdockeyforr2",
            bankName: "",
            bankAccount: "",
            bankCode: "",
            accountHolderName: "",
        },
        mode: "onChange",
    });

    const errors = form.formState.errors;

    const values = useMemo(() => {
        return form.watch();
    }, [JSON.stringify(form.getValues())])

    // console.log(values)

    const hostFormKey = `host-onboard-form-${session?.id}`

    const { handleCancel } = useFormPersist(form, hostFormKey, "/")

    const resets = () => {
        form.reset()
        handleCancel()
    }
    useEffect(() => {
        if (!currentStep) {
            router.push(`/become-a-host?host-step=identity`)
        }
        if (Object.keys(errors).length > 0 && currentStep === "complete") {
            toast.error("Please fill in all the required fields")
        }
    }, [errors])

    const getNextStep = useMemo(() => {
        const currentIndex = steps.findIndex((step) => step.title.toLowerCase() === currentStep)
        const nextStep = steps[currentIndex + 1]
        return nextStep?.title.toLowerCase() as HostStep
    }, [currentStep])

    const checkStepComplete = (step: HostStep) => {
        switch (step) {
            case "identity":
                return values.businessName && values.phone && values.govtIdKey && values.cacDocKey;
            case "address":
                return values.address && values.city && values.state && values.country;
            case "banking":
                return values.bankName && values.bankAccount && values.bankCode && values.accountHolderName;
            case "complete":
                return true;
            default:
                return false;
        }
    }


    const changeStep = (currentStep: HostStep, nextStep: HostStep) => {
        if (currentStep === nextStep) return;
        if (checkStepComplete(currentStep)) {
            router.push(`/become-a-host?host-step=${nextStep}`)
        }
    }

    const onSubmit = async (data: CreateHostInput) => {
        if (currentStep !== "complete") return
        await addAdmin(data, resets)
    }


    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div>
                <div className="flex justify-between items-start mb-8">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                            {/* Step Circle */}
                            <div
                                className={`size-16 text-sm rounded-full flex items-center justify-center font-semibold mb-2 transition-all 
                                    ${checkStepComplete(step.title.toLowerCase() as HostStep) ?
                                        'bg-primary text-white' :
                                        'bg-border/50 text-muted-foreground'
                                    }
                                `}
                            >
                                {checkStepComplete(step.title.toLowerCase() as HostStep) ? (
                                    <CheckCircle2 className="icon-size" />
                                ) : (
                                    step.id
                                )}
                            </div>

                            {/* Step Label */}
                            <p className="text-sm font-medium text-center hidden sm:block">{step.title}</p>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-1 flex-1 mx-2 mt-3 ${currentStep > step.title.toLowerCase() ? 'bg-primary' : 'bg-border/50'
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    {/* Step Content */}
                    <div>
                        {currentStep === "identity" && (
                            <BusinessIdentityStep />
                        )}

                        {currentStep === "address" && (
                            <BusinessAddressStep />
                        )}

                        {currentStep === "banking" && (
                            <BusinessBankingStep />
                        )}

                        {currentStep === "complete" && (
                            <OnboardingComplete />
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <FunctionalButton
                            type='button'
                            click={() => router.back()}
                            text={"Back"}
                            disable={currentStep === "identity"}
                            className='bg-transparent text-neutral-900 cursor-pointer'
                        />
                        <FunctionalButton
                            click={() => changeStep(currentStep, getNextStep)}
                            text={currentStep === "complete" ? 'Complete' : 'Next'}
                            disable={currentStep === "complete" || form.formState.isSubmitting}
                            className='cursor-pointer'
                        />
                    </div>

                    {/* Final Submit Button */}
                    {currentStep === "complete" && (
                        <div className="mt-8">
                            <FunctionalButton
                                disable={form.formState.isSubmitting}
                                text="Submit for Verification"
                                className="w-full bg-primary  text-white font-semibold text-base"
                            />
                            <p className="text-sm text-neutral-500 text-center mt-3">
                                By clicking submit, you agree to our Host Terms of Service and confirm all information is accurate.
                            </p>
                        </div>
                    )}
                </form>
            </FormProvider>
        </div>
    );
}
