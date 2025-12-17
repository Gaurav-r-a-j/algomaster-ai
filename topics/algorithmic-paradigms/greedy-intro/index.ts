import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { greedyIntroQuiz } from "@/topics/algorithmic-paradigms/greedy-intro/quiz"

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
  content: "", // Content loaded from external .mdx file
  quiz: greedyIntroQuiz,
}
