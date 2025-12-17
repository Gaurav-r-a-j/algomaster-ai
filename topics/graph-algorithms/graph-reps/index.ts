import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { graphRepsQuiz } from "@/topics/graph-algorithms/graph-reps/quiz"

export const graphReps: Topic = {
  id: "graph-reps",
  title: "Graph Representations",
  description:
    "Different ways to represent graphs: adjacency list, adjacency matrix, and edge list.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V + E)" },
  visualizerType: VisualizerType.GRAPH,
  module: "5. Graph Algorithms",
  order: 20,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: graphRepsQuiz,
  practiceLinks: [
    {
      title: "GeeksforGeeks: Graph Representations",
      url: "https://www.geeksforgeeks.org/graph-and-its-representations/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=5hPfm_uqXmw", // Graph Representations
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Graph Reps Hindi
  }
}
