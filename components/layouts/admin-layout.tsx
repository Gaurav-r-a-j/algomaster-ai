import { ReactNode } from "react";
import { Sidebar } from "@/components/shared/sidebar";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 border-r bg-muted/40 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="space-y-2">
            <a
              href="/admin"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/admin/users"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Users
            </a>
            <a
              href="/admin/analytics"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Analytics
            </a>
            <a
              href="/admin/settings"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Settings
            </a>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

