"use client"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"

export function PageHeaderExample() {
  return (
    <PageHeader
      title="Example Header"
      description="This is an example page header"
      actions={<Button size="sm">Action</Button>}
    />
  )
}
