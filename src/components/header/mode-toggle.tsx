"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import * as React from "react"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            {/* Toggle button */}
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="dark:border-border cursor-pointer">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            {/* Theme options */}
            <DropdownMenuContent
                align="center"
<<<<<<< HEAD
                className="bg-background *:hover:bg-input *:dark:hover:bg-input *:hover:text-primary mx-3 mt-1 *:cursor-pointer *:px-3 *:py-2 *:text-sm"
=======
                className="mx-3
                mt-1 bg-background *:px-3 *:py-2 *:text-sm *:hover:bg-input *:dark:hover:bg-input *:hover:text-primary *:cursor-pointer"
>>>>>>> 10f95182bcf105051917eb19e696211a716c6f38
            >
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
