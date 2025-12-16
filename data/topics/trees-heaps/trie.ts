import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const trie: Topic = {
  id: "trie",
  title: "Trie (Prefix Tree)",
  description:
    "Tree-like data structure for efficient string storage and prefix matching.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(m)", space: "O(ALPHABET_SIZE * N * M)" },
  visualizerType: VisualizerType.TRIE,
  module: "4. Trees & Heaps",
  order: 19,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What is the time complexity of searching a word in a Trie?",
      options: ["O(1)", "O(log n)", "O(m)", "O(n)"],
      correctAnswer: 2,
      explanation:
        "Searching in a Trie takes O(m) time where m is the length of the word being searched.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Implement Trie",
      url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Word Search II",
      url: "https://leetcode.com/problems/word-search-ii/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: Trie",
      url: "https://www.geeksforgeeks.org/trie-insert-and-search/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Add and Search Word",
      url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      difficulty: "Medium",
    },
  ],
}
