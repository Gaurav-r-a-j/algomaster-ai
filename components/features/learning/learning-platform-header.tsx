"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import { Menu01Icon } from "@/lib/icons"
import { useProgressStats } from "@/hooks/use-progress-stats"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { ThemeToggle } from "@/components/common/theme-toggle"

interface LearningPlatformHeaderProps {
  onMenuClick: () => void
}

export function LearningPlatformHeader({
  onMenuClick,
}: LearningPlatformHeaderProps) {
  const stats = useProgressStats()

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <IconWrapper icon={Menu01Icon} size={20} />
        </Button>

        {/* Logo/Title */}
        <Link
          href={ROUTES.HOME}
          className="text-foreground hover:text-primary flex items-center gap-2 text-xl font-bold tracking-tight transition-colors"
        >
          AlgoMaster<span className="text-primary ml-1">AI</span>
        </Link>

        {/* Progress Bar */}
        <div className="ml-8 hidden flex-1 items-center gap-4 md:flex">
          <div className="max-w-md flex-1">
            <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
              <span>Progress</span>
              <span className="font-semibold">
                {stats.completed} / {stats.total}
              </span>
            </div>
            <Progress value={stats.percentage} className="h-2" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Theme Toggle */}
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.DASHBOARD}>View Stats</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
