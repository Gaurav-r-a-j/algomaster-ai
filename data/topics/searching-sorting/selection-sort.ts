import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const selectionSort: Topic = {
  id: "selection-sort",
  title: "Selection Sort",
  description:
    "Simple sorting algorithm that finds the minimum element and places it at the beginning.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 12,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "How many swaps does Selection Sort perform?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      correctAnswer: 0,
      explanation: "Selection Sort performs exactly n-1 swaps, making it O(n).",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Selection Sort",
      url: "https://www.geeksforgeeks.org/selection-sort/",
      difficulty: "Easy",
    },
  ],
}
