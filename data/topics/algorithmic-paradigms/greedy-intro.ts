import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { greedyIntroQuiz } from "@/data/content/markdown/algorithmic-paradigms/greedy-intro.quiz"

export const greedyIntro: Topic = {
  id: "greedy-intro",
  title: "Greedy Algorithms",
  description: "Making locally optimal choices at each step.",
  category: AlgorithmType.GREEDY,
  complexity: { time: "O(n log n)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "7. Algorithmic Paradigms",
  order: 28,
  difficulty: "Medium",
  content: "# Greedy Algorithms\n\nComing soon...",
  quiz: greedyIntroQuiz,
}
