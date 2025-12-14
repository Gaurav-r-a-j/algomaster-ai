"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, PauseIcon, RefreshCwIcon, ArrowUp01Icon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import { generateDPSteps } from "@/utils/algorithm-logic";
import { VisualizerLayout } from "./visualizer-layout";

interface DPVisualizerProps {
  topic: Topic;
}

const DEFAULT_SPEED_MS = 800;

export function DPVisualizer({ topic }: DPVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
  const timerRef = useRef<number | null>(null);

  const generateData = useCallback(() => {
    const newSteps = generateDPSteps();
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    generateData();
  }, [generateData]);

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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready",
      auxiliary: { dp: [] },
    } as VisualizationStep);

  const dp = (currentData.auxiliary?.dp as (number | null)[]) || [];

  const controls = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={generateData}
        disabled={isPlaying}
      >
        <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
        Reset
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <IconWrapper
          icon={isPlaying ? PauseIcon : PlayIcon}
          size={16}
          className="mr-2"
        />
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  );

  const description = (
    <div className="space-y-2">
      <p className="text-sm font-mono text-primary">
        Step {currentStep + 1} / {steps.length}
      </p>
      <p className="text-sm text-foreground font-medium">
        {currentData.description}
      </p>
    </div>
  );

  return (
    <VisualizerLayout
      title="DP Visualizer (Fibonacci)"
      icon={<IconWrapper icon={ArrowUp01Icon} size={20} className="text-emerald-500" />}
      controls={controls}
      description={description}
    >
      <div className="flex items-center justify-center p-8 bg-muted rounded-lg border border-border overflow-x-auto">
        <div className="flex gap-2">
          {dp.map((val: number | null, idx: number) => {
            const isActive = currentData.activeIndices.includes(idx);
            const isCalculated = val !== null;
            const isDependency =
              currentData.activeIndices.length > 1 &&
              currentData.activeIndices.slice(1).includes(idx);
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-lg font-bold text-lg border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500 border-emerald-600 text-white scale-110 shadow-lg"
                      : isDependency
                        ? "bg-blue-100 dark:bg-blue-900/50 border-blue-400 text-blue-700 dark:text-blue-300"
                        : isCalculated
                          ? "bg-background border-emerald-200 dark:border-emerald-800 text-foreground"
                          : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {val !== null ? val : "?"}
                </div>
                <span className="text-xs font-mono text-muted-foreground mt-2">
                  index {idx}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </VisualizerLayout>
  );
}

