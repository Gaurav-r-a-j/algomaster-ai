import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { knapsackQuiz } from "@/topics/algorithmic-paradigms/knapsack/quiz"

export const knapsack: Topic = {
  id: "knapsack",
  title: "Knapsack Problem",
  description: "Classic optimization problem using dynamic programming.",
  category: AlgorithmType.DP,
  complexity: { time: "O(nW)", space: "O(nW)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 30,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: knapsackQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Coin Change",
      url: "https://leetcode.com/problems/coin-change/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Partition Equal Subset Sum",
      url: "https://leetcode.com/problems/partition-equal-subset-sum/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: 0-1 Knapsack Problem",
      url: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Target Sum",
      url: "https://leetcode.com/problems/target-sum/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Ones and Zeroes",
      url: "https://leetcode.com/problems/ones-and-zeroes/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=nLmhmB6NzcM", // Knapsack Problem
    hi: "https://www.youtube.com/watch?v=kvyShbFVaY8" // Knapsack Hindi
  }
}
