"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, PauseIcon, RefreshCwIcon, LayersIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import { generateHeapSteps } from "@/utils/algorithm-logic";
import { VisualizerLayout } from "./visualizer-layout";
import { staggerContainer, staggerItem, transitions } from "@/lib/animations";

interface HeapVisualizerProps {
  topic: Topic;
}

const DEFAULT_SPEED_MS = 800;

export function HeapVisualizer({ topic }: HeapVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS);
  const timerRef = useRef<number | null>(null);

  const generateData = useCallback(() => {
    const newSteps = generateHeapSteps();
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
      auxiliary: { heap: [] },
    } as VisualizationStep);

  const auxiliary = currentData.auxiliary as { heap?: number[] };
  const heap = auxiliary?.heap || [];

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
      title="Max Heap Visualizer"
      icon={<IconWrapper icon={LayersIcon} size={20} className="text-primary" />}
      controls={controls}
      description={description}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="flex flex-col gap-8"
      >
        <div className="h-64 flex items-start justify-center p-4 bg-muted rounded-lg border border-border relative overflow-hidden">
          {heap.map((val: number, idx: number) => {
            const level = Math.floor(Math.log2(idx + 1));
            const offset = Math.pow(2, level) - 1;
            const posInLevel = idx - offset;
            const maxInLevel = Math.pow(2, level);
            const width = 100 / maxInLevel;
            const left = posInLevel * width + width / 2;
            const top = level * 60 + 20;
            const isActive = currentData.activeIndices.includes(idx);
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                layout
                animate={{
                  scale: isActive ? 1.25 : 1,
                  backgroundColor: isActive
                    ? "rgb(251 191 36)"
                    : "hsl(var(--background))",
                  borderColor: isActive
                    ? "rgb(245 158 11)"
                    : "hsl(var(--border))",
                  color: isActive
                    ? "white"
                    : "hsl(var(--foreground))",
                }}
                transition={transitions.spring}
                className="absolute w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 z-10"
                style={{
                  left: `${left}%`,
                  top: `${top}px`,
                  transform: "translateX(-50%)",
                }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
        <motion.div
          variants={staggerContainer}
          className="flex items-center justify-center gap-1 overflow-x-auto p-4 bg-muted/50 rounded-lg"
        >
          {heap.map((val: number, idx: number) => {
            const isActive = currentData.activeIndices.includes(idx);
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    backgroundColor: isActive
                      ? "rgb(251 191 36)"
                      : "hsl(var(--background))",
                    borderColor: isActive
                      ? "rgb(245 158 11)"
                      : "hsl(var(--border))",
                    color: isActive
                      ? "white"
                      : "hsl(var(--foreground))",
                  }}
                  transition={transitions.smooth}
                  className="w-10 h-10 flex items-center justify-center border rounded font-bold"
                >
                  {val}
                </motion.div>
                <span className="text-[10px] text-muted-foreground mt-1">
                  {idx}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </VisualizerLayout>
  );
}

