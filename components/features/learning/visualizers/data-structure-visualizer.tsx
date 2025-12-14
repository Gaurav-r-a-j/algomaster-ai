"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, RefreshCwIcon } from "@/lib/icons";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { VisualizerLayout } from "./visualizer-layout";
import type { Topic } from "@/types/curriculum";
import type { VisualizationStep } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import {
  generateLinkedListSteps,
  generateQueueSteps,
  generateStackSteps,
} from "@/utils/algorithm-logic";

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
      }, 1000);
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
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready.",
      auxiliary: {},
    } as VisualizationStep);

  const controls = (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={generateData}
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

  const description = <p className="text-sm text-foreground font-medium">{currentData.description}</p>;

  const renderVisualization = () => {
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        return (
          <div className="flex flex-col items-center gap-2 p-4 border-t-4 border-b-4 border-border min-w-[300px] min-h-[80px] bg-muted/50 overflow-x-auto rounded-lg relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -ml-16 text-xs font-mono text-muted-foreground font-bold">
              TOP
            </div>
            {currentData.array.map((val, idx) => (
              <div
                key={idx}
                className="min-w-[50px] h-12 bg-primary rounded flex items-center justify-center text-white font-bold animate-in fade-in slide-in-from-right-4 duration-300 shadow-md"
              >
                {val}
              </div>
            ))}
          </div>
        );
      case VisualizerType.QUEUE:
        return (
          <div className="flex items-center gap-2 p-4 border-t-4 border-b-4 border-border min-w-[300px] min-h-[80px] bg-muted/50 overflow-x-auto rounded-lg relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 -ml-16 text-xs font-mono text-muted-foreground font-bold">
              FRONT
            </div>
            {currentData.array.map((val, idx) => (
              <div
                key={idx}
                className="min-w-[50px] h-12 bg-emerald-500 rounded flex items-center justify-center text-white font-bold animate-in fade-in slide-in-from-right-4 duration-300 shadow-md"
              >
                {val}
              </div>
            ))}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 -mr-16 text-xs font-mono text-muted-foreground font-bold">
              BACK
            </div>
          </div>
        );
      case VisualizerType.LINKED_LIST:
        return (
          <div className="flex items-center gap-0 overflow-x-auto w-full justify-center">
            {currentData.array.map((val, idx) => (
              <div key={idx} className="flex items-center group">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-300 relative z-10 ${
                    currentData.activeIndices.includes(idx)
                      ? "border-primary bg-primary/10 text-primary scale-110 shadow-lg"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {val}
                  <div className="absolute -bottom-6 text-[10px] text-muted-foreground font-mono">
                    Node {idx}
                  </div>
                </div>
                {idx < currentData.array.length - 1 && (
                  <div className="w-12 h-1.5 bg-border relative">
                    <div className="absolute right-0 -top-1.5 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-border"></div>
                  </div>
                )}
              </div>
            ))}
            <div className="ml-2 px-2 py-1 bg-muted rounded text-muted-foreground font-mono text-xs">
              NULL
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
      <div className="flex-1 min-h-[300px] flex items-center justify-center p-8 bg-muted rounded-lg border border-border overflow-hidden relative">
        {renderVisualization()}
      </div>
    </VisualizerLayout>
  );
}

