"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
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
import { staggerContainer, staggerItem, transitions } from "@/lib/animations";

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
    <motion.div
      layout
      animate={{
        scale: isActive ? 1.1 : 1,
        borderColor: isActive
          ? "hsl(var(--primary))"
          : "hsl(var(--border))",
        backgroundColor: isActive
          ? "hsl(var(--primary) / 0.1)"
          : "hsl(var(--card))",
        color: isActive
          ? "hsl(var(--primary))"
          : "hsl(var(--foreground))",
        boxShadow: isActive
          ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
          : "none",
      }}
      transition={transitions.spring}
      className="absolute w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm"
      style={{
        top: `${level * 80 + 20}px`,
        left: `${left}%`,
        transform: `translateX(-50%)`,
      }}
    >
      {val}
    </motion.div>
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
    generateData();
  }, [generateData, topic.visualizerType]);

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
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
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
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
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitions.spring, delay: idx * 0.1 }}
                    layout
                    className="w-20 h-16 rounded-lg border-2 border-primary bg-primary/10 flex items-center justify-center font-bold text-lg shadow-md"
                  >
                    {val}
                  </motion.div>
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
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transitions.spring, delay: idx * 0.1 }}
                    layout
                    className="w-20 h-16 rounded-lg border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center font-bold text-lg shadow-md"
                  >
                    {val}
                  </motion.div>
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
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="flex items-center justify-center gap-0 min-w-fit mx-auto px-4"
            >
              {currentData.array.map((val, idx) => {
                const isActive = currentData.activeIndices.includes(idx);
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex items-center"
                  >
                    {/* Node */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          borderColor: isActive
                            ? "hsl(var(--foreground))"
                            : "hsl(var(--border))",
                          backgroundColor: isActive
                            ? "hsl(var(--muted) / 0.8)"
                            : "hsl(var(--card))",
                          boxShadow: isActive
                            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                            : "none",
                        }}
                        transition={transitions.spring}
                        className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center font-bold text-xl"
                      >
                        {val}
                      </motion.div>
                      <div className="mt-2 text-xs font-mono text-muted-foreground font-semibold">
                        Node {idx}
                      </div>
                    </div>
                    {/* Arrow */}
                    {idx < currentData.array.length - 1 && (
                      <div className="flex items-center mx-3">
                        <svg
                          width="48"
                          height="2"
                          viewBox="0 0 48 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-border"
                        >
                          <line
                            x1="0"
                            y1="1"
                            x2="40"
                            y2="1"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M40 1L36 0L36 2L40 1Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {/* NULL pointer */}
              <div className="flex items-center ml-3">
                <svg
                  width="32"
                  height="2"
                  viewBox="0 0 32 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-border mr-2"
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="24"
                    y2="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 1L20 0L20 2L24 1Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="px-4 py-2 bg-muted rounded-lg border border-border">
                  <span className="text-sm font-mono font-semibold text-muted-foreground">
                    NULL
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
        const tree = (currentData.auxiliary as { tree?: (number | null)[] })?.tree || [];
        return (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="w-full h-full relative min-h-[300px]"
          >
            {tree.map((val, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
              >
                <TreeNode
                  val={val}
                  idx={idx}
                  isActive={currentData.activeIndices.includes(idx)}
                  totalLevels={4}
                />
              </motion.div>
            ))}
          </motion.div>
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

