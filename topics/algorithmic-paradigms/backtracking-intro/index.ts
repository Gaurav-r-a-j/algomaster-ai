import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { backtrackingIntroQuiz } from "@/topics/algorithmic-paradigms/backtracking-intro/quiz"

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
  content: "", // Content loaded from external .mdx file
  quiz: backtrackingIntroQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=A80YzvNwqXA", // Backtracking
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Backtracking Hindi
  }
}
