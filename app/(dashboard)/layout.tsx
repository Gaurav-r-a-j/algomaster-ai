import { DashboardLayout as DashboardLayoutComponent } from "@/components/layouts/dashboard-layout";

/**
 * Dashboard Layout
 * 
 * Used for main app pages: dashboard, profile, settings
 * - Includes sidebar navigation
 * - App-focused design
 * - User workspace layout
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
