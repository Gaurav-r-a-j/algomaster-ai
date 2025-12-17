import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { arraysStringsQuiz } from "@/topics/core-data-structures/arrays-strings/quiz"

export const arraysStrings: Topic = {
  id: "arrays-strings",
  title: "Arrays & Strings",
  description: "Fundamental data structures for storing sequences of data.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "2. Core Data Structures",
  order: 4,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Best Time to Buy and Sell Stock",
      url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Arrays",
      url: "https://www.geeksforgeeks.org/array-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Reverse String",
      url: "https://leetcode.com/problems/reverse-string/",
      difficulty: "Easy",
    },
  ],
  quiz: arraysStringsQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=QJNwK2uJyGs", // Arrays & Strings Tutorial
    hi: "https://www.youtube.com/watch?v=z9bZufPHFLU" // Arrays in Hindi
  }
}
