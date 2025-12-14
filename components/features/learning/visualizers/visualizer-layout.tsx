"use client";

import { Card, CardContent } from "@/components/ui/card";
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
    <div className="p-6 h-full flex flex-col gap-6">
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          {typeof title === "string" ? (
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              {icon} {title}
            </h3>
          ) : (
            title
          )}
        </div>
        <div className="flex gap-2">{controls}</div>
      </div>

      <div className="flex-1 flex flex-col gap-6">{children}</div>

      <Card className="shrink-0">
        <CardContent className="p-4">{description}</CardContent>
      </Card>
    </div>
  );
}

