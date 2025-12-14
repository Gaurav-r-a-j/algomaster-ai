import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const bubbleSort: Topic = {
  id: "bubble-sort",
  title: "Bubble Sort",
  description:
    "Simple sorting algorithm that repeatedly steps through the list.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 11,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 2,
      explanation:
        "Bubble Sort has O(n²) worst-case time complexity due to nested loops.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Bubble Sort",
      url: "https://www.geeksforgeeks.org/bubble-sort/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Sorting Tutorial",
      url: "https://www.hackerrank.com/challenges/tutorial-intro/problem",
      difficulty: "Easy",
    },
  ],
}
