import Facebook from '@/assets/svg/social-icons/facebook-icon.svg'
import Github from '@/assets/svg/social-icons/github-icon.svg'
import LinkedIn from '@/assets/svg/social-icons/linkedin-icon.svg'
import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/types/common'

import Image from 'next/image'
import Link from 'next/link'

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
    return (
        <div className="w-dvw h-auto flex flex-col border-t p-5 gap-5">
            <div
                id="contacts"
                className="contacts w-full flex 
                flex-col items-center gap-5 
                md:flex-row md:justify-between"
            >
                <div id="about_me" className="w-full flex flex-col gap-5">
                    <div
                        id="about-title"
                        className="self-center
                        md:self-start font-footer font-semibold text-2xl select-none"
                    >
                        About me
                    </div>
                    <div id="content-details" className="flex flex-col gap-2">
                        {aboutContent.map(({ label, details }) => {
                            return (
                                <div
                                    key={label}
                                    className="w-full flex flex-row *:font-footer *:text-secondary"
                                >
                                    <span
                                        className="w-20 
                                    md:w-20 select-none"
                                    >
                                        {label}
                                    </span>
                                    <span
                                        className="w-full
                                    md:w-64"
                                    >
                                        {details}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                    id="connect_with_me"
                    className="flex flex-col items-center font-footer font-semibold text-2xl gap-5
                    w-full border-t justify-center pt-5
                    md:w-fit md:border-0 md:pt-0"
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
                className="w-full flex 
                flex-col-reverse justify-start items-center
                md:flex-row md:justify-between border-t *:pt-5 *:text-secondary"
            >
                <span id="copywrite">@2025, All Rights Reserved</span>
                <ul id="legal_links" className="flex flex-row items-center gap-5">
                    <li>
                        <Link href="/">Terms of Use</Link>
                    </li>
                    <li
                        className="relative pl-5 
                    md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-4 md:before:w-px md:before:bg-border"
                    >
                        <Link href="/">Privacy Policy</Link>
                    </li>
                    <li
                        className="relative pl-5 
                    md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-4 md:before:w-px md:before:bg-border"
                    >
                        <Link href="/">Cookie Policy</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
