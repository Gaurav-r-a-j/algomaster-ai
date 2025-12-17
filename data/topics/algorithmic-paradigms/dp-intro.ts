import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { dpIntroQuiz } from "@/data/content/markdown/algorithmic-paradigms/dp-intro.quiz"

export const dpIntro: Topic = {
  id: "dp-intro",
  title: "Dynamic Programming",
  description:
    "Solving complex problems by breaking them into simpler subproblems.",
  category: AlgorithmType.DP,
  complexity: { time: "O(n²)", space: "O(n)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 29,
  difficulty: "Medium",
  content: "# Dynamic Programming\n\nComing soon...",
  quiz: dpIntroQuiz,
}
