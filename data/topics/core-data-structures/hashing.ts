import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const hashing: Topic = {
  id: "hashing",
  title: "Hashing",
  description: "Efficient data storage and retrieval using hash functions.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "2. Core Data Structures",
  order: 8,
  difficulty: "Medium",
  content: `# Hashing

Hashing is a technique that maps data of arbitrary size to fixed-size values. Hash tables (hash maps) provide average O(1) time complexity for insertion, deletion, and lookup operations.

## Hash Function

A hash function takes an input (key) and returns an integer (hash code) that maps to an index in an array.

### Properties of Good Hash Functions

- **Deterministic:** Same input always produces same output
- **Uniform Distribution:** Keys should be evenly distributed
- **Fast Computation:** Should compute quickly
- **Minimize Collisions:** Different keys should rarely map to same index

## Hash Table

A hash table uses a hash function to compute an index into an array of buckets, from which the desired value can be found.

### Collision Handling

When two keys hash to the same index, we have a collision. Common strategies:

1. **Chaining:** Store multiple items in the same bucket using a linked list
2. **Open Addressing:** Find the next available slot (linear probing, quadratic probing)

## Implementation

\`\`\`python
class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]
    
    def _hash(self, key):
        return hash(key) % self.size
    
    def insert(self, key, value):
        index = self._hash(key)
        for pair in self.table[index]:
            if pair[0] == key:
                pair[1] = value
                return
        self.table[index].append([key, value])
    
    def get(self, key):
        index = self._hash(key)
        for pair in self.table[index]:
            if pair[0] == key:
                return pair[1]
        return None
    
    def delete(self, key):
        index = self._hash(key)
        for i, pair in enumerate(self.table[index]):
            if pair[0] == key:
                self.table[index].pop(i)
                return
\`\`\`

## Time Complexity

- **Average Case:** O(1) for all operations
- **Worst Case:** O(n) if all keys hash to same bucket

## Common Uses

1. **Fast Lookups:** Dictionary/map implementations
2. **Caching:** Storing frequently accessed data
3. **Database Indexing:** Quick record retrieval
4. **Counting:** Frequency counting problems
5. **Deduplication:** Removing duplicates efficiently

## Python Dictionary

Python's \`dict\` is implemented as a hash table:

\`\`\`python
# Creating a dictionary
my_dict = {'name': 'Alice', 'age': 30}

# Operations (all O(1) average)
my_dict['city'] = 'NYC'  # Insert
value = my_dict['name']  # Lookup
del my_dict['age']       # Delete
\`\`\`

## Practice Problems

- Two sum
- Group anagrams
- Longest substring without repeating characters
- Design hash map
- First unique character`,
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Group Anagrams",
      url: "https://leetcode.com/problems/group-anagrams/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Longest Substring Without Repeating Characters",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Hashing Data Structure",
      url: "https://www.geeksforgeeks.org/hashing-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Design HashMap",
      url: "https://leetcode.com/problems/design-hashmap/",
      difficulty: "Easy",
    },
  ],
  quiz: [],
};
