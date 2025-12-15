"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { getFirstTopicUrl } from "@/utils/curriculum-helpers"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function LandingNav() {
  return (
    <nav className="bg-background/90 border-border fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.HOME}
            className="transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={ROUTES.LOGIN}
            className={cn(
              "text-muted-foreground hover:text-foreground hidden text-sm font-semibold transition-colors md:block"
            )}
          >
            Login
          </Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href={getFirstTopicUrl()}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
