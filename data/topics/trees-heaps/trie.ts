import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const trie: Topic = {
  id: "trie",
  title: "Trie (Prefix Tree)",
  description:
    "Tree-like data structure for efficient string storage and prefix matching.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(m)", space: "O(ALPHABET_SIZE * N * M)" },
  visualizerType: VisualizerType.NONE,
  module: "4. Trees & Heaps",
  order: 19,
  difficulty: "Medium",
  content: `# Trie (Prefix Tree)

A Trie is a tree-like data structure used for storing strings. It's excellent for prefix matching and autocomplete.

## Structure

Each node contains:
- **Children:** Array/map of child nodes (one per character)
- **isEndOfWord:** Boolean flag indicating end of word

## Implementation

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
\`\`\`

## Operations

### Insert
\`\`\`python
trie = Trie()
trie.insert("apple")
trie.insert("app")
trie.insert("application")
\`\`\`

### Search
\`\`\`python
trie.search("app")      # True
trie.search("apple")    # True
trie.search("appl")     # False (not a complete word)
\`\`\`

### Prefix Search
\`\`\`python
trie.starts_with("app")  # True
trie.starts_with("ban")  # False
\`\`\`

## Time Complexity

- **Insert:** O(m) where m = word length
- **Search:** O(m) where m = word length
- **Prefix Search:** O(m) where m = prefix length

## Space Complexity

O(ALPHABET_SIZE × N × M) where:
- ALPHABET_SIZE = 26 for lowercase English
- N = number of words
- M = average word length

## Applications

1. **Autocomplete:** Search engines, IDEs
2. **Spell Checkers:** Dictionary lookup
3. **IP Routing:** Longest prefix matching
4. **Phone Directory:** Contact search
5. **Word Games:** Scrabble, Boggle

## Advantages

- Fast prefix matching: O(m)
- Efficient for dictionary operations
- Space efficient for common prefixes
- Good for autocomplete

## Disadvantages

- High memory usage
- Slower than hash table for exact match
- Complex deletion

## When to Use

- Need prefix matching
- Autocomplete functionality
- Dictionary/word lookup
- String pattern matching

## Example: Autocomplete

\`\`\`python
def autocomplete(trie, prefix):
    node = trie.root
    for char in prefix:
        if char not in node.children:
            return []
        node = node.children[char]
    
    # DFS to find all words with this prefix
    results = []
    def dfs(node, path):
        if node.is_end_of_word:
            results.append(prefix + path)
        for char, child in node.children.items():
            dfs(child, path + char)
    
    dfs(node, "")
    return results
\`\`\`
`,
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
