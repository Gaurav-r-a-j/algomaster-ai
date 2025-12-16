# Quick Sort

**Quick Sort** is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element and partitioning the array around it.

## Key Concept

1. **Choose a pivot** element
2. **Partition**: Move smaller elements left, larger elements right
3. **Recursively** sort the left and right partitions
4. **Combine**: Array is sorted!

```
[8, 3, 7, 1, 5, 9, 2]
         ↑
       pivot = 5

Partition:
[3, 1, 2] [5] [8, 7, 9]
  < 5      =    > 5

Recursively sort each partition...
```

---

## Algorithm Visualization

```
Original: [8, 3, 7, 1, 5, 9, 2]

Step 1: pivot = 5
        [3, 1, 2, 5, 8, 7, 9]
        └──┬──┘   └──┬──┘
          left     right

Step 2: Sort left [3, 1, 2], pivot = 2
        [1, 2, 3]

Step 3: Sort right [8, 7, 9], pivot = 9
        [7, 8, 9]

Result: [1, 2, 3, 5, 7, 8, 9]
```

---

## Implementation

### Python

```python
def quick_sort(arr):
    """
    Quick Sort using list comprehension (simple but not in-place).
    Time: O(n log n) average, O(n²) worst
    Space: O(n) due to new lists
    """
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Usage
arr = [8, 3, 7, 1, 5, 9, 2]
sorted_arr = quick_sort(arr)
print(sorted_arr)  # [1, 2, 3, 5, 7, 8, 9]


def quick_sort_inplace(arr, low=0, high=None):
    """
    In-place Quick Sort using Lomuto partition scheme.
    Time: O(n log n) average, O(n²) worst
    Space: O(log n) for recursion stack
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)
    
    return arr

def partition(arr, low, high):
    """Lomuto partition: pivot is last element"""
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Usage
arr = [8, 3, 7, 1, 5, 9, 2]
quick_sort_inplace(arr)
print(arr)  # [1, 2, 3, 5, 7, 8, 9]


def quick_sort_hoare(arr, low=0, high=None):
    """
    Quick Sort using Hoare partition (more efficient).
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pivot_idx = hoare_partition(arr, low, high)
        quick_sort_hoare(arr, low, pivot_idx)
        quick_sort_hoare(arr, pivot_idx + 1, high)
    
    return arr

def hoare_partition(arr, low, high):
    """Hoare partition: pivot is first element"""
    pivot = arr[low]
    i = low - 1
    j = high + 1
    
    while True:
        i += 1
        while arr[i] < pivot:
            i += 1
        
        j -= 1
        while arr[j] > pivot:
            j -= 1
        
        if i >= j:
            return j
        
        arr[i], arr[j] = arr[j], arr[i]
```

### JavaScript

```javascript
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// In-place version
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSortInPlace(arr, low, pivotIdx - 1);
        quickSortInPlace(arr, pivotIdx + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Usage
const arr = [8, 3, 7, 1, 5, 9, 2];
console.log(quickSort(arr));  // [1, 2, 3, 5, 7, 8, 9]
```

### Java

```java
public class QuickSort {
    
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIdx = partition(arr, low, high);
            quickSort(arr, low, pivotIdx - 1);
            quickSort(arr, pivotIdx + 1, high);
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] arr = {8, 3, 7, 1, 5, 9, 2};
        quickSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
        // [1, 2, 3, 5, 7, 8, 9]
    }
}
```

### C++

```cpp
#include <vector>
#include <algorithm>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

// Usage
std::vector<int> arr = {8, 3, 7, 1, 5, 9, 2};
quickSort(arr, 0, arr.size() - 1);
// arr is now {1, 2, 3, 5, 7, 8, 9}
```

---

## Pivot Selection Strategies

| Strategy | Description | Performance |
|----------|-------------|-------------|
| **First element** | `pivot = arr[low]` | Poor on sorted arrays |
| **Last element** | `pivot = arr[high]` | Poor on sorted arrays |
| **Middle element** | `pivot = arr[mid]` | Better average case |
| **Random** | `pivot = arr[random]` | Best average case |
| **Median-of-three** | Median of first, middle, last | Very good |

### Random Pivot (Recommended)

