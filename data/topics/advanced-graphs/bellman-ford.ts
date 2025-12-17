import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bellmanFordQuiz } from "@/data/content/markdown/advanced-graphs/bellman-ford.quiz"

export const bellmanFord: Topic = {
  id: "bellman-ford",
  title: "Bellman-Ford Algorithm",
  description: "Finds shortest paths from a source vertex, can handle negative weights and detect negative cycles.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V × E)", space: "O(V)" },
  visualizerType: VisualizerType.GRAPH,
  module: "6. Advanced Graphs",
  order: 25,
  difficulty: "Hard",
  content: "# bellman ford\n\nComing soon...",
  quiz: bellmanFordQuiz,
}
