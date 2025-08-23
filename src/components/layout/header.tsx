'use client'

import Logo from '@/components/header/logo'
import { ModeToggle } from '@/components/header/mode-toggle'
import Navbar from '@/components/header/navbar'
import SearchBox from '@/components/header/search-box'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { useState } from 'react'

import { Menu } from 'lucide-react'

const Header = () => {
    // Toggle header
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="w-dvw flex flex-row items-center justify-around border-b-1 py-2.5">
            <div className="container mx-auto flex h-14 w-full items-center justify-between px-3">
                <Logo />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden ml-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="fixed w-[70vw] p-0 h-[100vh] flex flex-col justify-start gap-0
                [&>button]:size-14 [&>button]:right-0 [&>button]:top-2.5
                [&>button]:*:border [&>button]:*:flex [&>button]:*:items-center [&>button]:*:justify-center [&>button]:*:rounded-sm"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <Logo />
                            </SheetTitle>
                        </SheetHeader>
                        <div className="h-dvh p-3 flex flex-col justify-between">
                            <div className="">
                                <Navbar vertical />
                                <SearchBox />
                            </div>
                            <div className="px-3 pb-4">
                                <ModeToggle />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="hidden md:block">
                    <Navbar />
                </div>
                <div className="hidden md:flex justify-center items-center gap-1">
                    <SearchBox />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
export default Header
