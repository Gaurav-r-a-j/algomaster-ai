"use client"

import { Squares2X2Icon } from "@heroicons/react/24/outline"

import { VisualizerType } from "@/types/curriculum"
import type { Topic } from "@/types/curriculum"
import { useVisualizer } from "@/hooks/use-visualizer"
import { Card, CardContent } from "@/components/ui/card"

import { GraphRenderer } from "./renderers/graph-renderer"
import { HashTableRenderer } from "./renderers/hash-table-renderer"
import { LinkedListRenderer } from "./renderers/linked-list-renderer"
import { QueueRenderer } from "./renderers/queue-renderer"
import { StackRenderer } from "./renderers/stack-renderer"
import { TreeRenderer } from "./renderers/tree-renderer"
import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

interface DataStructureVisualizerProps {
  topic: Topic
}

export function DataStructureVisualizer({
  topic,
}: DataStructureVisualizerProps) {
  const {
    steps,
    currentStep,
    isPlaying,
    playbackSpeed,
    currentData,
    setPlaybackSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handlePreviousStep,
    handleNextStep,
    handleStepChange,
  } = useVisualizer(topic.id, topic.visualizerType)

  const controls = (
    <VisualizerControls
      isPlaying={isPlaying}
      currentStep={currentStep}
      totalSteps={steps.length}
      playbackSpeed={playbackSpeed}
      onPlay={handlePlay}
      onPause={handlePause}
      onReset={handleReset}
      onPreviousStep={handlePreviousStep}
      onNextStep={handleNextStep}
      onSpeedChange={setPlaybackSpeed}
      onStepChange={handleStepChange}
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  const description = (
    <p className="text-foreground text-sm font-medium">
      {currentData.description}
    </p>
  )

  const renderVisualization = () => {
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        return <StackRenderer currentData={currentData} />
      case VisualizerType.QUEUE:
        return <QueueRenderer currentData={currentData} />
      case VisualizerType.LINKED_LIST:
        return <LinkedListRenderer currentData={currentData} />
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
      case VisualizerType.TRIE:
        return <TreeRenderer currentData={currentData} />
      case VisualizerType.HASH_TABLE:
        return <HashTableRenderer currentData={currentData} />
      case VisualizerType.GRAPH:
        return <GraphRenderer currentData={currentData} />
      default:
        return null
    }
  }

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={<Squares2X2Icon className="h-5 w-5" />}
      controls={controls}
      description={description}
    >
      <Card className="flex-1 overflow-hidden border-none shadow-none">
        <CardContent className="p-0">{renderVisualization()}</CardContent>
      </Card>
    </VisualizerLayout>
  )
}
