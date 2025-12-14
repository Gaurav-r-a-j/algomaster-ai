import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  quiz: [
    {
      id: 1,
      question: "What data structure does DFS use?",
      options: ["Queue", "Stack", "Heap", "Array"],
      correctAnswer: 1,
      explanation:
        "DFS uses a stack (either through recursion or an explicit stack) to explore nodes.",
    },
  ],
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
}
