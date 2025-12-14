import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const heaps: Topic = {
  id: "heaps",
  title: "Heaps",
  description:
    "Complete binary tree that maintains heap property - used for priority queues and efficient sorting.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.HEAP,
  module: "4. Trees & Heaps",
  order: 17,
  difficulty: "Medium",
  content: `# Heaps

A Heap is a complete binary tree that satisfies the heap property. It's commonly implemented as an array.

## Types of Heaps

### Min Heap
- Parent ≤ Children
- Root is the minimum element

### Max Heap
- Parent ≥ Children
- Root is the maximum element

## Array Representation

For a node at index \`i\`:
- **Parent:** \`(i - 1) / 2\`
- **Left Child:** \`2i + 1\`
- **Right Child:** \`2i + 2\`

## Operations

### Insert (Heapify Up)
\`\`\`python
def insert(heap, val):
    heap.append(val)
    i = len(heap) - 1
    
    # Bubble up
    while i > 0 and heap[(i - 1) // 2] > heap[i]:
        parent = (i - 1) // 2
        heap[parent], heap[i] = heap[i], heap[parent]
        i = parent
\`\`\`

### Extract Min/Max (Heapify Down)
\`\`\`python
def extract_min(heap):
    if not heap:
        return None
    
    min_val = heap[0]
    heap[0] = heap[-1]
    heap.pop()
    
    # Bubble down
    i = 0
    while True:
        smallest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < len(heap) and heap[left] < heap[smallest]:
            smallest = left
        if right < len(heap) and heap[right] < heap[smallest]:
            smallest = right
        
        if smallest == i:
            break
        
        heap[i], heap[smallest] = heap[smallest], heap[i]
        i = smallest
    
    return min_val
\`\`\`

### Build Heap (Heapify)
\`\`\`python
def build_heap(arr):
    n = len(arr)
    # Start from last non-leaf node
    for i in range(n // 2 - 1, -1, -1):
        heapify_down(arr, i, n)

def heapify_down(arr, i, n):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] < arr[smallest]:
        smallest = left
    if right < n and arr[right] < arr[smallest]:
        smallest = right
    
    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        heapify_down(arr, smallest, n)
\`\`\`

## Time Complexity

- **Insert:** O(log n)
- **Extract Min/Max:** O(log n)
- **Peek:** O(1)
- **Build Heap:** O(n) - surprisingly!

## Space Complexity

O(n) - Array storage.

## Applications

1. **Priority Queues:** Task scheduling
2. **Heap Sort:** O(n log n) sorting
3. **Kth Largest/Smallest:** Find kth element efficiently
4. **Merge K Sorted Lists:** Using min heap
5. **Dijkstra's Algorithm:** Shortest path finding

## Python Implementation

\`\`\`python
import heapq

# Min heap (default)
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
print(heapq.heappop(heap))  # 1 (minimum)

# Max heap (negate values)
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
heapq.heappush(max_heap, -2)
print(-heapq.heappop(max_heap))  # 3 (maximum)
\`\`\`

## When to Use

- Need priority queue functionality
- Finding kth largest/smallest
- Implementing heap sort
- Task scheduling systems

## Advantages

- Fast insert/extract: O(log n)
- Efficient for priority queues
- In-place sorting (heap sort)
- Simple array implementation

## Disadvantages

- Not suitable for searching (O(n))
- No random access
- Not stable for sorting
`,
  quiz: [
    {
      id: 1,
      question: "What is the time complexity of building a heap from an array?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation:
        "Building a heap from an array takes O(n) time, not O(n log n) as one might expect.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Kth Largest Element",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Merge K Sorted Lists",
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: Binary Heap",
      url: "https://www.geeksforgeeks.org/binary-heap/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Top K Frequent Elements",
      url: "https://leetcode.com/problems/top-k-frequent-elements/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Find Median from Data Stream",
      url: "https://leetcode.com/problems/find-median-from-data-stream/",
      difficulty: "Hard",
    },
  ],
}
