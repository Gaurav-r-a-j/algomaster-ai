import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bfsQuiz } from "@/topics/graph-algorithms/bfs/quiz"

export const bfs: Topic = {
  id: "bfs",
  title: "Breadth-First Search (BFS)",
  description:
    "Graph traversal algorithm that explores nodes level by level using a queue.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.PATHFINDING,
  module: "5. Graph Algorithms",
  order: 21,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: bfsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Binary Tree Level Order Traversal",
      url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Word Ladder",
      url: "https://leetcode.com/problems/word-ladder/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: BFS",
      url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Shortest Path in Binary Matrix",
      url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Rotting Oranges",
      url: "https://leetcode.com/problems/rotting-oranges/",
      difficulty: "Medium",
    },
  ],
}
