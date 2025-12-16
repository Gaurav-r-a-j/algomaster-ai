# Trie (Prefix Tree)

A **Trie** (pronounced "try") is a tree-like data structure used to store and retrieve strings efficiently. It's especially powerful for prefix-based operations like autocomplete.

## Why Use a Trie?

| Operation | Hash Table | Trie |
|-----------|------------|------|
| Search exact word | O(m) | O(m) |
| Prefix search | O(n × m) | **O(p)** |
| Autocomplete | O(n × m) | **O(p + k)** |
| Sorted iteration | O(n log n) | **O(n)** |

*m = word length, n = number of words, p = prefix length, k = results count*

## Visual Structure

```
Storing: ["cat", "car", "card", "care", "dog"]

           (root)
          /      \
         c        d
         |        |
         a        o
        /|\       |
       t r e*     g*
         |\ 
         d* e*

* = marks end of word

Finding "car": root → c → a → r ✓ (is_end=true)
Finding "ca":  root → c → a ✗ (is_end=false)
Prefix "car": root → c → a → r → [d, e] = ["card", "care"]
```

---

## Implementation

### Python

```python
class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end = False  # Marks end of a word
        self.word = None  # Store the complete word (optional)

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str) -> None:
        """Insert a word into the trie - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
        node.word = word
    
    def search(self, word: str) -> bool:
        """Search for exact word - O(m)"""
        node = self._find_node(word)
        return node is not None and node.is_end
    
    def starts_with(self, prefix: str) -> bool:
        """Check if any word starts with prefix - O(p)"""
        return self._find_node(prefix) is not None
    
    def _find_node(self, prefix: str) -> TrieNode:
        """Helper to find node for a prefix"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
    
    def get_words_with_prefix(self, prefix: str) -> list:
        """Get all words starting with prefix - O(p + k)"""
        result = []
        node = self._find_node(prefix)
        if node:
            self._collect_words(node, result)
        return result
    
    def _collect_words(self, node: TrieNode, result: list) -> None:
        """DFS to collect all words from a node"""
        if node.is_end:
            result.append(node.word)
        for child in node.children.values():
            self._collect_words(child, result)
    
    def delete(self, word: str) -> bool:
        """Delete a word from trie - O(m)"""
        def _delete(node, word, depth):
            if depth == len(word):
                if not node.is_end:
                    return False
                node.is_end = False
                return len(node.children) == 0
            
            char = word[depth]
            if char not in node.children:
                return False
            
            should_delete = _delete(node.children[char], word, depth + 1)
            
            if should_delete:
                del node.children[char]
                return len(node.children) == 0 and not node.is_end
            
            return False
        
        _delete(self.root, word, 0)
        return True

# Usage
trie = Trie()
words = ["apple", "app", "application", "apply", "banana"]
for word in words:
    trie.insert(word)

print(trie.search("app"))         # True
print(trie.search("ap"))          # False
print(trie.starts_with("app"))    # True
print(trie.get_words_with_prefix("app"))  # ['apple', 'app', 'application', 'apply']
```

### JavaScript

```javascript
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
        this.word = null;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEnd = true;
        node.word = word;
    }
    
    search(word) {
        const node = this._findNode(word);
        return node !== null && node.isEnd;
    }
    
    startsWith(prefix) {
        return this._findNode(prefix) !== null;
    }
    
    _findNode(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char);
        }
        return node;
    }
    
    getWordsWithPrefix(prefix) {
        const result = [];
        const node = this._findNode(prefix);
        if (node) {
            this._collectWords(node, result);
        }
        return result;
    }
    
    _collectWords(node, result) {
        if (node.isEnd) {
            result.push(node.word);
        }
        for (const child of node.children.values()) {
            this._collectWords(child, result);
        }
    }
}

// Usage
const trie = new Trie();
['apple', 'app', 'application', 'apply'].forEach(w => trie.insert(w));
console.log(trie.search('app'));           // true
console.log(trie.getWordsWithPrefix('app')); // ['apple', 'app', 'application', 'apply']
```

### Java

```java
import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
    String word = null;
}

class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
        node.word = word;
    }
    
    public boolean search(String word) {
        TrieNode node = findNode(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }
    
    private TrieNode findNode(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return null;
            }
            node = node.children.get(c);
        }
        return node;
    }
    
    public List<String> getWordsWithPrefix(String prefix) {
        List<String> result = new ArrayList<>();
        TrieNode node = findNode(prefix);
        if (node != null) {
            collectWords(node, result);
        }
        return result;
    }
    
    private void collectWords(TrieNode node, List<String> result) {
        if (node.isEnd) {
            result.add(node.word);
        }
        for (TrieNode child : node.children.values()) {
            collectWords(child, result);
        }
    }
}
```

### C++

