import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const quickSort: Topic = {
  id: "quick-sort",
  title: "Quick Sort",
  description: "Efficient divide-and-conquer algorithm, often faster than Merge Sort in practice.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n log n)", space: "O(log n)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 15,
  difficulty: "Medium",
  content: `# Quick Sort

Quick Sort is a divide-and-conquer algorithm that picks a pivot element and partitions the array around it.

## How It Works

1. **Choose Pivot:** Select an element as pivot
2. **Partition:** Rearrange array so elements < pivot are on left, > pivot on right
3. **Recurse:** Recursively sort left and right subarrays

## Implementation

\`\`\`python
def quick_sort(arr, low, high):
    if low < high:
        # Partition and get pivot index
        pi = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    # Choose rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element (indicates right position of pivot)
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than pivot
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
arr = [10, 7, 8, 9, 1, 5]
quick_sort(arr, 0, len(arr) - 1)
print(arr)  # [1, 5, 7, 8, 9, 10]
\`\`\`

## Time Complexity

- **Best Case:** O(n log n) - Good pivot selection
- **Average Case:** O(n log n)
- **Worst Case:** O(n²) - Bad pivot selection (already sorted)

## Space Complexity

O(log n) - Recursion stack space (average case).

## Pivot Selection Strategies

### 1. Last Element (Simple)
\`\`\`python
pivot = arr[high]
\`\`\`

### 2. First Element
\`\`\`python
pivot = arr[low]
\`\`\`

### 3. Middle Element (Better)
\`\`\`python
pivot = arr[(low + high) // 2]
\`\`\`

### 4. Random (Best for worst-case avoidance)
\`\`\`python
import random
pivot_idx = random.randint(low, high)
arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
pivot = arr[high]
\`\`\`

## Characteristics

- **Not Stable:** May change relative order of equal elements
- **In-place:** O(log n) space for recursion
- **Cache Friendly:** Good locality of reference
- **Unpredictable:** Worst case can be O(n²)

## When to Use

- General-purpose sorting
- When average performance matters more than worst case
- When in-place sorting is preferred
- Large datasets

## Advantages

- Fast average case: O(n log n)
- In-place: O(log n) space
- Cache efficient
- Widely used in practice

## Disadvantages

- Worst case: O(n²)
- Not stable
- Performance depends on pivot selection

## Optimization Techniques

### 1. Random Pivot
Avoids worst case on sorted arrays.

### 2. Median-of-Three
Choose median of first, middle, last elements.

### 3. Insertion Sort for Small Arrays
Use Insertion Sort for arrays < 10 elements.

### 4. Three-Way Partitioning
Handles duplicate elements efficiently (Dutch National Flag).

## Comparison with Merge Sort

- **Quick Sort:** Faster average, O(log n) space, not stable
- **Merge Sort:** Guaranteed O(n log n), O(n) space, stable
`,
  quiz: [
    {
      id: 1,
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "Quick Sort can degrade to O(n²) with bad pivot selection, such as already sorted arrays.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Quick Sort",
      url: "https://www.geeksforgeeks.org/quick-sort/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Kth Largest Element",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Sort Colors",
      url: "https://leetcode.com/problems/sort-colors/",
      difficulty: "Medium",
    },
  ],
};
