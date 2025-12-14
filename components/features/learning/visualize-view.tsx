"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { HelpCircleIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import { getTopicContent } from "@/services/content/content-service";
import type { VisualizationData } from "@/services/content/content-service";

interface VisualizeViewProps {
  topic: Topic;
}

export function VisualizeView({ topic }: VisualizeViewProps) {
  const [visualizationData, setVisualizationData] =
    useState<VisualizationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVisualizationData() {
      try {
        const topicContent = await getTopicContent(topic);
        if (topicContent.visualizationData) {
          setVisualizationData(topicContent.visualizationData);
        }
      } catch (error) {
        // No visualization data available
      } finally {
        setLoading(false);
      }
    }
    loadVisualizationData();
  }, [topic]);

  // Placeholder - will be implemented with actual visualizers
  if (topic.visualizerType === VisualizerType.NONE) {
    return (
      <div className="h-full flex items-center justify-center p-10 text-center text-muted-foreground">
        <div className="flex flex-col items-center gap-4">
          <IconWrapper
            icon={HelpCircleIcon}
            size={40}
            className="text-muted-foreground"
          />
          <span>No interactive visualizer available for this topic.</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading visualization...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
      <Card className="flex-1 relative min-h-[500px]">
        <CardContent className="p-8 h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">Visualizer coming soon</p>
            <p className="text-sm">
              Interactive visualization for {topic.title} will be available here.
            </p>
            {visualizationData && (
              <p className="text-xs mt-2">
                Visualization type: {visualizationData.type}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardContent className="p-5 flex gap-4">
          <div className="shrink-0 bg-primary/10 p-2.5 rounded-lg text-primary h-fit">
            <IconWrapper icon={HelpCircleIcon} size={24} />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm mb-1">
              Understanding the Visualization
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
              Active elements are being processed. Sorted elements are in their
              final position. Use controls to Play/Pause or Step through.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
