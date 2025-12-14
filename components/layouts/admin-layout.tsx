"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"

import { cn } from "@/lib/utils"

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: ROUTES.ADMIN, label: "Dashboard" },
    { href: ROUTES.ADMIN_USERS, label: "Users" },
    { href: ROUTES.ADMIN_ANALYTICS, label: "Analytics" },
    { href: ROUTES.ADMIN_SETTINGS, label: "Settings" },
  ]

  return (
    <div className="bg-background min-h-screen">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="bg-muted/40 w-64 border-r p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:bg-muted block rounded-md px-3 py-2 transition-colors",
                  pathname === item.href && "bg-muted font-medium"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
