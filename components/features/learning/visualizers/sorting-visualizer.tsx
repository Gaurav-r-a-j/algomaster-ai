"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { VisualizerLayout } from "./visualizer-layout";
import { VisualizerControls } from "./visualizer-controls";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateSelectionSortSteps,
} from "@/utils/algorithm-logic";

const DEFAULT_ARRAY_SIZE = 15;
const DEFAULT_SPEED_MS = 500;

interface SortingVisualizerProps {
  topic: Topic;
}

export function SortingVisualizer({ topic }: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
  const timerRef = useRef<number | null>(null);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: DEFAULT_ARRAY_SIZE }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);

    let newSteps: VisualizationStep[] = [];
    switch (topic.id) {
      case "bubble-sort":
        newSteps = generateBubbleSortSteps(newArray);
        break;
      case "selection-sort":
        newSteps = generateSelectionSortSteps(newArray);
        break;
      case "insertion-sort":
        newSteps = generateInsertionSortSteps(newArray);
        break;
      case "merge-sort":
        newSteps = generateMergeSortSteps(newArray);
        break;
      case "quick-sort":
        newSteps = generateQuickSortSteps(newArray);
        break;
      default:
        newSteps = [
          {
            array: newArray,
            activeIndices: [],
            sortedIndices: [],
            description: "Visualization not implemented.",
          },
        ];
    }

    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [topic.id]);

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
    generateArray();
  };

  useEffect(() => {
    // Initialize on mount and when topic changes
    // Use setTimeout to defer state updates and avoid cascading renders
    const timer = setTimeout(() => {
      const newArray = Array.from({ length: DEFAULT_ARRAY_SIZE }, () =>
        Math.floor(Math.random() * 90) + 10
      );
      setArray(newArray);

      let newSteps: VisualizationStep[] = [];
      switch (topic.id) {
        case "bubble-sort":
          newSteps = generateBubbleSortSteps(newArray);
          break;
        case "selection-sort":
          newSteps = generateSelectionSortSteps(newArray);
          break;
        case "insertion-sort":
          newSteps = generateInsertionSortSteps(newArray);
          break;
        case "merge-sort":
          newSteps = generateMergeSortSteps(newArray);
          break;
        case "quick-sort":
          newSteps = generateQuickSortSteps(newArray);
          break;
        default:
          newSteps = [
            {
              array: newArray,
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
  }, [topic.id]);

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

  const currentData =
    steps[currentStep] ||
    ({
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to sort",
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

  const description = (
    <>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-primary"></span> Unsorted
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-amber-500"></span> Active
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Sorted
        </div>
      </div>
      <p className="text-sm text-foreground font-medium">
        {currentData.description}
      </p>
    </>
  );

  return (
    <VisualizerLayout
      title="Sorting Visualization"
      icon={<ChartBarIcon className="w-5 h-5 text-primary" />}
      controls={controls}
      description={description}
    >
      <div className="flex flex-col gap-6">
        {/* Number-based visualization */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
              {currentData.array.map((value, idx) => {
                const isActive = currentData.activeIndices.includes(idx);
                const isSorted = currentData.sortedIndices.includes(idx);
                
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 ${
                      isActive ? "scale-110 z-10" : isSorted ? "opacity-75" : ""
                    }`}
                  >
                    <div
                      className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all duration-200 ${
                        isActive
                          ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-lg ring-2 ring-amber-500/20"
                          : isSorted
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            : "border-border bg-card"
                      }`}
                    >
                      {value}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground font-semibold">
                      [{idx}]
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Array representation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Array:
              </span>
              <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                [{currentData.array.join(", ")}]
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </VisualizerLayout>
  );
}

