import Logo from "@/components/header/logo"
import { ModeToggle } from "@/components/header/mode-toggle"
import Navbar from "@/components/header/navbar"
import SearchBox from "@/components/header/search-box"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Menu } from "lucide-react"

const Header = () => {
    return (
        <header className="bg-background sticky top-0 z-50 flex h-[8.5vh] w-full flex-row items-center justify-around border-b py-2.5">
            <div className="container mx-auto flex h-14 w-full items-center justify-between px-3">
                <Logo />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="ml-2 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="SheetClose:size-14 SheetClose:right-0 SheetClose:top-2.5 SheetClose:*:border SheetClose:*:flex SheetClose:*:items-center SheetClose:*:justify-center SheetClose:*:rounded-sm fixed flex h-[100vh] w-[70vw] flex-col justify-start gap-0 p-0"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <Logo aria-hidden />
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex h-dvh flex-col justify-between p-3">
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
                <div className="hidden items-center justify-center gap-2 md:flex">
                    <SearchBox />
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
export default Header
