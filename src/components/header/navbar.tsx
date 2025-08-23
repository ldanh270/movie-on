import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = ({ vertical = false }: { vertical?: boolean }) => {
    // Path of default page (Before navigation)
    const path = usePathname()

    // Path list in navbar
    const pages = [
        { href: '/', label: 'Home' },
        { href: '/discover', label: 'Discover' },
        { href: '/subscriptions', label: 'Subscriptions' },
        { href: '/feedback', label: 'Feedback' },
    ]

    return (
        <ul className={vertical ? 'flex flex-col gap-1 p-2' : 'flex flex-row gap-8 items-center'}>
            {pages.map((page) => {
                return (
                    <li key={page.href}>
                        <Link
                            href={page.href}
                            className={`${page.href === path && 'font-bold'} relative pb-1 bg-gradient-to-r
              from-primary to-primary  bg-[length:0%_2px] bg-bottom bg-no-repeat
               transition-all duration-300 hover:bg-[length:100%_2px]`}
                        >
                            {page.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
export default Navbar
