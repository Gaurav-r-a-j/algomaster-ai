import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { dijkstraQuiz } from "@/topics/advanced-graphs/dijkstra/quiz"

export const dijkstra: Topic = {
  id: "dijkstra",
  title: "Dijkstra's Algorithm",
  description: "Finds shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edges.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O((V + E) log V)", space: "O(V)" },
  visualizerType: VisualizerType.PATHFINDING,
  module: "6. Advanced Graphs",
  order: 24,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: dijkstraQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=XB4MIexjvY0", // Dijkstra's Algorithm
    hi: "https://www.youtube.com/watch?v=smHnz2RHJBY" // Dijkstra Hindi
  }
}
