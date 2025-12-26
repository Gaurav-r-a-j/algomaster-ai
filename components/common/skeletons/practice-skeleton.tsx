import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function PracticeSkeleton() {
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

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right panel skeleton - Code Editor */}
      <div className="flex-1">
        <CodeEditorSkeleton />
      </div>
    </div>
  )
}

function CodeEditorSkeleton() {
  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      <div className="bg-muted/30 flex items-center justify-between border-b p-3.5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-[140px] rounded-md" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-9 w-20 rounded-md" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 ${
                  i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-5/6" : "w-4/6"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 bg-white/5 p-4">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  )
}

