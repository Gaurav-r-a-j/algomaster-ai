import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bitManipulationQuiz } from "@/topics/advanced-techniques/bit-manipulation/quiz"

export const bitManipulation: Topic = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  description: "Efficient algorithms using bitwise operations.",
  category: AlgorithmType.BIT_MANIPULATION,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "8. Advanced Techniques",
  order: 35,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: bitManipulationQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Single Number",
      url: "https://leetcode.com/problems/single-number/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Number of 1 Bits",
      url: "https://leetcode.com/problems/number-of-1-bits/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Bit Manipulation",
      url: "https://www.geeksforgeeks.org/bits-manipulation-important-tactics/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Reverse Bits",
      url: "https://leetcode.com/problems/reverse-bits/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Power of Two",
      url: "https://leetcode.com/problems/power-of-two/",
      difficulty: "Easy",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=NLKQEOgBAnw", // Bit Manipulation
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Bit Manipulation Hindi
  }
}
