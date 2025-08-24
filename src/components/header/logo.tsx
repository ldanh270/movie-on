import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link
            href="/"
            className="justify-start
            logo flex flex-row md:justify-around items-center gap-1 select-none"
            aria-disabled
        >
            <Image
                src="/logo.svg"
                alt="Logo"
                width={46}
                height={46}
                quality={100}
                className="fill-primary"
            />
            <div className="font-title text-2xl">
                <span className="text-foreground">Movie</span>
                <span className="text-primary">On</span>
            </div>
        </Link>
    )
}
