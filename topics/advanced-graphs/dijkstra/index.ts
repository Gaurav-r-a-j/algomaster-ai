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
  practiceLinks: [
    {
      title: "LeetCode: Network Delay Time",
      url: "https://leetcode.com/problems/network-delay-time/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Cheapest Flights Within K Stops",
      url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Dijkstra's Algorithm",
      url: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Path With Minimum Effort",
      url: "https://leetcode.com/problems/path-with-minimum-effort/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Find the City With the Smallest Number of Neighbors",
      url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=XB4MIexjvY0", // Dijkstra's Algorithm
    hi: "https://www.youtube.com/watch?v=smHnz2RHJBY" // Dijkstra Hindi
  }
}
