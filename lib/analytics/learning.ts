import { trackEvent } from "./core"
import { calculatePercentage } from "@/utils/common/math"

// Track when user views a topic page
export function trackTopicView(
  topicId: string,
  topicTitle: string,
  categoryId?: string,
  difficulty?: string,
  module?: string
): void {
  trackEvent("topic_view", {
    topic_id: topicId,
    topic_title: topicTitle,
    topic_category: categoryId || "dsa",
    topic_difficulty: difficulty,
    topic_module: module,
  })
}

// Track when user starts learning a topic
export function trackTopicStart(
  topicId: string,
  topicTitle: string,
  categoryId?: string
): void {
  trackEvent("topic_start", {
    topic_id: topicId,
    topic_title: topicTitle,
    topic_category: categoryId || "dsa",
  })
}

// Track when user completes a topic
export function trackTopicComplete(
  topicId: string,
  topicTitle: string,
  categoryId?: string,
  difficulty?: string,
  timeSpent?: number,
  module?: string
): void {
  trackEvent("topic_complete", {
    topic_id: topicId,
    topic_title: topicTitle,
    topic_category: categoryId || "dsa",
    topic_difficulty: difficulty,
    topic_module: module,
    time_spent_seconds: timeSpent,
  })
}

// Track when user starts a quiz
export function trackQuizStart(topicId: string, topicTitle: string): void {
  trackEvent("quiz_start", {
    topic_id: topicId,
    topic_title: topicTitle,
  })
}

// Track when user completes a quiz with score
export function trackQuizComplete(
  topicId: string,
  topicTitle: string,
  score: number,
  totalQuestions?: number,
  correctAnswers?: number,
  timeSpent?: number
): void {
  trackEvent("quiz_complete", {
    topic_id: topicId,
    topic_title: topicTitle,
    quiz_score: score,
    quiz_total_questions: totalQuestions,
    quiz_correct_answers: correctAnswers,
    quiz_time_spent_seconds: timeSpent,
  })
}

// Track when user views a module page
export function trackModuleView(
  moduleName: string,
  moduleIndex: number,
  topicsCount: number,
  completedCount: number
): void {
  trackEvent("module_view", {
    module_name: moduleName,
    module_index: moduleIndex,
    module_topics_count: topicsCount,
    module_completed_count: completedCount,
    module_progress_percent: calculatePercentage(completedCount, topicsCount),
  })
}

// Track visualizer interactions (play, pause, etc.)
export function trackVisualizerAction(
  topicId: string,
  visualizerType: string,
  action: string
): void {
  trackEvent("visualizer_action", {
    topic_id: topicId,
    visualizer_type: visualizerType,
    visualizer_action: action,
  })
}

// Track code execution in playground
export function trackCodeExecution(
  topicId: string,
  language: string,
  success: boolean
): void {
  trackEvent("code_execution", {
    topic_id: topicId,
    code_language: language,
    code_success: success,
  })
}

// Track navigation between topics (next/prev)
export function trackTopicNavigation(
  fromTopicId: string,
  toTopicId: string,
  direction: "next" | "prev"
): void {
  trackEvent("topic_navigation", {
    from_topic_id: fromTopicId,
    to_topic_id: toTopicId,
    navigation_direction: direction,
  })
}

// Track progress milestones (25%, 50%, etc.)
export function trackProgressMilestone(
  milestone: string,
  completedCount: number,
  totalTopics: number
): void {
  trackEvent("progress_milestone", {
    milestone: milestone,
    completed_count: completedCount,
    total_topics: totalTopics,
    progress_percent: calculatePercentage(completedCount, totalTopics),
  })
}

// Track time spent on a topic
export function trackTopicTimeSpent(
  topicId: string,
  timeSpent: number,
  categoryId?: string
): void {
  trackEvent("topic_time_spent", {
    topic_id: topicId,
    time_spent_seconds: timeSpent,
    topic_category: categoryId || "dsa",
  })
}

// Track when user switches tabs on topic page
export function trackTopicTabSwitch(topicId: string, tabName: string): void {
  trackEvent("topic_tab_switch", {
    topic_id: topicId,
    tab_name: tabName,
  })
}

