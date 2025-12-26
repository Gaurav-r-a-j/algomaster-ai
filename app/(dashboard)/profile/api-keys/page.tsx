"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ApiKeysPage() {
    return (
        <div className="max-w-2xl space-y-10">
            <section>
                <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
                <p className="mt-2 text-muted-foreground">
                    Your secret keys for accessing the AlgoMaster API.
                </p>
            </section>

            <Separator />

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        Current Keys
                    </h2>
                    <Button size="sm" className="rounded-full">
                        Create Key
                    </Button>
                </div>

                <div className="divide-y rounded-xl border">
                    <div className="flex items-center justify-between p-6">
                        <div className="grid gap-1">
                            <div className="flex items-center gap-2 font-mono text-sm font-bold">
                                Default Key
                                <Badge variant="outline" className="rounded-full text-[10px] font-bold uppercase tracking-tighter">
                                    Active
                                </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">Created 12 days ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Input
                                type="password"
                                value="am_sk_9238r09j3r09u3r"
                                readOnly
                                className="h-8 w-48 font-mono text-xs bg-muted/50"
                            />
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs font-bold">
                                Copy
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="rounded-xl border bg-muted/50 p-6">
                    <p className="text-xs font-medium leading-relaxed text-muted-foreground">
                        <span className="font-bold text-foreground">Security Note:</span> Your API keys carry significant privileges. Be careful not to expose them in public repositories or client-side code.
                    </p>
                </div>
            </section>
        </div>
    )
}
