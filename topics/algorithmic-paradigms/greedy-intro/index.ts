import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { greedyIntroQuiz } from "@/topics/algorithmic-paradigms/greedy-intro/quiz"

export const greedyIntro: Topic = {
  id: "greedy-intro",
  title: "Greedy Algorithms",
  description: "Making locally optimal choices at each step.",
  category: AlgorithmType.GREEDY,
  complexity: { time: "O(n log n)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "7. Algorithmic Paradigms",
  order: 28,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: greedyIntroQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Jump Game",
      url: "https://leetcode.com/problems/jump-game/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Gas Station",
      url: "https://leetcode.com/problems/gas-station/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Greedy Algorithms",
      url: "https://www.geeksforgeeks.org/greedy-algorithms/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Maximum Subarray",
      url: "https://leetcode.com/problems/maximum-subarray/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Assign Cookies",
      url: "https://leetcode.com/problems/assign-cookies/",
      difficulty: "Easy",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=HzeK7g8cD0Y", // Greedy Algorithms
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Greedy Hindi
  }
}
