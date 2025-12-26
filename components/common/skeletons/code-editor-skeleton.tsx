import { Skeleton } from "@/components/ui/skeleton"

export function CodeEditorSkeleton() {
  return (
    <div className="flex h-full min-h-[600px] flex-col bg-[#1e1e1e]">
      {/* Toolbar skeleton */}
      <div className="bg-muted/30 flex items-center justify-between border-b p-3.5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-4 w-px" />
          <Skeleton className="h-9 w-[140px] rounded-md" />
          <Skeleton className="h-4 w-px" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>

      {/* Editor area skeleton */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 ${
                  i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Console skeleton */}
        <div className="border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="p-5">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}

