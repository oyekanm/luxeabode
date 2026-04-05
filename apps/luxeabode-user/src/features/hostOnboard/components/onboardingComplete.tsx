import { CheckCircle2 } from 'lucide-react'

export default function OnboardingComplete() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Information</h3>
                <p className="text-muted-foreground">Please review before submitting for verification</p>
            </div>

            <div className="space-y-4">
                <div className="border-l-4 border-primary p-4 bg-primary/5 rounded">
                    <h4 className="font-semibold text-foreground mb-3">Verification Summary</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Personal information completed
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Address verified
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Identity documents submitted
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Payment method configured
                        </li>
                    </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                        <strong>Next Steps:</strong> After submission, our team will verify your information within 24-48 hours. You&apos;ll receive email confirmation once approved.
                    </p>
                </div>

                <div className="pt-4">
                    <label className="flex items-start gap-3">
                        {/* TODO add checkbox */}
                        {/* <input
                            type="checkbox"
                            checked={formData.agreeToTerms || false}
                            onChange={(e) =>
                                onFormChange({ ...formData, agreeToTerms: e.target.checked })
                            }
                            className="w-5 h-5 border-border rounded mt-1"
                        /> */}
                        <span className="text-sm text-muted-foreground">
                            I confirm that all information provided is accurate and agree to the terms and conditions for becoming a host.
                        </span>
                    </label>
                </div>
            </div>
        </div>
    )
}
