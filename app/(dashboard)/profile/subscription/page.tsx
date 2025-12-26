"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SubscriptionPage() {
    return (
        <div className="max-w-2xl space-y-10">
            <section>
                <h1 className="text-3xl font-bold tracking-tight">Subscription</h1>
                <p className="mt-2 text-muted-foreground">
                    Manage your billing and account plan.
                </p>
            </section>

            <Separator />

            <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Current Plan
                </h2>
                <div className="rounded-xl border p-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold">Free Plan</h3>
                                <Badge variant="secondary" className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-tighter">
                                    Current
                                </Badge>
                            </div>
                            <p className="max-w-sm text-sm text-muted-foreground font-medium">
                                Full access to basic topics and initial visualizers. Upgrade for AI-powered tutoring and advanced curriculum.
                            </p>
                            <div className="pt-2">
                                <Button className="rounded-full px-8 font-bold">
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-black font-sans tracking-tight">$0</span>
                            <span className="text-muted-foreground font-medium text-sm">/mo</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Billing History
                </h2>
                <div className="rounded-xl border">
                    <div className="flex items-center justify-center py-12 text-center">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-muted-foreground/50">No invoices yet</p>
                            <p className="text-xs text-muted-foreground/30 font-medium">You haven't made any purchases yet.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