```python
import random

def partition_random(arr, low, high):
    """Randomized partition to avoid worst case"""
    rand_idx = random.randint(low, high)
    arr[rand_idx], arr[high] = arr[high], arr[rand_idx]
    return partition(arr, low, high)
```

### Median-of-Three

```python
def median_of_three(arr, low, high):
    """Select median of first, middle, last as pivot"""
    mid = (low + high) // 2
    
    if arr[low] > arr[mid]:
        arr[low], arr[mid] = arr[mid], arr[low]
    if arr[low] > arr[high]:
        arr[low], arr[high] = arr[high], arr[low]
    if arr[mid] > arr[high]:
        arr[mid], arr[high] = arr[high], arr[mid]
    
    # Median is now at mid, move to high-1
    arr[mid], arr[high - 1] = arr[high - 1], arr[mid]
    return arr[high - 1]
```

---

## Time & Space Complexity

| Case | Time | Space | When? |
|------|------|-------|-------|
| **Best** | O(n log n) | O(log n) | Balanced partitions |
| **Average** | O(n log n) | O(log n) | Random data |
| **Worst** | O(n²) | O(n) | Already sorted, bad pivot |

---

## Quick Sort vs Other Sorts

| Feature | Quick Sort | Merge Sort | Heap Sort |
|---------|------------|------------|-----------|
| Average Time | O(n log n) | O(n log n) | O(n log n) |
| Worst Time | O(n²) | O(n log n) | O(n log n) |
| Space | O(log n) | O(n) | O(1) |
| Stable | No | Yes | No |
| In-place | Yes | No | Yes |
| Cache | Excellent | Good | Poor |

---

## Optimizations

### 1. Tail Recursion Elimination

```python
def quick_sort_optimized(arr, low, high):
    """Optimize to reduce stack depth"""
    while low < high:
        pivot_idx = partition(arr, low, high)
        
        # Recurse on smaller partition, loop on larger
        if pivot_idx - low < high - pivot_idx:
            quick_sort_optimized(arr, low, pivot_idx - 1)
            low = pivot_idx + 1
        else:
            quick_sort_optimized(arr, pivot_idx + 1, high)
            high = pivot_idx - 1
```

### 2. Switch to Insertion Sort for Small Arrays

```python
def quick_sort_hybrid(arr, low, high, threshold=10):
    """Use insertion sort for small subarrays"""
    if high - low < threshold:
        insertion_sort(arr, low, high)
        return
    
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_hybrid(arr, low, pivot_idx - 1, threshold)
        quick_sort_hybrid(arr, pivot_idx + 1, high, threshold)
```

### 3. Three-Way Partition (Dutch National Flag)

```python
def quick_sort_3way(arr, low, high):
    """
    Handle duplicates efficiently.
    Partitions into: [< pivot] [= pivot] [> pivot]
    """
    if low >= high:
        return
    
    lt = low      # arr[low..lt-1] < pivot
    gt = high     # arr[gt+1..high] > pivot
    i = low + 1   # arr[lt..i-1] == pivot
    pivot = arr[low]
    
    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1
    
    quick_sort_3way(arr, low, lt - 1)
    quick_sort_3way(arr, gt + 1, high)
```

---

## Common Interview Problems

### Quick Select (Kth Smallest Element)

```python
def quick_select(arr, k):
    """
    Find kth smallest element in O(n) average time.
    Uses partitioning without full sorting.
    """
    def select(left, right, k_smallest):
        if left == right:
            return arr[left]
        
        pivot_idx = partition(arr, left, right)
        
        if k_smallest == pivot_idx:
            return arr[k_smallest]
        elif k_smallest < pivot_idx:
            return select(left, pivot_idx - 1, k_smallest)
        else:
            return select(pivot_idx + 1, right, k_smallest)
    
    return select(0, len(arr) - 1, k - 1)

# Find 3rd smallest
arr = [7, 4, 6, 3, 9, 1]
print(quick_select(arr, 3))  # 4
```

---

## Key Takeaways

1. **Divide & Conquer** - Split array around pivot, sort recursively
2. **In-place** - O(log n) space (just recursion stack)
3. **Not stable** - Equal elements may be reordered
4. **Use randomized pivot** - Avoids O(n²) on sorted input
5. **Best for general purpose** - Usually fastest in practice
6. **Worst case O(n²)** - Use median-of-three or random pivot
