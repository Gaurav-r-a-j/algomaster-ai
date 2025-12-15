"use client"

import {
  PHProvider,
  PostHogPageView,
} from "@/components/providers/posthog-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { QueryProvider } from "@/components/providers/query-provider"

// Root providers wrapper - combines all providers
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PHProvider>
        <PostHogPageView />
        <QueryProvider>{children}</QueryProvider>
      </PHProvider>
    </ThemeProvider>
  )
}
