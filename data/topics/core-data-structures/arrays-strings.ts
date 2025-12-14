import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const arraysStrings: Topic = {
  id: "arrays-strings",
  title: "Arrays & Strings",
  description: "Fundamental data structures for storing sequences of data.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "2. Core Data Structures",
  order: 4,
  difficulty: "Easy",
  content: `# Arrays & Strings

Arrays and strings are the most fundamental data structures in programming. Understanding them deeply is crucial for mastering algorithms.

## Arrays

Arrays store elements of the same type in a contiguous block of memory. This structure gives arrays their biggest advantages and disadvantages.

### Advantages

- **Fast Access:** Accessing any element by its index is instantaneous (O(1)) because the computer can calculate its exact memory address
- **Cache Friendly:** Contiguous memory means better cache performance
- **Simple:** Easy to understand and use

### Disadvantages

- **Fixed Size:** In many languages, you must declare the size beforehand
- **Slow Insertion/Deletion:** Adding or removing elements in the middle requires shifting all subsequent elements (O(n))

### Common Operations

\`\`\`python
# Creating an array
arr = [1, 2, 3, 4, 5]

# Accessing elements (O(1))
first = arr[0]  # 1
last = arr[-1]  # 5

# Searching (O(n))
index = arr.index(3)  # 2

# Insertion at end (O(1))
arr.append(6)

# Insertion at middle (O(n))
arr.insert(2, 10)  # [1, 2, 10, 3, 4, 5, 6]
\`\`\`

## Strings

Strings are essentially arrays of characters. They share many properties with arrays but have string-specific operations.

### String Operations

\`\`\`python
# String creation
s = "Hello, World!"

# Accessing characters (O(1))
first_char = s[0]  # 'H'

# String concatenation (O(n))
new_string = s + " Welcome"  # "Hello, World! Welcome"

# Substring (O(n))
sub = s[0:5]  # "Hello"

# Finding substring (O(n*m))
index = s.find("World")  # 7
\`\`\`

## Common Patterns

1. **Two Pointers:** Use two pointers to traverse from both ends
2. **Sliding Window:** Maintain a window of elements
3. **Prefix/Suffix Arrays:** Precompute prefix or suffix information

## Practice Problems

- Reverse a string
- Find the longest substring without repeating characters
- Merge two sorted arrays
- Rotate an array`,
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Best Time to Buy and Sell Stock",
      url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Arrays",
      url: "https://www.geeksforgeeks.org/array-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Reverse String",
      url: "https://leetcode.com/problems/reverse-string/",
      difficulty: "Easy",
    },
  ],
  quiz: [],
}
