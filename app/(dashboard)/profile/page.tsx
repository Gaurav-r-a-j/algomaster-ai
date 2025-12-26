"use client"

import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
    const { user } = useAuthStore()

    if (!user) return null

    return (
        <div className="max-w-2xl space-y-10">
            <section>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </section>

            <Separator />

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                            User Information
                        </h2>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                        Edit
                    </Button>
                </div>

                <div className="grid gap-6 rounded-xl border p-6">
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">Email Address</span>
                        <span className="text-base font-semibold">{user.email}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">User ID</span>
                        <span className="font-mono text-sm">{user.id}</span>
                    </div>
                    <div className="grid gap-1">
                        <span className="text-xs font-medium text-muted-foreground">Account Status</span>
                        <div className="flex pt-1">
                            <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-tighter">
                                Free Tier
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Security
                </h2>
                <div className="rounded-xl border p-6">
                    <div className="flex items-center justify-between">
                        <div className="grid gap-1">
                            <span className="text-sm font-semibold">Password</span>
                            <span className="text-xs text-muted-foreground">Change your account password</span>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                            Update
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
