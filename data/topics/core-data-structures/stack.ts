import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const stack: Topic = {
  id: "stack",
  title: "Stack",
  description: "LIFO data structure for managing elements.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.STACK,
  module: "2. Core Data Structures",
  order: 6,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Valid Parentheses",
      url: "https://leetcode.com/problems/valid-parentheses/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Min Stack",
      url: "https://leetcode.com/problems/min-stack/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Evaluate Reverse Polish Notation",
      url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Stack Data Structure",
      url: "https://www.geeksforgeeks.org/stack-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Daily Temperatures",
      url: "https://leetcode.com/problems/daily-temperatures/",
      difficulty: "Medium",
    },
  ],
  quiz: [],
}
