# Interview Q&A — Ch1: C++ Basics

*Based on LearnCpp.com Chapter 1 + Challenge #1 review*

---

## Q1: What is the difference between a statement and an expression in C++?

**Answer:**
- A **statement** is a complete unit of execution that ends with `;`. It tells the program *to do something*.
- An **expression** is anything that evaluates to a **value**: `3 + 4`, `x * 2.0`, `a > b`.
- Every expression becomes a statement when you append `;` to it.
- **Trick**: `std::cout << x` is an *expression* that returns the stream — which is why you can chain: `std::cout << a << b << c`.

---

## Q2: What are the different forms of variable initialization in C++? Which is preferred?

**Answer:**

```cpp
int x;        // default init — UNINITIALIZED (holds garbage for built-ins)
int x = 5;    // copy initialization
int x(5);     // direct initialization
int x { 5 };  // brace/list initialization — PREFERRED in modern C++
int x {};     // value-initialization (zeroes built-in types)
```

**Brace initialization `{}` is preferred because:**
1. It prevents **narrowing conversions** at compile time: `int i { 3.14 };` is a compiler error.
2. It works consistently for all types — variables, classes, arrays, aggregates.
3. `int x {};` value-initializes to 0, eliminating the risk of garbage reads.

**Interview trap**: Copy init `int i = 3.14;` silently truncates to `3`. Brace init would refuse to compile.

---

## Q3: What is Undefined Behavior (UB)? Give an example from this chapter.

**Answer:**
UB is behavior that the C++ standard does not define — the compiler can do *anything* and still be "correct". Classic UB example:

```cpp
int x;           // uninitialized
std::cout << x;  // UB: reads garbage value
```

**Why it's dangerous:**
- May appear to work on your machine but crash in production
- Compilers are allowed to assume UB never occurs, enabling optimizations that remove code you expected to run
- The result is unpredictable and non-reproducible

**Prevention:** Always initialize variables. Use brace initialization `int x {}`.

---

## Q4: Why should you use `double` instead of `float` in most programs?

**Answer:**
- `float` has ~6–7 significant decimal digits of precision (32-bit IEEE 754)
- `double` has ~15–16 significant decimal digits (64-bit IEEE 754)

For any non-trivial numeric computation, `float` loses precision at operations that accumulate rounding errors. On modern CPUs, `double` arithmetic is not meaningfully slower than `float`. Use `float` only when you have a specific reason (e.g., GPU shaders, SIMD arrays, memory-constrained embedded systems).

---

## Q5: What is the difference between `"\n"` and `std::endl`?

**Answer:**

| | `"\n"` | `std::endl` |
|--|--------|-------------|
| Writes newline? | Yes | Yes |
| Flushes buffer? | No (buffered) | Yes (immediate syscall) |
| Performance | Fast | Slow in loops |

**Rule**: Use `"\n"` by default. Use `std::endl` only when you explicitly need the stream flushed immediately (e.g., before a crash handler, or writing to a file and closing).

**Interview follow-up**: "What does 'flushing the buffer' mean?" → The OS uses an output buffer to batch write operations. Flushing forces all buffered data to be written to the destination (screen/file) immediately, triggering a system call. Doing this on every line in a tight loop kills I/O performance.

---

## Q6: What is integer division? What is the trap with arithmetic expressions?

**Answer:**

```cpp
int result    = 9 / 5;      // = 1   (truncates — both operands are int)
double result = 9.0 / 5.0;  // = 1.8 (correct floating-point)
double result = 9 / 5;      // = 1.0 (integer division happens FIRST, then widened!)
```

**The trap**: Even if the *result* variable is `double`, if both *operands* are `int`, integer division occurs before the widening. At least one operand must be a floating-point type for floating-point division.

---

## Q7: Why should you never use `using namespace std;`?

**Answer:**
It dumps all names from the `std` namespace into the global namespace. This causes:
- **Name collisions**: your `swap()` or `count()` function silently gets replaced by `std::swap`/`std::count`
- **Hidden bugs**: the right function may be called without any warning
- **Readability**: `std::` prefix makes it immediately clear where a name comes from

The problem gets worse as programs grow and more libraries are added. Always write `std::cout`, `std::string`, etc.

---

## Q8: (Tricky) What does this print? Why?

```cpp
int a {};
int b {};
std::cin >> a >> b;
std::cout << a / b;
```

**Answer:** If the user enters `5 0`, this causes a **division by zero** at runtime. For integers, this is **Undefined Behavior** (or raises a hardware exception/SIGFPE on most platforms). The program may crash or produce garbage. This is why input validation matters even for simple programs.

---
*Last updated: 2026-08-17*
