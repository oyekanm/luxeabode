import CardContainer from '@repo/ui/cardContainer'
import TitleDescContainer from '@repo/ui/titleDescContainer'
import { Building2, Calendar, ShieldCheck } from 'lucide-react'
import React from 'react'

const FEATURES = [
    {
        icon: Building2,
        title: "Premium Properties",
        description: "Handpicked luxury apartments in prime locations",
    },
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description: "All properties thoroughly inspected and verified",
    },
    {
        icon: Calendar,
        title: "Flexible Booking",
        description: "Easy booking with instant confirmation and free cancellation",
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" >
            <div className="xtrw space-y-24">
                <TitleDescContainer
                    title="Why Choose Luxeabode?"
                    desc="We provide exceptional service and premium accommodations for your perfect stay"
                    className='text-center max-w-240 mx-auto'
                />

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {FEATURES.map((feature, i) => (
                        <CardContainer key={i} className="text-center space-y-8 hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-neutral-500 text-base ">{feature.description}</p>
                        </CardContainer>
                    ))}
                </div>
            </div>
        </section>
    )
}