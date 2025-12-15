"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function Header() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 border-b backdrop-blur">
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
          <ThemeToggle />
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
