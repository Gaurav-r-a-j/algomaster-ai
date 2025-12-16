# Arrays & Strings

Arrays and strings are the **most fundamental data structures** in programming. Mastering them is essential for solving most coding problems.

## Visual Representation

```
Array: [10, 20, 30, 40, 50]
        ↑    ↑    ↑    ↑    ↑
Index:  0    1    2    3    4

Memory: Contiguous block
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
 0x00 0x04 0x08 0x0C 0x10  ← Memory addresses
```

---

## Arrays

### Core Operations

| Operation | Time Complexity | Description |
|-----------|-----------------|-------------|
| Access by index | O(1) | Direct memory calculation |
| Search (unsorted) | O(n) | Check each element |
| Search (sorted) | O(log n) | Binary search |
| Insert at end | O(1) | Amortized for dynamic arrays |
| Insert at middle | O(n) | Shift elements |
| Delete at middle | O(n) | Shift elements |

### Python

```python
# Creating arrays
arr = [1, 2, 3, 4, 5]
arr = [0] * 10  # [0, 0, 0, ..., 0]
matrix = [[0] * 3 for _ in range(3)]  # 3x3 matrix

# Access (O(1))
first = arr[0]
last = arr[-1]
second_last = arr[-2]

# Slicing (O(k) where k is slice size)
sub = arr[1:4]      # [2, 3, 4]
reversed = arr[::-1]  # [5, 4, 3, 2, 1]
copy = arr[:]       # Shallow copy

# Modification
arr.append(6)       # Add to end - O(1) amortized
arr.insert(2, 10)   # Insert at index 2 - O(n)
arr.pop()           # Remove last - O(1)
arr.pop(0)          # Remove first - O(n)
arr.remove(3)       # Remove first occurrence - O(n)

# Searching
idx = arr.index(4)  # Get index - O(n)
exists = 4 in arr   # Check existence - O(n)

# Sorting
arr.sort()          # In-place sort - O(n log n)
sorted_arr = sorted(arr)  # Returns new list

# Useful functions
length = len(arr)
minimum = min(arr)
maximum = max(arr)
total = sum(arr)
```

### JavaScript

```javascript
// Creating arrays
const arr = [1, 2, 3, 4, 5];
const zeros = new Array(10).fill(0);
const matrix = Array.from({ length: 3 }, () => new Array(3).fill(0));

// Access (O(1))
const first = arr[0];
const last = arr[arr.length - 1];

// Modification
arr.push(6);           // Add to end - O(1)
arr.unshift(0);        // Add to front - O(n)
arr.pop();             // Remove last - O(1)
arr.shift();           // Remove first - O(n)
arr.splice(2, 1);      // Remove at index 2 - O(n)

// Searching
const idx = arr.indexOf(4);     // Get index
const exists = arr.includes(4); // Check existence
const found = arr.find(x => x > 3);  // Find first match

// Transformations (functional)
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, x) => acc + x, 0);

// Sorting
arr.sort((a, b) => a - b);  // Numeric sort
```

### Java

```java
// Static array
int[] arr = {1, 2, 3, 4, 5};
int[] zeros = new int[10];  // Initialized to 0

// Dynamic array (ArrayList)
ArrayList<Integer> list = new ArrayList<>();
list.add(1);              // Add to end
list.add(0, 10);          // Insert at index
list.get(0);              // Access
list.remove(0);           // Remove at index
list.size();              // Get length

// Common operations
Arrays.sort(arr);         // Sort array
Collections.sort(list);   // Sort ArrayList
Arrays.binarySearch(arr, 3);  // Binary search
```

---

## Strings

Strings are **immutable** in most languages (Python, Java, JavaScript). Every "modification" creates a new string.

### Core Operations

| Operation | Time Complexity |
|-----------|-----------------|
| Access character | O(1) |
| Concatenation | O(n + m) |
| Substring | O(k) where k is length |
| Search substring | O(n × m) naive |
| Compare | O(min(n, m)) |

### Python

