import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { dpIntroQuiz } from "@/topics/algorithmic-paradigms/dp-intro/quiz"

export const dpIntro: Topic = {
  id: "dp-intro",
  title: "Dynamic Programming",
  description:
    "Solving complex problems by breaking them into simpler subproblems.",
  category: AlgorithmType.DP,
  complexity: { time: "O(n²)", space: "O(n)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 29,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: dpIntroQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Climbing Stairs",
      url: "https://leetcode.com/problems/climbing-stairs/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Fibonacci Number",
      url: "https://leetcode.com/problems/fibonacci-number/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Dynamic Programming",
      url: "https://www.geeksforgeeks.org/dynamic-programming/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: House Robber",
      url: "https://leetcode.com/problems/house-robber/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Coin Change",
      url: "https://leetcode.com/problems/coin-change/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=oBt53YbR9Kk", // Dynamic Programming
    hi: "https://www.youtube.com/watch?v=nqowUJzG-iM" // DP Hindi
  }
}
