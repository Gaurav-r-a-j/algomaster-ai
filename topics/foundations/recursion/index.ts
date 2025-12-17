import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { recursionQuiz } from "@/topics/foundations/recursion/quiz"

export const recursion: Topic = {
  id: "recursion",
  title: "Recursion",
  description: "Functions that call themselves to solve problems.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(2^n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 5,
  difficulty: "Medium",
  content: "", // Content loaded from data/content/markdown/foundations/recursion.md
  quiz: recursionQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Fibonacci Number",
      url: "https://leetcode.com/problems/fibonacci-number/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Pow(x, n)",
      url: "https://leetcode.com/problems/powx-n/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Recursion",
      url: "https://www.geeksforgeeks.org/recursion/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Climbing Stairs",
      url: "https://leetcode.com/problems/climbing-stairs/",
      difficulty: "Easy",
    },
  ],
}
