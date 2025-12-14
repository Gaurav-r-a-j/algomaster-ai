import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  quiz: [
    {
      id: 1,
      question: "What is the time complexity of linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation:
        "Linear search has O(n) time complexity as it may need to check all n elements.",
    },
  ],
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
