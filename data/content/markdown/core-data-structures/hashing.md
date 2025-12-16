# Hashing

**Hashing** is a technique that maps data of arbitrary size to fixed-size values. Hash tables provide **O(1) average** time for insert, delete, and lookup operations.

## Visual Representation

```
Key "apple" → hash("apple") → 7 → Bucket[7]

Hash Table with Chaining:
┌───┬─────────────────────────────┐
│ 0 │ → null                      │
├───┼─────────────────────────────┤
│ 1 │ → ["cat", 5] → null         │
├───┼─────────────────────────────┤
│ 2 │ → null                      │
├───┼─────────────────────────────┤
│ 3 │ → ["dog", 3] → ["bat", 8]   │  ← Collision!
├───┼─────────────────────────────┤
│ 4 │ → null                      │
└───┴─────────────────────────────┘
```

---

## Hash Function Properties

| Property | Description |
|----------|-------------|
| **Deterministic** | Same input always produces same output |
| **Uniform** | Keys distributed evenly across buckets |
| **Fast** | Should compute quickly |
| **Avalanche** | Small input change = large output change |

---

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Search | O(1) | O(n) |
| Space | O(n) | O(n) |

*Worst case occurs when all keys hash to same bucket*

---

## Collision Handling

### 1. Chaining (Separate Chaining)

Each bucket contains a linked list of entries.

```python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.buckets = [[] for _ in range(size)]
        self.count = 0
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def put(self, key, value):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)  # Update
                return
        
        bucket.append((key, value))  # Insert
        self.count += 1
    
    def get(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for k, v in bucket:
            if k == key:
                return v
        
        return None  # Not found
    
    def remove(self, key):
        index = self._hash(key)
        bucket = self.buckets[index]
        
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self.count -= 1
                return True
        
        return False
    
    def contains(self, key):
        return self.get(key) is not None
```

### 2. Open Addressing (Linear Probing)

Find next available slot when collision occurs.

```python
class HashTableOpenAddressing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
        self.count = 0
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def _probe(self, index):
        """Linear probing - find next slot"""
        return (index + 1) % self.size
    
    def put(self, key, value):
        if self.count >= self.size * 0.7:
            self._resize()
        
        index = self._hash(key)
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = value  # Update
                return
            index = self._probe(index)
        
        self.keys[index] = key
        self.values[index] = value
        self.count += 1
    
    def get(self, key):
        index = self._hash(key)
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = self._probe(index)
        
        return None
    
    def _resize(self):
        old_keys = self.keys
        old_values = self.values
        self.size *= 2
        self.keys = [None] * self.size
        self.values = [None] * self.size
        self.count = 0
        
        for i, key in enumerate(old_keys):
            if key is not None:
                self.put(key, old_values[i])
```

---

## Built-in Hash Maps

### Python

```python
# Dictionary (hash map)
d = {}
d['name'] = 'Alice'      # Insert - O(1)
d['age'] = 30
print(d['name'])          # Lookup - O(1)
del d['age']              # Delete - O(1)
print('name' in d)        # Contains - O(1)

# Get with default
value = d.get('missing', 'default')

# Iterate
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(key, value)

# Counter (specialized hash map)
from collections import Counter
counter = Counter("aabbbc")  # {'b': 3, 'a': 2, 'c': 1}
print(counter.most_common(2))  # [('b', 3), ('a', 2)]

# defaultdict
from collections import defaultdict
dd = defaultdict(list)
dd['fruits'].append('apple')  # No KeyError!
dd['fruits'].append('banana')
```

### JavaScript

```javascript
// Object (simple hash map)
const obj = {};
obj['name'] = 'Alice';
console.log(obj['name']);
delete obj['name'];
console.log('name' in obj);

// Map (better hash map)
const map = new Map();
map.set('name', 'Alice');
map.get('name');           // 'Alice'
map.has('name');           // true
map.delete('name');
map.size;                  // 0

// Map preserves insertion order
for (const [key, value] of map) {
    console.log(key, value);
}

// Set (hash set)
const set = new Set([1, 2, 3]);
set.add(4);
set.has(3);    // true
set.delete(2);
```

