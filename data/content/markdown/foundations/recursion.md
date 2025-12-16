# Recursion

**Recursion** is a technique where a function calls itself to solve a problem by breaking it into smaller subproblems of the same type.

## Visual Metaphor

```
factorial(4)
    └── 4 × factorial(3)
             └── 3 × factorial(2)
                      └── 2 × factorial(1)
                               └── 1  ← Base Case!
                      └── 2 × 1 = 2
             └── 3 × 2 = 6
    └── 4 × 6 = 24 ← Final Answer!
```

---

## Real-World Analogies

| Analogy | Description |
|---------|-------------|
| **Russian Dolls** | Open a doll → find smaller doll → repeat until tiniest |
| **Mirrors** | Two facing mirrors create infinite reflections |
| **Fractal Trees** | Each branch splits into smaller branches like the trunk |
| **Org Charts** | Report to manager → manager reports to director → ... |
| **File Systems** | Folders contain files and other folders |

---

## Two Essential Parts

### 1. Base Case (Stopping Condition)

The condition where recursion stops. Without it → infinite loop → stack overflow!

```python
if n <= 1:  # Base case
    return 1
```

### 2. Recursive Case

The function calls itself with a **smaller/simpler input**.

```python
return n * factorial(n - 1)  # Moving toward base case
```

---

## How Recursion Works: The Call Stack

```
Call Stack:
┌──────────────────┐
│ factorial(1) → 1 │  ← Top (Current)
├──────────────────┤
│ factorial(2)     │
├──────────────────┤
│ factorial(3)     │
├──────────────────┤
│ factorial(4)     │  ← Bottom (Original call)
└──────────────────┘

1. Each call pushes onto stack
2. Base case returns value
3. Stack unwinds, combining results
```

---

## Classic Examples

### Factorial

```python
def factorial(n):
    """n! = n × (n-1) × (n-2) × ... × 1"""
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

# Trace: factorial(5)
# = 5 * factorial(4)
# = 5 * 4 * factorial(3)
# = 5 * 4 * 3 * factorial(2)
# = 5 * 4 * 3 * 2 * factorial(1)
# = 5 * 4 * 3 * 2 * 1
# = 120
```

### Fibonacci

```python
def fibonacci(n):
    """F(n) = F(n-1) + F(n-2)"""
    # Base cases
    if n <= 1:
        return n
    # Recursive case (two branches!)
    return fibonacci(n - 1) + fibonacci(n - 2)

# F(5) = F(4) + F(3)
#      = (F(3) + F(2)) + (F(2) + F(1))
#      = ...
#      = 5
```

### Sum of Array

```python
def array_sum(arr):
    """Sum all elements recursively"""
    # Base case: empty array
    if len(arr) == 0:
        return 0
    # Recursive case
    return arr[0] + array_sum(arr[1:])

# array_sum([1, 2, 3, 4])
# = 1 + array_sum([2, 3, 4])
# = 1 + 2 + array_sum([3, 4])
# = 1 + 2 + 3 + array_sum([4])
# = 1 + 2 + 3 + 4 + array_sum([])
# = 1 + 2 + 3 + 4 + 0
# = 10
```

### Binary Search

```python
def binary_search(arr, target, left, right):
    """Search sorted array - O(log n)"""
    # Base case: not found
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    # Base case: found
    if arr[mid] == target:
        return mid
    
    # Recursive cases
    if arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)
```

---

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Code | Often cleaner, more intuitive | Can be verbose |
| Memory | Uses call stack (O(n) space) | Usually O(1) space |
| Speed | Function call overhead | Generally faster |
| Risk | Stack overflow | Infinite loops |
| Best for | Trees, graphs, divide & conquer | Simple loops |

### Same Problem, Two Ways

```python
# Recursive
def sum_recursive(n):
    if n <= 0:
        return 0
    return n + sum_recursive(n - 1)

# Iterative
def sum_iterative(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

---

## Types of Recursion

### 1. Direct Recursion

Function calls itself directly.

```python
def countdown(n):
    if n <= 0:
        return
    print(n)
    countdown(n - 1)  # Direct call
```

### 2. Indirect Recursion

Functions call each other.

```python
def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)
```

### 3. Tail Recursion

Recursive call is the last operation (can be optimized).

```python
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # Tail call
```

### 4. Head Recursion

Recursive call happens first.

```python
def print_array(arr):
    if len(arr) == 0:
        return
    print_array(arr[1:])  # Recursive call first
    print(arr[0])         # Then process
```

---

## Common Patterns

### Pattern 1: Reduce by One

```python
def countdown(n):
    if n == 0:
        return
    print(n)
    countdown(n - 1)  # Reduce n by 1
```

### Pattern 2: Divide in Half

```python
def binary_search(arr, target, lo, hi):
    if lo > hi:
        return -1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, lo, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, hi)
```

### Pattern 3: Multiple Branches

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)  # Two branches
```

### Pattern 4: Process and Accumulate

```python
def sum_digits(n, total=0):
    if n == 0:
        return total
    return sum_digits(n // 10, total + n % 10)
```

---

## Optimization: Memoization

Cache results to avoid redundant calculations.

### Without Memoization: O(2^n)

```python
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# fib(5) recalculates fib(3) multiple times!
```

### With Memoization: O(n)

```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Using Python's built-in
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cached(n):
    if n <= 1:
        return n
    return fib_cached(n - 1) + fib_cached(n - 2)
```

---

## Common Pitfalls

### 1. Missing Base Case

```python
# WRONG - infinite recursion!
def infinite(n):
    return infinite(n - 1)

# CORRECT
def finite(n):
    if n <= 0:  # Base case
        return 0
    return finite(n - 1)
```

### 2. Not Approaching Base Case

```python
# WRONG - never reaches base case!
def stuck(n):
    if n == 0:
        return 0
    return stuck(n)  # n doesn't change!

# CORRECT
def progressing(n):
    if n == 0:
        return 0
    return progressing(n - 1)  # n decreases
```

### 3. Stack Overflow

```python
# DANGER - very deep recursion
def deep(n):
    if n == 0:
        return 0
    return 1 + deep(n - 1)

deep(1000000)  # RecursionError!

# Solution: Increase limit or use iteration
import sys
sys.setrecursionlimit(10000)
```

---

## When to Use Recursion

### ✅ Good Use Cases

- **Tree traversal** (preorder, inorder, postorder)
- **Graph traversal** (DFS)
- **Divide and conquer** (merge sort, quick sort)
- **Backtracking** (N-Queens, Sudoku)
- **Dynamic programming** (with memoization)
- **Problems with recursive structure** (fractals, nested data)

### ❌ Avoid When

- Simple iteration suffices
- Performance is critical
- Deep recursion possible (use iteration)
- Tail call optimization not available

---

## Key Takeaways

1. **Every recursion needs a base case** to stop
2. **Each call must move toward the base case**
3. **Think of the problem in terms of itself** (F(n) = n × F(n-1))
4. **Trace through small examples** to understand
5. **Use memoization** for overlapping subproblems
6. **Consider iteration** for simple cases or performance
7. **Watch for stack overflow** with deep recursion
