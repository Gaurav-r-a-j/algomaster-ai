import { DashboardLayout as DashboardLayoutComponent } from "@/components/layouts/dashboard-layout";

/**
 * Account Layout
 * 
 * Used for account management pages: account, billing, subscription, notifications
 * - Shares dashboard layout structure
 * - Account-focused navigation
 * - Consistent with app layout
 */
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
