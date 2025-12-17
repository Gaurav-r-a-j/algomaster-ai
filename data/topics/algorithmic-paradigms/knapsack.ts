import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { knapsackQuiz } from "@/data/content/markdown/algorithmic-paradigms/knapsack.quiz"

export const knapsack: Topic = {
  id: "knapsack",
  title: "Knapsack Problem",
  description: "Classic optimization problem using dynamic programming.",
  category: AlgorithmType.DP,
  complexity: { time: "O(nW)", space: "O(nW)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 30,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: knapsackQuiz,
}
