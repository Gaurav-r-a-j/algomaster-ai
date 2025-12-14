"use client";

import { Card } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { HelpCircleIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import { SortingVisualizer } from "./visualizers/sorting-visualizer";
import { SearchVisualizer } from "./visualizers/search-visualizer";
import { DataStructureVisualizer } from "./visualizers/data-structure-visualizer";
import { PathfindingVisualizer } from "./visualizers/pathfinding-visualizer";
import { HeapVisualizer } from "./visualizers/heap-visualizer";
import { DPVisualizer } from "./visualizers/dp-visualizer";

interface VisualizeViewProps {
  topic: Topic;
}

function renderVisualizer(topic: Topic) {
  switch (topic.visualizerType) {
    case VisualizerType.BAR_CHART:
      return <SortingVisualizer topic={topic} />;
    case VisualizerType.GRID:
      return <SearchVisualizer topic={topic} />;
    case VisualizerType.STACK:
    case VisualizerType.QUEUE:
    case VisualizerType.LINKED_LIST:
    case VisualizerType.BINARY_TREE:
    case VisualizerType.AVL_TREE:
      return <DataStructureVisualizer topic={topic} />;
    case VisualizerType.PATHFINDING:
      return <PathfindingVisualizer topic={topic} />;
    case VisualizerType.HEAP:
      return <HeapVisualizer topic={topic} />;
    case VisualizerType.DP:
      return <DPVisualizer topic={topic} />;
    default:
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
}

export function VisualizeView({ topic }: VisualizeViewProps) {
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

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-bottom-4 duration-500">
      <Card className="flex-1 relative min-h-[500px] overflow-hidden">
        {renderVisualizer(topic)}
      </Card>
    </div>
  );
}
