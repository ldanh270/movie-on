import Facebook from '@/assets/svg/social-icons/facebook-icon.svg'
import Github from '@/assets/svg/social-icons/github-icon.svg'
import LinkedIn from '@/assets/svg/social-icons/linkedin-icon.svg'
import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/types/common'

import Image from 'next/image'
import Link from 'next/link'

// import FacebookIcon from '/social-icons/facebook-icon.svg'
// import GithubIcon from '/social-icons/github-icon.svg'
// import LinkedInIcon from '/social-icons/linkedin-icon.svg'

// Contents for About me section
const aboutContent: { label: string; details: string }[] = [
    {
        label: 'Email',
        details: 'ducanhle.dn@gmail.com',
    },
    {
        label: 'Phone',
        details: '+84 905 944 716',
    },
]

// Links for "Connect with me" section
const connectContent: {
    label: string
    icon: SvgIcon
    link: string
}[] = [
    {
        label: 'Facebook',
        icon: Facebook,
        link: 'https://www.facebook.com/ldanh270',
    },
    {
        label: 'Github',
        icon: Github,
        link: 'https://github.com/ldanh270',
    },
    {
        label: 'LinkedIn',
        icon: LinkedIn,
        link: 'https://www.linkedin.com/in/ldanh270/',
    },
]

export default function Footer() {
    console.log('Type of icon:', Facebook)
    return (
        <div className="w-full flex flex-col border-t p-5 gap-5 h-fit">
            <div id="contacts" className="contacts w-full flex flex-row justify-between">
                <div id="about_me" className="flex flex-col gap-5">
                    <div
                        id="about-title"
                        className="self-start font-footer font-semibold text-2xl select-none"
                    >
                        About me
                    </div>
                    <div id="content-details" className="flex flex-col gap-2">
                        {aboutContent.map(({ label, details }) => {
                            return (
                                <div
                                    key={label}
                                    className="flex flex-row *:font-footer *:text-secondary"
                                >
                                    <span className="w-20 select-none">{label}</span>
                                    <span className="w-64">{details}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                    id="connect_with_me"
                    className="flex flex-col justify-center font-footer font-semibold text-2xl gap-5"
                >
                    <div id="connect-title" className="text-center select-none">
                        Connect with me
                    </div>
                    <div id="icons" className="flex flex-row gap-3.5">
                        {connectContent.map(({ label, icon: Icon, link }) => (
                            <Button asChild key={label} variant="ghost" size="icon">
                                <Link
                                    href={link}
                                    target="_blank"
                                    className="size-14 border hover:bg-input"
                                >
                                    <Icon className="fill-foreground size-auto" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div
                id="licences"
                className="contacts w-full flex flex-row justify-between border-t *:py-5 *:text-secondary"
            >
                <span id="copywrite">@2025, All Rights Reserved</span>
                <ul id="legal_links" className="flex items-center gap-5">
                    <li>
                        <Link href="/">Terms of Use</Link>
                    </li>
                    <li
                        className="relative pl-5 
                    before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-px before:bg-border"
                    >
                        <Link href="/">Privacy Policy</Link>
                    </li>
                    <li
                        className="relative pl-5 
                    before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4 before:w-px before:bg-border"
                    >
                        <Link href="/">Cookie Policy</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
