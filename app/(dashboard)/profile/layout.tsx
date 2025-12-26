"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
    {
        title: "General",
        href: "/profile",
    },
    {
        title: "API Keys",
        href: "/profile/api-keys",
    },
    {
        title: "Subscription",
        href: "/profile/subscription",
    },
]

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="container mx-auto max-w-5xl py-12 px-4">
            <div className="flex flex-col gap-12 md:flex-row">
                <aside className="w-full md:w-48">
                    <nav className="flex flex-col gap-1">
                        <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
                            Account
                        </h2>
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-foreground text-background"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </aside>
                <main className="flex-1 min-w-0">
                    <div className="space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
