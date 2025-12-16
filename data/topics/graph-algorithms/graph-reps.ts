import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  quiz: [
    {
      id: 1,
      question: "Which representation is best for sparse graphs?",
      options: [
        "Adjacency Matrix",
        "Adjacency List",
        "Edge List",
        "All are equal",
      ],
      correctAnswer: 1,
      explanation:
        "Adjacency list is most space-efficient for sparse graphs (few edges relative to vertices).",
    },
  ],
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
}
