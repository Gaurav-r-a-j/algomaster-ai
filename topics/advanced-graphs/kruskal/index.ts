import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { kruskalQuiz } from "@/topics/advanced-graphs/kruskal/quiz"

export const kruskal: Topic = {
  id: "kruskal",
  title: "Kruskal's Algorithm",
  description: "Greedy algorithm to find Minimum Spanning Tree (MST) of a connected, weighted graph.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(E log E)", space: "O(V)" },
  visualizerType: VisualizerType.GRAPH,
  module: "6. Advanced Graphs",
  order: 26,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: kruskalQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Connecting Cities With Minimum Cost",
      url: "https://leetcode.com/problems/connecting-cities-with-minimum-cost/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Kruskal's Algorithm",
      url: "https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Min Cost to Connect All Points",
      url: "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Optimize Water Distribution",
      url: "https://leetcode.com/problems/optimize-water-distribution-in-a-village/",
      difficulty: "Hard",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=4ZlRH0eK-qQ", // Kruskal's Algorithm
    hi: "https://www.youtube.com/watch?v=1KRmCzBl_mQ" // Kruskal Hindi
  }
}
