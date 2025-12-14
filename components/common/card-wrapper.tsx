import { ReactNode } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface CardWrapperProps {
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
}

// CardWrapper - Wrapper for Card component with consistent structure
// Example: <CardWrapper title="Card Title" footer={<Button>Action</Button>}><Content /></CardWrapper>
export function CardWrapper({
  title,
  description,
  children,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
}: CardWrapperProps) {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </Card>
  )
}
