import { HostOnboardingSteps } from '@/features/hostOnboard/components/hostOnboardSteps';
import { Suspense } from 'react';

export default function HostOnboarding() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            {/* Header */}
            <div className="border-b border-border/50 bg-background/50 backdrop-blur">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-foreground">Host Verification</h1>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Step 1 of 6
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Onboarding Steps */}
                <Suspense fallback={<div>Loading...</div>}>
                    <HostOnboardingSteps />
                </Suspense>

                <p className='pt-4 text-lg text-center text-neutral-900 font-semibold'>
                    This is a test for host onboarding
                </p>
            </div>
        </div>
    );
}