```python
s = "Hello, World!"

# Access (O(1))
first = s[0]       # 'H'
last = s[-1]       # '!'

# Slicing
sub = s[0:5]       # "Hello"
rev = s[::-1]      # "!dlroW ,olleH"

# String methods
s.lower()          # "hello, world!"
s.upper()          # "HELLO, WORLD!"
s.strip()          # Remove whitespace
s.split(", ")      # ["Hello", "World!"]
", ".join(["a", "b"])  # "a, b"

# Searching
idx = s.find("World")     # 7 (or -1 if not found)
idx = s.index("World")    # 7 (raises error if not found)
count = s.count("l")      # 3
exists = "World" in s     # True

# Replace
new_s = s.replace("World", "Python")  # "Hello, Python!"

# Character checks
"abc".isalpha()    # True
"123".isdigit()    # True
"abc123".isalnum() # True

# Building strings efficiently
chars = []
for c in "hello":
    chars.append(c.upper())
result = "".join(chars)  # "HELLO"
```

### JavaScript

```javascript
const s = "Hello, World!";

// Access
const first = s[0];       // 'H'
const last = s.at(-1);    // '!'

// Methods
s.toLowerCase();          // "hello, world!"
s.toUpperCase();          // "HELLO, WORLD!"
s.trim();                 // Remove whitespace
s.split(", ");            // ["Hello", "World!"]
["a", "b"].join(", ");    // "a, b"

// Searching
s.indexOf("World");       // 7
s.includes("World");      // true
s.startsWith("Hello");    // true
s.endsWith("!");          // true

// Substring
s.slice(0, 5);            // "Hello"
s.substring(0, 5);        // "Hello"

// Replace
s.replace("World", "JS"); // "Hello, JS!"
s.replaceAll("l", "L");   // "HeLLo, WorLd!"

// Template literals
const name = "Alice";
const greeting = `Hello, ${name}!`;  // "Hello, Alice!"
```

---

## Common Patterns

### 1. Two Pointers

```python
# Example: Reverse a string in-place
def reverse_string(s):
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    
    return "".join(chars)

# Example: Check if palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    
    return True
```

### 2. Sliding Window

```python
# Example: Maximum sum of k consecutive elements
def max_sum_subarray(arr, k):
    if len(arr) < k:
        return None
    
    # Calculate first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example: Longest substring without repeating chars
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

### 3. Prefix Sum

```python
# Example: Range sum query
def build_prefix_sum(arr):
    prefix = [0] * (len(arr) + 1)
    for i in range(len(arr)):
        prefix[i + 1] = prefix[i] + arr[i]
    return prefix

def range_sum(prefix, left, right):
    return prefix[right + 1] - prefix[left]

# Usage
arr = [1, 2, 3, 4, 5]
prefix = build_prefix_sum(arr)
print(range_sum(prefix, 1, 3))  # 2 + 3 + 4 = 9
```

### 4. Hash Map for Counting

```python
from collections import Counter

# Count character frequencies
s = "aabbbcccc"
counter = Counter(s)  # {'c': 4, 'b': 3, 'a': 2}

# Two Sum pattern
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

---

## Classic Interview Problems

| Problem | Pattern | Time |
|---------|---------|------|
| Two Sum | Hash Map | O(n) |
| Valid Anagram | Counting | O(n) |
| Reverse String | Two Pointers | O(n) |
| Is Palindrome | Two Pointers | O(n) |
| Max Subarray | Kadane's | O(n) |
| Merge Sorted Arrays | Two Pointers | O(n + m) |
| Longest Substring No Repeat | Sliding Window | O(n) |
| Rotate Array | Reverse | O(n) |
| Product Except Self | Prefix/Suffix | O(n) |

---

## Key Takeaways

1. **Arrays** = Contiguous memory, O(1) access
2. **Strings** = Immutable in most languages
3. **Two Pointers** = Efficient for sorted/symmetric problems
4. **Sliding Window** = Subarray/substring problems
5. **Hash Map** = O(1) lookup for counting/pairing
6. **Prefix Sum** = O(1) range queries after O(n) preprocessing
