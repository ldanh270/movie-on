import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link
            href="/"
            className="logo flex flex-row just ify-around items-center gap-4 select-none"
            aria-disabled
        >
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
    )
}
