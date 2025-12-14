import { ReactNode } from "react";
import { Sidebar } from "@/components/shared/sidebar";

// Dashboard Layout Component - Used for main application pages
// Includes sidebar navigation, consistent app workspace layout
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* App Sidebar */}
        <aside className="w-64 border-r bg-muted/40 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold">DSA Platform</h1>
          </div>
          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/profile"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Profile
            </a>
            <a
              href="/settings"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Settings
            </a>
            <a
              href="/account"
              className="block px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              Account
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

