import { AdminLayout as AdminLayoutComponent } from "@/components/layouts/admin-layout";

/**
 * Admin Layout
 * 
 * Used for admin pages: admin dashboard, users, analytics, settings
 * - Admin-specific sidebar
 * - Restricted access
 * - Admin-focused design
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
