import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const binarySearch: Topic = {
  id: "binary-search",
  title: "Binary Search",
  description: "Efficient search algorithm for sorted arrays.",
  category: AlgorithmType.SEARCHING,
  complexity: { time: "O(log n)", space: "O(1)" },
  visualizerType: VisualizerType.GRID,
  module: "3. Searching & Sorting",
  order: 10,
  difficulty: "Easy",
  content: `# Binary Search

Binary Search is an efficient algorithm for finding an item in a **sorted** array. It works by repeatedly dividing the search interval in half.

## How It Works

1. Compare target with the middle element
2. If target matches, return the index
3. If target is smaller, search the left half
4. If target is larger, search the right half
5. Repeat until found or interval is empty

## Implementation

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13, 15]
index = binary_search(arr, 7)  # Returns 3
\`\`\`

## Time Complexity

- **Best Case:** O(1) - Target is at the middle
- **Average Case:** O(log n)
- **Worst Case:** O(log n) - Target is at the end or not present

## Space Complexity

- **Iterative:** O(1)
- **Recursive:** O(log n) due to call stack

## Requirements

- **Array must be sorted** - This is critical!
- Works on arrays, not linked lists (no random access)

## Common Variations

### Find First Occurrence
\`\`\`python
def binary_search_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
\`\`\`

### Find Insertion Position
\`\`\`python
def search_insert(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return left  # Insertion position
\`\`\`

## When to Use

- Sorted arrays
- Need O(log n) performance
- Searching in large datasets
- Finding boundaries or ranges

## Advantages

- Very fast: O(log n) time
- Efficient for large datasets
- Can be adapted for various problems

## Disadvantages

- Requires sorted data
- More complex than linear search
- Not suitable for linked lists

## Real-World Applications

- Dictionary lookups
- Database indexing
- Finding elements in sorted collections
- Range queries
`,
  quiz: [
    {
      id: 1,
      question: "What is a requirement for binary search?",
      options: [
        "Array must be unsorted",
        "Array must be sorted",
        "Array must have duplicates",
        "Array must be small",
      ],
      correctAnswer: 1,
      explanation: "Binary search requires the array to be sorted to work correctly.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Binary Search",
      url: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Search Insert Position",
      url: "https://leetcode.com/problems/search-insert-position/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Find First and Last Position",
      url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Binary Search",
      url: "https://www.geeksforgeeks.org/binary-search/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Search in Rotated Sorted Array",
      url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      difficulty: "Medium",
    },
  ],
};
