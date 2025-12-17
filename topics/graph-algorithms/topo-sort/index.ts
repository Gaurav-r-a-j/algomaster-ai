import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { topoSortQuiz } from "@/topics/graph-algorithms/topo-sort/quiz"

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
  quiz: topoSortQuiz,
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
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=eL-KzMXSXXI", // Topological Sort
    hi: "https://www.youtube.com/watch?v=73sneFXuTEg" // Topological Sort Hindi
  }
}
