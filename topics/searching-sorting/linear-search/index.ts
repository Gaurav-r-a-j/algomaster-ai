import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { linearSearchQuiz } from "@/topics/searching-sorting/linear-search/quiz"

export const linearSearch: Topic = {
  id: "linear-search",
  title: "Linear Search",
  description: "Simple search algorithm that checks each element sequentially.",
  category: AlgorithmType.SEARCHING,
  complexity: { time: "O(n)", space: "O(1)" },
  visualizerType: VisualizerType.GRID,
  module: "3. Searching & Sorting",
  order: 9,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: linearSearchQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Search in Rotated Sorted Array",
      url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Linear Search",
      url: "https://www.geeksforgeeks.org/linear-search/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Linear Search",
      url: "https://www.hackerrank.com/challenges/tutorial-intro/problem",
      difficulty: "Easy",
    },
  ],
}
