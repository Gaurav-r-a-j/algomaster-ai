"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, PauseIcon, RefreshCwIcon } from "@/lib/icons";
import { CodeIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import { generateBFSSteps, generateDFSSteps } from "@/utils/algorithm-logic";
import { VisualizerLayout } from "./visualizer-layout";

interface PathfindingVisualizerProps {
  topic: Topic;
}

const DEFAULT_SPEED_MS = 300;

export function PathfindingVisualizer({ topic }: PathfindingVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
  const timerRef = useRef<number | null>(null);

  const generateData = useCallback(() => {
    const newSteps =
      topic.id === "dfs" ? generateDFSSteps() : generateBFSSteps();
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [topic.id]);

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
      array: Array(25).fill(0),
      activeIndices: [],
      sortedIndices: [],
      description: "Ready",
      auxiliary: { visited: [], path: [] },
    } as VisualizationStep);

  const visitedSet = new Set(currentData.auxiliary?.visited || []);
  const pathSet = new Set(currentData.auxiliary?.path || []);

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
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-muted-foreground">Start</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-muted-foreground">End</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-slate-800 dark:bg-slate-600 rounded"></div>
          <span className="text-muted-foreground">Wall</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-200 dark:bg-blue-900 rounded"></div>
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <span className="text-muted-foreground">Path</span>
        </div>
      </div>
      <p className="text-sm text-foreground font-medium">
        {currentData.description}
      </p>
      <div className="text-xs text-muted-foreground">
        Step {currentStep + 1} / {steps.length}
      </div>
    </div>
  );

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={<IconWrapper icon={CodeIcon} size={20} className="text-primary" />}
      controls={controls}
      description={description}
    >
      <div className="grid grid-cols-5 gap-2 w-full max-w-[400px] mx-auto">
        {currentData.array.map((val, idx) => {
          const isStart = val === 2;
          const isEnd = val === 3;
          const isWall = val === 1;
          const isVisited = visitedSet.has(idx);
          const isPath = pathSet.has(idx);
          const isActive = currentData.activeIndices.includes(idx);

          let bgClass = "bg-muted";
          if (isWall) bgClass = "bg-slate-800 dark:bg-slate-600";
          else if (isPath) bgClass = "bg-yellow-400";
          else if (isActive) bgClass = "bg-primary scale-110 shadow-lg";
          else if (isStart) bgClass = "bg-emerald-500";
          else if (isEnd) bgClass = "bg-red-500";
          else if (isVisited) bgClass = "bg-blue-200 dark:bg-blue-900";

          return (
            <div
              key={idx}
              className={`aspect-square rounded border border-border transition-all duration-300 ${bgClass}`}
            />
          );
        })}
      </div>
    </VisualizerLayout>
  );
}

