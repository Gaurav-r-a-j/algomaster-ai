"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, RefreshCwIcon } from "@/lib/icons";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { VisualizerLayout } from "./visualizer-layout";
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
const ANIMATION_SPEED_MS = 500;

interface SortingVisualizerProps {
  topic: Topic;
}

export function SortingVisualizer({ topic }: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(ANIMATION_SPEED_MS);
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
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={generateArray}
        disabled={isPlaying}
      >
        <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
        Reset
      </Button>
      <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
        <IconWrapper icon={PlayIcon} size={16} className="mr-2" />
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </>
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
      title="Live Visualization"
      icon={<ChartBarIcon className="w-5 h-5 text-primary" />}
      controls={controls}
      description={description}
    >
      <div className="h-64 flex items-end justify-center gap-2 px-4 py-8 bg-muted rounded-lg border border-border relative overflow-hidden">
        {currentData.array.map((value, idx) => {
          const isActive = currentData.activeIndices.includes(idx);
          const isSorted = currentData.sortedIndices.includes(idx);
          const colorClass = isActive
            ? "bg-amber-500"
            : isSorted
              ? "bg-emerald-500"
              : "bg-primary";
          return (
            <div
              key={idx}
              className={`w-8 rounded-t-md transition-all duration-200 ${colorClass} relative group shadow-sm`}
              style={{ height: `${value}%` }}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {value}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Speed
        </span>
        <input
          type="range"
          min="50"
          max="1000"
          value={1050 - playbackSpeed}
          onChange={(e) => setPlaybackSpeed(1050 - Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </VisualizerLayout>
  );
}

