"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedTopics: string[];
  isCompleted: (topicId: string) => boolean;
  markAsCompleted: (topicId: string) => void;
  markAsIncomplete: (topicId: string) => void;
  toggleCompletion: (topicId: string) => void;
  resetProgress: () => void;
  getProgressPercentage: (totalTopics: number) => number;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],

      isCompleted: (topicId: string) => {
        return get().completedTopics.includes(topicId);
      },

      markAsCompleted: (topicId: string) => {
        set((state) => {
          if (state.completedTopics.includes(topicId)) {
            return state;
          }
          return {
            completedTopics: [...state.completedTopics, topicId],
          };
        });
      },

      markAsIncomplete: (topicId: string) => {
        set((state) => ({
          completedTopics: state.completedTopics.filter(
            (id) => id !== topicId
          ),
        }));
      },

      toggleCompletion: (topicId: string) => {
        const { isCompleted, markAsCompleted, markAsIncomplete } = get();
        if (isCompleted(topicId)) {
          markAsIncomplete(topicId);
        } else {
          markAsCompleted(topicId);
        }
      },

      resetProgress: () => {
        set({ completedTopics: [] });
      },

      getProgressPercentage: (totalTopics: number) => {
        const completed = get().completedTopics.length;
        if (totalTopics === 0) {return 0;}
        return Math.round((completed / totalTopics) * 100);
      },
    }),
    {
      name: "dsa-progress-storage",
    }
  )
);

