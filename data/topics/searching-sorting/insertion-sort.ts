import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const insertionSort: Topic = {
  id: "insertion-sort",
  title: "Insertion Sort",
  description:
    "Efficient algorithm for small datasets, works like sorting playing cards in your hands.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 13,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What is the best-case time complexity of Insertion Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      correctAnswer: 0,
      explanation:
        "Insertion Sort is O(n) when the array is already sorted, making it adaptive.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Insertion Sort",
      url: "https://www.geeksforgeeks.org/insertion-sort/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Insertion Sort",
      url: "https://www.hackerrank.com/challenges/insertionsort1/problem",
      difficulty: "Easy",
    },
  ],
}
