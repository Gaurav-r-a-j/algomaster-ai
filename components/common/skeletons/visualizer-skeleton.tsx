import { Skeleton } from "@/components/ui/skeleton"

export function VisualizerSkeleton() {
  return (
    <div className="flex h-full min-h-[500px] flex-col rounded-lg border bg-muted/20">
      {/* Header skeleton */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>

      {/* Controls skeleton */}
      <div className="border-b p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-4 w-px" />
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-2 flex-1 rounded-full" />
          <Skeleton className="h-2 w-32 rounded-full" />
        </div>
      </div>

      {/* Visualization area skeleton */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-16 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

