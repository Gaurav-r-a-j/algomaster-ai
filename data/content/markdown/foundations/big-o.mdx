# Big O Notation

**Big O notation** describes how an algorithm's performance (time or space) scales with input size. It's the universal language for discussing algorithm efficiency.

## Visual Overview

```
Performance
    ^
    |                         O(2^n) 💥
    |                    O(n²) ╱
    |               O(n log n)
    |          O(n) ╱
    |     O(log n)
    | O(1) ═════════════════════
    └────────────────────────────> Input Size (n)
```

---

## Real-World Analogies

| Complexity | Analogy | Example |
|------------|---------|---------|
| **O(1)** | Getting a drink from vending machine | Same time regardless of inventory |
| **O(log n)** | Looking up a word in dictionary | Skip half each time |
| **O(n)** | Reading a book | Must read each page |
| **O(n log n)** | Sorting a deck of cards efficiently | Merge sort style |
| **O(n²)** | Everyone shakes hands with everyone | Grows quadratically |
| **O(2^n)** | Combinations of all outfits | Doubles with each item |

---

## Common Time Complexities

### O(1) - Constant Time ⚡

Same time regardless of input size.

```python
def get_first(arr):
    return arr[0]  # Always instant

# Hash table lookup
my_dict = {"key": "value"}
value = my_dict["key"]  # O(1) average

# Array index access
arr = [1, 2, 3, 4, 5]
element = arr[3]  # O(1)
```

**Examples:** Array access, hash table lookup, stack push/pop

---

### O(log n) - Logarithmic Time 🚀

Extremely efficient. Problem size halves each step.

```python
def binary_search(arr, target):
    """Finds target in sorted array - O(log n)"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

**Examples:** Binary search, balanced BST operations

| n | log₂(n) |
|---|---------|
| 16 | 4 |
| 1,024 | 10 |
| 1,048,576 | 20 |
| 1 billion | 30 |

---

### O(n) - Linear Time 📈

Time grows proportionally with input.

```python
def find_max(arr):
    """Scans entire array - O(n)"""
    max_val = arr[0]
    for num in arr:  # n iterations
        if num > max_val:
            max_val = num
    return max_val

