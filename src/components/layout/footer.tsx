import Facebook from "@/assets/svg/social-icons/facebook-icon.svg"
import Github from "@/assets/svg/social-icons/github-icon.svg"
import LinkedIn from "@/assets/svg/social-icons/linkedin-icon.svg"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SvgIcon } from "@/types/common"

import { Mail, Phone } from "lucide-react"
import Link from "next/link"

/**
 * Footer Component
 *
 * SOLID Principles:
 * - Single Responsibility: Hiển thị footer với thông tin liên hệ và links
 * - Open/Closed: Có thể mở rộng thông qua data arrays
 */

// Contact information
const contactInfo: { icon: typeof Mail; label: string; value: string; href?: string }[] = [
    {
        icon: Mail,
        label: "Email",
        value: "ducanhle.dn@gmail.com",
        href: "mailto:ducanhle.dn@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+84 905 944 716",
        href: "tel:+84905944716",
    },
]

// Social media links
const socialLinks: { label: string; icon: SvgIcon; href: string }[] = [
    {
        label: "Facebook",
        icon: Facebook,
        href: "https://www.facebook.com/ldanh270",
    },
    {
        label: "Github",
        icon: Github,
        href: "https://github.com/ldanh270",
    },
    {
        label: "LinkedIn",
        icon: LinkedIn,
        href: "https://www.linkedin.com/in/ldanh270/",
    },
]

// Legal links
const legalLinks: { label: string; href: string }[] = [
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
]

export default function Footer() {
    return (
        <footer className="bg-background border-t select-none">
            <div className="container mx-auto px-4 py-12 md:px-8">
                {/* Main Content */}
                <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h3 className="font-title text-2xl font-bold">About Me</h3>
                        <div className="space-y-4">
                            {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="bg-primary/10 text-primary rounded-lg p-2">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-muted-foreground text-sm font-medium">
                                            {label}
                                        </p>
                                        {href ? (
                                            <Link
                                                href={href}
                                                className="text-foreground hover:text-primary text-base transition-colors"
                                            >
                                                {value}
                                            </Link>
                                        ) : (
                                            <p className="text-foreground text-base">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="space-y-6">
                        <h3 className="font-title text-2xl font-bold">Connect With Me</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(({ label, icon: Icon, href }) => (
                                <Button
                                    key={label}
                                    asChild
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "hover:bg-primary hover:text-primary-foreground",
                                        "h-12 w-12 transition-all duration-300",
                                        "hover:scale-110 active:scale-95",
                                    )}
                                >
                                    <Link
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Follow me on social media for updates and more content about web
                            development and movies.
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-border my-8 border-t" />

                {/* Bottom Section */}
                <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    {/* Copyright */}
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} MovieOn. All rights reserved.
                    </p>

                    {/* Legal Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-2">
                        {legalLinks.map((link, index) => (
                            <div key={link.label} className="flex items-center gap-2">
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground",
                                        "text-sm transition-colors",
                                    )}
                                >
                                    {link.label}
                                </Link>
                                {index < legalLinks.length - 1 && (
                                    <span className="text-border">•</span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}
