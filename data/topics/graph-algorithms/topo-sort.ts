import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const topoSort: Topic = {
  id: "topo-sort",
  title: "Topological Sort",
  description:
    "Linear ordering of vertices in a DAG such that for every edge (u, v), u comes before v.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.GRAPH,
  module: "5. Graph Algorithms",
  order: 23,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What type of graph does topological sort work on?",
      options: [
        "Any graph",
        "Undirected graph",
        "DAG (Directed Acyclic Graph)",
        "Complete graph",
      ],
      correctAnswer: 2,
      explanation:
        "Topological sort only works on Directed Acyclic Graphs (DAGs) - graphs with no cycles.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Course Schedule II",
      url: "https://leetcode.com/problems/course-schedule-ii/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Topological Sort",
      url: "https://www.geeksforgeeks.org/topological-sorting/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Alien Dictionary",
      url: "https://leetcode.com/problems/alien-dictionary/",
      difficulty: "Hard",
    },
  ],
}
