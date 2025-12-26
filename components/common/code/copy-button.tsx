"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { CopiedIcon, CopyIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { useCopyToClipboard } from "@/hooks/common/use-copy-to-clipboard"

interface CopyButtonProps {
  value: string
  className?: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "icon"
}

export function CopyButton({
  value,
  className,
  variant = "ghost",
  size = "icon",
}: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  const handleCopy = () => {
    copy(value)
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={handleCopy}
            className={cn(
              "h-7 w-7 transition-all duration-200",
              copied && "text-emerald-500",
              className
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconWrapper icon={CopiedIcon} size={14} />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <IconWrapper icon={CopyIcon} size={14} />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">{copied ? "Copied!" : "Copy code"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="text-xs">
          {copied ? "Copied!" : "Copy code"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

