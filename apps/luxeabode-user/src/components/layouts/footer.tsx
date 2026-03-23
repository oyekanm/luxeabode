import Link from "next/link"
import { Building2, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-card border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <span className="font-serif text-xl font-bold">LuxeStay</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Experience luxury living in the heart of the city with our premium short-term apartment rentals across
                            multiple locations.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/buildings" className="text-muted-foreground hover:text-primary transition-colors">
                                    Our Locations
                                </Link>
                            </li>
                            <li>
                                <Link href="/apartments" className="text-muted-foreground hover:text-primary transition-colors">
                                    Available Rooms
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cancellation Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Office</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                                <a href="mailto:contact@luxestay.com" className="hover:text-primary transition-colors">
                                    contact@luxestay.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    450 Luxury Boulevard
                                    <br />
                                    Downtown District, NY
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="mb-6" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; 2026 LuxeStay. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/admin/login" className="hover:text-primary transition-colors">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
