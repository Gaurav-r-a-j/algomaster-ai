"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { PHProvider, PostHogPageView } from "@/components/providers/posthog-provider";

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
        {children}
      </PHProvider>
    </ThemeProvider>
  );
}

