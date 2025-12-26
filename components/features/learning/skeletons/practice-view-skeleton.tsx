"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PracticeViewSkeleton() {
    return (
        <div className="flex h-full w-full">
            {/* Left panel skeleton */}
            <div className="w-2/5 border-r p-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    <div className="space-y-3 rounded-lg border p-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            </div>
            {/* Right panel skeleton */}
            <div className="flex-1">
                <div className="flex h-full flex-col bg-[#1e1e1e]">
                    <div className="bg-muted/30 flex items-center justify-between border-b p-3.5">
                        <Skeleton className="h-9 w-32" />
                        <Skeleton className="h-9 w-20" />
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="text-center space-y-2">
                            <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
