"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

interface VisualizerLayoutProps {
  title: ReactNode;
  icon?: ReactNode;
  controls: ReactNode;
  description: ReactNode;
  children: ReactNode;
}

export function VisualizerLayout({
  title,
  icon,
  controls,
  description,
  children,
}: VisualizerLayoutProps) {
  return (
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <Card className="shrink-0">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {icon && <div className="text-primary">{icon}</div>}
              {typeof title === "string" ? (
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
              ) : (
                title
              )}
            </div>
            <div className="flex flex-wrap gap-2">{controls}</div>
          </div>
        </CardHeader>
      </Card>

      {/* Visualization Area */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">{children}</div>

      {/* Description */}
      <Card className="shrink-0">
        <CardContent className="p-4">
          <Separator className="mb-4" />
          {description}
        </CardContent>
      </Card>
    </div>
  );
}

