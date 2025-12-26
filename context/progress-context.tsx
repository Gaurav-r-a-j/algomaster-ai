"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { trackProgressMilestone, trackTopicComplete } from "@/lib/analytics"
import { TOPICS } from "@/data/curriculum"

interface ProgressState {
  completedTopics: string[]
  isCompleted: (topicId: string) => boolean
  markAsCompleted: (topicId: string, topicTitle?: string, categoryId?: string, difficulty?: string, module?: string) => void
  markAsIncomplete: (topicId: string) => void
  toggleCompletion: (topicId: string, topicTitle?: string, categoryId?: string, difficulty?: string, module?: string) => void
  resetProgress: () => void
  getProgressPercentage: (totalTopics: number) => number
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: [],

      isCompleted: (topicId: string) => {
        return get().completedTopics.includes(topicId)
      },

      markAsCompleted: (topicId: string, topicTitle?: string, categoryId?: string, difficulty?: string, module?: string) => {
        set((state) => {
          if (state.completedTopics.includes(topicId)) {
            return state
          }
          
          const newCompleted = [...state.completedTopics, topicId]
          const totalTopics = TOPICS.length
          
          // Track completion event
          if (topicTitle) {
            trackTopicComplete(topicId, topicTitle, categoryId, difficulty, undefined, module)
          }
          
          // Track progress milestones (25%, 50%, 75%, 100%)
          const progressPercent = Math.round((newCompleted.length / totalTopics) * 100)
          if (progressPercent === 25 || progressPercent === 50 || progressPercent === 75 || progressPercent === 100) {
            trackProgressMilestone(`${progressPercent}%`, newCompleted.length, totalTopics)
          }
          
          return {
            completedTopics: newCompleted,
          }
        })
      },

      markAsIncomplete: (topicId: string) => {
        set((state) => ({
          completedTopics: state.completedTopics.filter((id) => id !== topicId),
        }))
      },

      toggleCompletion: (topicId: string) => {
        const { isCompleted, markAsCompleted, markAsIncomplete } = get()
        if (isCompleted(topicId)) {
          markAsIncomplete(topicId)
        } else {
          markAsCompleted(topicId)
        }
      },

      resetProgress: () => {
        set({ completedTopics: [] })
      },

      getProgressPercentage: (totalTopics: number) => {
        const completed = get().completedTopics.length
        if (totalTopics === 0) {
          return 0
        }
        return Math.round((completed / totalTopics) * 100)
      },
    }),
    {
      name: "dsa-progress-storage",
    }
  )
)
