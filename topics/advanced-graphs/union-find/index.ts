import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { unionFindQuiz } from "@/topics/advanced-graphs/union-find/quiz"

export const unionFind: Topic = {
  id: "union-find",
  title: "Union-Find (Disjoint Set)",
  description: "Efficient data structure for tracking disjoint sets, used for cycle detection and connected components.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(α(n))", space: "O(V)" },
  visualizerType: VisualizerType.GRAPH,
  module: "6. Advanced Graphs",
  order: 27,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: unionFindQuiz,
}
