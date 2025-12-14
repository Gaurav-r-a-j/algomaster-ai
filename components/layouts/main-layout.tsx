import { ReactNode } from "react"

import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"

// Main Layout Component - Used for marketing/public pages
// Includes header and footer, full-width marketing layouts, public-facing design
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
