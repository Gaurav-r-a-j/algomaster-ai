"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { ROUTES } from "@/constants/routes"

import { SunIcon, MoonIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="text-xl font-bold">
          DSA Platform
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href={ROUTES.FEATURES} className="text-sm hover:underline">
            Features
          </Link>
          <Link href={ROUTES.DESIGN_SYSTEM} className="text-sm hover:underline">
            Design System
          </Link>
          <Link href={ROUTES.PRICING} className="text-sm hover:underline">
            Pricing
          </Link>
          <Link href={ROUTES.ABOUT} className="text-sm hover:underline">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconWrapper 
              icon={theme === "dark" ? SunIcon : MoonIcon} 
              size={18} 
            />
          </Button>
          <Link href={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href={ROUTES.REGISTER}>
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
