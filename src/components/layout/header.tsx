import { ModeToggle } from '@/components/header/mode-toggle'
import Navbar from '@/components/header/navbar'
import SearchBox from '@/components/header/search-box'

import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="flex flex-row justify-around border-1 py-2.5">
            {/* logo */}
            <Link href="/" className="logo flex flex-row just ify-around items-center gap-4">
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
            </Link>
            {/* navbar */}
            <Navbar />

            <div className="**:cursor-pointer flex justify-center items-center">
                <SearchBox />
                <ModeToggle />
            </div>
        </div>
    )
}
export default Header