def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1
```

**Examples:** Linear search, array sum, finding min/max

---

### O(n log n) - Linearithmic Time 📊

Optimal for comparison-based sorting.

```python
def merge_sort(arr):
    """Efficient sorting - O(n log n)"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

**Examples:** Merge Sort, Quick Sort (average), Heap Sort

---

### O(n²) - Quadratic Time 🐌

Nested loops over input.

```python
def bubble_sort(arr):
    """Simple but slow sorting - O(n²)"""
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

def has_duplicates_naive(arr):
    """Check every pair - O(n²)"""
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False
```

**Examples:** Bubble Sort, Selection Sort, nested loops

---

### O(2^n) - Exponential Time 💥

Doubles with each input increase. Often optimizable with DP.

```python
def fibonacci_naive(n):
    """Without optimization - O(2^n)"""
    if n <= 1:
        return n
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)

def power_set(s):
    """All subsets - O(2^n)"""
    if len(s) == 0:
        return [[]]
    rest = power_set(s[1:])
    return rest + [[s[0]] + subset for subset in rest]
```

---

### O(n!) - Factorial Time 🔥

Grows astronomically. Usually avoid!

```python
def permutations(arr):
    """All orderings - O(n!)"""
    if len(arr) <= 1:
        return [arr]
    result = []
    for i, num in enumerate(arr):
        rest = arr[:i] + arr[i+1:]
        for perm in permutations(rest):
            result.append([num] + perm)
    return result
```

---

## Complexity Comparison Table

| Complexity | n=10 | n=100 | n=1,000 | n=10,000 |
|------------|------|-------|---------|----------|
| O(1) | 1 | 1 | 1 | 1 |
| O(log n) | 3 | 7 | 10 | 13 |
| O(n) | 10 | 100 | 1,000 | 10,000 |
| O(n log n) | 30 | 700 | 10,000 | 130,000 |
| O(n²) | 100 | 10,000 | 1,000,000 | 100,000,000 |
| O(2^n) | 1,024 | 1.27×10³⁰ | ∞ | ∞ |

---

## Space Complexity

Memory used by algorithm (excluding input).

### O(1) Space - Constant

```python
def sum_array(arr):
    """Only uses one variable"""
    total = 0  # O(1) extra space
    for num in arr:
        total += num
    return total

def swap(arr, i, j):
    """In-place swap"""
    arr[i], arr[j] = arr[j], arr[i]
```

### O(n) Space - Linear

```python
def reverse_array(arr):
    """Creates copy of same size"""
    return arr[::-1]  # O(n) extra space

def fibonacci_dp(n):
    """Stores all values"""
    dp = [0] * (n + 1)  # O(n) space
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### O(log n) Space - Recursion Stack

```python
def binary_search_recursive(arr, target, left, right):
    """Recursion depth is O(log n)"""
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)
```

---

## Time vs Space Tradeoff

| Approach | Time | Space | Example |
|----------|------|-------|---------|
| Brute Force | O(n²) | O(1) | Two Sum with nested loops |
| Hash Table | O(n) | O(n) | Two Sum with hash map |
| Sort First | O(n log n) | O(1) | Two Sum with two pointers |

```python
# Trade space for time
def two_sum_fast(nums, target):
    """O(n) time, O(n) space"""
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```

---

## Rules for Analyzing Complexity

### 1. Drop Constants

```
O(2n) → O(n)
O(100) → O(1)
O(n/2) → O(n)
```

### 2. Drop Lower-Order Terms

```
O(n² + n) → O(n²)
O(n³ + n² + n) → O(n³)
O(n + log n) → O(n)
```

### 3. Different Inputs = Different Variables

```python
def print_pairs(arr1, arr2):
    for a in arr1:      # O(a)
        for b in arr2:  # O(b)
            print(a, b)
# Total: O(a × b), NOT O(n²)
```

### 4. Nested Operations Multiply

```python
for i in range(n):        # O(n)
    for j in range(m):    # O(m)
        # ...
# Total: O(n × m)
```

### 5. Sequential Operations Add

```python
for i in range(n):  # O(n)
    # ...

for j in range(m):  # O(m)
    # ...
# Total: O(n + m)
```

---

## Common Data Structure Operations

| Operation | Array | Linked List | Hash Table | BST (balanced) |
|-----------|-------|-------------|------------|----------------|
| Access | O(1) | O(n) | N/A | O(log n) |
| Search | O(n) | O(n) | O(1)* | O(log n) |
| Insert | O(n) | O(1) | O(1)* | O(log n) |
| Delete | O(n) | O(1) | O(1)* | O(log n) |

*Average case. Worst case is O(n) for hash tables.

---

## Algorithm Complexity Cheat Sheet

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| **Searching** |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| **Sorting** |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| **Graphs** |
| BFS/DFS | O(V + E) | O(V + E) | O(V + E) | O(V) |
| Dijkstra | O((V+E) log V) | O((V+E) log V) | O((V+E) log V) | O(V) |

---

## Why Big O Matters

1. **Interviews**: Most companies test this directly
2. **Scalability**: Will your code work with 1M users?
3. **Optimization**: Know where to focus improvements
4. **System Design**: Choose appropriate algorithms
5. **Cost**: Faster algorithms = lower cloud bills

---

## Key Takeaways

1. Focus on **how growth scales**, not exact numbers
2. **Worst case** is what we typically analyze
3. **Drop constants and lower-order terms**
4. O(log n) is almost as good as O(1)
5. O(n log n) is optimal for comparison sorts
6. O(n²) is often a sign to optimize
7. O(2^n) usually means look for DP solution
