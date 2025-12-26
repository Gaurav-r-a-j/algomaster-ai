import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/common/container"

export default function MarketingLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
      {/* Hero section skeleton */}
      <div className="space-y-4 text-center">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
      </div>
    </Container>
  )
}

