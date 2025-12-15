"use client"

import { useTheme } from "next-themes"

import { MoonIcon, SunIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface ThemeToggleProps {
  size?: "icon" | "sm" | "default"
  variant?: "ghost" | "outline" | "default"
  className?: string
}

export function ThemeToggle({
  size = "icon",
  variant = "ghost",
  className,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const activeTheme = resolvedTheme || theme
  const isDark = activeTheme === "dark"

  const toggleTheme = () => setTheme(isDark ? "light" : "dark")

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={size}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className={className}
        >
          <IconWrapper icon={isDark ? SunIcon : MoonIcon} size={18} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle light / dark mode</TooltipContent>
    </Tooltip>
  )
}
