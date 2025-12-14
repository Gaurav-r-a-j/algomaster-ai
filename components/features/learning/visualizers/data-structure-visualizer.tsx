"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { VisualizerLayout } from "./visualizer-layout";
import { VisualizerControls } from "./visualizer-controls";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import {
  generateLinkedListSteps,
  generateQueueSteps,
  generateStackSteps,
} from "@/utils/algorithm-logic";

const DEFAULT_SPEED_MS = 1000;

interface DataStructureVisualizerProps {
  topic: Topic;
}

const TreeNode: React.FC<{
  val: number | null;
  idx: number;
  isActive: boolean;
  totalLevels: number;
}> = ({ val, idx, isActive, totalLevels }) => {
  if (val === null) {return null;}
  const level = Math.floor(Math.log2(idx + 1));
  const posInLevel = idx - (Math.pow(2, level) - 1);
  const levelWidth = Math.pow(2, level);
  const left = (posInLevel / levelWidth) * 100;

  return (
    <div
      className={`absolute transition-all duration-300 ${
        isActive
          ? "border-primary bg-primary/10 text-primary scale-110 shadow-lg"
          : "border-border bg-card text-foreground"
      } w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm`}
      style={{
        top: `${level * 80 + 20}px`,
        left: `${left}%`,
        transform: `translateX(-50%)`,
      }}
    >
      {val}
    </div>
  );
};

export function DataStructureVisualizer({
  topic,
}: DataStructureVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
  const timerRef = useRef<number | null>(null);

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = [];
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        newSteps = generateStackSteps();
        break;
      case VisualizerType.QUEUE:
        newSteps = generateQueueSteps();
        break;
      case VisualizerType.LINKED_LIST:
        newSteps = generateLinkedListSteps();
        break;
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
        // TODO: Implement tree visualizations
        newSteps = [
          {
            array: [],
            activeIndices: [],
            sortedIndices: [],
            description: "Tree visualization coming soon.",
            auxiliary: { tree: [] },
          },
        ];
        break;
      default:
        newSteps = [
          {
            array: [],
            activeIndices: [],
            sortedIndices: [],
            description: "Visualization not implemented.",
          },
        ];
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [topic.visualizerType]);

  useEffect(() => {
    // Initialize data when visualizer type changes
    // Use setTimeout to defer state updates and avoid cascading renders
    const timer = setTimeout(() => {
      let newSteps: VisualizationStep[] = [];
      switch (topic.visualizerType) {
        case VisualizerType.STACK:
          newSteps = generateStackSteps();
          break;
        case VisualizerType.QUEUE:
          newSteps = generateQueueSteps();
          break;
        case VisualizerType.LINKED_LIST:
          newSteps = generateLinkedListSteps();
          break;
        case VisualizerType.BINARY_TREE:
        case VisualizerType.AVL_TREE:
          newSteps = [
            {
              array: [],
              activeIndices: [],
              sortedIndices: [],
              description: "Tree visualization coming soon.",
              auxiliary: { tree: [] },
            },
          ];
          break;
        default:
          newSteps = [
            {
              array: [],
              activeIndices: [],
              sortedIndices: [],
              description: "Visualization not implemented.",
            },
          ];
      }
      setSteps(newSteps);
      setCurrentStep(0);
      setIsPlaying(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [topic.visualizerType]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) {clearInterval(timerRef.current);}
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    generateData();
  };

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready.",
      auxiliary: {},
    } as VisualizationStep);

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
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  );

  const description = <p className="text-sm text-foreground font-medium">{currentData.description}</p>;

  const renderVisualization = () => {
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        return (
          <div className="w-full">
            <div className="flex flex-col items-center gap-3 p-6 border-2 border-border rounded-lg bg-muted/30 relative min-h-[200px]">
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground font-bold uppercase">
                TOP
              </div>
              {currentData.array.length === 0 ? (
                <div className="text-sm text-muted-foreground italic">Stack is empty</div>
              ) : (
                currentData.array.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-16 rounded-lg border-2 border-primary bg-primary/10 flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md"
                  >
                    {val}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case VisualizerType.QUEUE:
        return (
          <div className="w-full">
            <div className="flex items-center gap-3 p-6 border-2 border-border rounded-lg bg-muted/30 relative min-h-[120px]">
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground font-bold uppercase">
                FRONT
              </div>
              {currentData.array.length === 0 ? (
                <div className="text-sm text-muted-foreground italic flex-1 text-center">Queue is empty</div>
              ) : (
                currentData.array.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-16 rounded-lg border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md"
                  >
                    {val}
                  </div>
                ))
              )}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground font-bold uppercase">
                BACK
              </div>
            </div>
          </div>
        );
      case VisualizerType.LINKED_LIST:
        return (
          <div className="w-full overflow-x-auto py-8">
            <div className="flex items-center justify-center gap-0 min-w-fit mx-auto">
              {currentData.array.map((val, idx) => {
                const isActive = currentData.activeIndices.includes(idx);
                return (
                  <div key={idx} className="flex items-center">
                    {/* Node */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all duration-300 ${
                          isActive
                            ? "border-foreground bg-muted scale-105 shadow-lg"
                            : "border-border bg-card"
                        }`}
                      >
                        {val}
                      </div>
                      <div className="mt-2 text-xs font-mono text-muted-foreground">
                        Node {idx}
                      </div>
                    </div>
                    {/* Arrow */}
                    {idx < currentData.array.length - 1 && (
                      <div className="flex items-center mx-2">
                        <div className="w-16 h-0.5 bg-border relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-border"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {/* NULL pointer */}
              <div className="flex items-center ml-2">
                <div className="w-12 h-0.5 bg-border relative mr-2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-border"></div>
                </div>
                <div className="px-3 py-1.5 bg-muted rounded-md border border-border">
                  <span className="text-sm font-mono font-semibold text-muted-foreground">
                    NULL
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
        const tree = (currentData.auxiliary as { tree?: (number | null)[] })?.tree || [];
        return (
          <div className="w-full h-full relative min-h-[300px]">
            {tree.map((val, idx) => (
              <TreeNode
                key={idx}
                val={val}
                idx={idx}
                isActive={currentData.activeIndices.includes(idx)}
                totalLevels={4}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <VisualizerLayout
      title="DS Visualizer"
      icon={<Squares2X2Icon className="w-5 h-5 text-primary" />}
      controls={controls}
      description={description}
    >
      <Card className="flex-1 min-h-[400px]">
        <CardContent className="p-8 h-full flex items-center justify-center">
          {renderVisualization()}
        </CardContent>
      </Card>
    </VisualizerLayout>
  );
}