### Java

```java
import java.util.HashMap;
import java.util.HashSet;

// HashMap
HashMap<String, Integer> map = new HashMap<>();
map.put("apple", 5);       // Insert
map.get("apple");          // Lookup → 5
map.containsKey("apple");  // Contains → true
map.remove("apple");       // Delete
map.getOrDefault("banana", 0);  // Default value

// Iterate
for (String key : map.keySet()) {
    System.out.println(key + ": " + map.get(key));
}

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// HashSet
HashSet<Integer> set = new HashSet<>();
set.add(1);
set.contains(1);  // true
set.remove(1);
```

### C++

```cpp
#include <unordered_map>
#include <unordered_set>

// unordered_map (hash map)
std::unordered_map<std::string, int> map;
map["apple"] = 5;              // Insert
int val = map["apple"];        // Lookup
bool exists = map.count("apple") > 0;
map.erase("apple");            // Delete

// Iterate
for (const auto& [key, value] : map) {
    std::cout << key << ": " << value << std::endl;
}

// unordered_set (hash set)
std::unordered_set<int> set;
set.insert(1);
set.count(1);    // 1 if exists
set.erase(1);
```

---

## Common Problems & Solutions

### 1. Two Sum

```python
def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    Time: O(n), Space: O(n)
    """
    seen = {}  # value → index
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []

# Example: two_sum([2, 7, 11, 15], 9) → [0, 1]
```

### 2. Group Anagrams

```python
from collections import defaultdict

def group_anagrams(strs):
    """
    Group strings that are anagrams of each other.
    Time: O(n * k log k) where k is max string length
    """
    groups = defaultdict(list)
    
    for s in strs:
        key = tuple(sorted(s))  # Sorted chars as key
        groups[key].append(s)
    
    return list(groups.values())

# Example: ["eat","tea","tan","ate","nat","bat"]
# Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
```

### 3. First Unique Character

```python
from collections import Counter

def first_uniq_char(s):
    """
    Find index of first non-repeating character.
    Time: O(n), Space: O(1) - at most 26 chars
    """
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1

# Example: "leetcode" → 0 (first 'l')
# Example: "aabb" → -1
```

### 4. Longest Substring Without Repeating

```python
def length_of_longest_substring(s):
    """
    Find length of longest substring with all unique chars.
    Time: O(n), Space: O(min(n, 26))
    """
    char_index = {}  # char → last seen index
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        
        char_index[char] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Example: "abcabcbb" → 3 ("abc")
```

### 5. Subarray Sum Equals K

```python
def subarray_sum(nums, k):
    """
    Count subarrays with sum equal to k.
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    prefix_count = {0: 1}  # prefix_sum → count
    
    for num in nums:
        prefix_sum += num
        
        # If (prefix_sum - k) exists, we found subarrays
        if prefix_sum - k in prefix_count:
            count += prefix_count[prefix_sum - k]
        
        prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1
    
    return count

# Example: subarray_sum([1, 1, 1], 2) → 2
```

### 6. LRU Cache

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest
```

---

## Hash Set Applications

| Problem | Solution |
|---------|----------|
| Contains Duplicate | Add to set, check if exists |
| Intersection of Arrays | Convert to sets, use `&` |
| Union of Arrays | Convert to sets, use `|` |
| Find Missing Number | XOR or set difference |
| Happy Number | Detect cycle with set |

---

## Key Takeaways

1. **O(1) average** for insert, delete, lookup
2. **Collisions** handled by chaining or open addressing
3. **Load factor** affects performance (resize when high)
4. **Hash Set** = hash map with only keys (no values)
5. **Counter** = specialized map for counting
6. **defaultdict** = auto-creates missing keys
7. Perfect for **frequency counting**, **caching**, **deduplication**
