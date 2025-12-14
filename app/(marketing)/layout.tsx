import { MainLayout } from "@/components/layouts/main-layout";

/**
 * Marketing Layout
 * 
 * Used for marketing pages: home, about, features, pricing, blog, contact
 * - Includes header and footer
 * - Full-width layouts
 * - Marketing-focused design
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
