"use client"

import { EmptyState } from "@/components/common/ui"

export function EmptyStateExample() {
  return (
    <EmptyState
      title="No items found"
      description="Get started by creating your first item"
      action={{
        label: "Create Item",
        onClick: () => alert("Create clicked"),
      }}
    />
  )
}
