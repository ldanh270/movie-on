import Logo from '@/components/header/logo'
import { ModeToggle } from '@/components/header/mode-toggle'
import Navbar from '@/components/header/navbar'
import SearchBox from '@/components/header/search-box'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

import { Menu } from 'lucide-react'

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-around border-b py-2.5">
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
                SheetClose:size-14 SheetClose:right-0 SheetClose:top-2.5
                SheetClose:*:border SheetClose:*:flex SheetClose:*:items-center SheetClose:*:justify-center SheetClose:*:rounded-sm"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <Logo aria-hidden />
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
