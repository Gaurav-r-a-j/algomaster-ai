import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { lcsQuiz } from "@/topics/algorithmic-paradigms/lcs/quiz"

export const lcs: Topic = {
  id: "lcs",
  title: "Longest Common Subsequence",
  description: "Finding the longest subsequence common to two sequences.",
  category: AlgorithmType.DP,
  complexity: { time: "O(mn)", space: "O(mn)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 31,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: lcsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Longest Common Subsequence",
      url: "https://leetcode.com/problems/longest-common-subsequence/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Edit Distance",
      url: "https://leetcode.com/problems/edit-distance/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: Longest Common Subsequence",
      url: "https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Delete Operation for Two Strings",
      url: "https://leetcode.com/problems/delete-operation-for-two-strings/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Uncrossed Lines",
      url: "https://leetcode.com/problems/uncrossed-lines/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=NnD96abizww", // LCS Problem
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // LCS Hindi
  }
}
