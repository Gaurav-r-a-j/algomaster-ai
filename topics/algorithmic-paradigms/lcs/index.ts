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
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=NnD96abizww", // LCS Problem
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // LCS Hindi
  }
}
