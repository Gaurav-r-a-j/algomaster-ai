"use client"

import { Suspense, ReactNode } from "react"
import { LoadingSpinner } from "@/components/common/ui/loading-spinner"
import { Skeleton } from "@/components/ui/skeleton"

interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  variant?: "spinner" | "skeleton" | "custom"
  className?: string
}

export function SuspenseWrapper({
  children,
  fallback,
  variant = "spinner",
  className = "",
}: SuspenseWrapperProps) {
  const defaultFallback =
    variant === "skeleton" ? (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    ) : variant === "spinner" ? (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <LoadingSpinner size="lg" />
      </div>
    ) : null

  return (
    <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>
  )
}

