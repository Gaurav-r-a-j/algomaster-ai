"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { motion } from "motion/react"

import { SearchIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { DesignSystemSidebar } from "./design-system-sidebar"

interface DesignSystemLayoutProps {
  children: React.ReactNode
}

export function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header - Full Width */}
      <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center gap-6">
            <Link
              href={ROUTES.HOME}
              className="text-foreground hover:text-primary flex items-center gap-2 transition-colors"
            >
              <h1 className="text-lg font-semibold tracking-tight">
                Design System
              </h1>
            </Link>
            <div className="bg-border hidden h-4 w-px md:block" />
            <p className="text-muted-foreground hidden text-sm md:block">
              Component library and design patterns
            </p>
          </div>

          {/* Right side - Search and Auth */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <IconWrapper
                icon={SearchIcon}
                size={16}
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
              />
              <Input
                type="search"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64 pl-9 text-sm"
              />
            </div>

            {/* Dashboard button */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <aside className="lg:border-border lg:bg-background hidden lg:fixed lg:top-14 lg:left-0 lg:z-40 lg:flex lg:h-[calc(100vh-3.5rem)] lg:w-64 lg:shrink-0 lg:flex-col lg:border-r">
          {/* Search for mobile/sidebar */}
          <div className="border-border border-b p-4 lg:hidden">
            <div className="relative">
              <IconWrapper
                icon={SearchIcon}
                size={16}
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
              />
              <Input
                type="search"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>
          </div>

          {/* Sidebar Navigation - Scrollable content with fixed bottom */}
          <div className="flex flex-1 flex-col overflow-hidden p-3">
            <DesignSystemSidebar searchQuery={searchQuery} />
          </div>
        </aside>

        {/* Scrollable Main Content with sidebar offset */}
        <main className="bg-background flex-1 overflow-y-auto lg:ml-64">
          <div className="w-full">
            <motion.div
              key={`content-${pathname}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="px-4 py-8 sm:px-6 lg:px-8"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