```cpp
#include <unordered_map>
#include <vector>
#include <string>

class TrieNode {
public:
    std::unordered_map<char, TrieNode*> children;
    bool isEnd = false;
    std::string word;
    
    ~TrieNode() {
        for (auto& pair : children) {
            delete pair.second;
        }
    }
};

class Trie {
private:
    TrieNode* root;
    
    TrieNode* findNode(const std::string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (node->children.find(c) == node->children.end()) {
                return nullptr;
            }
            node = node->children[c];
        }
        return node;
    }
    
    void collectWords(TrieNode* node, std::vector<std::string>& result) {
        if (node->isEnd) {
            result.push_back(node->word);
        }
        for (auto& pair : node->children) {
            collectWords(pair.second, result);
        }
    }

public:
    Trie() {
        root = new TrieNode();
    }
    
    ~Trie() {
        delete root;
    }
    
    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new TrieNode();
            }
            node = node->children[c];
        }
        node->isEnd = true;
        node->word = word;
    }
    
    bool search(const std::string& word) {
        TrieNode* node = findNode(word);
        return node != nullptr && node->isEnd;
    }
    
    bool startsWith(const std::string& prefix) {
        return findNode(prefix) != nullptr;
    }
    
    std::vector<std::string> getWordsWithPrefix(const std::string& prefix) {
        std::vector<std::string> result;
        TrieNode* node = findNode(prefix);
        if (node) {
            collectWords(node, result);
        }
        return result;
    }
};
```

---

## Common Interview Problems

### 1. Autocomplete System

```python
class AutocompleteSystem:
    def __init__(self, sentences, times):
        self.trie = Trie()
        self.counts = {}  # word -> frequency
        self.current_input = ""
        
        for sentence, count in zip(sentences, times):
            self.trie.insert(sentence)
            self.counts[sentence] = count
    
    def input(self, c):
        if c == '#':
            # End of sentence, save it
            self.trie.insert(self.current_input)
            self.counts[self.current_input] = self.counts.get(self.current_input, 0) + 1
            self.current_input = ""
            return []
        
        self.current_input += c
        words = self.trie.get_words_with_prefix(self.current_input)
        
        # Sort by frequency (desc), then alphabetically
        words.sort(key=lambda w: (-self.counts.get(w, 0), w))
        return words[:3]
```

### 2. Word Search II (Find all words in grid)

```python
def find_words(board, words):
    """Find all words from dictionary in the grid."""
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    result = set()
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, node, path):
        if node.is_end:
            result.add(node.word)
        
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        
        char = board[r][c]
        if char == '#' or char not in node.children:
            return
        
        board[r][c] = '#'  # Mark visited
        next_node = node.children[char]
        
        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            dfs(r + dr, c + dc, next_node, path + char)
        
        board[r][c] = char  # Restore
    
    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")
    
    return list(result)
```

### 3. Replace Words (Shortest prefix)

```python
def replace_words(dictionary, sentence):
    """Replace words with their shortest root from dictionary."""
    trie = Trie()
    for root in dictionary:
        trie.insert(root)
    
    def get_shortest_root(word):
        node = trie.root
        for i, char in enumerate(word):
            if char not in node.children:
                break
            node = node.children[char]
            if node.is_end:
                return word[:i + 1]
        return word
    
    words = sentence.split()
    return ' '.join(get_shortest_root(w) for w in words)

# Example: replace_words(["cat", "bat", "rat"], "the cattle was rattled")
# Returns: "the cat was rat"
```

### 4. Maximum XOR of Two Numbers

```python
class BitTrie:
    """Trie for bits - useful for XOR problems"""
    def __init__(self):
        self.root = {}
    
    def insert(self, num):
        node = self.root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if bit not in node:
                node[bit] = {}
            node = node[bit]
    
    def find_max_xor(self, num):
        node = self.root
        xor_val = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            # Try to go opposite direction for max XOR
            toggle = 1 - bit
            if toggle in node:
                xor_val |= (1 << i)
                node = node[toggle]
            else:
                node = node[bit]
        return xor_val

def find_maximum_xor(nums):
    trie = BitTrie()
    max_xor = 0
    for num in nums:
        trie.insert(num)
        max_xor = max(max_xor, trie.find_max_xor(num))
    return max_xor
```

---

## Optimized Trie with Array

```python
class TrieNodeOptimized:
    """Use array instead of hashmap for lowercase letters only"""
    def __init__(self):
        self.children = [None] * 26  # a-z
        self.is_end = False
    
    def _char_to_idx(self, c):
        return ord(c) - ord('a')

class TrieOptimized:
    def __init__(self):
        self.root = TrieNodeOptimized()
    
    def insert(self, word):
        node = self.root
        for c in word:
            idx = ord(c) - ord('a')
            if not node.children[idx]:
                node.children[idx] = TrieNodeOptimized()
            node = node.children[idx]
        node.is_end = True
```

---

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Insert | O(m) | O(m) |
| Search | O(m) | O(1) |
| Prefix Search | O(p) | O(1) |
| Autocomplete | O(p + k) | O(k) |
| Delete | O(m) | O(1) |

*m = word length, p = prefix length, k = number of results*

**Space Complexity for Trie:** O(n × m × alphabet_size) worst case

---

## Applications

| Application | Why Trie? |
|-------------|-----------|
| **Autocomplete** | Fast prefix matching |
| **Spell Checker** | Suggest corrections |
| **IP Routing** | Longest prefix matching |
| **Phone Directory** | Contact search |
| **Word Games** | Boggle, Scrabble validation |
| **DNA Sequence** | Pattern matching in genomes |

---

## Key Takeaways

1. **Prefix-based operations** are where Trie shines
2. **Trade space for speed** - uses more memory than hash tables
3. **Array vs HashMap** - use array for fixed alphabet (faster)
4. **Store word at end node** - makes retrieval easier
5. **Common pattern**: Build trie, then DFS/BFS to solve problem
