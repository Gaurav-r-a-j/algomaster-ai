"use client";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

export function PageHeaderExample() {
  return (
    <PageHeader
      title="Example Header"
      description="This is an example page header"
      actions={<Button size="sm">Action</Button>}
    />
  );
}

