import { ReactNode } from "react";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

/**
 * Main Layout Component
 * 
 * Used for marketing/public pages (home, about, features, pricing, blog, contact)
 * - Includes header and footer
 * - Full-width marketing layouts
 * - Public-facing design
 */
export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

