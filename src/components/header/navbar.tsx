'use client'

import { useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderNavbar = () => {
    const [pageLink, setPageLink] = useState(usePathname)

    // Path list in navbar
    const pages = [
        { href: '/', label: 'Home' },
        { href: '/discover', label: 'Discover' },
        { href: '/subscriptions', label: 'Subscriptions' },
        { href: '/feedback', label: 'Feedback' },
    ]

    return (
        <ul className="navbar flex flex-row justify-between gap-8 items-center">
            {pages.map((page) => {
                return (
                    <li key={page.href}>
                        <Link
                            href={page.href}
                            onClick={() => setPageLink(page.href)}
                            className={`${page.href === pageLink && 'font-bold'} pb-2 hover:border-b-2 hover:border-primary`}
                        >
                            {page.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
export default HeaderNavbar
