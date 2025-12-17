import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { trieQuiz } from "@/data/content/markdown/trees-heaps/trie.quiz"

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
  quiz: trieQuiz,
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
