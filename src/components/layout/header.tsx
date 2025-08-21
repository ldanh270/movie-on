import { ModeToggle } from '@/components/header/mode-toggle'
import SearchBox from '@/components/header/search-box'

import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    const pages = [
        { href: '/', label: 'Home' },
        { href: '/discover', label: 'Discover' },
        { href: '/subscriptions', label: 'Subscriptions' },
        { href: '/feedback', label: 'Feedback' },
    ]

    return (
        <div className="flex flex-row justify-around border-1 py-2.5">
            {/* logo */}
            <div className="logo flex flex-row just ify-around items-center gap-4">
                <Image
                    className="fill-primary"
                    src="/logo.svg"
                    alt="Logo"
                    width={46}
                    height={46}
                    quality={100}
                />
                <div className="font-title text-2xl">
                    <span className="">Movie</span>
                    <span className="text-primary">On</span>
                </div>
            </div>
            {/* navbar */}

            <ul className="navbar flex flex-row justify-between gap-8 items-center">
                {pages.map((page) => {
                    return (
                        <li key={page.href}>
                            <Link href={page.href}>{page.label}</Link>
                        </li>
                    )
                })}
            </ul>
            <div className="**:cursor-pointer flex justify-center items-center">
                <SearchBox />
                <ModeToggle />
            </div>
        </div>
    )
}
export default Header
