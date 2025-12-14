"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
}

// CodeBlockWrapper - Wrapper for code blocks with expand/collapse functionality
// Example: <CodeBlockWrapper><pre><code>...</code></pre></CodeBlockWrapper>
export function CodeBlockWrapper({
  expandButtonTitle = "View Code",
  className,
  children,
  ...props
}: CodeBlockWrapperProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened}>
      <div className={cn("relative overflow-hidden rounded-lg", className)} {...props}>
        <CollapsibleContent
          forceMount
          className={cn("overflow-hidden", !isOpened && "max-h-72")}
        >
          <div
            className={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto"
            )}
          >
            {children}
          </div>
        </CollapsibleContent>
        <div
          className={cn(
            "from-background/10 to-background absolute flex items-center justify-center bg-gradient-to-b to-90% p-2",
            isOpened ? "inset-x-0 bottom-0 h-12 from-gray-900/30" : "inset-0"
          )}
        >
          <CollapsibleTrigger asChild>
            <Button variant="secondary" className="mb-8 h-8 text-xs">
              {isOpened ? "Collapse" : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
}

