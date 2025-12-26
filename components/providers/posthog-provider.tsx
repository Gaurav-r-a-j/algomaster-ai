"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

// Initialize PostHog client (runs once)
let posthogClient: typeof posthog | null = null

if (typeof window !== "undefined") {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.debug()
        }
      },
    })
    posthogClient = posthog
  }
}

// PostHog Provider wrapper
export function PHProvider({ children }: { children: React.ReactNode }) {
  if (!posthogClient) {
    return <>{children}</>
  }

  return <PostHogProvider client={posthogClient}>{children}</PostHogProvider>
}

// Component to track pageviews (internal, wrapped in Suspense)
function PostHogPageViewInternal() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && typeof window !== "undefined") {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      // Track in PostHog
      if (posthogClient) {
        posthogClient.capture("$pageview", {
          $current_url: url,
        })
      }

      // Also track pageview in GTM if available
      if ((window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: "page_view",
          page_path: pathname,
          page_title: document.title,
        })
      }
    }
  }, [pathname, searchParams])

  return null
}

// Wrapped in Suspense to handle useSearchParams
export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInternal />
    </Suspense>
  )
}
