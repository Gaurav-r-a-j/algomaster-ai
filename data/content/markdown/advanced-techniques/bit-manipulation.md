# Bit Manipulation

Bit manipulation involves operations on binary representations of integers. It's fast and memory-efficient for certain problems.

## Bitwise Operators

| Operator | Name | Example |
|----------|------|---------|
| `&`      | AND  | `5 & 3 = 1` (101 & 011 = 001) |
| `\|`     | OR   | `5 \| 3 = 7` (101 \| 011 = 111) |
| `^`      | XOR  | `5 ^ 3 = 6` (101 ^ 011 = 110) |
| `~`      | NOT  | `~5 = -6` (inverts all bits) |
| `<<`     | Left Shift  | `5 << 1 = 10` |
| `>>`     | Right Shift | `5 >> 1 = 2` |

## Common Tricks

### Check if bit is set
```python
def is_bit_set(n, i):
    return (n & (1 << i)) != 0
```

### Set a bit
```python
def set_bit(n, i):
    return n | (1 << i)
```

### Clear a bit
```python
def clear_bit(n, i):
    return n & ~(1 << i)
```

### Toggle a bit
```python
def toggle_bit(n, i):
    return n ^ (1 << i)
```

### Check if power of 2
```python
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0
```

### Count set bits (Brian Kernighan's Algorithm)
```python
def count_bits(n):
    count = 0
    while n:
        n &= (n - 1)  # Clear lowest set bit
        count += 1
    return count
```

### Get lowest set bit
```python
def lowest_set_bit(n):
    return n & (-n)
```

## XOR Properties

- `x ^ 0 = x`
- `x ^ x = 0`
- `x ^ y = y ^ x` (commutative)
- `(x ^ y) ^ z = x ^ (y ^ z)` (associative)

### Find single number (others appear twice)
```python
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result
```

## Applications

- Flags and permissions
- Bit masks
- Cryptography
- Compression
- Fast arithmetic (multiplication/division by 2)
