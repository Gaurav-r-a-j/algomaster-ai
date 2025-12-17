import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { backtrackingIntroQuiz } from "@/data/content/markdown/algorithmic-paradigms/backtracking-intro.quiz"

export const backtrackingIntro: Topic = {
  id: "backtracking-intro",
  title: "Backtracking",
  description:
    "Systematic method for solving constraint satisfaction problems.",
  category: AlgorithmType.BACKTRACKING,
  complexity: { time: "O(2^n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "7. Algorithmic Paradigms",
  order: 32,
  difficulty: "Medium",
  content: "# Backtracking\n\nComing soon...",
  quiz: backtrackingIntroQuiz,
}
