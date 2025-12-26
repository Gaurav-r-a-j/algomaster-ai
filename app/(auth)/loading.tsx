import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Container } from "@/components/common/container"

export default function AuthLoading() {
  return (
    <Container className="flex min-h-screen items-center justify-center py-12">
      <div className="w-full max-w-md space-y-6">
      <div className="flex justify-center">
        <Skeleton className="h-10 w-48" />
      </div>
      
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
      
      <Skeleton className="h-4 w-full" />
      </div>
    </Container>
  )
}

