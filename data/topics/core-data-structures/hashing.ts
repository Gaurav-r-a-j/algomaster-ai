import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const hashing: Topic = {
  id: "hashing",
  title: "Hashing",
  description: "Efficient data storage and retrieval using hash functions.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.HASH_TABLE,
  module: "2. Core Data Structures",
  order: 8,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Group Anagrams",
      url: "https://leetcode.com/problems/group-anagrams/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Hashing Data Structure",
      url: "https://www.geeksforgeeks.org/hashing-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Design HashMap",
      url: "https://leetcode.com/problems/design-hashmap/",
      difficulty: "Easy",
    },
  ],
  quiz: [],
}
