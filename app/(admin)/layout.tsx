import { AdminLayout as AdminLayoutComponent } from "@/components/layouts/admin-layout";

// Admin Layout - Used for admin pages (dashboard, users, analytics, settings)
// Admin-specific sidebar, restricted access, admin-focused design
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
