"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { SearchIcon } from "@/lib/icons";
import { VisualizerLayout } from "./visualizer-layout";
import { VisualizerControls } from "./visualizer-controls";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import {
  generateBinarySearchSteps,
  generateLinearSearchSteps,
} from "@/utils/algorithm-logic";

const DEFAULT_SPEED_MS = 800;

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
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
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
    generateSteps();
  };

  const currentData =
    steps[currentStep] ||
    ({
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to search",
    } as VisualizationStep);

  const controls = (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="w-24"
        min={Math.min(...array)}
        max={Math.max(...array)}
        disabled={isPlaying}
      />
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
    </div>
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
      <div className="flex flex-col gap-6">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
              {currentData.array.map((value, idx) => {
                const isActive = currentData.activeIndices.includes(idx);
                const isFound = currentData.sortedIndices.includes(idx);
                
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center gap-2 transition-all duration-200 ${
                      isActive ? "scale-110 z-10" : ""
                    }`}
                  >
                    <div
                      className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center font-bold text-xl transition-all duration-200 ${
                        isFound
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shadow-lg ring-2 ring-emerald-500/20"
                          : isActive
                            ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 shadow-lg ring-2 ring-amber-500/20"
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
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <span className="text-sm text-muted-foreground">Searching for: </span>
              <span className="font-bold text-foreground text-lg">{target}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </VisualizerLayout>
  );
}

