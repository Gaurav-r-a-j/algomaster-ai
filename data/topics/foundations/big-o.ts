import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const bigO: Topic = {
  id: "big-o",
  title: "Big O Notation",
  description: "Understanding algorithm efficiency and complexity analysis.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 6,
  difficulty: "Medium",
  content: "", // Content loaded from data/content/markdown/foundations/big-o.md
  quiz: [
    {
      id: 1,
      question: "What does O(1) mean?",
      options: [
        "Linear time",
        "Constant time",
        "Quadratic time",
        "Exponential time",
      ],
      correctAnswer: 1,
      explanation:
        "O(1) means constant time - the operation takes the same time regardless of input size.",
    },
  ],
  practiceLinks: [
    {
      title: "GeeksforGeeks: Time Complexity",
      url: "https://www.geeksforgeeks.org/time-complexity-and-space-complexity/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Best Time to Buy and Sell Stock",
      url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      difficulty: "Easy",
    },
    {
      title: "Big-O Cheat Sheet",
      url: "https://www.bigocheatsheet.com/",
      difficulty: "Easy",
    },
  ],
}
