import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/common/container"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar skeleton */}
      <div className="border-b bg-background/90 backdrop-blur-md">
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="space-y-12">
          {/* Hero section skeleton */}
          <div className="space-y-6 text-center">
            <Skeleton className="mx-auto h-16 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-40 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>

          {/* Features grid skeleton */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 rounded-lg border p-6">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>

          {/* Topics grid skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
