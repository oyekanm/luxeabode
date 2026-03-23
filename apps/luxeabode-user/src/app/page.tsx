
import FeaturedRoomSection from "@/components/screens/home/featuredRoomSection"
import FeaturesSection from "@/components/screens/home/featuresSection"
import HeroSection from "@/components/screens/home/heroSection"
import { Button } from "@/components/ui/button"
import FunctionalButton from "@repo/ui/functionalButton"
import { ArrowRight, Building2, Calendar, CheckCircle2, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"


export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Rooms */}
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedRoomSection />
      </Suspense>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="xtrw text-center space-y-12">
          <h2 className="text-4xl font-bold">Ready to Book Your Stay?</h2>
          <p className="text-lg opacity-90">
            Join our community of satisfied guests who've experienced luxury living with LuxeAbode
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FunctionalButton size="lg" variant="secondary" className="px-8 text-lg" asChild>
              <Link href="/apartments">Start Booking</Link>
            </FunctionalButton>
            <FunctionalButton
              size="lg"
              variant="outline"
              className="px-8 text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              asChild
            >
              <Link href="/account/my-bookings">View My Bookings</Link>
            </FunctionalButton>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-base">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="icon-size" />
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="icon-size" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="icon-size" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
