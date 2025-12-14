"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, RefreshCwIcon, SearchIcon } from "@/lib/icons";
import { VisualizerLayout } from "./visualizer-layout";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import {
  generateBinarySearchSteps,
  generateLinearSearchSteps,
} from "@/utils/algorithm-logic";

interface SearchVisualizerProps {
  topic: Topic;
}

export function SearchVisualizer({ topic }: SearchVisualizerProps) {
  const [array] = useState<number[]>(
    Array.from({ length: 15 }, (_, i) => (i + 1) * 5).sort((a, b) => a - b)
  );
  const [target, setTarget] = useState<number>(40);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const generateSteps = useCallback(() => {
    let newSteps: VisualizationStep[] = [];
    if (topic.id === "binary-search") {
      newSteps = generateBinarySearchSteps(array, target);
    } else if (topic.id === "linear-search") {
      newSteps = generateLinearSearchSteps(array, target);
    } else {
      newSteps = [
        {
          array: array,
          activeIndices: [],
          sortedIndices: [],
          description: "Visualization not implemented.",
        },
      ];
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [topic.id, array, target]);

  useEffect(() => {
    // Initialize steps when topic or target changes
    let newSteps: VisualizationStep[] = [];
    if (topic.id === "binary-search") {
      newSteps = generateBinarySearchSteps(array, target);
    } else if (topic.id === "linear-search") {
      newSteps = generateLinearSearchSteps(array, target);
    } else {
      newSteps = [
        {
          array: array,
          activeIndices: [],
          sortedIndices: [],
          description: "Visualization not implemented.",
        },
      ];
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, target]);

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
      }, 800);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) {clearInterval(timerRef.current);}
    };
  }, [isPlaying, steps.length]);

  const currentData =
    steps[currentStep] ||
    ({
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to search",
    } as VisualizationStep);

  const controls = (
    <>
      <Input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="w-24"
        min={Math.min(...array)}
        max={Math.max(...array)}
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={generateSteps}
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
    <p className="text-sm text-foreground font-medium">
      {currentData.description}
    </p>
  );

  return (
    <VisualizerLayout
      title="Search Visualization"
      icon={<IconWrapper icon={SearchIcon} size={20} className="text-primary" />}
      controls={controls}
      description={description}
    >
      <div className="h-64 flex items-center justify-center gap-3 px-4 py-8 bg-muted rounded-lg border border-border">
        {currentData.array.map((value, idx) => {
          const isActive = currentData.activeIndices.includes(idx);
          const isFound = currentData.sortedIndices.includes(idx);
          const colorClass = isFound
            ? "bg-emerald-500"
            : isActive
              ? "bg-amber-500"
              : "bg-primary";
          return (
            <div
              key={idx}
              className={`w-12 h-12 rounded-lg transition-all duration-200 ${colorClass} flex items-center justify-center text-white font-bold shadow-sm`}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Searching for: <span className="font-bold text-foreground">{target}</span>
      </div>
    </VisualizerLayout>
  );
}

