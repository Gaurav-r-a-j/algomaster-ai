"use client"

import NextTopLoader from "nextjs-toploader"
import {
  PHProvider,
  PostHogPageView,
} from "@/components/providers/posthog-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { GTMProvider } from "@/components/providers/gtm-provider"

// Root providers wrapper - combines all providers
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextTopLoader
        color="hsl(var(--primary))"
        height={3}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--primary))"
      />
      <GTMProvider />
      <PHProvider>
        <PostHogPageView />
        <QueryProvider>{children}</QueryProvider>
      </PHProvider>
    </ThemeProvider>
  )
}
