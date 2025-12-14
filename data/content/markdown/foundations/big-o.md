# Big O Notation

Big O notation describes how the runtime or space requirements of an algorithm grow as input size increases. It's the language we use to talk about algorithm efficiency.

## The Restaurant Analogy

- **O(1) - Order a Drink**: It takes 30 seconds to pour a soda, whether it's just you or you are one of many. The time for *your* drink is constant.
- **O(n) - Taking Orders**: The waiter takes orders one by one. If there are 10 people, it takes 10x longer than for 1 person.
- **O(n²) - The Toast**: If everyone clinks glasses with everyone else at a party of `n` people, the number of clinks grows rapidly!

## The Backpack Analogy (Space Complexity)

- **O(1)**: You read a book. You don't need extra space, just the book in your hand.
- **O(n)**: You copy the book onto flashcards. You need a stack of cards proportional to the book's size.


## What is Big O?

Big O describes the **worst-case** scenario for how an algorithm performs as input size grows. We focus on the dominant term and ignore constants.

## Common Time Complexities

### O(1) - Constant Time
The operation takes the same time regardless of input size.

```python
def get_first(arr):
    return arr[0]  # Always takes same time

# Dictionary/Set lookup
my_dict = {"key": "value"}
value = my_dict["key"]  # O(1) average case
```

### O(log n) - Logarithmic
Very efficient. Each operation reduces the problem size significantly.

```python
# Binary search
def binary_search(arr, target):
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

### O(n) - Linear
Time grows proportionally with input size.

```python
# Finding max in array
def find_max(arr):
    max_val = arr[0]
    for num in arr:  # Iterates n times
        if num > max_val:
            max_val = num
    return max_val
```

### O(n log n) - Linearithmic
Common in efficient sorting algorithms.

```python
# Merge Sort, Quick Sort, Heap Sort
# Most efficient comparison-based sorts
```

### O(n²) - Quadratic
Common with nested loops.

```python
# Bubble Sort, Selection Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):  # Outer loop: n iterations
        for j in range(n - i - 1):  # Inner loop: n iterations
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

### O(2^n) - Exponential
Very slow. Common in recursive problems without optimization.

```python
# Naive Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)  # Two recursive calls
```

## Space Complexity

Space complexity describes how much extra memory an algorithm needs.

```python
# O(1) space - no extra memory
def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n) space - creates new array
def reverse_array(arr):
    result = []
    for i in range(len(arr) - 1, -1, -1):
        result.append(arr[i])
    return result
```

## Complexity Comparison

For n = 1,000,000:
- O(1): 1 operation
- O(log n): ~20 operations
- O(n): 1,000,000 operations
- O(n log n): ~20,000,000 operations
- O(n²): 1,000,000,000,000 operations
- O(2^n): 2^1,000,000 operations (impossible!)

## Rules of Thumb

1. **Drop Constants:** O(2n) = O(n)
2. **Drop Lower Terms:** O(n² + n) = O(n²)
3. **Different Terms for Inputs:** O(a + b) if inputs are different sizes
4. **Nested Operations Multiply:** O(n × m) for nested loops

## Why It Matters

- **Interview Questions:** Companies test your understanding
- **System Design:** Choose algorithms that scale
- **Performance:** Optimize bottlenecks
- **Resource Planning:** Predict memory/CPU needs

## Practice Tips

1. Analyze loops - each loop adds a factor of n
2. Recursion depth matters - usually O(depth)
3. Data structure operations have different complexities
4. Always consider worst case, not best case
