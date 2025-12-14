import { useState, useEffect, useRef, useCallback } from "react";
import type { VisualizationStep } from "@/types/curriculum";

const DEFAULT_SPEED_MS = 800;

interface UseVisualizerOptions {
  initialSteps?: VisualizationStep[];
  defaultSpeed?: number;
  onStepChange?: (step: number) => void;
}

export function useVisualizer(options: UseVisualizerOptions = {}) {
  const { initialSteps = [], defaultSpeed = DEFAULT_SPEED_MS, onStepChange } = options;
  
  const [steps, setSteps] = useState<VisualizationStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(defaultSpeed);
  const timerRef = useRef<number | null>(null);

  // Update steps
  const updateSteps = useCallback((newSteps: VisualizationStep[]) => {
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  // Playback controls
  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      const newStep = Math.max(0, prev - 1);
      onStepChange?.(newStep);
      return newStep;
    });
  }, [onStepChange]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const newStep = Math.min(steps.length - 1, prev + 1);
      onStepChange?.(newStep);
      return newStep;
    });
  }, [steps.length, onStepChange]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            onStepChange?.(steps.length - 1);
            return prev;
          }
          const newStep = prev + 1;
          onStepChange?.(newStep);
          return newStep;
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
  }, [isPlaying, steps.length, playbackSpeed, onStepChange]);

  // Get current data
  const currentData = steps[currentStep] || {
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Ready",
    auxiliary: {},
  };

  return {
    steps,
    currentStep,
    isPlaying,
    playbackSpeed,
    currentData,
    updateSteps,
    setCurrentStep,
    setIsPlaying,
    setPlaybackSpeed,
    play,
    pause,
    reset,
    previousStep,
    nextStep,
    canGoPrevious: currentStep > 0,
    canGoNext: currentStep < steps.length - 1,
  };
}

