import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bellmanFordQuiz } from "@/topics/advanced-graphs/bellman-ford/quiz"

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
  content: "", // Content loaded from external .mdx file
  quiz: bellmanFordQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Cheapest Flights Within K Stops",
      url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Bellman-Ford Algorithm",
      url: "https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Network Delay Time",
      url: "https://leetcode.com/problems/network-delay-time/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Path With Minimum Effort",
      url: "https://leetcode.com/problems/path-with-minimum-effort/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=obWXjtg0L64", // Bellman-Ford
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Bellman-Ford Hindi
  }
}
