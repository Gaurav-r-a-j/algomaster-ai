"use client"

import * as React from "react"
import { CheckmarkCircleIcon, FloppyDiskIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { useCopyToClipboard } from "@/hooks/common/use-copy-to-clipboard"
import { cn } from "@/lib/utils"

interface CopyButtonWrapperProps {
  value: string
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "icon"
  iconSize?: number
  showLabel?: boolean
}

// Reusable copy button component
export function CopyButtonWrapper({
  value,
  className,
  variant = "ghost",
  size = "icon",
  iconSize = 14,
  showLabel = false,
}: CopyButtonWrapperProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(value)}
      className={cn(
        "transition-all duration-200",
        copied && "text-emerald-500",
        className
      )}
    >
      <IconWrapper
        icon={copied ? CheckmarkCircleIcon : FloppyDiskIcon}
        size={iconSize}
      />
      {showLabel && (
        <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
      )}
    </Button>
  )
}

