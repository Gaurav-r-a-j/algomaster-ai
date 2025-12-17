import type { QuizQuestion } from "@/types/curriculum"

export const trieQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of searching a word in a Trie?",
    options: ["O(1)", "O(log n)", "O(m)", "O(n)"],
    correctAnswer: 2,
    explanation: "Searching in a Trie takes O(m) time where m is the length of the word being searched."
  },
  {
    id: 2,
    question: "What is the main advantage of Trie over hash table for strings?",
    options: [
      "Faster lookups",
      "Efficient prefix matching and autocomplete",
      "Uses less memory",
      "Simpler implementation"
    ],
    correctAnswer: 1,
    explanation: "Trie excels at prefix matching, finding all words with a given prefix, which hash tables can't do efficiently."
  },
  {
    id: 3,
    question: "What is the space complexity of a Trie?",
    options: [
      "O(n)",
      "O(ALPHABET_SIZE × N × M)",
      "O(log n)",
      "O(1)"
    ],
    correctAnswer: 1,
    explanation: "Trie space is O(ALPHABET_SIZE × N × M) where N is number of words and M is average length."
  },
  {
    id: 4,
    question: "What operation is Trie particularly good for?",
    options: [
      "Sorting numbers",
      "Autocomplete and prefix search",
      "Finding minimum",
      "Graph traversal"
    ],
    correctAnswer: 1,
    explanation: "Trie is ideal for autocomplete, spell checkers, and finding all words with a common prefix."
  },
  {
    id: 5,
    question: "What is the time complexity of inserting a word of length m into a Trie?",
    options: ["O(1)", "O(log m)", "O(m)", "O(m²)"],
    correctAnswer: 2,
    explanation: "Inserting a word of length m takes O(m) time - one operation per character."
  }
]

