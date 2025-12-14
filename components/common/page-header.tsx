import { ReactNode } from "react"
import { cn } from "@/utils/common/class-names"

export interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

// PageHeader - Consistent page header component
// Example: <PageHeader title="Dashboard" description="Welcome back!" actions={<Button>Action</Button>} />
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-center justify-between", className)}>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
