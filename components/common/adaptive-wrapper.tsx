"use client"

import { ReactNode } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"

export interface AdaptiveWrapperProps {
  children: ReactNode
  mobile?: ReactNode
  tablet?: ReactNode
  desktop?: ReactNode
  className?: string
  breakpoints?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

// AdaptiveWrapper - Component that renders different content based on screen size
// Example: <AdaptiveWrapper mobile={<MobileView />} desktop={<DesktopView />} />
export function AdaptiveWrapper({
  children,
  mobile,
  tablet,
  desktop,
  className,
  breakpoints = {
    mobile: "(max-width: 768px)",
    tablet: "(min-width: 769px) and (max-width: 1024px)",
    desktop: "(min-width: 1025px)",
  },
}: AdaptiveWrapperProps) {
  const isMobile = useMediaQuery(breakpoints.mobile || "(max-width: 768px)")
  const isTablet = useMediaQuery(
    breakpoints.tablet || "(min-width: 769px) and (max-width: 1024px)"
  )
  const isDesktop = useMediaQuery(breakpoints.desktop || "(min-width: 1025px)")

  if (isMobile && mobile) {
    return <div className={className}>{mobile}</div>
  }

  if (isTablet && tablet) {
    return <div className={className}>{tablet}</div>
  }

  if (isDesktop && desktop) {
    return <div className={className}>{desktop}</div>
  }

  return <div className={className}>{children}</div>
}
