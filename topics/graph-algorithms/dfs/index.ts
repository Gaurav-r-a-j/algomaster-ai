import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { dfsQuiz } from "@/topics/graph-algorithms/dfs/quiz"

export const dfs: Topic = {
  id: "dfs",
  title: "Depth-First Search (DFS)",
  description:
    "Graph traversal algorithm that explores as far as possible along each branch before backtracking.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.PATHFINDING,
  module: "5. Graph Algorithms",
  order: 22,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: dfsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Number of Islands",
      url: "https://leetcode.com/problems/number-of-islands/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Clone Graph",
      url: "https://leetcode.com/problems/clone-graph/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: DFS",
      url: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Surrounded Regions",
      url: "https://leetcode.com/problems/surrounded-regions/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=7fujbpJ0LB4", // DFS Algorithm
    hi: "https://www.youtube.com/watch?v=vf-cxgUXcMk" // DFS Hindi
  }
}
